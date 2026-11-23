import { useEffect, useState } from 'react'
import type { PaginaId } from '../types'

const PAGINAS: PaginaId[] = ['inicio', 'contenido', 'audiencia', 'evolucion', 'catalogos']

function leerHash(): PaginaId {
  const ruta = window.location.hash.replace(/^#\/?/, '')
  return (PAGINAS as string[]).includes(ruta) ? (ruta as PaginaId) : 'inicio'
}

/**
 * Página activa guardada en la URL (#/catalogos): hay botón "atrás" y se pueden compartir enlaces.
 * No necesita librerías externas.
 */
export function usePaginaHash() {
  const [pagina, setPagina] = useState<PaginaId>(leerHash)

  useEffect(() => {
    const alCambiar = () => {
      setPagina(leerHash())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])

  const navegar = (id: PaginaId) => {
    window.location.hash = `/${id}`
  }

  return { pagina, navegar }
}
