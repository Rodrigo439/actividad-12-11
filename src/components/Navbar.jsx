import { Link } from 'react-router-dom';
import { Sparkles, Plus, RotateCcw } from 'lucide-react';
import { useDigimons } from '../context/DigimonContext';

export default function Navbar({ onOpenCreateModal }) {
  const { resetToDefault, digimons } = useDigimons();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-slate-900 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
          aria-label="Ir a la página principal de DigiDex"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-rose-400 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
              DigiDex
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              ABM SPA
            </span>
          </div>
        </Link>

        {/* Global Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={resetToDefault}
            title="Restablecer los 20 Digimons iniciales de la API"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Restablecer a los 20 Digimons por defecto de la API"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden md:inline">Reiniciar API</span>
          </button>

          <button
            type="button"
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-full shadow-xs hover:shadow-sm transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            aria-label="Crear nuevo Digimon (Alta)"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            <span>Nuevo Digimon</span>
          </button>
        </div>
      </div>
    </header>
  );
}
