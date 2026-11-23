import { Box, Paper, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface KpiCardProps {
  label: string
  value: number | string
  helper?: string
  icon: ReactNode
  compact?: boolean
}

export default function KpiCard({ label, value, helper, icon, compact = false }: KpiCardProps) {
  return (
    <Paper
      sx={{
        p: compact ? 1.5 : 3,
        height: '100%',
        display: 'flex',
        flexDirection: compact ? 'column' : 'row',
        alignItems: compact ? 'flex-start' : 'center',
        gap: compact ? 0.5 : 2,
      }}
    >
      {!compact && (
        <Box
          sx={{
            width: 48,
            height: 48,
            flexShrink: 0,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            color: 'primary.main',
            bgcolor: 'rgba(56, 189, 248, 0.12)',
          }}
        >
          {icon}
        </Box>
      )}
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 600, fontSize: compact ? 20 : 28, lineHeight: 1.2 }}>{value}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{label}</Typography>
        {helper && !compact && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{helper}</Typography>
        )}
      </Box>
    </Paper>
  )
}
