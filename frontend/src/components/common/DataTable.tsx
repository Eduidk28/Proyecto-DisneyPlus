import { useState } from 'react'
import {
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
  TableRow, TableSortLabel, Typography,
} from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import type { ReactNode } from 'react'
import type { ClaveOrden, ColumnaTabla, Direccion, FilaTabla } from '../../types'
import { useEsMovil } from '../../hooks/useEsMovil'
import { colores } from '../../tokens'
import GenreChips from './GenreChips'
import TypeBadge from './TypeBadge'

interface DataTableProps {
  title?: string
  subtitle?: string
  toolbar: ReactNode
  columns: ColumnaTabla[]
  rows: FilaTabla[]
  totalCount: number
  page: number
  rowsPerPage: number
  onPageChange: (pagina: number) => void
  onRowsPerPageChange: (n: number) => void
  sortKey: ClaveOrden | null
  sortDir: Direccion
  onSort: (clave: ClaveOrden) => void
  onReset: () => void
}

const Vacio = () => <Box component="span" sx={{ color: colores.texto3 }}>—</Box>

function textoPaises(paises: string[]) {
  return paises.length === 0 ? <Vacio /> : (
    <Box component="span" title={paises.join(', ')} sx={{ display: 'block', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      {paises.join(', ')}
    </Box>
  )
}

/** Móvil: lista de tarjetas con título, etiqueta, año y géneros; el resto en un detalle expandible */
function ListaMovil({ rows }: { rows: FilaTabla[] }) {
  const [abierta, setAbierta] = useState<string | null>(null)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {rows.map((r) => {
        const expandida = abierta === r.id
        return (
          <Box key={r.id} sx={{ p: 2, borderRadius: 2, border: `1px solid ${colores.borde}`, bgcolor: colores.superficie2 }}>
            <Typography sx={{ fontWeight: 600 }}>{r.titulo}</Typography>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <TypeBadge type={r.tipo} />
              <Typography variant="caption" color="text.secondary">{r.anio}</Typography>
            </Box>
            <Box sx={{ mt: 1 }}><GenreChips generos={r.generos} /></Box>
            <Button
              size="small"
              onClick={() => setAbierta(expandida ? null : r.id)}
              endIcon={expandida ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              aria-expanded={expandida}
              sx={{ mt: 1, minHeight: 44, px: 0 }}
            >
              {expandida ? 'Ocultar detalle' : 'Ver detalle'}
            </Button>
            {expandida && (
              <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 2, rowGap: 0.5 }}>
                <Typography component="dt" variant="caption" color="text.secondary">País</Typography>
                <Typography component="dd" variant="body2" sx={{ m: 0 }}>{r.paises.length === 0 ? '—' : r.paises.join(', ')}</Typography>
                <Typography component="dt" variant="caption" color="text.secondary">Clasificación</Typography>
                <Typography component="dd" variant="body2" sx={{ m: 0 }}>{r.clasificacion}</Typography>
                <Typography component="dt" variant="caption" color="text.secondary">Incorporación</Typography>
                <Typography component="dd" variant="body2" sx={{ m: 0 }}>{r.fecha}</Typography>
              </Box>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default function DataTable({
  title = 'Detalle de títulos',
  subtitle = 'Los filtros aplican a esta tabla',
  toolbar, columns, rows, totalCount, page, rowsPerPage, onPageChange, onRowsPerPageChange,
  sortKey, sortDir, onSort, onReset,
}: DataTableProps) {
  const esMovil = useEsMovil()

  return (
    <Paper sx={{ p: { xs: 2.5, md: 3 }, minWidth: 0 }}>
      <Typography component="h2" sx={{ fontWeight: 600, fontSize: { xs: 16, md: 20 } }}>{title}</Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, mb: 3 }}>{subtitle}</Typography>

      {toolbar}

      <Box sx={{ mt: 3 }}>
        {totalCount === 0 ? (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Typography sx={{ fontWeight: 600 }}>Ningún título coincide con tus filtros</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Prueba con otra combinación o quita algún filtro.
            </Typography>
            <Button variant="outlined" onClick={onReset} sx={{ mt: 2, minHeight: 44 }}>Restablecer filtros</Button>
          </Box>
        ) : esMovil ? (
          <ListaMovil rows={rows} />
        ) : (
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 960 }}>
              <TableHead>
                <TableRow>
                  {columns.map((c) => (
                    <TableCell
                      key={c.key}
                      align={c.align}
                      sortDirection={sortKey === c.key ? sortDir : false}
                      sx={{ color: colores.texto3, fontSize: 12, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', borderColor: 'divider' }}
                    >
                      <TableSortLabel
                        active={sortKey === c.key}
                        direction={sortKey === c.key ? sortDir : 'asc'}
                        onClick={() => onSort(c.key)}
                      >
                        {c.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id} hover sx={{ height: 48 }}>
                    <TableCell sx={{ borderColor: 'divider', fontWeight: 600, maxWidth: 280 }}>
                      <Box component="span" title={r.titulo} sx={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {r.titulo}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderColor: 'divider' }}><TypeBadge type={r.tipo} /></TableCell>
                    <TableCell align="right" sx={{ borderColor: 'divider' }}>{r.anio}</TableCell>
                    <TableCell sx={{ borderColor: 'divider' }}><GenreChips generos={r.generos} /></TableCell>
                    <TableCell sx={{ borderColor: 'divider' }}>{textoPaises(r.paises)}</TableCell>
                    <TableCell sx={{ borderColor: 'divider' }}>{r.clasificacion === '—' ? <Vacio /> : r.clasificacion}</TableCell>
                    <TableCell sx={{ borderColor: 'divider', whiteSpace: 'nowrap' }}>{r.fecha === '—' ? <Vacio /> : r.fecha}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {totalCount > 0 && (
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={(_: unknown, nueva: number) => onPageChange(nueva)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e: { target: { value: string } }) => onRowsPerPageChange(Number(e.target.value))}
            rowsPerPageOptions={esMovil ? [] : [10, 25, 50]}
            labelRowsPerPage="Filas por página"
            labelDisplayedRows={({ from, to, count }: { from: number; to: number; count: number }) => `${from}–${to} de ${count}`}
            sx={{ borderTop: `1px solid ${colores.borde}`, mt: 1 }}
          />
        )}
      </Box>
    </Paper>
  )
}
