/**
 * Generador de temas de color pastel con alto contraste (WCAG 2.1 AA)
 * basados en el atributo o nivel del Digimon.
 */

export function getPastelTheme(digimon) {
  if (!digimon) {
    return {
      bg: 'bg-slate-100',
      border: 'border-slate-200',
      badge: 'bg-slate-200 text-slate-800',
      accent: 'text-slate-700',
      banner: 'from-slate-100 to-slate-200',
      ring: 'focus-visible:ring-slate-400',
    };
  }

  const attr = (digimon.attribute || '').toLowerCase();
  const type = (digimon.type || '').toLowerCase();

  // Virus -> Rosa / Lavanda suave
  if (attr.includes('virus') || type.includes('dark') || type.includes('demon')) {
    return {
      bg: 'bg-rose-50',
      cardBg: 'bg-rose-100/70',
      border: 'border-rose-200',
      badge: 'bg-rose-200 text-rose-900',
      badgeSecondary: 'bg-purple-100 text-purple-900',
      accent: 'text-rose-900',
      banner: 'from-rose-100 via-purple-50 to-pink-100',
      ring: 'focus-visible:ring-rose-400',
    };
  }

  // Vacuna (Vaccine) -> Azul celeste / Aqua pastel
  if (attr.includes('vac') || attr.includes('vaccine') || type.includes('holy') || type.includes('angel')) {
    return {
      bg: 'bg-sky-50',
      cardBg: 'bg-sky-100/70',
      border: 'border-sky-200',
      badge: 'bg-sky-200 text-sky-950',
      badgeSecondary: 'bg-blue-100 text-blue-900',
      accent: 'text-sky-950',
      banner: 'from-sky-100 via-cyan-50 to-blue-100',
      ring: 'focus-visible:ring-sky-400',
    };
  }

  // Data / Datos -> Menta / Esmeralda suave
  if (attr.includes('dat') || type.includes('plant') || type.includes('insect') || type.includes('aquatic')) {
    return {
      bg: 'bg-emerald-50',
      cardBg: 'bg-emerald-100/70',
      border: 'border-emerald-200',
      badge: 'bg-emerald-200 text-emerald-950',
      badgeSecondary: 'bg-teal-100 text-teal-900',
      accent: 'text-emerald-950',
      banner: 'from-emerald-100 via-teal-50 to-green-100',
      ring: 'focus-visible:ring-emerald-400',
    };
  }

  // Free / Libre o Fuego / Reptil -> Melocotón / Naranja suave
  if (attr.includes('free') || type.includes('reptile') || type.includes('dragon') || type.includes('beast')) {
    return {
      bg: 'bg-amber-50',
      cardBg: 'bg-amber-100/70',
      border: 'border-amber-200',
      badge: 'bg-amber-200 text-amber-950',
      badgeSecondary: 'bg-orange-100 text-orange-950',
      accent: 'text-amber-950',
      banner: 'from-amber-100 via-orange-50 to-yellow-100',
      ring: 'focus-visible:ring-amber-400',
    };
  }

  // Por defecto (Índigo suave)
  return {
    bg: 'bg-indigo-50',
    cardBg: 'bg-indigo-100/70',
    border: 'border-indigo-200',
    badge: 'bg-indigo-200 text-indigo-950',
    badgeSecondary: 'bg-violet-100 text-violet-900',
    accent: 'text-indigo-950',
    banner: 'from-indigo-100 via-purple-50 to-blue-100',
    ring: 'focus-visible:ring-indigo-400',
  };
}
