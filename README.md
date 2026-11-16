# Proyecto Disney+ — Sprint 1

Transformación del dataset `disney_plus_titles.csv` a JSON para el futuro dashboard en React y Firebase.

## Estructura

- `data/disney_plus_titles.csv`: archivo fuente (1.450 registros, 12 columnas).
- `data/disney_plus_titles.json`: resultado transformado (1.450 objetos, 14 campos).
- `scripts/convertir_csv_json.py`: script reproducible de transformación y validación.

## Requisitos

Python 3.8 o superior. No se necesitan librerías externas.

## Ejecución

Desde la carpeta `Proyecto-DisneyPlus`, ejecutar:

```powershell
python scripts/convertir_csv_json.py
```

## Reglas de transformación

- Lectura del CSV con separador `;` y codificación `cp1252`.
- Eliminación de espacios al inicio y al final.
- Valores vacíos convertidos a `null`.
- `release_year` convertido a entero.
- `date_added` convertido de `DD/MM/YYYY` a `YYYY-MM-DD`.
- `duration` conservado como texto; se agregan `duration_minutes` (películas) y `seasons` (series) como enteros o `null`.
- Validación de columnas, número de registros, tipos y estructura JSON tras volver a abrir el archivo.

No se eliminan registros con datos faltantes, para mantener los totales originales del dashboard.
