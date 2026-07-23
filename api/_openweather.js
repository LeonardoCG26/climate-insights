// Shared helper for the OpenWeather proxy — used by the Vercel serverless
// function (api/openweather.js) and by the Vite dev middleware (vite.config.js).
// Files prefixed with "_" inside api/ are treated as helpers by Vercel, not routes.

const UPSTREAM = 'https://api.openweathermap.org'

// Whitelisted endpoints. Only these paths and query params are ever forwarded,
// so the proxy can never be used as an open relay to arbitrary URLs.
export const ENDPOINTS = {
  'geo/direct': { path: '/geo/1.0/direct', params: ['q', 'limit'] },
  'geo/reverse': { path: '/geo/1.0/reverse', params: ['lat', 'lon', 'limit'] },
  weather: { path: '/data/2.5/weather', params: ['lat', 'lon', 'units', 'lang'] },
  forecast: { path: '/data/2.5/forecast', params: ['lat', 'lon', 'units', 'lang'] },
}

export function resolveApiKey(env = process.env) {
  // Prefer the server-only name; fall back to the legacy VITE_ name so an
  // existing Vercel deployment keeps working during the migration.
  return (env.OPENWEATHER_API_KEY || env.VITE_OPENWEATHER_API_KEY || '').trim()
}

export function buildUpstreamUrl(endpoint, query, apiKey) {
  const config = ENDPOINTS[endpoint]

  if (!config) {
    return null
  }

  const url = new URL(config.path, UPSTREAM)

  for (const name of config.params) {
    const value = query[name]
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(name, String(value))
    }
  }

  url.searchParams.set('appid', apiKey)
  return url
}
