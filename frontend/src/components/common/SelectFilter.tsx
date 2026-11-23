import { Box, MenuItem, Select, Typography } from '@mui/material'

interface SelectFilterProps {
  label: string
  value: string
  options: string[]
  onChange: (valor: string) => void
  fullWidth?: boolean
}

export default function SelectFilter({ label, value, options, onChange, fullWidth = false }: SelectFilterProps) {
  return (
    <Box sx={{ width: fullWidth ? '100%' : 180 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>{label}</Typography>
      <Select
        size="small"
        fullWidth
        value={value}
        onChange={(e: { target: { value: unknown } }) => onChange(String(e.target.value))}
        sx={{ minHeight: 44, bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: 2 }}
      >
        {options.map((o) => (
          <MenuItem key={o} value={o}>{o}</MenuItem>
        ))}
      </Select>
    </Box>
  )
}
