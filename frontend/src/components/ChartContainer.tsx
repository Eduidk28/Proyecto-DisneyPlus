import { Paper, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface ChartContainerProps {
  titulo: string
  children?: ReactNode
}

export default function ChartContainer({ titulo, children }: ChartContainerProps) {
  return (
    <Paper sx={{ p: 2, minHeight: 220 }}>
      <Typography variant="h6" gutterBottom>{titulo}</Typography>
      {children ?? <Typography color="text.secondary">Gráfico (Sprint 3)</Typography>}
    </Paper>
  )
}
