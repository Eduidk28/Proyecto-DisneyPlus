import { useMemo } from 'react'
import { Box } from '@mui/material'
import { useDatos } from '../hooks/useDatos'
import { useTablaCatalogo } from '../hooks/useTablaCatalogo'
import { crearFiltros } from '../utils/datos'
import PageHeader from '../components/common/PageHeader'
import FilterBar from '../components/common/FilterBar'
import DataTable from '../components/common/DataTable'
import { COLUMNAS_TABLA } from './columnas'

export default function CatalogsPage() {
  const { titulos, agregados } = useDatos()
  const tabla = useTablaCatalogo(titulos)
  const configFiltros = useMemo(() => crearFiltros(titulos), [titulos])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <PageHeader
        eyebrow="CATÁLOGOS"
        title="Detalle de títulos"
        subtitle="Filtra, busca y ordena el catálogo completo de películas y series de Disney+."
        cutoffDate={agregados.corte}
      />
      <DataTable
        title="Catálogo filtrable"
        subtitle="Los filtros y la búsqueda aplican sobre todos los registros cargados"
        columns={COLUMNAS_TABLA}
        rows={tabla.filas}
        totalCount={tabla.total}
        page={tabla.pagina}
        rowsPerPage={tabla.filasPorPagina}
        onPageChange={tabla.setPagina}
        onRowsPerPageChange={tabla.cambiarFilasPorPagina}
        sortKey={tabla.orden.clave}
        sortDir={tabla.orden.dir}
        onSort={tabla.cambiarOrden}
        onReset={tabla.reiniciar}
        toolbar={
          <FilterBar
            filters={configFiltros}
            values={tabla.filtros}
            onChange={tabla.cambiarFiltro}
            onReset={tabla.reiniciar}
            searchValue={tabla.busqueda}
            onSearchChange={tabla.cambiarBusqueda}
            resultCount={tabla.total}
            totalCount={titulos.length}
          />
        }
      />
    </Box>
  )
}
