import { createTheme } from '@mui/material'
import { colores } from './tokens'

export const theme = createTheme({
  // Punto de quiebre en 768 px: por debajo, versión móvil
  breakpoints: { values: { xs: 0, sm: 600, md: 768, lg: 1200, xl: 1536 } },
  palette: {
    mode: 'dark',
    primary: { main: colores.acento },
    background: { default: colores.fondo, paper: colores.superficie },
    text: { primary: colores.texto, secondary: colores.texto2 },
    divider: colores.borde,
  },
  // Escala tipográfica: 12 / 14 / 16 / 20 / 28 / 32
  typography: {
    fontFamily: 'Inter, "Segoe UI", Roboto, Arial, sans-serif',
    fontSize: 14,
    body1: { fontSize: '0.875rem' },
    body2: { fontSize: '0.875rem' },
    caption: { fontSize: '0.75rem' },
    overline: { fontSize: '0.75rem', letterSpacing: '0.12em', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Anillo de foco visible para navegación con teclado
        '*:focus-visible': { outline: `2px solid ${colores.acento}`, outlineOffset: 2 },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none', border: `1px solid ${colores.borde}` } },
    },
  },
})
