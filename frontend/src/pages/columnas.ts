import type { ColumnaTabla } from '../types'

/** Las siete columnas de la tabla "Detalle de títulos" (clic en el encabezado para ordenar) */
export const COLUMNAS_TABLA: ColumnaTabla[] = [
  { key: 'titulo', label: 'Título' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'anio', label: 'Año de estreno', align: 'right' },
  { key: 'genero', label: 'Género' },
  { key: 'pais', label: 'País' },
  { key: 'clasificacion', label: 'Clasificación' },
  { key: 'fecha', label: 'Incorporación' },
]
