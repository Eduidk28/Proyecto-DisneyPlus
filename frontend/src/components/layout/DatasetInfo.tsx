import { useState } from 'react'
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { useDatos } from '../../hooks/useDatos'
import { useEsMovil } from '../../hooks/useEsMovil'
import { fmt } from '../../utils/datos'

const ETIQUETAS_NULOS: Record<string, string> = {
  director: 'Director',
  cast: 'Reparto',
  country: 'País',
  date_added: 'Fecha de incorporación',
  rating: 'Clasificación',
}

/** Botón "Acerca del dataset" y su ventana con la fuente, la fecha de corte y los valores faltantes */
export default function DatasetInfo() {
  const esMovil = useEsMovil()
  const { agregados } = useDatos()
  const [abierto, setAbierto] = useState(false)

  return (
    <>
      {esMovil ? (
        <IconButton onClick={() => setAbierto(true)} aria-label="Acerca del dataset" sx={{ width: 44, height: 44 }}>
          <InfoIcon />
        </IconButton>
      ) : (
        <Button onClick={() => setAbierto(true)} startIcon={<InfoIcon />} variant="outlined" color="inherit" sx={{ borderColor: 'divider' }}>
          Acerca del dataset
        </Button>
      )}
      <Dialog open={abierto} onClose={() => setAbierto(false)} fullWidth maxWidth="sm">
        <DialogTitle>Acerca del dataset</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Catálogo histórico de Disney+: el dashboard analiza información pasada, no monitorea datos en tiempo real.
          </Typography>
          <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 3, rowGap: 1 }}>
            <Typography component="dt" variant="body2" color="text.secondary">Nombre</Typography>
            <Typography component="dd" variant="body2" sx={{ m: 0 }}>Disney+ Movies and TV Shows</Typography>
            <Typography component="dt" variant="body2" color="text.secondary">Fuente</Typography>
            <Typography component="dd" variant="body2" sx={{ m: 0 }}>Kaggle · Shivam Bansal</Typography>
            <Typography component="dt" variant="body2" color="text.secondary">Registros</Typography>
            <Typography component="dd" variant="body2" sx={{ m: 0 }}>{fmt(agregados.total)}</Typography>
            <Typography component="dt" variant="body2" color="text.secondary">Fecha de corte</Typography>
            <Typography component="dd" variant="body2" sx={{ m: 0 }}>{agregados.corte}</Typography>
          </Box>
          <Typography sx={{ fontWeight: 600, mt: 3, mb: 1 }}>Valores faltantes</Typography>
          <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 3, rowGap: 0.5 }}>
            {Object.entries(agregados.nulos).map(([campo, n]) => (
              <Box key={campo} sx={{ display: 'contents' }}>
                <Typography component="dt" variant="body2" color="text.secondary">{ETIQUETAS_NULOS[campo] ?? campo}</Typography>
                <Typography component="dd" variant="body2" sx={{ m: 0 }}>{fmt(n)} registros</Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAbierto(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
