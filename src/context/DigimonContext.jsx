import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { digimonService } from '../services/digimonService';

export const DigimonContext = createContext(null);

const STORAGE_KEY = 'digidex_abm_data_v1';
const DEFAULT_IMAGE = 'https://digi-api.com/images/digimon/w/Agumon.png';

export function DigimonProvider({ children }) {
  const [digimons, setDigimons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Carga los 20 Digimons iniciales desde la API respetando la restricción estricta.
   */
  const loadInitialDigimons = useCallback(async (forceFetch = false) => {
    setIsLoading(true);
    setError(null);

    // Si existen datos guardados en almacenamiento local y no se fuerza recarga, usarlos
    if (!forceFetch) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setDigimons(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Error al leer de localStorage:', err);
      }
    }

    try {
      // Restricción estricta: 20 resultados
      const response = await digimonService.getDigimons(20, 0);
      const list = response.content || [];

      // Mapeo inicial normalizado
      const normalizedList = list.map((item) => ({
        id: Number(item.id),
        name: item.name,
        image: item.image || DEFAULT_IMAGE,
        level: item.levels?.[0]?.level || 'Rookie / Child',
        type: item.types?.[0]?.type || 'Desconocido',
        attribute: item.attributes?.[0]?.attribute || 'Vacuna',
        description: '',
        fields: [],
        skills: [],
        isCustom: false,
      }));

      setDigimons(normalizedList);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedList));
    } catch (err) {
      setError(err.message || 'Error al conectar con la API de Digimon.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar al montar el componente
  useEffect(() => {
    loadInitialDigimons();
  }, [loadInitialDigimons]);

  // Persistir cambios en localStorage cada vez que `digimons` cambie
  useEffect(() => {
    if (digimons.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(digimons));
      } catch (err) {
        console.warn('Error al persistir digimons:', err);
      }
    }
  }, [digimons]);

  /**
   * ALTA: Agregar un nuevo Digimon al estado global.
   */
  const addDigimon = useCallback((newDigimon) => {
    if (!newDigimon || !newDigimon.name?.trim()) {
      throw new Error('El nombre del Digimon es obligatorio.');
    }

    setDigimons((prev) => {
      // Calcular ID único (mayor al ID numérico más alto)
      const maxId = prev.reduce((max, d) => (Number(d.id) > max ? Number(d.id) : max), 0);
      const newId = maxId + 1;

      const createdItem = {
        id: newId,
        name: newDigimon.name.trim(),
        image: newDigimon.image?.trim() || DEFAULT_IMAGE,
        level: newDigimon.level?.trim() || 'Rookie',
        type: newDigimon.type?.trim() || 'Desconocido',
        attribute: newDigimon.attribute?.trim() || 'Vacuna',
        description: newDigimon.description?.trim() || 'Digimon creado por el usuario en el DigiDex.',
        fields: newDigimon.fields || [],
        skills: newDigimon.skills || [],
        isCustom: true,
        createdAt: new Date().toISOString(),
      };

      return [createdItem, ...prev];
    });
  }, []);

  /**
   * MODIFICACIÓN: Editar los datos de un Digimon existente en el estado global.
   */
  const updateDigimon = useCallback((id, updatedData) => {
    const targetId = Number(id);
    setDigimons((prev) =>
      prev.map((item) => {
        if (Number(item.id) === targetId) {
          return {
            ...item,
            ...updatedData,
            id: targetId, // Garantizar inmutabilidad del ID
            name: updatedData.name?.trim() || item.name,
            image: updatedData.image?.trim() || item.image || DEFAULT_IMAGE,
            updatedAt: new Date().toISOString(),
          };
        }
        return item;
      })
    );
  }, []);

  /**
   * BAJA: Eliminar un Digimon del estado global.
   */
  const deleteDigimon = useCallback((id) => {
    const targetId = Number(id);
    setDigimons((prev) => prev.filter((item) => Number(item.id) !== targetId));
  }, []);

  /**
   * Obtener un Digimon por ID (consulta el estado global primero, y enriquece detalles si es de la API).
   */
  const getDigimonById = useCallback(async (id) => {
    const targetId = Number(id);
    const existing = isNaN(targetId)
      ? digimons.find((d) => d.name?.toLowerCase() === String(id).toLowerCase())
      : digimons.find((d) => Number(d.id) === targetId);

    // Si ya existe y tiene descripción o es custom, devolverlo directamente
    if (existing && (existing.description || existing.isCustom || existing.detailsLoaded)) {
      return existing;
    }

    // Si no es custom, intentar consultar o enriquecer con la API
    const queryParam = existing ? targetId : (isNaN(targetId) ? id : targetId);

    if (!existing || !existing.isCustom) {
      try {
        const detail = await digimonService.getDigimonById(queryParam);
        
        // Enriquecer o construir espécimen
        const enriched = {
          id: Number(detail.id) || (existing ? existing.id : targetId),
          name: detail.name || (existing ? existing.name : ''),
          detailsLoaded: true,
          image: detail.images?.[0]?.href || existing?.image || DEFAULT_IMAGE,
          level: detail.levels?.[0]?.level || existing?.level || 'Rookie',
          type: detail.types?.[0]?.type || existing?.type || 'Desconocido',
          attribute: detail.attributes?.[0]?.attribute || existing?.attribute || 'Vacuna',
          description:
            detail.descriptions?.find((d) => d.language === 'en_us')?.description ||
            detail.descriptions?.[0]?.description ||
            existing?.description ||
            'Sin descripción oficial disponible.',
          fields: detail.fields || [],
          skills: detail.skills || [],
          isCustom: false,
        };

        // Si ya existía en la lista de digimons, actualizarlo en el estado para cachear
        if (existing) {
          setDigimons((prev) =>
            prev.map((item) => (Number(item.id) === targetId ? enriched : item))
          );
        }

        return enriched;
      } catch (err) {
        console.warn('No se pudieron obtener detalles adicionales de la API:', err);
        return existing || null;
      }
    }

    return existing || null;
  }, [digimons]);

  /**
   * Filtro de búsqueda por nombre o ID.
   */
  const filteredDigimons = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return digimons;

    return digimons.filter((digimon) => {
      const matchName = digimon.name?.toLowerCase().includes(query);
      const matchId = String(digimon.id).includes(query);
      return matchName || matchId;
    });
  }, [digimons, searchQuery]);

  /**
   * Restablecer al listado original de 20 Digimons de la API.
   */
  const resetToDefault = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    return loadInitialDigimons(true);
  }, [loadInitialDigimons]);

  const value = {
    digimons,
    filteredDigimons,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    addDigimon,
    updateDigimon,
    deleteDigimon,
    getDigimonById,
    resetToDefault,
    refreshDigimons: () => loadInitialDigimons(true),
  };

  return <DigimonContext.Provider value={value}>{children}</DigimonContext.Provider>;
}

export function useDigimons() {
  const context = useContext(DigimonContext);
  if (!context) {
    throw new Error('useDigimons debe usarse dentro de un DigimonProvider');
  }
  return context;
}
