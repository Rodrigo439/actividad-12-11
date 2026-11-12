import { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Image as ImageIcon } from 'lucide-react';

const LEVEL_OPTIONS = [
  'Baby I / Fresh',
  'Baby II / In-training',
  'Child / Rookie',
  'Adult / Champion',
  'Perfect / Ultimate',
  'Ultimate / Mega',
  'Armor',
  'Hybrid',
];

const ATTRIBUTE_OPTIONS = ['Vaccine', 'Data', 'Virus', 'Free', 'Variable', 'Unknown'];

export default function DigimonFormModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const isEditing = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: '',
    level: 'Child / Rookie',
    attribute: 'Vaccine',
    type: 'Reptile',
    image: '',
    description: '',
  });

  const [error, setError] = useState('');
  const firstInputRef = useRef(null);

  // Cargar datos en edición o resetear en creación
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        level: initialData.level || 'Child / Rookie',
        attribute: initialData.attribute || 'Vaccine',
        type: initialData.type || 'Reptile',
        image: initialData.image || '',
        description: initialData.description || '',
      });
    } else {
      setFormData({
        name: '',
        level: 'Child / Rookie',
        attribute: 'Vaccine',
        type: 'Reptile',
        image: '',
        description: '',
      });
    }
    setError('');
  }, [initialData, isOpen]);

  // Enfocar primer input al abrir y cerrar con Escape
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 50);
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('El nombre del Digimon es obligatorio.');
      firstInputRef.current?.focus();
      return;
    }

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      type: formData.type.trim() || 'Desconocido',
      image: formData.image.trim() || 'https://digi-api.com/images/digimon/w/Agumon.png',
      description: formData.description.trim(),
    });

    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera pastel del modal */}
        <div className="bg-gradient-to-r from-indigo-50 via-sky-50 to-pink-50 p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="modal-title" className="text-xl font-extrabold text-slate-900">
                {isEditing ? `Editar a ${initialData.name}` : 'Crear Nuevo Digimon'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEditing ? 'Actualiza los datos del Digimon' : 'Agrega un nuevo registro al DigiDex'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            aria-label="Cerrar ventana emergente"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div
              role="alert"
              className="p-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl"
            >
              {error}
            </div>
          )}

          {/* Nombre */}
          <div>
            <label htmlFor="digimon-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nombre <span className="text-rose-500">*</span>
            </label>
            <input
              ref={firstInputRef}
              id="digimon-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Gabumon, Patamon, Wargreymon..."
              className="w-full px-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 transition-colors"
            />
          </div>

          {/* Nivel y Atributo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="digimon-level" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nivel
              </label>
              <select
                id="digimon-level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
              >
                {LEVEL_OPTIONS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="digimon-attribute" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Atributo
              </label>
              <select
                id="digimon-attribute"
                value={formData.attribute}
                onChange={(e) => setFormData({ ...formData, attribute: e.target.value })}
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
              >
                {ATTRIBUTE_OPTIONS.map((attr) => (
                  <option key={attr} value={attr}>
                    {attr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tipo / Especie */}
          <div>
            <label htmlFor="digimon-type" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tipo / Especie
            </label>
            <input
              id="digimon-type"
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              placeholder="Ej: Reptile, Beast, Holy Beast, Dragon..."
              className="w-full px-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 transition-colors"
            />
          </div>

          {/* URL de Imagen */}
          <div>
            <label htmlFor="digimon-image" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              URL de la Imagen (opcional)
            </label>
            <div className="flex gap-2">
              <input
                id="digimon-image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://digi-api.com/images/digimon/w/..."
                className="flex-1 px-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 transition-colors"
              />
              {formData.image && (
                <div className="w-10 h-10 rounded-xl border border-slate-200 p-1 flex items-center justify-center bg-slate-50 shrink-0">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Si se deja vacío, se asignará un avatar por defecto.</p>
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="digimon-desc" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Descripción o Datos Curiosos
            </label>
            <textarea
              id="digimon-desc"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Breve historia o descripción del Digimon..."
              className="w-full px-4 py-2 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 transition-colors resize-none"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors focus:outline-hidden focus:ring-2 focus:ring-slate-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs hover:shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              {isEditing ? 'Guardar Cambios' : 'Crear Digimon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
