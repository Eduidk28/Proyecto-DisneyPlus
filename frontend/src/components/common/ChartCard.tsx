import { Box, Paper, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <Paper sx={{ p: { xs: 2.5, md: 3 }, height: '100%', minWidth: 0 }}>
      <Typography component="h2" sx={{ fontWeight: 600, fontSize: { xs: 16, md: 20 }, lineHeight: 1.3 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          {subtitle}
        </Typography>
      )}
      <Box sx={{ mt: 2 }}>{children}</Box>
    </Paper>
  )
}
