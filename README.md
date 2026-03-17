# Climate Insights

Dashboard climático construido con React + Vite para portfolio. Incluye búsqueda por ciudad, geolocalización, clima actual, pronóstico a 5 días, comparación entre ciudades, favoritos persistentes y gráficas responsivas.

## Setup

1. Instala dependencias:

```bash
npm install
```

2. Crea tu archivo `.env` a partir de `.env.example`:

```bash
VITE_OPENWEATHER_API_KEY=tu_api_key
```

3. Ejecuta el entorno local:

```bash
npm run dev
```

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
src/
  components/
  hooks/useWeather.js
  pages/WeatherPage.jsx
  services/weatherApi.js
```

## Qué vende este proyecto

Consumo de API externa, manejo de estados asíncronos, visualización de datos y UX responsive.
