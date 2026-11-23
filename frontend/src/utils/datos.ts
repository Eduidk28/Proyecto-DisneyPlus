import type {
  ClaveOrden, Direccion, FilaTabla, FilterConfig, Filtros, ItemBarra, Titulo, TituloCat,
} from '../types'

export const FILTROS_INICIALES: Filtros = { tipo: 'Todos', anio: 'Todos', genero: 'Todos' }

export const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]
export const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

/** 1450 -> "1.450" (mismo formato en KPI, gráficos y tabla) */
export const fmt = (n: number): string => n.toLocaleString('de-DE')

/** Porcentaje con una decimal y coma: 72,6 */
export const pct = (valor: number, total: number): string =>
  total === 0
    ? '0,0'
    : ((valor / total) * 100).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

export const esPelicula = (t: Titulo): boolean => t.type === 'Movie'

export function dividirLista(texto: string | null): string[] {
  if (!texto) return []
  return texto.split(',').map((x) => x.trim()).filter((x) => x.length > 0)
}

export function unirConY(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`
}

/** Cuenta repeticiones y ordena de mayor a menor */
export function contar(items: string[]): ItemBarra[] {
  const mapa = new Map<string, number>()
  items.forEach((i) => mapa.set(i, (mapa.get(i) ?? 0) + 1))
  return [...mapa.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
}

export function anioAgregado(t: Titulo): number | null {
  return t.date_added ? Number(t.date_added.slice(0, 4)) : null
}

/** "2021-11-26" -> "26 de noviembre de 2021" */
export function formatearFecha(iso: string | null): string {
  if (!iso) return '—'
  const [a, m, d] = iso.split('-').map(Number)
  return `${d} de ${MESES[m - 1]} de ${a}`
}

/** "2021-11-26" -> "26 nov 2021" */
export function formatearFechaCorta(iso: string | null): string {
  if (!iso) return '—'
  const [a, m, d] = iso.split('-').map(Number)
  return `${d} ${MESES_CORTOS[m - 1]} ${a}`
}

export function fechaCorte(data: Titulo[]): string {
  const fechas = data.map((t) => t.date_added).filter((f): f is string => f !== null)
  if (fechas.length === 0) return '—'
  return formatearFecha(fechas.reduce((a, b) => (a > b ? a : b)))
}

/** "octubre de 2019 a noviembre de 2021" */
export function rangoIncorporacion(data: Titulo[]): string {
  const fechas = data.map((t) => t.date_added).filter((f): f is string => f !== null).sort()
  if (fechas.length === 0) return ''
  const mesAnio = (iso: string) => {
    const [a, m] = iso.split('-').map(Number)
    return `${MESES[m - 1]} de ${a}`
  }
  return `${mesAnio(fechas[0])} a ${mesAnio(fechas[fechas.length - 1])}`
}

// ---------- filtros de la tabla ----------
export function aplicarFiltros(data: TituloCat[], f: Filtros): TituloCat[] {
  return data.filter((t) => {
    if (f.tipo === 'Película' && t.type !== 'Movie') return false
    if (f.tipo === 'Serie' && t.type !== 'TV Show') return false
    if (f.anio !== 'Todos' && String(t.release_year) !== f.anio) return false
    if (f.genero !== 'Todos' && !t.generos.includes(f.genero)) return false
    return true
  })
}

export function buscarPorTitulo(data: TituloCat[], texto: string): TituloCat[] {
  const q = texto.trim().toLowerCase()
  return q === '' ? data : data.filter((t) => t.title.toLowerCase().includes(q))
}

export function contarFiltrosActivos(f: Filtros): number {
  return [f.tipo, f.anio, f.genero].filter((v) => v !== 'Todos').length
}

/** Los tres filtros, con las mismas etiquetas en todas las páginas */
export function crearFiltros(data: TituloCat[]): FilterConfig[] {
  const anios = [...new Set(data.map((t) => t.release_year))].sort((a, b) => b - a).map(String)
  const generos = [...new Set(data.flatMap((t) => t.generos))].sort((a, b) => a.localeCompare(b, 'es'))
  return [
    { id: 'tipo', label: 'Tipo', options: ['Todos', 'Película', 'Serie'] },
    { id: 'anio', label: 'Año de estreno', options: ['Todos', ...anios] },
    { id: 'genero', label: 'Género', options: ['Todos', ...generos] },
  ]
}

export function ordenar(data: TituloCat[], clave: ClaveOrden | null, dir: Direccion): TituloCat[] {
  if (clave === null) return data
  const signo = dir === 'asc' ? 1 : -1
  const valor = (t: TituloCat): string | number => {
    switch (clave) {
      case 'titulo': return t.title.toLowerCase()
      case 'tipo': return t.type
      case 'anio': return t.release_year
      case 'genero': return (t.generos[0] ?? '').toLowerCase()
      case 'pais': return (t.paises[0] ?? '').toLowerCase()
      case 'clasificacion': return t.rating ?? ''
      case 'fecha': return t.date_added ?? ''
    }
  }
  return [...data].sort((a, b) => {
    const va = valor(a)
    const vb = valor(b)
    return va === vb ? 0 : (va > vb ? 1 : -1) * signo
  })
}

export function aFilas(data: TituloCat[]): FilaTabla[] {
  return data.map((t) => ({
    id: t.show_id,
    titulo: t.title,
    tipo: esPelicula(t) ? 'Película' : 'Serie',
    anio: t.release_year,
    generos: t.generos,
    paises: t.paises,
    clasificacion: t.rating ?? '—',
    fecha: formatearFechaCorta(t.date_added),
  }))
}
