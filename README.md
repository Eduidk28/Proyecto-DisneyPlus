# Disney+ Insights — Sprint 2

Aplicación web analítica construida con **React 19**, **TypeScript**, **Vite** y **Material UI** para explorar el catálogo histórico de **Disney+** (`1.450` títulos con fecha de corte al `26 de noviembre de 2021`).

## Novedades del Sprint 2

- **Vista `Inicio` informativa:** Banner de bienvenida tipo *hero* (*"DISNEY+ INSIGHTS / Bienvenido, Alex"*) con acceso directo a *Contenido* y sección de **Accesos directos** (*Contenido*, *Audiencia* y *Evolución*) con métricas del dataset y fecha de corte.
- **Nueva pestaña `Catálogos`:** El explorador y tabla filtrable de títulos (`DataTable` + `FilterBar`) se centralizó en una vista dedicada (`#/catalogos`) para mantener limpias las páginas analíticas de *Contenido*, *Audiencia* y *Evolución*.
- **Elementos fijos en todas las vistas:** Barra superior (*Topbar*) con notificaciones y modal **Acerca del dataset**, y barra lateral (*Sidebar*) con el perfil estático de **Alex Hirsch (`Administrador`)**.
- **Mejoras de adaptabilidad móvil y gráficos:** Contenedores SVG responsivos con `viewBox` y `overflow: hidden` para evitar desbordes al cambiar el tamaño de pantalla, además de ajustes en móvil (`< 768px`) para una navegación cómoda y clara.
- **Privacidad, seguridad y ligereza:** Incorporación de `.gitignore` general en la raíz y `requirements.txt` documentando los requisitos de ejecución.

## Requisitos e instalación

Consulta `requirements.txt` para el detalle completo del entorno.

```bash
cd frontend
npm install
npm run dev
```

Para compilar y verificar tipos antes de desplegar:

```bash
cd frontend
npm run build
```

## Estructura principal

- `data/`: Archivos fuente y transformados (`disney_plus_titles.csv` y `disney_plus_titles.json`).
- `scripts/convertir_csv_json.py`: Script en Python (librería estándar) para generar y validar el JSON desde el CSV.
- `frontend/src/pages/`: Vistas `HomePage`, `ContentPage`, `AudiencePage`, `EvolutionPage` y `CatalogsPage` (`Catálogos`).
- `frontend/src/components/layout/`: `DashboardLayout`, `Sidebar`, `Topbar`, `DatasetInfo` y `NavItem`.
- `frontend/src/components/charts/`: Componentes de visualización (`LineAreaChart`, `ColumnChart`, `DonutChart`, `BarListChart`, `StackedBarChart`).
