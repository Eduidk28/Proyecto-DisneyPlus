import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { catalogo } from '../data/titulos'
import { calcularAgregados } from '../utils/agregados'
import { DatosContext } from './datosContext'

interface DatosProviderProps {
  children: ReactNode
}

/** Entrega los datos y los agregados a toda la app, calculados una sola vez */
export default function DatosProvider({ children }: DatosProviderProps) {
  const valor = useMemo(() => ({ titulos: catalogo, agregados: calcularAgregados(catalogo) }), [])
  return <DatosContext.Provider value={valor}>{children}</DatosContext.Provider>
}
