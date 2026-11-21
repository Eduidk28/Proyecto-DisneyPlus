import datos from '../../../data/disney_plus_titles.json'

export interface Titulo {
  show_id: string
  type: 'Movie' | 'TV Show'
  title: string
  release_year: number
  rating: string | null
  duration: string
  listed_in: string
}

export const titulos = datos as unknown as Titulo[]
