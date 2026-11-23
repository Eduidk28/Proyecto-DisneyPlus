import { ButtonBase, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface NavItemProps {
  label: string
  icon: ReactNode
  active: boolean
  onClick: () => void
}

export default function NavItem({ label, icon, active, onClick }: NavItemProps) {
  return (
    <ButtonBase
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      sx={{
        width: '100%',
        minHeight: 44,
        justifyContent: 'flex-start',
        gap: 1.5,
        px: 1.5,
        borderRadius: 2,
        color: active ? 'primary.main' : 'text.secondary',
        bgcolor: active ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
        border: '1px solid',
        borderColor: active ? 'rgba(56, 189, 248, 0.4)' : 'transparent',
        '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.08)' },
      }}
    >
      {icon}
      <Typography variant="body2" sx={{ fontWeight: active ? 600 : 400 }}>{label}</Typography>
    </ButtonBase>
  )
}
