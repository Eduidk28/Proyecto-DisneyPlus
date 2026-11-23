import { Box } from '@mui/material'
import type { KpiItem } from '../../types'
import { useEsMovil } from '../../hooks/useEsMovil'
import KpiCard from './KpiCard'

interface KpiGridProps {
  kpis: KpiItem[]
}

/** KPI arriba en cada vista analítica; en móvil se apilan cómodamente para evitar textos apretados */
export default function KpiGrid({ kpis }: KpiGridProps) {
  const esMovil = useEsMovil()
  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 1.5, md: 3 },
        gridTemplateColumns: { xs: '1fr', sm: `repeat(${kpis.length}, 1fr)` },
        minWidth: 0,
      }}
    >
      {kpis.map((k) => (
        <KpiCard
          key={k.label}
          label={esMovil ? (k.shortLabel ?? k.label) : k.label}
          value={k.value}
          helper={k.helper}
          icon={k.icon}
          compact={esMovil}
        />
      ))}
    </Box>
  )
}
