import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography,
} from '@mui/material'
import type { Titulo } from '../data/titulos'

interface DataTableProps {
  titulo: string
  filas: Titulo[]
  total: number
}

export default function DataTable({ titulo, filas, total }: DataTableProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">{titulo}</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Mostrando {filas.length} de {total} títulos
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Clasificación</TableCell>
              <TableCell>Duración</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filas.map((f) => (
              <TableRow key={f.show_id}>
                <TableCell>{f.title}</TableCell>
                <TableCell>{f.type}</TableCell>
                <TableCell>{f.release_year}</TableCell>
                <TableCell>{f.rating ?? '—'}</TableCell>
                <TableCell>{f.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
