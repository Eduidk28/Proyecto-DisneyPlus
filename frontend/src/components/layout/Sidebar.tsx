import { Avatar, Box, Drawer, IconButton, Typography } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import type { NavItemData, PaginaId } from '../../types'
import { useEsMovil } from '../../hooks/useEsMovil'
import Logo from './Logo'
import NavItem from './NavItem'

interface SidebarProps {
  items: NavItemData[]
  activeId: PaginaId
  onNavigate: (id: PaginaId) => void
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ items, activeId, onNavigate, isOpen, onClose }: SidebarProps) {
  const esMovil = useEsMovil()

  const contenido = (
    <Box
      sx={{
        width: 240,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ height: 64, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo />
        {esMovil && (
          <IconButton onClick={onClose} aria-label="Cerrar menú" sx={{ width: 44, height: 44 }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <Typography variant="overline" sx={{ px: 3, mt: 2, color: 'text.secondary' }}>
        NAVEGACIÓN
      </Typography>
      <Box
        component="nav"
        aria-label="Secciones"
        sx={{
          px: 1.5,
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
        {items.map((item) => (
          <NavItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            active={item.id === activeId}
            onClick={() => {
              onNavigate(item.id)
              onClose()
            }}
          />
        ))}
      </Box>

      {/* Perfil estático de usuario visible en todas las pestañas */}
      <Box
        sx={{
          mt: 'auto',
          px: 2,
          py: 2,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flexShrink: 0,
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            fontSize: 13,
            fontWeight: 700,
            bgcolor: 'rgba(56, 189, 248, 0.16)',
            color: 'primary.main',
            border: '1px solid',
            borderColor: 'rgba(56, 189, 248, 0.35)',
          }}
        >
          AH
        </Avatar>
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography
            variant="body2"
            noWrap
            sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.25 }}
          >
            Alex Hirsch
          </Typography>
          <Typography
            variant="caption"
            noWrap
            sx={{ display: 'block', color: 'text.secondary', opacity: 0.75, lineHeight: 1.25 }}
          >
            Administrador
          </Typography>
        </Box>
        <ChevronRightIcon fontSize="small" sx={{ color: 'text.secondary', opacity: 0.7, flexShrink: 0 }} />
      </Box>
    </Box>
  )

  if (esMovil) {
    return (
      <Drawer open={isOpen} onClose={onClose}>
        {contenido}
      </Drawer>
    )
  }
  return (
    <Box component="aside" sx={{ width: 240, flexShrink: 0, position: 'sticky', top: 0, height: '100vh' }}>
      {contenido}
    </Box>
  )
}
