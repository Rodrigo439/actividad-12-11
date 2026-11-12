import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Buscar Digimon por nombre o número de ID...' }) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <label htmlFor="digimon-search" className="sr-only">
        Buscar Digimon por nombre o ID
      </label>

      {/* Ícono de lupa a la izquierda */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
        <Search className="w-5 h-5" aria-hidden="true" />
      </div>

      {/* Input con bordes redondeados tipo píldora (pill-shape) y fondo gris muy claro */}
      <input
        id="digimon-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full pl-11 pr-11 py-3.5 bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-slate-900 placeholder:text-slate-400 text-sm md:text-base rounded-full border border-slate-200/80 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />

      {/* Botón para limpiar búsqueda */}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
          aria-label="Limpiar búsqueda"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
