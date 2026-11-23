import type { Anotacion, DatoDona, ItemApilado, ItemBarra, SerieLinea, TituloCat } from '../types'
import { colores } from '../tokens'
import {
  MESES, MESES_CORTOS, anioAgregado, contar, esPelicula, fechaCorte, rangoIncorporacion,
} from './datos'

const CAMPOS_CON_NULOS = ['director', 'cast', 'country', 'date_added', 'rating'] as const

/** Años de incorporación presentes en los datos, ordenados */
function aniosAgregados(data: TituloCat[]): number[] {
  const anios = data.map(anioAgregado).filter((a): a is number => a !== null)
  return [...new Set(anios)].sort((a, b) => a - b)
}

/** "oct–dic", "ene–dic" o "año completo" según los meses con datos de ese año */
function rangoMeses(data: TituloCat[], anio: number): string {
  const meses = data
    .filter((t) => anioAgregado(t) === anio && t.date_added)
    .map((t) => Number((t.date_added as string).slice(5, 7)))
  if (meses.length === 0) return ''
  const min = Math.min(...meses)
  const max = Math.max(...meses)
  return min === 1 && max === 12 ? 'año completo' : `${MESES_CORTOS[min - 1]}–${MESES_CORTOS[max - 1]}`
}

/** Serie mensual continua (un punto por mes) con anotaciones del lanzamiento y del mes parcial */
function calcularMensual(data: TituloCat[]) {
  const porMes = new Map<string, number>()
  data.forEach((t) => {
    if (t.date_added) {
      const clave = t.date_added.slice(0, 7)
      porMes.set(clave, (porMes.get(clave) ?? 0) + 1)
    }
  })
  const claves = [...porMes.keys()].sort()
  if (claves.length === 0) {
    return { serie: [] as SerieLinea[], anotaciones: [] as Anotacion[], mesPico: null as { texto: string; total: number } | null }
  }
  const ultima = claves[claves.length - 1]
  const meses: string[] = []
  let [y, m] = claves[0].split('-').map(Number)
  for (;;) {
    const clave = `${y}-${String(m).padStart(2, '0')}`
    meses.push(clave)
    if (clave >= ultima) break
    m += 1
    if (m > 12) { m = 1; y += 1 }
  }
  const puntos = meses.map((clave) => {
    const [a, mes] = clave.split('-').map(Number)
    return { label: `${MESES_CORTOS[mes - 1]} ${String(a).slice(2)}`, value: porMes.get(clave) ?? 0 }
  })
  const anotaciones: Anotacion[] = []
  const idxLanzamiento = meses.indexOf('2019-11')
  if (idxLanzamiento >= 0) anotaciones.push({ index: idxLanzamiento, texto: 'Lanzamiento' })
  if (meses.length > 1) anotaciones.push({ index: meses.length - 1, texto: 'Parcial' })
  const pico = [...porMes.entries()].sort((a, b) => b[1] - a[1])[0]
  const [ap, mp] = pico[0].split('-').map(Number)
  return {
    serie: [{ name: 'Títulos añadidos', color: colores.rampa[2], data: puntos }],
    anotaciones,
    mesPico: { texto: `${MESES[mp - 1]} de ${ap}`, total: pico[1] },
  }
}

/** Todos los datos que muestran los KPI y gráficos. Se calcula una sola vez. */
export function calcularAgregados(data: TituloCat[]) {
  const total = data.length
  const pelis = data.filter(esPelicula)
  const peliculas = pelis.length
  const series = total - peliculas

  // Duración de películas
  const mins = pelis
    .map((t) => t.duration_minutes)
    .filter((m): m is number => m !== null)
    .sort((a, b) => a - b)
  const promedio = mins.length === 0 ? null : mins.reduce((a, b) => a + b, 0) / mins.length
  const medio = Math.floor(mins.length / 2)
  const mediana = mins.length === 0 ? null : mins.length % 2 === 0 ? (mins[medio - 1] + mins[medio]) / 2 : mins[medio]
  const rangosDuracion: ItemBarra[] = [
    { label: 'Menos de 60 min', value: mins.filter((m) => m < 60).length },
    { label: '60 a 89 min', value: mins.filter((m) => m >= 60 && m < 90).length },
    { label: '90 a 119 min', value: mins.filter((m) => m >= 90 && m < 120).length },
    { label: '120 min o más', value: mins.filter((m) => m >= 120).length },
  ]

  // Década de estreno
  const estrenos = data.map((t) => t.release_year)
  const desde = estrenos.length === 0 ? 0 : Math.min(...estrenos)
  const hasta = estrenos.length === 0 ? 0 : Math.max(...estrenos)
  const puntosDecada = []
  for (let d = Math.floor(desde / 10) * 10; estrenos.length > 0 && d <= hasta; d += 10) {
    puntosDecada.push({
      label: `${d}s`,
      value: data.filter((t) => Math.floor(t.release_year / 10) * 10 === d).length,
    })
  }
  const porDecada: SerieLinea[] = [{ name: 'Títulos', color: colores.rampa[2], data: puntosDecada }]

  const tipo: DatoDona[] = [
    { name: 'Películas', value: peliculas, color: colores.pelicula },
    { name: 'Series', value: series, color: colores.serie },
  ]

  const generos = contar(data.flatMap((t) => t.generos)).slice(0, 6)

  const conteoPaises = contar(data.flatMap((t) => t.paises))
  const conPais = data.filter((t) => t.paises.length > 0).length
  const paises = {
    items: conteoPaises.slice(0, 6),
    conPais,
    sinPais: total - conPais,
    primero: conteoPaises[0] ?? null,
  }

  // Clasificación por edad
  const clasificaciones = contar(data.map((t) => t.rating).filter((r): r is string => r !== null))
  const conClasificacion = clasificaciones.reduce((a, i) => a + i.value, 0)
  const principales = clasificaciones.slice(0, 5)
  const resto = clasificaciones.slice(5)
  const clasifBarras: ItemBarra[] = [...principales]
  if (resto.length > 0) {
    clasifBarras.push({ label: 'Otros', value: resto.reduce((a, i) => a + i.value, 0), muted: true })
  }
  const clasifOtros = resto.map((i) => i.label).join(', ')

  const clasifPorTipo: ItemApilado[] = clasificaciones.map((c) => ({
    label: c.label,
    segmentos: [
      { name: 'Películas', color: colores.pelicula, value: pelis.filter((t) => t.rating === c.label).length },
      { name: 'Series', color: colores.serie, value: data.filter((t) => !esPelicula(t) && t.rating === c.label).length },
    ],
  }))

  // Evolución
  const mensual = calcularMensual(data)
  const anios = aniosAgregados(data)
  const porAnio: SerieLinea[] = [
    {
      name: 'Películas',
      color: colores.pelicula,
      data: anios.map((a) => ({ label: String(a), value: pelis.filter((t) => anioAgregado(t) === a).length })),
    },
    {
      name: 'Series',
      color: colores.serie,
      data: anios.map((a) => ({
        label: String(a),
        value: data.filter((t) => !esPelicula(t) && anioAgregado(t) === a).length,
      })),
    },
  ]
  const ultimosAnios = anios.slice(-3).map((a) => ({
    anio: a,
    total: data.filter((t) => anioAgregado(t) === a).length,
    meses: rangoMeses(data, a),
  }))

  const soloSeries = data.filter((t) => !esPelicula(t))
  const cuenta = (min: number, max: number) =>
    soloSeries.filter((t) => (t.seasons ?? 0) >= min && (t.seasons ?? 0) <= max).length
  const temporadas: SerieLinea[] = [{
    name: 'Series',
    color: colores.rampa[2],
    data: [
      { label: '1', value: cuenta(1, 1) },
      { label: '2', value: cuenta(2, 2) },
      { label: '3', value: cuenta(3, 3) },
      { label: '4', value: cuenta(4, 4) },
      { label: '5+', value: cuenta(5, Infinity) },
    ],
  }]

  const peliculasPorClasif = contar(pelis.map((t) => t.rating).filter((r): r is string => r !== null))

  // Valores faltantes (para "Acerca del dataset")
  const nulos = Object.fromEntries(
    CAMPOS_CON_NULOS.map((campo) => [campo, data.filter((t) => t[campo] === null).length]),
  ) as Record<(typeof CAMPOS_CON_NULOS)[number], number>

  return {
    total, peliculas, series,
    duracion: { promedio, mediana },
    rangosDuracion,
    porDecada, desde, hasta,
    tipo, generos, paises,
    clasifBarras, conClasificacion, clasifOtros, clasifPorTipo,
    topClasificacion: clasificaciones[0] ?? null,
    nClasificaciones: clasificaciones.length,
    sinClasificacion: total - conClasificacion,
    mensual, porAnio, ultimosAnios, temporadas, peliculasPorClasif,
    nulos,
    corte: fechaCorte(data),
    rango: rangoIncorporacion(data),
  }
}

export type Agregados = ReturnType<typeof calcularAgregados>
