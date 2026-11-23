import { useState } from 'react'
import { Box, Button, Chip, Drawer, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import FilterListIcon from '@mui/icons-material/FilterList'
import type { FilterConfig, FiltroId, Filtros } from '../../types'
import { useEsMovil } from '../../hooks/useEsMovil'
import { colores } from '../../tokens'
import { contarFiltrosActivos, fmt } from '../../utils/datos'
import SearchInput from './SearchInput'
import SelectFilter from './SelectFilter'

interface FilterBarProps {
  filters: FilterConfig[]
  values: Filtros
  onChange: (id: FiltroId, valor: string) => void
  onReset: () => void
  searchValue: string
  onSearchChange: (texto: string) => void
  resultCount: number
  totalCount: number
}

/**
 * Barra de filtros única (idéntica en las tres páginas):
 * Buscar título · Tipo · Año de estreno · Género · Restablecer filtros · contador.
 * En móvil los selectores se abren en un panel inferior.
 */
export default function FilterBar({
  filters, values, onChange, onReset, searchValue, onSearchChange, resultCount, totalCount,
}: FilterBarProps) {
  const esMovil = useEsMovil()
  const [panelAbierto, setPanelAbierto] = useState(false)

  const activos = contarFiltrosActivos(values)
  const hayAlgoActivo = activos > 0 || searchValue.trim() !== ''

  const selectores = (ancho: boolean) =>
    filters.map((f) => (
      <SelectFilter
        key={f.id}
        label={f.label}
        value={values[f.id]}
        options={f.options}
        onChange={(valor) => onChange(f.id, valor)}
        fullWidth={ancho}
      />
    ))

  const contador = (
    <Typography color="text.secondary" aria-live="polite">
      {fmt(resultCount)} de {fmt(totalCount)} títulos
    </Typography>
  )

  const chips = hayAlgoActivo && (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
      {filters
        .filter((f) => values[f.id] !== 'Todos')
        .map((f) => (
          <Chip
            key={f.id}
            label={`${f.label}: ${values[f.id]}`}
            onDelete={() => onChange(f.id, 'Todos')}
            sx={{ bgcolor: 'rgba(56, 189, 248, 0.12)', color: 'primary.main' }}
          />
        ))}
      {searchValue.trim() !== '' && (
        <Chip
          label={`Búsqueda: “${searchValue.trim()}”`}
          onDelete={() => onSearchChange('')}
          sx={{ bgcolor: 'rgba(56, 189, 248, 0.12)', color: 'primary.main' }}
        />
      )}
    </Box>
  )

  if (esMovil) {
    return (
      <Box>
        <SearchInput value={searchValue} onChange={onSearchChange} />
        <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<FilterListIcon />}
            onClick={() => setPanelAbierto(true)}
            sx={{ minHeight: 44, borderColor: colores.borde }}
          >
            Filtros{activos > 0 ? ` (${activos})` : ''}
          </Button>
          {contador}
        </Box>
        {chips}
        <Drawer
          anchor="bottom"
          open={panelAbierto}
          onClose={() => setPanelAbierto(false)}
          slotProps={{ paper: { sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } } }}
        >
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Filtros</Typography>
              <IconButton onClick={() => setPanelAbierto(false)} aria-label="Cerrar filtros" sx={{ width: 44, height: 44 }}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectores(true)}
            <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
              <Button fullWidth variant="outlined" color="inherit" onClick={onReset} sx={{ minHeight: 44, borderColor: colores.borde }}>
                Restablecer filtros
              </Button>
              <Button fullWidth variant="contained" onClick={() => setPanelAbierto(false)} sx={{ minHeight: 44 }}>
                Ver {fmt(resultCount)}
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 2 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Buscar título</Typography>
          <SearchInput value={searchValue} onChange={onSearchChange} />
        </Box>
        {selectores(false)}
        <Button
          variant="outlined"
          color="inherit"
          onClick={onReset}
          disabled={!hayAlgoActivo}
          sx={{ minHeight: 44, borderColor: colores.borde }}
        >
          Restablecer filtros
        </Button>
        <Box sx={{ ml: 'auto', minHeight: 44, display: 'flex', alignItems: 'center' }}>{contador}</Box>
      </Box>
      {chips}
    </Box>
  )
}
