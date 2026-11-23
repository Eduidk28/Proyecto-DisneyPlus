import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import type { SerieLinea } from '../../types'
import { useAnchoContenedor } from '../../hooks/useAnchoContenedor'
import { colores } from '../../tokens'
import { fmt } from '../../utils/datos'

interface ColumnChartProps {
  series: SerieLinea[]
  height?: number
  showLegend?: boolean
}

const PAD = { izq: 44, der: 8, arriba: 24, abajo: 28 }

/** Columnas verticales (agrupadas si hay más de una serie). Sirve para variables ordinales y comparaciones. */
export default function ColumnChart({ series, height = 220, showLegend = false }: ColumnChartProps) {
  const [ref, W] = useAnchoContenedor()
  const [activo, setActivo] = useState<number | null>(null)

  const categorias = series[0]?.data.map((d) => d.label) ?? []
  const n = categorias.length
  if (n === 0) {
    return <Typography variant="body2" color="text.secondary">Sin datos para mostrar.</Typography>
  }

  const max = Math.max(1, ...series.flatMap((s) => s.data.map((d) => d.value)))
  const anchoUtil = Math.max(80, W - PAD.izq - PAD.der)
  const altoUtil = Math.max(60, height - PAD.arriba - PAD.abajo)
  const anchoGrupo = anchoUtil / n
  const anchoBarra = Math.min(40, (anchoGrupo * 0.7) / series.length)
  const y = (v: number) => PAD.arriba + altoUtil * (1 - v / max)
  const mostrarValores = n * series.length <= 10
  const guias = [0, 0.5, 1]
  const descripcion = series
    .map((s) => `${s.name}: ${s.data.map((d) => `${d.label} ${fmt(d.value)}`).join(', ')}`)
    .join('. ')

  return (
    <Box ref={ref} sx={{ width: '100%', minWidth: 0, overflow: 'hidden' }}>
      {showLegend && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 2, mb: 1 }}>
          {series.map((s) => (
            <Box key={s.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: 0.5, bgcolor: s.color }} />
              <Typography variant="caption" color="text.secondary">{s.name}</Typography>
            </Box>
          ))}
        </Box>
      )}
      <Typography variant="caption" sx={{ display: 'block', minHeight: 20, color: activo === null ? colores.texto3 : 'text.primary' }} aria-live="polite">
        {activo === null
          ? 'Pasa el cursor o toca una columna para ver el valor'
          : `${categorias[activo]} · ${series.map((s) => `${s.name}: ${fmt(s.data[activo].value)}`).join(' · ')}`}
      </Typography>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${W} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Gráfico de columnas. ${descripcion}`}
        style={{ display: 'block', maxWidth: '100%' }}
      >
        {guias.map((g) => (
          <g key={g}>
            <line x1={PAD.izq} x2={W - PAD.der} y1={y(max * g)} y2={y(max * g)} stroke={colores.borde} strokeDasharray="4 4" />
            <text x={PAD.izq - 8} y={y(max * g) + 4} textAnchor="end" fontSize={12} fill={colores.texto3}>
              {fmt(Math.round(max * g))}
            </text>
          </g>
        ))}
        {categorias.map((cat, i) => {
          const inicio = PAD.izq + i * anchoGrupo + (anchoGrupo - anchoBarra * series.length) / 2
          return (
            <g
              key={cat}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setActivo(i)}
              onMouseLeave={() => setActivo(null)}
              onClick={() => setActivo(activo === i ? null : i)}
            >
              <rect x={PAD.izq + i * anchoGrupo} y={PAD.arriba} width={anchoGrupo} height={altoUtil} fill="transparent" />
              {series.map((s, k) => {
                const valor = s.data[i].value
                const bx = inicio + k * anchoBarra
                return (
                  <g key={s.name}>
                    <rect
                      x={bx}
                      y={y(valor)}
                      width={Math.max(2, anchoBarra - 4)}
                      height={y(0) - y(valor)}
                      rx={4}
                      fill={s.color}
                      opacity={activo === null || activo === i ? 1 : 0.55}
                    />
                    {(mostrarValores || activo === i) && (
                      <text x={bx + (anchoBarra - 4) / 2} y={y(valor) - 6} textAnchor="middle" fontSize={12} fill={colores.texto2}>
                        {fmt(valor)}
                      </text>
                    )}
                  </g>
                )
              })}
              <text x={PAD.izq + i * anchoGrupo + anchoGrupo / 2} y={height - 8} textAnchor="middle" fontSize={12} fill={colores.texto3}>
                {cat}
              </text>
            </g>
          )
        })}
      </svg>
    </Box>
  )
}
