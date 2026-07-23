import { buildUpstreamUrl, resolveApiKey } from './_openweather.js'

// Serverless proxy: keeps the OpenWeather key server-side so it never ships in
// the client bundle. The browser calls /api/openweather?endpoint=...&lat=...
export default async function handler(req, res) {
  const apiKey = resolveApiKey()

  if (!apiKey) {
    return res
      .status(500)
      .json({ code: 'missing_key', message: 'Weather API key is not configured on the server.' })
  }

  const endpoint = Array.isArray(req.query.endpoint) ? req.query.endpoint[0] : req.query.endpoint
  const url = buildUpstreamUrl(endpoint, req.query, apiKey)

  if (!url) {
    return res.status(400).json({ code: 'bad_request', message: 'Unknown endpoint.' })
  }

  try {
    const upstream = await fetch(url)
    const body = await upstream.text()

    res.setHeader('content-type', 'application/json; charset=utf-8')
    // Cache successful responses briefly at the edge to cut upstream calls.
    res.setHeader('cache-control', 's-maxage=300, stale-while-revalidate=600')
    return res.status(upstream.status).send(body)
  } catch {
    return res.status(502).json({ code: 'upstream_error', message: 'Weather provider unavailable.' })
  }
}
