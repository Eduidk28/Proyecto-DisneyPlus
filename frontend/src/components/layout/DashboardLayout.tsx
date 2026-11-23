import { useState } from 'react'
import type { ReactNode } from 'react'
import { Box } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import PeopleIcon from '@mui/icons-material/People'
import BarChartIcon from '@mui/icons-material/BarChart'
import TableChartIcon from '@mui/icons-material/TableChart'
import type { NavItemData, PaginaId } from '../../types'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const ITEMS: NavItemData[] = [
  { id: 'inicio', label: 'Inicio', icon: <HomeIcon fontSize="small" /> },
  { id: 'contenido', label: 'Contenido', icon: <VideoLibraryIcon fontSize="small" /> },
  { id: 'audiencia', label: 'Audiencia', icon: <PeopleIcon fontSize="small" /> },
  { id: 'evolucion', label: 'Evolución', icon: <BarChartIcon fontSize="small" /> },
  { id: 'catalogos', label: 'Catálogos', icon: <TableChartIcon fontSize="small" /> },
]

interface DashboardLayoutProps {
  activePage: PaginaId
  onNavigate: (id: PaginaId) => void
  children: ReactNode
}

export default function DashboardLayout({ activePage, onNavigate, children }: DashboardLayoutProps) {
  // Estado: si el cajón del menú está abierto (solo se usa en móvil)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const seccion = ITEMS.find((i) => i.id === activePage)?.label ?? ''

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', maxWidth: '100vw', overflowX: 'clip' }}>
      <Sidebar
        items={ITEMS}
        activeId={activePage}
        onNavigate={onNavigate}
        isOpen={menuAbierto}
        onClose={() => setMenuAbierto(false)}
      />
      <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar sectionLabel={seccion.toUpperCase()} onMenuClick={() => setMenuAbierto(true)} />
        <Box component="main" sx={{ p: { xs: 2, md: 4 }, width: '100%', maxWidth: 1400, mx: 'auto', minWidth: 0 }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
