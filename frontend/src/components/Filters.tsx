import { ToggleButton, ToggleButtonGroup } from '@mui/material'

interface FiltersProps {
  tipo: string
  onChange: (nuevoTipo: string) => void
}

export default function Filters({ tipo, onChange }: FiltersProps) {
  return (
    <ToggleButtonGroup
      value={tipo}
      exclusive
      onChange={(_, nuevo) => nuevo && onChange(nuevo)}
    >
      <ToggleButton value="Todos">Todos</ToggleButton>
      <ToggleButton value="Movie">Películas</ToggleButton>
      <ToggleButton value="TV Show">Series</ToggleButton>
    </ToggleButtonGroup>
  )
}
