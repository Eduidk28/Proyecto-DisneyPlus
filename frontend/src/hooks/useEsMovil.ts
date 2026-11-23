import { useMediaQuery, useTheme } from '@mui/material'

/** true cuando el ancho es menor a 768 px (punto de quiebre "md" del tema) */
export function useEsMovil(): boolean {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })
}
