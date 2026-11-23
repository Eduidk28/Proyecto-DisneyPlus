import { Box } from '@mui/material'
import { colores } from '../../tokens'

interface TypeBadgeProps {
  type: 'Película' | 'Serie'
}

/** Etiqueta Película / Serie: fondo al 15 %, borde al 40 %, texto al 100 % del color del tipo */
export default function TypeBadge({ type }: TypeBadgeProps) {
  const esPelicula = type === 'Película'
  const color = esPelicula ? colores.pelicula : colores.serie
  const rgb = esPelicula ? '56, 189, 248' : '251, 191, 36'
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        px: 1,
        py: '2px',
        borderRadius: 1,
        fontSize: 12,
        fontWeight: 600,
        color,
        bgcolor: `rgba(${rgb}, 0.15)`,
        border: `1px solid rgba(${rgb}, 0.4)`,
      }}
    >
      {type}
    </Box>
  )
}
