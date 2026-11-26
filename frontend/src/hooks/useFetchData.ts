import { useEffect, useState } from 'react'
import { obtenerTitulos, RUTA_TITULOS } from '../services/tituloService'
import type { Titulo } from '../types'

export default function useFetchData() {
  const [titulos, setTitulos] = useState<Titulo[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function cargarDatos() {
      try {
        const datos = await obtenerTitulos(RUTA_TITULOS)
        if (datos === null) {
          setError('La base de datos no contiene registros.')
        } else {
          setTitulos(datos)
        }
      } catch {
        setError('No se pudieron recuperar los datos desde Firebase.')
      } finally {
        setCargando(false)
      }
    }

    cargarDatos()
  }, [])

  return { titulos, cargando, error }
}
