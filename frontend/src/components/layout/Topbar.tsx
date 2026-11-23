import { useState } from 'react'
import {
  AppBar, Badge, Box, Divider, IconButton, Menu, MenuItem, Toolbar, Typography,
} from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { useDatos } from '../../hooks/useDatos'
import { useEsMovil } from '../../hooks/useEsMovil'
import { fmt } from '../../utils/datos'
import DatasetInfo from './DatasetInfo'
import Logo from './Logo'
import MenuButton from './MenuButton'

interface TopbarProps {
  sectionLabel: string
  onMenuClick: () => void
}

export default function Topbar({ sectionLabel, onMenuClick }: TopbarProps) {
  const esMovil = useEsMovil()
  const { agregados } = useDatos()
  const [anchorNotif, setAnchorNotif] = useState<null | HTMLElement>(null)
  const [leidas, setLeidas] = useState(false)

  const notificaciones = [
    {
      id: 'corte',
      titulo: 'Catálogo histórico disponible',
      detalle: `${fmt(agregados.total)} títulos registrados hasta el ${agregados.corte}.`,
    },
    {
      id: 'catalogos',
      titulo: 'Pestaña Catálogos lista',
      detalle: 'Usa los filtros y búsqueda avanzada en Catálogos para inspeccionar títulos.',
    },
  ]

  const abrirNotificaciones = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNotif(event.currentTarget)
    setLeidas(true)
  }

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: 'blur(12px)',
        bgcolor: 'rgba(7, 13, 26, 0.9)',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ minHeight: 64, justifyContent: 'space-between', px: { xs: 1.5, md: 3 }, gap: 1 }}>
        {esMovil ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
            <MenuButton onClick={onMenuClick} />
            <Logo />
          </Box>
        ) : (
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>{sectionLabel}</Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1.5 }, flexShrink: 0 }}>
          <IconButton
            onClick={abrirNotificaciones}
            aria-label="Notificaciones"
            sx={{
              width: 44,
              height: 44,
              color: 'text.secondary',
              '&:hover': { color: 'text.primary', bgcolor: 'rgba(56, 189, 248, 0.08)' },
            }}
          >
            <Badge
              variant="dot"
              invisible={leidas}
              sx={{
                '& .MuiBadge-badge': {
                  bgcolor: 'primary.main',
                  boxShadow: '0 0 0 2px #070D1A',
                },
              }}
            >
              <NotificationsNoneIcon fontSize="small" />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={anchorNotif}
            open={Boolean(anchorNotif)}
            onClose={() => setAnchorNotif(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  width: { xs: 280, sm: 320 },
                  maxWidth: 'calc(100vw - 24px)',
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                },
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.25 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                NOTIFICACIONES
              </Typography>
            </Box>
            <Divider />
            {notificaciones.map((n) => (
              <MenuItem
                key={n.id}
                onClick={() => setAnchorNotif(null)}
                sx={{
                  py: 1.5,
                  px: 2,
                  whiteSpace: 'normal',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 0.25,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {n.titulo}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {n.detalle}
                </Typography>
              </MenuItem>
            ))}
          </Menu>

          <DatasetInfo />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
