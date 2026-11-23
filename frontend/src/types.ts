import type { ReactNode } from 'react'

/** Registro del archivo data/disney_plus_titles.json (Sprint 1) */
export interface Titulo {
  show_id: string
  type: 'Movie' | 'TV Show'
  title: string
  director: string | null
  cast: string | null
  country: string | null
  date_added: string | null
  release_year: number
  rating: string | null
  duration: string
  listed_in: string
  description: string
  duration_minutes: number | null
  seasons: number | null
}

/** Registro con géneros y países ya convertidos a arreglos y traducidos al español */
export interface TituloCat extends Titulo {
  generos: string[]
  paises: string[]
}

export type PaginaId = 'inicio' | 'contenido' | 'audiencia' | 'evolucion' | 'catalogos'

export interface NavItemData {
  id: PaginaId
  label: string
  icon: ReactNode
}

export interface Filtros {
  tipo: string
  anio: string
  genero: string
}
export type FiltroId = keyof Filtros

export interface FilterConfig {
  id: FiltroId
  label: string
  options: string[]
}

export interface KpiItem {
  label: string
  shortLabel?: string
  value: number | string
  helper?: string
  icon: ReactNode
}

export interface PuntoLinea {
  label: string
  value: number
}
export interface SerieLinea {
  name: string
  color: string
  data: PuntoLinea[]
}
export interface Anotacion {
  index: number
  texto: string
}
export interface DatoDona {
  name: string
  value: number
  color: string
}
export interface ItemBarra {
  label: string
  value: number
  muted?: boolean
}
export interface ItemApilado {
  label: string
  segmentos: { name: string; color: string; value: number }[]
}
export interface CeldaGrafico {
  key: string
  span: 4 | 6 | 8 | 12
  node: ReactNode
}

export type ClaveOrden = 'titulo' | 'tipo' | 'anio' | 'genero' | 'pais' | 'clasificacion' | 'fecha'
export type Direccion = 'asc' | 'desc'

export interface ColumnaTabla {
  key: ClaveOrden
  label: string
  align?: 'right'
}
export interface FilaTabla {
  id: string
  titulo: string
  tipo: 'Película' | 'Serie'
  anio: number
  generos: string[]
  paises: string[]
  clasificacion: string
  fecha: string
}
