import { useContext } from 'react'
import { DatosContext } from '../context/datosContext'

export function useDatos() {
  const valor = useContext(DatosContext)
  if (valor === null) throw new Error('useDatos debe usarse dentro de <DatosProvider>')
  return valor
}
