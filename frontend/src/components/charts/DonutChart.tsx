import { Box, Typography } from '@mui/material'
import type { DatoDona } from '../../types'
import { colores } from '../../tokens'
import { fmt, pct } from '../../utils/datos'

interface DonutChartProps {
  data: DatoDona[]
  total: number
  centerLabel?: string
}

const R = 60
const C = 2 * Math.PI * R

/** Anillo para proporciones de 2 categorías (Película vs Serie) */
export default function DonutChart({ data, total, centerLabel = 'títulos' }: DonutChartProps) {
  const suma = data.reduce((a, d) => a + d.value, 0)
  const largoDe = (valor: number) => (suma === 0 ? 0 : (valor / suma) * C)
  const conValor = data.filter((d) => d.value > 0)
  const segmentos = conValor.map((d, i) => ({
    ...d,
    largo: largoDe(d.value),
    desfase: conValor.slice(0, i).reduce((a, x) => a + largoDe(x.value), 0),
  }))
  const descripcion = data.map((d) => `${d.name}: ${fmt(d.value)} (${pct(d.value, suma)} %)`).join(', ')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5 }}>
      <svg viewBox="0 0 160 160" width={160} height={160} role="img" aria-label={`Gráfico de anillo. ${descripcion}`}>
        <circle cx={80} cy={80} r={R} fill="none" stroke={colores.borde} strokeWidth={18} />
        {segmentos.map((s) => (
          <circle
            key={s.name}
            cx={80}
            cy={80}
            r={R}
            fill="none"
            stroke={s.color}
            strokeWidth={18}
            strokeDasharray={`${s.largo} ${C - s.largo}`}
            strokeDashoffset={-s.desfase}
            transform="rotate(-90 80 80)"
          >
            <title>{`${s.name}: ${fmt(s.value)} (${pct(s.value, suma)} %)`}</title>
          </circle>
        ))}
        <text x={80} y={82} textAnchor="middle" fontSize={26} fontWeight={600} fill={colores.texto}>{fmt(total)}</text>
        <text x={80} y={100} textAnchor="middle" fontSize={12} fill={colores.texto3}>{centerLabel}</text>
      </svg>
      <Box sx={{ width: '100%' }}>
        {data.map((d) => (
          <Box key={d.name} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: d.color, flexShrink: 0 }} />
            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>{d.name}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {fmt(d.value)} · {pct(d.value, suma)} %
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
