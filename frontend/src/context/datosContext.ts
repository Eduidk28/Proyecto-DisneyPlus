import { createContext } from 'react'
import type { TituloCat } from '../types'
import type { Agregados } from '../utils/agregados'

export interface DatosContextValue {
  titulos: TituloCat[]
  agregados: Agregados
}

export const DatosContext = createContext<DatosContextValue | null>(null)
