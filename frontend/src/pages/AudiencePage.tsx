import PeopleIcon from '@mui/icons-material/People'
import ListAltIcon from '@mui/icons-material/ListAlt'
import InfoIcon from '@mui/icons-material/Info'
import type { CeldaGrafico, KpiItem } from '../types'
import { useDatos } from '../hooks/useDatos'
import { fmt, pct } from '../utils/datos'
import ChartCard from '../components/common/ChartCard'
import BarListChart from '../components/charts/BarListChart'
import StackedBarChart from '../components/charts/StackedBarChart'
import AnalyticsPage from './AnalyticsPage'

export default function AudiencePage() {
  const { agregados: a } = useDatos()
  const top = a.topClasificacion

  const kpis: KpiItem[] = [
    {
      label: 'Clasificación más frecuente', shortLabel: 'Más frecuente',
      value: top?.label ?? '—',
      helper: top ? `${fmt(top.value)} títulos · ${pct(top.value, a.conClasificacion)} %` : undefined,
      icon: <PeopleIcon />,
    },
    {
      label: 'Clasificaciones distintas', shortLabel: 'Categorías',
      value: fmt(a.nClasificaciones), helper: 'categorías de edad', icon: <ListAltIcon />,
    },
    {
      label: 'Títulos sin clasificación', shortLabel: 'Sin clasificar',
      value: fmt(a.sinClasificacion), helper: `de ${fmt(a.total)} títulos`, icon: <InfoIcon />,
    },
  ]

  const cells: CeldaGrafico[] = [
    {
      key: 'clasificacion', span: 6,
      node: (
        <ChartCard
          title="Distribución por clasificación de edad"
          subtitle={`Porcentajes sobre ${fmt(a.conClasificacion)} títulos con clasificación.${a.clasifOtros ? ` Otros: ${a.clasifOtros}.` : ''}`}
        >
          <BarListChart items={a.clasifBarras} maxItems={6} total={a.conClasificacion} />
        </ChartCard>
      ),
    },
    {
      key: 'clasif-tipo', span: 6,
      node: (
        <ChartCard title="Clasificación por tipo" subtitle="Cuántas películas y series tiene cada clasificación">
          <StackedBarChart items={a.clasifPorTipo} />
        </ChartCard>
      ),
    },
  ]

  return (
    <AnalyticsPage
      eyebrow="AUDIENCIA"
      title="Clasificación del público"
      subtitle="Para qué edades está pensado el catálogo."
      kpis={kpis}
      cells={cells}
    />
  )
}
