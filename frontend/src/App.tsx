import { useState } from 'react'
import { Box, Container } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import TvIcon from '@mui/icons-material/Tv'
import ListIcon from '@mui/icons-material/List'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Header from './components/Header'
import KpiCard from './components/KpiCard'
import Filters from './components/Filters'
import ChartContainer from './components/ChartContainer'
import DataTable from './components/DataTable'
import { titulos } from './data/titulos'

export default function App() {
  const [tipo, setTipo] = useState('Todos')

  const filtrados = tipo === 'Todos' ? titulos : titulos.filter((t) => t.type === tipo)
  const peliculas = filtrados.filter((t) => t.type === 'Movie').length
  const series = filtrados.filter((t) => t.type === 'TV Show').length
  const anioReciente = Math.max(...filtrados.map((t) => t.release_year))

  return (
    <>
      <Header titulo="Dashboard Disney+" />
      <Container sx={{ py: 3 }}>
        <Filters tipo={tipo} onChange={setTipo} />

        <Box
          sx={{
            display: 'grid',
            gap: 2,
            my: 3,
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          }}
        >
          <KpiCard titulo="Total de títulos" valor={filtrados.length} icono={<ListIcon />} />
          <KpiCard titulo="Películas" valor={peliculas} icono={<MovieIcon />} />
          <KpiCard titulo="Series" valor={series} icono={<TvIcon />} />
          <KpiCard titulo="Estreno más reciente" valor={anioReciente} icono={<CalendarMonthIcon />} />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
          }}
        >
          <ChartContainer titulo="Títulos por tipo" />
          <DataTable
            titulo="Listado de títulos"
            filas={filtrados.slice(0, 10)}
            total={filtrados.length}
          />
        </Box>
      </Container>
    </>
  )
}
