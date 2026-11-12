import { useState } from 'react';
import { Plus, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { useDigimons } from '../context/DigimonContext';
import SearchBar from '../components/SearchBar';
import DigimonCard from '../components/DigimonCard';
import DigimonFormModal from '../components/DigimonFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

export default function HomePage({ onOpenCreate }) {
  const {
    filteredDigimons,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    addDigimon,
    updateDigimon,
    deleteDigimon,
    refreshDigimons,
  } = useDigimons();

  // Modales de ABM
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingDigimon, setEditingDigimon] = useState(null);
  const [deletingDigimon, setDeletingDigimon] = useState(null);

  // Manejadores para abrir modales
  const handleOpenCreate = () => {
    if (onOpenCreate) {
      onOpenCreate();
    } else {
      setEditingDigimon(null);
      setIsFormModalOpen(true);
    }
  };

  const handleOpenEdit = (digimon) => {
    setEditingDigimon(digimon);
    setIsFormModalOpen(true);
  };

  const handleOpenDelete = (digimon) => {
    setDeletingDigimon(digimon);
  };

  const handleFormSubmit = (data) => {
    if (editingDigimon) {
      updateDigimon(editingDigimon.id, data);
    } else {
      addDigimon(data);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Sección Hero / Búsqueda */}
      <section className="text-center max-w-2xl mx-auto mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Enciclopedia Digital Oficial &middot; Estilo Pokédex</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explora y Gestiona tus <span className="bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">Digimons</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Alta, baja y modificación de especímenes digitales en memoria consumiendo la API de Digimon.
        </p>

        {/* Barra de búsqueda pill-shape */}
        <div className="pt-2">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar por nombre (ej. Agumon) o número de ID..."
          />
        </div>

        {/* Contador / Indicador de estado */}
        {!isLoading && !error && (
          <p className="text-xs font-medium text-slate-500">
            Mostrando <strong className="text-slate-800">{filteredDigimons.length}</strong> Digimon{filteredDigimons.length !== 1 ? 's' : ''}
            {searchQuery && ` para "${searchQuery}"`}
          </p>
        )}
      </section>

      {/* Estados de Carga / Error */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl p-6 bg-slate-100/70 animate-pulse flex flex-col items-center justify-center space-y-4 h-64"
            >
              <div className="w-24 h-24 bg-slate-200 rounded-full" />
              <div className="h-4 w-3/4 bg-slate-200 rounded-md" />
              <div className="h-3 w-1/2 bg-slate-200 rounded-md" />
            </div>
          ))}
        </div>
      )}

      {error && !isLoading && (
        <div className="max-w-md mx-auto my-12 p-6 rounded-3xl bg-rose-50 border border-rose-200 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" aria-hidden="true" />
          <h2 className="text-lg font-bold text-rose-900">Hubo un problema al cargar</h2>
          <p className="text-sm text-rose-700">{error}</p>
          <button
            onClick={refreshDigimons}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar</span>
          </button>
        </div>
      )}

      {/* Grilla de Resultados */}
      {!isLoading && !error && (
        <>
          {filteredDigimons.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              role="feed"
              aria-label="Listado de Digimons"
            >
              {filteredDigimons.map((digimon) => (
                <DigimonCard
                  key={digimon.id}
                  digimon={digimon}
                  onEdit={handleOpenEdit}
                  onDelete={handleOpenDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">No se encontraron resultados</h2>
              <p className="text-sm text-slate-500">
                No hay ningún Digimon que coincida con "{searchQuery}". Puedes limpiar el filtro o registrar un nuevo Digimon.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                >
                  Limpiar búsqueda
                </button>
                <button
                  onClick={handleOpenCreate}
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors"
                >
                  Crear Digimon
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Botón Flotante (Floating Action Button - FAB) para Alta */}
      <button
        type="button"
        onClick={handleOpenCreate}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all focus:outline-hidden focus-visible:ring-4 focus-visible:ring-indigo-300"
        aria-label="Registrar nuevo Digimon (Alta)"
      >
        <Plus className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
        <span className="text-sm tracking-wide">Nuevo Digimon</span>
      </button>

      {/* Modales de ABM */}
      <DigimonFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingDigimon}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingDigimon)}
        onClose={() => setDeletingDigimon(null)}
        onConfirm={deleteDigimon}
        digimon={deletingDigimon}
      />
    </main>
  );
}
