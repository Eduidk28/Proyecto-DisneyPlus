import { Box } from '@mui/material'
import type { CeldaGrafico, KpiItem } from '../types'
import { useDatos } from '../hooks/useDatos'
import PageHeader from '../components/common/PageHeader'
import KpiGrid from '../components/common/KpiGrid'
import ChartGrid from '../components/common/ChartGrid'

interface AnalyticsPageProps {
  eyebrow: string
  title: string
  subtitle: string
  kpis: KpiItem[]
  cells: CeldaGrafico[]
}

/**
 * Plantilla de las páginas analíticas:
 * 1) encabezado · 2) tres KPI · 3) gráficos en rejilla de 12 columnas.
 */
export default function AnalyticsPage({ eyebrow, title, subtitle, kpis, cells }: AnalyticsPageProps) {
  const { agregados } = useDatos()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} cutoffDate={agregados.corte} />
      <KpiGrid kpis={kpis} />
      <ChartGrid cells={cells} />
    </Box>
  )
}
