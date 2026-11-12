/**
 * Servicio para interactuar con la API pública de Digimon.
 * Documentación y Base URL: https://digi-api.com/api/v1/digimon
 */

const BASE_URL = 'https://digi-api.com/api/v1/digimon';

export const digimonService = {
  /**
   * Obtiene el listado inicial de Digimons con restricción estricta de 20 por consulta.
   * @param {number} pageSize - Cantidad de resultados (máximo 20 por requerimiento).
   * @param {number} page - Número de página (0-indexed).
   * @returns {Promise<{ content: Array, pageable: Object }>}
   */
  async getDigimons(pageSize = 20, page = 0) {
    // Restricción estricta según AGENTS.md: máximo 20 resultados por consulta
    const safePageSize = Math.min(pageSize, 20);
    const response = await fetch(`${BASE_URL}?pageSize=${safePageSize}&page=${page}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo cargar el listado de Digimons.`);
    }

    const data = await response.json();
    return data;
  },

  /**
   * Obtiene el detalle completo de un Digimon por ID o nombre.
   * @param {string|number} idOrName - ID numérico o nombre exacto.
   * @returns {Promise<Object>}
   */
  async getDigimonById(idOrName) {
    if (!idOrName) throw new Error('Se requiere un ID o nombre válido.');

    const response = await fetch(`${BASE_URL}/${idOrName}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: Digimon #${idOrName} no encontrado.`);
    }

    const data = await response.json();
    return data;
  }
};
