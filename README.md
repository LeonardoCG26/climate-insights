# Climate Insights

Dashboard climático construido con React + Vite para portfolio. Incluye búsqueda por ciudad, geolocalización, clima actual, pronóstico a 5 días, comparación entre ciudades, favoritos persistentes y gráficas responsivas.

## Setup

1. Instala dependencias:

```bash
npm install
```

2. Crea tu archivo `.env` a partir de `.env.example`:

```bash
OPENWEATHER_API_KEY=tu_api_key
```

   > La clave es **server-side**: la usa el proxy `/api/openweather` (serverless en
   > producción, middleware de Vite en dev) y nunca se incluye en el bundle del
   > navegador. No uses el prefijo `VITE_`.

3. Ejecuta el entorno local:

```bash
npm run dev
```

4. Otros comandos:

```bash
npm run build   # build de producción
npm run lint    # ESLint
npm test        # unit tests (Vitest)
```

## Despliegue

En producción, define `OPENWEATHER_API_KEY` en las variables de entorno del
proyecto (p. ej. Vercel). La función `api/openweather.js` la lee del lado del
servidor. Un despliegue existente que aún tenga `VITE_OPENWEATHER_API_KEY`
seguirá funcionando (el proxy acepta ambos nombres como respaldo).

## Features

- Búsqueda por ciudad usando geocoding de OpenWeather.
- Geolocalización del navegador para cargar la ciudad actual.
- Clima actual con métricas clave y guardado en favoritos.
- Pronóstico resumido a 5 días.
- Comparador entre dos ciudades.
- Favoritos persistidos en `localStorage`.
- Estados explícitos de `loading`, `empty`, `error` y `retry`.
- Gráficas SVG sin dependencias externas de charting.

## Estructura

```text
api/
  _openweather.js      # helper compartido (endpoints permitidos + key)
  openweather.js       # proxy serverless (Vercel)
src/
  components/
  hooks/useWeather.js
  pages/WeatherPage.jsx
  services/weatherApi.js
  services/weatherApi.test.js
```

## Qué vende este proyecto

Consumo de API externa, manejo de estados asíncronos, visualización de datos y UX responsive.
