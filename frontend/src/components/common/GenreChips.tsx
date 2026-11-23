import { Box } from '@mui/material'
import { colores } from '../../tokens'

interface GenreChipsProps {
  generos: string[]
  max?: number
}

/** Hasta `max` géneros como etiquetas, y "+N" con el resto en el tooltip */
export default function GenreChips({ generos, max = 2 }: GenreChipsProps) {
  if (generos.length === 0) return <Box component="span" sx={{ color: colores.texto3 }}>—</Box>
  const visibles = generos.slice(0, max)
  const resto = generos.slice(max)
  const etiqueta = {
    display: 'inline-block',
    px: 1,
    py: '2px',
    borderRadius: 1,
    fontSize: 12,
    whiteSpace: 'nowrap',
    color: colores.texto2,
    bgcolor: colores.superficie2,
    border: `1px solid ${colores.borde}`,
  }
  return (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'nowrap' }}>
      {visibles.map((g) => (
        <Box key={g} component="span" sx={etiqueta}>{g}</Box>
      ))}
      {resto.length > 0 && (
        <Box component="span" title={resto.join(', ')} sx={{ ...etiqueta, color: colores.texto3 }}>
          +{resto.length}
        </Box>
      )}
    </Box>
  )
}
