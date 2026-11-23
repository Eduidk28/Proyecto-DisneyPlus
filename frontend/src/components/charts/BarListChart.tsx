import { Box, Typography } from '@mui/material'
import type { ItemBarra } from '../../types'
import { colores } from '../../tokens'
import { fmt, pct } from '../../utils/datos'

interface BarListChartProps {
  items: ItemBarra[]
  maxItems?: number
  /** Si se indica, cada valor muestra su porcentaje sobre este total */
  total?: number
}

/** Ranking de barras horizontales. Los elementos "muted" (p. ej. Otros) van en gris. */
export default function BarListChart({ items, maxItems = 6, total }: BarListChartProps) {
  const visibles = items.slice(0, maxItems)
  const max = Math.max(1, ...visibles.map((i) => i.value))

  if (visibles.length === 0) {
    return <Typography variant="body2" color="text.secondary">Sin datos para mostrar.</Typography>
  }

  return (
    <Box
      role="img"
      aria-label={`Gráfico de barras. ${visibles.map((i) => `${i.label}: ${fmt(i.value)}`).join(', ')}`}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {visibles.map((i) => (
        <Box
          key={i.label}
          sx={{ display: 'grid', gridTemplateColumns: { xs: '104px 1fr auto', md: '120px 1fr auto' }, alignItems: 'center', gap: 1.5 }}
        >
          <Typography variant="caption" color="text.secondary" noWrap title={i.label}>{i.label}</Typography>
          <Box sx={{ height: 8, borderRadius: 4, bgcolor: colores.superficie2, overflow: 'hidden' }}>
            <Box
              sx={{
                height: '100%',
                width: `${(i.value / max) * 100}%`,
                borderRadius: 4,
                background: i.muted ? colores.otros : `linear-gradient(90deg, ${colores.rampa[1]}, ${colores.rampa[2]})`,
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ fontWeight: 600, textAlign: 'right', minWidth: 48 }}>
            {fmt(i.value)}
            {total !== undefined && ` · ${pct(i.value, total)} %`}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
