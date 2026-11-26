import type { Titulo, TituloCat } from '../types'
import { dividirLista } from '../utils/datos'
import { traducirGenero, traducirPais } from '../utils/traducciones'

// Géneros y países se convierten una sola vez en arreglos traducidos (no se hace split en cada render)
export function crearCatalogo(titulos: Titulo[]): TituloCat[] {
  return titulos.map((t) => ({
    ...t,
    generos: dividirLista(t.listed_in).map(traducirGenero),
    paises: dividirLista(t.country).map(traducirPais),
  }))
}
