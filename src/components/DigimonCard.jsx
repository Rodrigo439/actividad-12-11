import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { getPastelTheme } from '../utils/colors';

export default function DigimonCard({ digimon, onEdit, onDelete }) {
  const navigate = useNavigate();
  const theme = getPastelTheme(digimon);

  const formattedId = `#${String(digimon.id).padStart(3, '0')}`;

  const handleCardClick = () => {
    navigate(`/digimon/${digimon.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      tabIndex={0}
      role="button"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      aria-label={`Ver detalles de ${digimon.name}, ID ${formattedId}`}
      className={`group relative flex flex-col justify-between rounded-3xl p-5 ${theme.cardBg} border ${theme.border} transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-lg focus:outline-hidden ${theme.ring} focus-visible:ring-3 focus-visible:ring-offset-2`}
    >
      {/* Cabecera de la tarjeta: Badge ID y Acciones */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider ${theme.badge}`}>
          {formattedId}
        </span>

        {/* Botones de acción rápida: Editar y Eliminar (evitan bubbling) */}
        <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(digimon);
            }}
            title={`Editar ${digimon.name}`}
            aria-label={`Editar ${digimon.name}`}
            className="p-1.5 rounded-full bg-white/70 hover:bg-white text-slate-700 hover:text-indigo-600 shadow-2xs hover:shadow-xs transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(digimon);
            }}
            title={`Eliminar ${digimon.name}`}
            aria-label={`Eliminar ${digimon.name}`}
            className="p-1.5 rounded-full bg-white/70 hover:bg-white text-slate-700 hover:text-rose-600 shadow-2xs hover:shadow-xs transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Imagen centrada con efecto suave de hover */}
      <div className="relative w-full aspect-square flex items-center justify-center p-2 my-2">
        <div className="absolute inset-0 bg-white/30 rounded-full blur-xl scale-90 group-hover:scale-105 transition-transform" />
        <img
          src={digimon.image}
          alt={`Imagen oficial de ${digimon.name}`}
          loading="lazy"
          className="relative max-h-36 max-w-full object-contain drop-shadow-md group-hover:scale-108 transition-transform duration-200"
          onError={(e) => {
            e.currentTarget.src = 'https://digi-api.com/images/digimon/w/Agumon.png';
          }}
        />
      </div>

      {/* Nombre en negrita y detalles debajo de la imagen */}
      <div className="text-center mt-2">
        <h3 className="font-extrabold text-lg text-slate-900 tracking-tight group-hover:text-indigo-900 transition-colors line-clamp-1">
          {digimon.name}
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
          {digimon.level && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/80 text-slate-800 border border-slate-200/50">
              {digimon.level}
            </span>
          )}
          {digimon.attribute && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/80 text-slate-800 border border-slate-200/50">
              {digimon.attribute}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
