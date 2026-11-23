import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import MovieIcon from '@mui/icons-material/Movie'
import TvIcon from '@mui/icons-material/Tv'
import type { CeldaGrafico, KpiItem } from '../types'
import { useDatos } from '../hooks/useDatos'
import { useEsMovil } from '../hooks/useEsMovil'
import { fmt, pct } from '../utils/datos'
import ChartCard from '../components/common/ChartCard'
import LineAreaChart from '../components/charts/LineAreaChart'
import DonutChart from '../components/charts/DonutChart'
import BarListChart from '../components/charts/BarListChart'
import AnalyticsPage from './AnalyticsPage'

export default function ContentPage() {
  const { agregados: a } = useDatos()
  const esMovil = useEsMovil()

  const kpis: KpiItem[] = [
    { label: 'Total de títulos', shortLabel: 'Títulos', value: fmt(a.total), icon: <VideoLibraryIcon /> },
    {
      label: 'Películas', value: fmt(a.peliculas),
      helper: `${pct(a.peliculas, a.total)} % del catálogo`, icon: <MovieIcon />,
    },
    {
      label: 'Series', value: fmt(a.series),
      helper: `${pct(a.series, a.total)} % del catálogo`, icon: <TvIcon />,
    },
  ]

  const duracion = a.duracion.mediana === null || a.duracion.promedio === null
    ? 'Sin datos de duración'
    : `Mediana ${Math.round(a.duracion.mediana)} min · promedio ${Math.round(a.duracion.promedio)} min`

  const cells: CeldaGrafico[] = [
    {
      key: 'decada', span: 4,
      node: (
        <ChartCard title="Títulos por década de estreno" subtitle={`De ${a.desde} a ${a.hasta}`}>
          <LineAreaChart series={a.porDecada} height={esMovil ? 190 : 220} />
        </ChartCard>
      ),
    },
    {
      key: 'tipo', span: 4,
      node: (
        <ChartCard title="Distribución por tipo" subtitle="Películas y series">
          <DonutChart data={a.tipo} total={a.total} />
        </ChartCard>
      ),
    },
    {
      key: 'generos', span: 4,
      node: (
        <ChartCard title="Top de géneros" subtitle="Un título puede tener varios géneros">
          <BarListChart items={a.generos} maxItems={6} />
        </ChartCard>
      ),
    },
    {
      key: 'paises', span: 6,
      node: (
        <ChartCard
          title="Países de producción"
          subtitle={`Un título puede tener varios países. ${fmt(a.paises.sinPais)} sin país.${a.paises.primero ? ` ${a.paises.primero.label} concentra el ${pct(a.paises.primero.value, a.paises.conPais)} % de los títulos con país.` : ''}`}
        >
          <BarListChart items={a.paises.items} maxItems={6} total={a.paises.conPais} />
        </ChartCard>
      ),
    },
    {
      key: 'duracion', span: 6,
      node: (
        <ChartCard title="Duración de las películas" subtitle={duracion}>
          <BarListChart items={a.rangosDuracion} maxItems={4} total={a.peliculas} />
        </ChartCard>
      ),
    },
  ]

  return (
    <AnalyticsPage
      eyebrow="CONTENIDO"
      title="Distribución del catálogo"
      subtitle="Tipo, género, país y duración de los títulos de Disney+."
      kpis={kpis}
      cells={cells}
    />
  )
}
