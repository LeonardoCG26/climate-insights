import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { buildUpstreamUrl, resolveApiKey } from './api/_openweather.js'

// Replicates the serverless proxy during `npm run dev`, so local development
// works without exposing the API key and without needing `vercel dev`.
function openWeatherDevProxy(env) {
  return {
    name: 'openweather-dev-proxy',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/openweather')) {
          return next()
        }

        const send = (status, payload) => {
          res.statusCode = status
          res.setHeader('content-type', 'application/json; charset=utf-8')
          res.end(JSON.stringify(payload))
        }

        const apiKey = resolveApiKey(env)
        if (!apiKey) {
          return send(500, { code: 'missing_key', message: 'Weather API key is not configured.' })
        }

        const parsed = new URL(req.url, 'http://localhost')
        const endpoint = parsed.searchParams.get('endpoint')
        const query = Object.fromEntries(parsed.searchParams.entries())
        const url = buildUpstreamUrl(endpoint, query, apiKey)

        if (!url) {
          return send(400, { code: 'bad_request', message: 'Unknown endpoint.' })
        }

        fetch(url)
          .then(async (upstream) => {
            const body = await upstream.text()
            res.statusCode = upstream.status
            res.setHeader('content-type', 'application/json; charset=utf-8')
            res.end(body)
          })
          .catch(() => send(502, { code: 'upstream_error', message: 'Weather provider unavailable.' }))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Empty prefix loads all vars (including the non-VITE OPENWEATHER_API_KEY).
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), openWeatherDevProxy(env)],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'react-vendor'
            }
          },
        },
      },
    },
  }
})
