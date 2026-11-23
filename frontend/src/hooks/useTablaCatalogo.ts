import { useMemo, useState } from 'react'
import type { ClaveOrden, Direccion, FiltroId, Filtros, TituloCat } from '../types'
import { FILTROS_INICIALES, aFilas, aplicarFiltros, buscarPorTitulo, ordenar } from '../utils/datos'

/**
 * Estado de la tabla "Detalle de títulos": filtros, búsqueda, orden y paginación.
 * Los filtros aplican solo a la tabla (los KPI y gráficos siempre muestran el catálogo completo).
 */
export function useTablaCatalogo(data: TituloCat[]) {
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_INICIALES)
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState<{ clave: ClaveOrden | null; dir: Direccion }>({ clave: null, dir: 'asc' })
  const [pagina, setPagina] = useState(0)
  const [filasPorPagina, setFilasPorPagina] = useState(10)

  const resultados = useMemo(
    () => ordenar(buscarPorTitulo(aplicarFiltros(data, filtros), busqueda), orden.clave, orden.dir),
    [data, filtros, busqueda, orden],
  )

  const ultimaPagina = Math.max(0, Math.ceil(resultados.length / filasPorPagina) - 1)
  const paginaActual = Math.min(pagina, ultimaPagina)
  const filas = useMemo(
    () => aFilas(resultados.slice(paginaActual * filasPorPagina, (paginaActual + 1) * filasPorPagina)),
    [resultados, paginaActual, filasPorPagina],
  )

  const cambiarFiltro = (id: FiltroId, valor: string) => {
    setFiltros((previos) => ({ ...previos, [id]: valor }))
    setPagina(0)
  }
  const cambiarBusqueda = (texto: string) => {
    setBusqueda(texto)
    setPagina(0)
  }
  const cambiarOrden = (clave: ClaveOrden) => {
    setOrden((previo) => ({
      clave,
      dir: previo.clave === clave && previo.dir === 'asc' ? 'desc' : 'asc',
    }))
    setPagina(0)
  }
  const cambiarFilasPorPagina = (n: number) => {
    setFilasPorPagina(n)
    setPagina(0)
  }
  const reiniciar = () => {
    setFiltros(FILTROS_INICIALES)
    setBusqueda('')
    setPagina(0)
  }

  return {
    filtros, cambiarFiltro, busqueda, cambiarBusqueda, orden, cambiarOrden,
    pagina: paginaActual, setPagina, filasPorPagina, cambiarFilasPorPagina,
    reiniciar, total: resultados.length, filas,
  }
}
