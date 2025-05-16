# Generador de Scripts ETL

Una aplicación web que facilita la creación de scripts ETL (Extract, Transform, Load) para procesamiento de datos, especialmente diseñada para KPIs (Indicadores Clave de Rendimiento).

## Características Principales

- 📊 **Configuración de KPIs**: Define múltiples KPIs con sus respectivas configuraciones
- 📄 **Importación de Archivos**: Soporte para archivos CSV, TXT y Excel
- 🔄 **Transformaciones**: Renombrado de columnas y limpieza de datos
- 📝 **Generación de Código**: Genera scripts Python personalizados
- 🌓 **Modo Oscuro**: Interfaz adaptable a preferencias de usuario

## Configuración de KPIs

1. **Selección de KPIs**: Elige entre diferentes tipos disponibles (sellout, stock_oh, stock_tuberia, fillrate, forecast, sellin)
2. **Configuración General**:
   - Data Type ID
   - Prefijo de archivo
   - Extensión del archivo
   - Número de filas a saltar
   - Columnas requeridas
   - Mapeo de renombrado de columnas
   - Separador
   - Encoding
   - Campos a limpiar

## Uso de la Aplicación

1. **Configuración Global**:
   - Establece parámetros generales como Data Type ID y Encoding

2. **Configuración de KPIs**:
   - Agrega múltiples KPIs
   - Para cada KPI:
     - Selecciona el tipo de KPI
     - Define el prefijo del archivo
     - Configura el tipo de archivo (CSV, TXT, XLSX)
     - Especifica el número de filas a saltar
     - Selecciona las columnas requeridas
     - Mapea los nombres de las columnas
     - Especifica campos a limpiar

3. **Generación de Código**:
   - Visualiza la configuración en formato JSON
   - Genera el script Python correspondiente
   - Descarga el script generado

## Tecnologías Utilizadas

- Frontend: React + Vite
- Estado: Zustand
- Procesamiento de Excel: ExcelJS
- Procesamiento CSV: PapaParse
- UI: TailwindCSS
- Dark Mode: Soporte nativo
- Generación de Código: Backend en Python

## Requisitos del Sistema

- Node.js 16 o superior
- NPM o Yarn
- Un navegador moderno

## Instalación y Ejecución

```bash
# Clonar el repositorio
# Instalar dependencias
npm install
# Ejecutar la aplicación
npm run dev