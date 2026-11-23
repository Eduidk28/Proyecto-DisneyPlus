import { Box } from '@mui/material'
import type { CeldaGrafico } from '../../types'

interface ChartGridProps {
  cells: CeldaGrafico[]
}

/** Rejilla de 12 columnas: cada tarjeta ocupa 4, 6, 8 o 12; en móvil se apilan a todo el ancho */
export default function ChartGrid({ cells }: ChartGridProps) {
  return (
    <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' } }}>
      {cells.map((c) => (
        <Box key={c.key} sx={{ minWidth: 0, gridColumn: { xs: '1 / -1', md: `span ${c.span}` } }}>
          {c.node}
        </Box>
      ))}
    </Box>
  )
}
