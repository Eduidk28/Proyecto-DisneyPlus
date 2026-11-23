import datos from '../../../data/disney_plus_titles.json'
import type { Titulo, TituloCat } from '../types'
import { dividirLista } from '../utils/datos'
import { traducirGenero, traducirPais } from '../utils/traducciones'

// El JSON se lee directamente desde la carpeta data/ de la raíz (resultado del Sprint 1)
export const titulosCrudos = datos as unknown as Titulo[]

// Géneros y países se convierten una sola vez en arreglos traducidos (no se hace split en cada render)
export const catalogo: TituloCat[] = titulosCrudos.map((t) => ({
  ...t,
  generos: dividirLista(t.listed_in).map(traducirGenero),
  paises: dividirLista(t.country).map(traducirPais),
}))
