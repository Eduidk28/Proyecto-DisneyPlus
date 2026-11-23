import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import type { CeldaGrafico, KpiItem } from '../types'
import { useDatos } from '../hooks/useDatos'
import { useEsMovil } from '../hooks/useEsMovil'
import { fmt } from '../utils/datos'
import ChartCard from '../components/common/ChartCard'
import LineAreaChart from '../components/charts/LineAreaChart'
import ColumnChart from '../components/charts/ColumnChart'
import BarListChart from '../components/charts/BarListChart'
import AnalyticsPage from './AnalyticsPage'

export default function EvolutionPage() {
  const { agregados: a } = useDatos()
  const esMovil = useEsMovil()

  // Un KPI por cada uno de los últimos tres años de incorporación, con los meses que cubre
  const kpis: KpiItem[] = a.ultimosAnios.map((y) => ({
    label: `Añadidos en ${y.anio}`,
    shortLabel: String(y.anio),
    value: fmt(y.total),
    helper: `títulos · ${y.meses}`,
    icon: <CalendarTodayIcon />,
  }))

  const cells: CeldaGrafico[] = [
    {
      key: 'mensual', span: 8,
      node: (
        <ChartCard
          title="Títulos añadidos por mes"
          subtitle={`Lanzamiento de Disney+: 12 nov 2019. ${a.mensual.mesPico ? `El mes con más incorporaciones fue ${a.mensual.mesPico.texto} (${fmt(a.mensual.mesPico.total)}). ` : ''}El último mes es parcial.`}
        >
          <LineAreaChart series={a.mensual.serie} annotations={a.mensual.anotaciones} height={esMovil ? 200 : 260} />
        </ChartCard>
      ),
    },
    {
      key: 'temporadas', span: 4,
      node: (
        <ChartCard title="Series por número de temporadas" subtitle={`Distribución de las ${fmt(a.series)} series`}>
          <ColumnChart series={a.temporadas} height={esMovil ? 200 : 260} />
        </ChartCard>
      ),
    },
    {
      key: 'por-anio', span: 6,
      node: (
        <ChartCard title="Películas y series añadidas por año" subtitle="2019 solo desde octubre y 2021 solo hasta noviembre">
          <ColumnChart series={a.porAnio} height={220} showLegend />
        </ChartCard>
      ),
    },
    {
      key: 'peliculas-clasif', span: 6,
      node: (
        <ChartCard title="Películas por clasificación" subtitle="Clasificación de las películas del catálogo">
          <BarListChart items={a.peliculasPorClasif} maxItems={7} total={a.peliculas} />
        </ChartCard>
      ),
    },
  ]

  return (
    <AnalyticsPage
      eyebrow="EVOLUCIÓN"
      title="Evolución"
      subtitle={`Incorporación de títulos al catálogo de ${a.rango}.`}
      kpis={kpis}
      cells={cells}
    />
  )
}
