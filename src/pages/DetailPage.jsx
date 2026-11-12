import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, Shield, Zap, Sparkles, Layers, Info } from 'lucide-react';
import { useDigimons } from '../context/DigimonContext';
import { getPastelTheme } from '../utils/colors';
import DigimonFormModal from '../components/DigimonFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDigimonById, updateDigimon, deleteDigimon } = useDigimons();

  const [digimon, setDigimon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'classification' | 'skills'

  // Modales ABM
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      const data = await getDigimonById(id);
      if (isMounted) {
        setDigimon(data);
        setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [id, getDigimonById]);

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="rounded-3xl bg-slate-100 p-10 animate-pulse flex flex-col items-center justify-center space-y-6">
          <div className="w-48 h-48 bg-slate-200 rounded-full" />
          <div className="h-8 w-64 bg-slate-200 rounded-md" />
          <div className="h-4 w-40 bg-slate-200 rounded-md" />
        </div>
      </main>
    );
  }

  if (!digimon) {
    return (
      <main className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
          <Info className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Digimon no encontrado</h1>
        <p className="text-sm text-slate-500">
          No existe ningún espécimen digital con el ID #{id} en el DigiDex.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al DigiDex</span>
        </Link>
      </main>
    );
  }

  const theme = getPastelTheme(digimon);
  const formattedId = `#${String(digimon.id).padStart(3, '0')}`;

  const handleUpdate = (updatedData) => {
    updateDigimon(digimon.id, updatedData);
    setDigimon((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  const handleDeleteConfirm = () => {
    deleteDigimon(digimon.id);
    navigate('/', { replace: true });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Barra de navegación superior con botón Volver y Acciones ABM */}
      <nav aria-label="Navegación del detalle" className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-full shadow-2xs border border-slate-200 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="Regresar a la lista de Digimons"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Volver al Inicio</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-full transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={`Editar datos de ${digimon.name}`}
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
            <span>Editar</span>
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-full transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500"
            aria-label={`Eliminar a ${digimon.name} del DigiDex`}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            <span>Eliminar</span>
          </button>
        </div>
      </nav>

      {/* Tarjeta de Detalle Estilo Pokédex */}
      <article className="rounded-3xl shadow-xl overflow-hidden border border-slate-200/80 bg-white">
        {/* Recuadro superior con color pastel, ID, nombre grande centrado e imagen grande */}
        <section
          className={`relative p-8 md:p-12 bg-gradient-to-b ${theme.banner} flex flex-col items-center justify-center text-center`}
          aria-label="Información principal e imagen"
        >
          {/* Badge de ID y Tipo */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider ${theme.badge}`}>
              {formattedId}
            </span>
            {digimon.isCustom && (
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-amber-200 text-amber-950">
                Creado por Usuario
              </span>
            )}
          </div>

          {/* Nombre grande y centrado */}
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 drop-shadow-xs">
            {digimon.name}
          </h1>

          {/* Imagen grande del Digimon centrada */}
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-white/40 rounded-full blur-2xl scale-95" />
            <img
              src={digimon.image}
              alt={`Fotografía oficial de ${digimon.name}`}
              className="relative max-h-full max-w-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = 'https://digi-api.com/images/digimon/w/Agumon.png';
              }}
            />
          </div>
        </section>

        {/* Sección blanca limpia con navegación por pestañas */}
        <section className="bg-white p-6 sm:p-8">
          {/* Tabs selector */}
          <div
            role="tablist"
            aria-label="Secciones del detalle de Digimon"
            className="flex items-center justify-center gap-2 border-b border-slate-200 pb-4 mb-6 overflow-x-auto"
          >
            <button
              role="tab"
              id="tab-details"
              aria-selected={activeTab === 'details'}
              aria-controls="panel-details"
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-full transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                activeTab === 'details'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Info className="w-4 h-4" aria-hidden="true" />
              <span>Detalles & Info</span>
            </button>

            <button
              role="tab"
              id="tab-classification"
              aria-selected={activeTab === 'classification'}
              aria-controls="panel-classification"
              onClick={() => setActiveTab('classification')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-full transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                activeTab === 'classification'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>Formas & Tipos</span>
            </button>

            <button
              role="tab"
              id="tab-skills"
              aria-selected={activeTab === 'skills'}
              aria-controls="panel-skills"
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-full transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                activeTab === 'skills'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-4 h-4" aria-hidden="true" />
              <span>Habilidades ({digimon.skills?.length || 0})</span>
            </button>
          </div>

          {/* Contenido de la pestaña 1: Detalles & Lore */}
          {activeTab === 'details' && (
            <div id="panel-details" role="tabpanel" aria-labelledby="tab-details" className="space-y-6">
              <div>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Descripción Oficial / Lore
                </h2>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-800 text-sm sm:text-base leading-relaxed">
                  {digimon.description || 'Este Digimon no cuenta con descripción detallada en los archivos.'}
                </div>
              </div>

              {/* Ficha técnica rápida */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <span className="block text-xs font-bold text-slate-400 uppercase">ID Digital</span>
                  <span className="text-lg font-black text-slate-800">{formattedId}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <span className="block text-xs font-bold text-slate-400 uppercase">Nivel</span>
                  <span className="text-sm sm:text-base font-bold text-slate-800">{digimon.level || 'Desconocido'}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <span className="block text-xs font-bold text-slate-400 uppercase">Atributo</span>
                  <span className="text-sm sm:text-base font-bold text-slate-800">{digimon.attribute || 'Desconocido'}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <span className="block text-xs font-bold text-slate-400 uppercase">Especie</span>
                  <span className="text-sm sm:text-base font-bold text-slate-800">{digimon.type || 'Desconocido'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Contenido de la pestaña 2: Formas & Clasificación */}
          {activeTab === 'classification' && (
            <div id="panel-classification" role="tabpanel" aria-labelledby="tab-classification" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-600" />
                    <span>Jerarquía y Naturaleza</span>
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="font-medium text-slate-500">Etapa Evolutiva:</span>
                      <strong className="text-slate-900">{digimon.level}</strong>
                    </li>
                    <li className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="font-medium text-slate-500">Atributo Principal:</span>
                      <strong className="text-slate-900">{digimon.attribute}</strong>
                    </li>
                    <li className="flex justify-between py-1">
                      <span className="font-medium text-slate-500">Sub-tipo / Especie:</span>
                      <strong className="text-slate-900">{digimon.type}</strong>
                    </li>
                  </ul>
                </div>

                {/* Campos / Fields */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Campos de Operación (Fields)</span>
                  </h3>
                  {digimon.fields && digimon.fields.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {digimon.fields.map((field) => (
                        <div
                          key={field.id || field.field}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-semibold text-slate-800"
                        >
                          {field.image && (
                            <img src={field.image} alt={field.field} className="w-4 h-4 object-contain" />
                          )}
                          <span>{field.field}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">
                      No hay campos específicos registrados para este Digimon.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Contenido de la pestaña 3: Habilidades */}
          {activeTab === 'skills' && (
            <div id="panel-skills" role="tabpanel" aria-labelledby="tab-skills" className="space-y-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Ataques y Habilidades Especiales
              </h2>

              {digimon.skills && digimon.skills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {digimon.skills.map((skill) => (
                    <div
                      key={skill.id || skill.skill}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                          {skill.skill}
                        </h3>
                        {skill.translation && (
                          <span className="text-xs text-slate-400 font-medium">({skill.translation})</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {skill.description || 'Sin descripción del ataque.'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/70 text-center text-slate-500 text-sm">
                  Este Digimon aún no tiene ataques registrados en la base de datos digital.
                </div>
              )}
            </div>
          )}
        </section>
      </article>

      {/* Modales ABM */}
      <DigimonFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdate}
        initialData={digimon}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        digimon={digimon}
      />
    </main>
  );
}
