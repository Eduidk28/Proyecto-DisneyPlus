import { useId, useState } from 'react'
import { Box, Typography } from '@mui/material'
import type { Anotacion, SerieLinea } from '../../types'
import { useAnchoContenedor } from '../../hooks/useAnchoContenedor'
import { colores } from '../../tokens'
import { fmt } from '../../utils/datos'

interface LineAreaChartProps {
  series: SerieLinea[]
  height?: number
  showLegend?: boolean
  annotations?: Anotacion[]
}

const PAD = { izq: 44, der: 14, arriba: 24, abajo: 28 }

export default function LineAreaChart({ series, height = 220, showLegend = false, annotations = [] }: LineAreaChartProps) {
  const uid = useId().replace(/:/g, '')
  const [ref, W] = useAnchoContenedor()
  const [activo, setActivo] = useState<number | null>(null)

  const etiquetas = series[0]?.data.map((d) => d.label) ?? []
  const n = etiquetas.length

  if (n === 0) {
    return <Typography variant="body2" color="text.secondary">Sin datos para mostrar.</Typography>
  }

  const max = Math.max(1, ...series.flatMap((s) => s.data.map((d) => d.value)))
  const anchoUtil = Math.max(80, W - PAD.izq - PAD.der)
  const altoUtil = Math.max(60, height - PAD.arriba - PAD.abajo)
  const x = (i: number) => (n === 1 ? PAD.izq + anchoUtil / 2 : PAD.izq + (i * anchoUtil) / (n - 1))
  const y = (v: number) => PAD.arriba + altoUtil * (1 - v / max)
  const salto = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(W / 72))))
  const guias = [0, 1 / 3, 2 / 3, 1]
  const descripcion = series
    .map((s) => `${s.name}: ${s.data.map((d) => `${d.label} ${fmt(d.value)}`).join(', ')}`)
    .join('. ')

  return (
    <Box ref={ref} sx={{ width: '100%', minWidth: 0, overflow: 'hidden' }}>
      {showLegend && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 2, mb: 1 }}>
          {series.map((s) => (
            <Box key={s.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 12, height: 4, borderRadius: 2, bgcolor: s.color }} />
              <Typography variant="caption" color="text.secondary">{s.name}</Typography>
            </Box>
          ))}
        </Box>
      )}
      <Typography variant="caption" sx={{ display: 'block', minHeight: 20, color: activo === null ? colores.texto3 : 'text.primary' }} aria-live="polite">
        {activo === null
          ? 'Pasa el cursor o toca un punto para ver el valor'
          : `${etiquetas[activo]} · ${series.map((s) => `${s.name}: ${fmt(s.data[activo].value)}`).join(' · ')}`}
      </Typography>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${W} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Gráfico de líneas. ${descripcion}`}
        style={{ display: 'block', maxWidth: '100%' }}
      >
        <defs>
          {series.map((s, i) => (
            <linearGradient key={s.name} id={`${uid}-g${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>

        {guias.map((g) => (
          <g key={g}>
            <line x1={PAD.izq} x2={W - PAD.der} y1={y(max * g)} y2={y(max * g)} stroke={colores.borde} strokeDasharray="4 4" />
            <text x={PAD.izq - 8} y={y(max * g) + 4} textAnchor="end" fontSize={12} fill={colores.texto3}>
              {fmt(Math.round(max * g))}
            </text>
          </g>
        ))}

        {annotations.map((a) => (
          <g key={a.texto}>
            <line x1={x(a.index)} x2={x(a.index)} y1={PAD.arriba - 4} y2={PAD.arriba + altoUtil} stroke={colores.texto3} strokeDasharray="2 4" />
            <text
              x={x(a.index) + (a.index < n / 2 ? 6 : -6)}
              y={PAD.arriba + 8}
              textAnchor={a.index < n / 2 ? 'start' : 'end'}
              fontSize={12}
              fill={colores.texto2}
            >
              {a.texto}
            </text>
          </g>
        ))}

        {series.map((s, i) => {
          const puntos = s.data.map((d, idx) => `${x(idx)},${y(d.value)}`)
          const linea = `M ${puntos.join(' L ')}`
          const area = `${linea} L ${x(n - 1)},${y(0)} L ${x(0)},${y(0)} Z`
          return (
            <g key={s.name}>
              {n > 1 && <path d={area} fill={`url(#${uid}-g${i})`} />}
              {n > 1 && <path d={linea} fill="none" stroke={s.color} strokeWidth={2} />}
              {s.data.map((d, idx) => (
                <circle key={d.label} cx={x(idx)} cy={y(d.value)} r={activo === idx ? 6 : 3.5} fill={s.color} />
              ))}
            </g>
          )
        })}

        {etiquetas.map((l, i) =>
          i % salto === 0 ? (
            <text key={l} x={x(i)} y={height - 8} textAnchor="middle" fontSize={12} fill={colores.texto3}>{l}</text>
          ) : null,
        )}

        {etiquetas.map((l, i) => (
          <rect
            key={`hit-${l}`}
            x={x(i) - Math.max(10, anchoUtil / Math.max(1, n - 1) / 2)}
            y={PAD.arriba}
            width={Math.max(20, anchoUtil / Math.max(1, n - 1))}
            height={altoUtil}
            fill="transparent"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setActivo(i)}
            onMouseLeave={() => setActivo(null)}
            onClick={() => setActivo(activo === i ? null : i)}
          />
        ))}
      </svg>
    </Box>
  )
}
