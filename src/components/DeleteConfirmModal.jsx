import { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, digimon }) {
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => cancelBtnRef.current?.focus(), 50);
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !digimon) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" aria-hidden="true" />
          </div>

          <div className="flex-1">
            <h2 id="delete-dialog-title" className="text-lg font-bold text-slate-900">
              ¿Eliminar Digimon?
            </h2>
            <p id="delete-dialog-desc" className="text-sm text-slate-600 mt-1">
              ¿Estás seguro de que deseas dar de baja a <strong className="text-slate-900">{digimon.name}</strong> (#{digimon.id})? Esta acción se aplicará al estado del DigiDex.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            aria-label="Cerrar confirmación"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors focus:outline-hidden focus:ring-2 focus:ring-slate-400"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(digimon.id);
              onClose();
            }}
            className="px-5 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-xs hover:shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-rose-500"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
