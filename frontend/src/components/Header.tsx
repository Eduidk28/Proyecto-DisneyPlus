import { AppBar, Toolbar, Typography } from '@mui/material'

interface HeaderProps {
  titulo: string
}

export default function Header({ titulo }: HeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">{titulo}</Typography>
      </Toolbar>
    </AppBar>
  )
}
