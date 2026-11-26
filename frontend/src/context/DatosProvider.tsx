import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { Alert, Box, CircularProgress } from '@mui/material'
import useFetchData from '../hooks/useFetchData'
import { crearCatalogo } from '../data/titulos'
import { calcularAgregados } from '../utils/agregados'
import { DatosContext } from './datosContext'

interface DatosProviderProps {
  children: ReactNode
}

/** Recupera los datos desde Firebase y los entrega a toda la app, con los agregados calculados una sola vez */
export default function DatosProvider({ children }: DatosProviderProps) {
  const { titulos, cargando, error } = useFetchData()

  const valor = useMemo(() => {
    if (titulos.length === 0) return null
    const catalogo = crearCatalogo(titulos)
    return { titulos: catalogo, agregados: calcularAgregados(catalogo) }
  }, [titulos])

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || valor === null) {
    return (
      <Alert severity="error" sx={{ m: 3 }}>
        {error ?? 'No se encontraron registros en Firebase.'}
      </Alert>
    )
  }

  return <DatosContext.Provider value={valor}>{children}</DatosContext.Provider>
}
