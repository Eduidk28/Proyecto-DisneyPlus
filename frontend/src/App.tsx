import { Alert, CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme'
import { catalogo } from './data/titulos'
import { usePaginaHash } from './hooks/usePaginaHash'
import DatosProvider from './context/DatosProvider'
import DashboardLayout from './components/layout/DashboardLayout'
import HomePage from './pages/HomePage'
import ContentPage from './pages/ContentPage'
import AudiencePage from './pages/AudiencePage'
import EvolutionPage from './pages/EvolutionPage'
import CatalogsPage from './pages/CatalogsPage'

export default function App() {
  // La página activa vive en la URL (#/catalogos): funciona el botón "atrás" y se pueden compartir enlaces
  const { pagina, navegar } = usePaginaHash()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {catalogo.length === 0 ? (
        // Estado de error: el JSON no tiene registros
        <Alert severity="error" sx={{ m: 3 }}>
          No se pudieron cargar los datos del catálogo. Revisa el archivo data/disney_plus_titles.json.
        </Alert>
      ) : (
        <DatosProvider>
          <DashboardLayout activePage={pagina} onNavigate={navegar}>
            {pagina === 'inicio' && <HomePage onNavigate={navegar} />}
            {pagina === 'contenido' && <ContentPage />}
            {pagina === 'audiencia' && <AudiencePage />}
            {pagina === 'evolucion' && <EvolutionPage />}
            {pagina === 'catalogos' && <CatalogsPage />}
          </DashboardLayout>
        </DatosProvider>
      )}
    </ThemeProvider>
  )
}
