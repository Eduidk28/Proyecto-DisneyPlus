import { Box, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { colores } from '../../tokens'

interface SearchInputProps {
  value: string
  onChange: (texto: string) => void
  placeholder?: string
}

export default function SearchInput({ value, onChange, placeholder = 'Buscar título…' }: SearchInputProps) {
  return (
    <Box
      role="search"
      aria-label={placeholder}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        minHeight: 44,
        width: { xs: '100%', md: 260 },
        borderRadius: 2,
        border: `1px solid ${colores.borde}`,
        bgcolor: 'rgba(255, 255, 255, 0.03)',
        '&:focus-within': { borderColor: 'primary.main' },
      }}
    >
      <SearchIcon fontSize="small" sx={{ color: colores.texto3 }} />
      <InputBase
        fullWidth
        value={value}
        placeholder={placeholder}
        onChange={(e: { target: { value: string } }) => onChange(e.target.value)}
      />
    </Box>
  )
}
