import { Box, Typography } from '@mui/material'
import type { ItemApilado } from '../../types'
import { colores } from '../../tokens'
import { fmt } from '../../utils/datos'

interface StackedBarChartProps {
  items: ItemApilado[]
}

/** Barras horizontales apiladas: cada fila se divide entre Películas y Series */
export default function StackedBarChart({ items }: StackedBarChartProps) {
  const totales = items.map((i) => i.segmentos.reduce((a, s) => a + s.value, 0))
  const max = Math.max(1, ...totales)
  const leyenda = items[0]?.segmentos ?? []

  if (items.length === 0) {
    return <Typography variant="body2" color="text.secondary">Sin datos para mostrar.</Typography>
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {leyenda.map((s) => (
          <Box key={s.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: 0.5, bgcolor: s.color }} />
            <Typography variant="caption" color="text.secondary">{s.name}</Typography>
          </Box>
        ))}
      </Box>
      <Box
        role="img"
        aria-label={`Gráfico de barras apiladas. ${items.map((i) => `${i.label}: ${i.segmentos.map((s) => `${s.name} ${fmt(s.value)}`).join(', ')}`).join('. ')}`}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {items.map((i, idx) => (
          <Box key={i.label} sx={{ display: 'grid', gridTemplateColumns: '72px 1fr 48px', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="caption" color="text.secondary">{i.label}</Typography>
            <Box sx={{ display: 'flex', height: 8, width: `${(totales[idx] / max) * 100}%`, borderRadius: 4, overflow: 'hidden', bgcolor: colores.superficie2 }}>
              {i.segmentos.map((s) => (
                <Box
                  key={s.name}
                  title={`${s.name}: ${fmt(s.value)}`}
                  sx={{ width: `${totales[idx] === 0 ? 0 : (s.value / totales[idx]) * 100}%`, bgcolor: s.color }}
                />
              ))}
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 600, textAlign: 'right' }}>{fmt(totales[idx])}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
