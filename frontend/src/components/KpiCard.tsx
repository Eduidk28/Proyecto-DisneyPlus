import { Card, CardContent, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface KpiCardProps {
  titulo: string
  valor: number | string
  icono: ReactNode
}

export default function KpiCard({ titulo, valor, icono }: KpiCardProps) {
  return (
    <Card>
      <CardContent>
        {icono}
        <Typography color="text.secondary">{titulo}</Typography>
        <Typography variant="h4">{valor}</Typography>
      </CardContent>
    </Card>
  )
}
