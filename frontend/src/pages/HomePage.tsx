import { Box, Button, ButtonBase, Paper, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import PeopleIcon from '@mui/icons-material/People'
import BarChartIcon from '@mui/icons-material/BarChart'
import type { PaginaId } from '../types'
import { useDatos } from '../hooks/useDatos'
import { fmt } from '../utils/datos'

interface HomePageProps {
  onNavigate: (id: PaginaId) => void
}

/** Vista Inicio informativa: banner de bienvenida y accesos directos a las secciones */
export default function HomePage({ onNavigate }: HomePageProps) {
  const { agregados: a } = useDatos()

  const anio2019 = a.ultimosAnios.find((item) => item.anio === 2019)
  const total2019 = anio2019 ? anio2019.total : 765

  const accesosDirectos: {
    id: PaginaId
    titulo: string
    descripcion: string
    metrica: string
    icono: React.ReactNode
  }[] = [
    {
      id: 'contenido',
      titulo: 'Contenido',
      descripcion: 'Catálogo, géneros y títulos destacados',
      metrica: `${fmt(a.total)} TÍTULOS`,
      icono: <VideoLibraryIcon fontSize="small" />,
    },
    {
      id: 'audiencia',
      titulo: 'Audiencia',
      descripcion: 'Clasificaciones y países de producción',
      metrica: a.topClasificacion
        ? `${a.topClasificacion.label} · ${fmt(a.topClasificacion.value)} TÍTULOS`
        : 'CLASIFICACIONES',
      icono: <PeopleIcon fontSize="small" />,
    },
    {
      id: 'evolucion',
      titulo: 'Evolución',
      descripcion: 'Incorporación de títulos al catálogo',
      metrica: `${fmt(total2019)} AÑADIDOS EN 2019`,
      icono: <BarChartIcon fontSize="small" />,
    },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
      {/* Banner principal informativo */}
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          p: { xs: 3, sm: 4.5, md: 6 },
          border: '1px solid',
          borderColor: 'rgba(56, 189, 248, 0.2)',
          background: 'linear-gradient(135deg, #0B1933 0%, #0E2347 52%, #133163 100%)',
        }}
      >
        {/* Ondas / aros concéntricos sutiles a la derecha */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            right: { xs: -180, sm: -120, md: -50 },
            top: '50%',
            transform: 'translateY(-50%)',
            width: { xs: 340, sm: 440, md: 520 },
            height: { xs: 340, sm: 440, md: 520 },
            borderRadius: '50%',
            border: '38px solid rgba(56, 189, 248, 0.06)',
            pointerEvents: 'none',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 42,
              borderRadius: '50%',
              border: '32px solid rgba(56, 189, 248, 0.05)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 112,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)',
            },
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 620 }}>
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              color: 'primary.main',
              letterSpacing: '0.14em',
              mb: 1.25,
            }}
          >
            DISNEY+ INSIGHTS
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.85rem', sm: '2.4rem', md: '2.85rem' },
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
            }}
          >
            Bienvenido, Alex
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontWeight: 400,
              fontSize: { xs: '1.05rem', sm: '1.3rem', md: '1.5rem' },
              lineHeight: 1.35,
              color: 'rgba(232, 238, 249, 0.92)',
            }}
          >
            Todo tu universo de datos en un solo lugar.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 1.5,
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '0.95rem' },
              lineHeight: 1.6,
              maxWidth: 520,
            }}
          >
            Explora el catálogo, entiende a tu audiencia y toma decisiones con datos actualizados.
          </Typography>

          <Button
            variant="contained"
            onClick={() => onNavigate('contenido')}
            endIcon={<ChevronRightIcon />}
            sx={{
              mt: 3,
              px: 2.5,
              py: 1.2,
              minHeight: 44,
              borderRadius: 2,
              bgcolor: '#E8EEF9',
              color: '#070D1A',
              fontWeight: 600,
              fontSize: '0.875rem',
              boxShadow: '0 8px 24px rgba(7, 13, 26, 0.35)',
              '&:hover': {
                bgcolor: '#FFFFFF',
              },
            }}
          >
            Explorar contenido
          </Button>
        </Box>
      </Paper>

      {/* Sección de Accesos Directos */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'flex-end' },
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                display: 'block',
                color: 'primary.main',
                letterSpacing: '0.12em',
              }}
            >
              ACCESOS DIRECTOS
            </Typography>
            <Typography
              component="h2"
              sx={{
                mt: 0.25,
                fontWeight: 700,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                color: 'text.primary',
              }}
            >
              ¿Qué quieres explorar?
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Datos hasta el {a.corte}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 2.5,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2.5,
          }}
        >
          {accesosDirectos.map((item) => (
            <ButtonBase
              key={item.id}
              onClick={() => onNavigate(item.id)}
              sx={{
                textAlign: 'left',
                display: 'block',
                borderRadius: 3,
                minWidth: 0,
                transition: 'transform 160ms ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
                '&:hover .acceso-card': {
                  borderColor: 'rgba(56, 189, 248, 0.45)',
                  bgcolor: '#121E36',
                },
              }}
            >
              <Paper
                className="acceso-card"
                elevation={0}
                sx={{
                  p: 2.5,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  transition: 'border-color 160ms ease, background-color 160ms ease',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, minWidth: 0 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(56, 189, 248, 0.12)',
                      color: 'primary.main',
                      border: '1px solid',
                      borderColor: 'rgba(56, 189, 248, 0.28)',
                    }}
                  >
                    {item.icono}
                  </Box>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography component="h3" sx={{ fontWeight: 600, fontSize: '1.05rem', color: 'text.primary' }}>
                      {item.titulo}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary', lineHeight: 1.45 }}>
                      {item.descripcion}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mt: 1.5,
                        color: 'primary.main',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                      }}
                    >
                      {item.metrica}
                    </Typography>
                  </Box>
                </Box>

                <ChevronRightIcon fontSize="small" sx={{ color: 'text.secondary', flexShrink: 0 }} />
              </Paper>
            </ButtonBase>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
