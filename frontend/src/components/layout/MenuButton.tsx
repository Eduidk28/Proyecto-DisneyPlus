import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

interface MenuButtonProps {
  onClick: () => void
}

export default function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <IconButton onClick={onClick} aria-label="Abrir menú" edge="start" sx={{ width: 44, height: 44 }}>
      <MenuIcon />
    </IconButton>
  )
}
