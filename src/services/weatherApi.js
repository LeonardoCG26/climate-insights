const PROXY_PATH = '/api/openweather'
const DEFAULT_LANG = 'en'
const DEFAULT_UNITS = 'metric'

const WEATHER_TTL = 10 * 60 * 1000 // 10 min
const SEARCH_TTL = 30 * 60 * 1000 // 30 min

// Error carrying a stable code (a key in siteCopy's `errors` dictionary), so the
// UI can localize it without matching on message text.
export class ApiError extends Error {
  constructor(code) {
    super(code)
    this.name = 'ApiError'
    this.code = code
  }
}

function createTtlCache(ttl) {
  const store = new Map()

  return {
    get(key) {
      const entry = store.get(key)

      if (!entry) {
        return undefined
      }

      if (Date.now() > entry.expires) {
        store.delete(key)
        return undefined
      }

      return entry.value
    },
    set(key, value) {
      store.set(key, { value, expires: Date.now() + ttl })
    },
  }
}

const weatherCache = createTtlCache(WEATHER_TTL)
const searchCache = createTtlCache(SEARCH_TTL)

function capitalize(text = '') {
  if (!text) {
    return ''
  }

  return text.charAt(0).toUpperCase() + text.slice(1)
}

function getLocale(language) {
  return language === 'es' ? 'es-MX' : 'en-US'
}

function getObservedPrefix(language) {
  return language === 'es' ? 'Actualizado' : 'Updated'
}

function createFormatters(language) {
  const locale = getLocale(language)

  return {
    day: new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }),
    hour: new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
    }),
    dateTime: new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
    }),
    time: new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
    }),
  }
}

function buildProxyUrl(endpoint, params) {
  const url = new URL(PROXY_PATH, window.location.origin)
  url.searchParams.set('endpoint', endpoint)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })

  return url
}

function resolveErrorCode(payload, status, fallbackCode) {
  if (payload?.code === 'missing_key') {
    return 'missingApiKey'
  }

  if (payload?.code === 'upstream_error') {
    return 'upstream'
  }

  const message = String(payload?.message ?? '').toLowerCase()

  if (status === 401 || message.includes('invalid api key')) {
    return 'invalidApiKey'
  }

  if (message.includes('nothing to geocode')) {
    return 'queryInvalid'
  }

  return fallbackCode
}

async function requestJson(endpoint, params, fallbackCode) {
  let response

  try {
    response = await fetch(buildProxyUrl(endpoint, params))
  } catch {
    throw new ApiError('upstream')
  }

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new ApiError(resolveErrorCode(payload, response.status, fallbackCode))
  }

  return payload
}

function createLocationId(lat, lon) {
  return `${Number(lat).toFixed(3)}:${Number(lon).toFixed(3)}`
}

export function formatLocationLabel(location) {
  return [location.name, location.state, location.country].filter(Boolean).join(', ')
}

export function normalizeLocation(location) {
  const normalized = {
    id: location.id ?? createLocationId(location.lat, location.lon),
    name: location.name ?? '',
    state: location.state ?? '',
    country: location.country ?? '',
    lat: Number(location.lat),
    lon: Number(location.lon),
  }

  return {
    ...normalized,
    label: formatLocationLabel(normalized),
  }
}

function createIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

function average(items, selector, digits = 0) {
  const total = items.reduce((sum, item) => sum + selector(item), 0)
  return Number((total / items.length).toFixed(digits))
}

function pickRepresentativeForecastEntry(group) {
  return group.reduce((best, entry) => {
    const bestIcon = String(best.weather?.[0]?.icon ?? '')
    const entryIcon = String(entry.weather?.[0]?.icon ?? '')
    const bestHour = Number(best.dt_txt?.slice(11, 13) ?? 0)
    const entryHour = Number(entry.dt_txt?.slice(11, 13) ?? 0)
    const bestScore = (bestIcon.endsWith('d') ? 0 : 100) + Math.abs(bestHour - 12)
    const entryScore = (entryIcon.endsWith('d') ? 0 : 100) + Math.abs(entryHour - 12)

    return entryScore < bestScore ? entry : best
  }, group[0])
}

export function summarizeDailyForecast(entries, formatters) {
  const groups = entries.reduce((collection, entry) => {
    const dateKey = entry.dt_txt.slice(0, 10)
    collection[dateKey] ??= []
    collection[dateKey].push(entry)
    return collection
  }, {})

  return Object.entries(groups)
    .slice(0, 5)
    .map(([date, group]) => {
      const sample = pickRepresentativeForecastEntry(group)
      const temps = group.map((entry) => entry.main.temp)
      const minTemp = Math.min(...temps)
      const maxTemp = Math.max(...temps)
      const weather = sample.weather?.[0]

      return {
        date,
        label: capitalize(formatters.day.format(new Date(sample.dt * 1000))),
        description: capitalize(weather?.description),
        conditionCode: weather?.icon ?? '',
        iconUrl: createIconUrl(weather?.icon),
        tempMin: Math.round(minTemp),
        tempMax: Math.round(maxTemp),
        humidity: average(group, (entry) => entry.main.humidity),
        windSpeed: average(group, (entry) => entry.wind.speed, 1),
        precipitationChance: Math.round(
          Math.max(...group.map((entry) => (entry.pop ?? 0) * 100))
        ),
      }
    })
}

function createTimeline(entries, formatters) {
  return entries.slice(0, 8).map((entry) => ({
    timestamp: entry.dt * 1000,
    label: formatters.hour.format(new Date(entry.dt * 1000)),
    temp: Math.round(entry.main.temp),
    humidity: entry.main.humidity,
    windSpeed: Number(entry.wind.speed.toFixed(1)),
  }))
}

export function resolveWeatherScene(weather = {}) {
  const group = String(weather.main ?? '').toLowerCase()

  if (group === 'thunderstorm') {
    return 'storm'
  }

  if (group === 'drizzle' || group === 'rain') {
    return 'rain'
  }

  if (group === 'snow') {
    return 'snow'
  }

  if (group === 'clear') {
    return 'clear'
  }

  if (group === 'clouds') {
    return 'clouds'
  }

  if (
    group === 'mist' ||
    group === 'smoke' ||
    group === 'haze' ||
    group === 'dust' ||
    group === 'fog' ||
    group === 'sand' ||
    group === 'ash' ||
    group === 'squall' ||
    group === 'tornado'
  ) {
    return 'atmosphere'
  }

  return 'default'
}

function normalizeWeatherBundle(location, currentPayload, forecastPayload, language) {
  const formatters = createFormatters(language)
  const weather = currentPayload.weather?.[0] ?? {}
  const resolvedLocation = normalizeLocation({
    ...location,
    name: location.name || currentPayload.name || '',
    country: location.country || currentPayload.sys?.country || '',
  })

  return {
    location: resolvedLocation,
    current: {
      temperature: Math.round(currentPayload.main.temp),
      feelsLike: Math.round(currentPayload.main.feels_like),
      high: Math.round(currentPayload.main.temp_max),
      low: Math.round(currentPayload.main.temp_min),
      humidity: currentPayload.main.humidity,
      windSpeed: Number(currentPayload.wind.speed.toFixed(1)),
      visibilityKm: Number(((currentPayload.visibility ?? 0) / 1000).toFixed(1)),
      cloudiness: currentPayload.clouds?.all ?? 0,
      description: capitalize(weather.description),
      scene: resolveWeatherScene(weather),
      conditionCode: weather.icon ?? '',
      isDay: String(weather.icon ?? '').endsWith('d'),
      iconUrl: createIconUrl(weather.icon),
      sunriseLabel: formatters.time.format(new Date(currentPayload.sys.sunrise * 1000)),
      sunsetLabel: formatters.time.format(new Date(currentPayload.sys.sunset * 1000)),
      observedLabel: `${getObservedPrefix(language)} ${formatters.dateTime.format(new Date(currentPayload.dt * 1000))}`,
    },
    forecast: {
      daily: summarizeDailyForecast(forecastPayload.list ?? [], formatters),
      timeline: createTimeline(forecastPayload.list ?? [], formatters),
    },
  }
}

export async function searchLocations(query, limit = 5) {
  const value = query.trim()

  if (!value) {
    return []
  }

  const cacheKey = `${value.toLowerCase()}:${limit}`
  const cached = searchCache.get(cacheKey)

  if (cached) {
    return cached
  }

  const payload = await requestJson('geo/direct', { q: value, limit }, 'searchFailed')
  const results = payload.map((location) => normalizeLocation(location))
  searchCache.set(cacheKey, results)

  return results
}

export async function reverseGeocode(lat, lon, limit = 1) {
  const payload = await requestJson('geo/reverse', { lat, lon, limit }, 'locationFailed')
  return payload.map((location) => normalizeLocation(location))
}

export async function getWeatherBundle(location, { language = DEFAULT_LANG } = {}) {
  const target = normalizeLocation(location)
  const cacheKey = `${target.id}:${language}`
  const cached = weatherCache.get(cacheKey)

  if (cached) {
    return cached
  }

  const [currentPayload, forecastPayload] = await Promise.all([
    requestJson(
      'weather',
      { lat: target.lat, lon: target.lon, units: DEFAULT_UNITS, lang: language },
      'weatherFailed'
    ),
    requestJson(
      'forecast',
      { lat: target.lat, lon: target.lon, units: DEFAULT_UNITS, lang: language },
      'forecastFailed'
    ),
  ])

  const bundle = normalizeWeatherBundle(target, currentPayload, forecastPayload, language)
  weatherCache.set(cacheKey, bundle)

  return bundle
}
