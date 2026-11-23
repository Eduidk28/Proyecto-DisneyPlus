import { Box, Typography } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { colores } from '../../tokens'

interface PageHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
  cutoffDate: string
}

export default function PageHeader({ eyebrow, title, subtitle, cutoffDate }: PageHeaderProps) {
  return (
    <Box>
      <Typography variant="overline" sx={{ color: 'primary.main' }}>{eyebrow}</Typography>
      <Typography component="h1" sx={{ fontWeight: 600, fontSize: { xs: 28, md: 32 }, lineHeight: 1.2 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>{subtitle}</Typography>
      {/* Texto informativo (no parece un botón), siempre bajo el subtítulo */}
      <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1, color: colores.texto3 }}>
        <CalendarTodayIcon sx={{ fontSize: 16 }} />
        <Typography variant="caption">Datos hasta el {cutoffDate}</Typography>
      </Box>
    </Box>
  )
}
