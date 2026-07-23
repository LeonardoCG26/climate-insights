import { useEffect, useEffectEvent, useRef, useState } from 'react'
import {
  ApiError,
  getWeatherBundle,
  reverseGeocode,
  searchLocations,
} from '../services/weatherApi.js'
import { getCopy } from '../content/siteCopy.js'

const FAVORITES_STORAGE_KEY = 'climate-insights:favorites'
const DEFAULT_CITY = 'Mexico City'

function createPanelState() {
  return {
    status: 'idle',
    data: null,
    error: '',
    lastRequest: null,
  }
}

function loadFavorites() {
  try {
    const rawValue = localStorage.getItem(FAVORITES_STORAGE_KEY)
    return rawValue ? JSON.parse(rawValue) : []
  } catch {
    return []
  }
}

function toErrorCode(error) {
  return error instanceof ApiError ? error.code : 'unexpected'
}

async function resolveLocationFromQuery(query) {
  const matches = await searchLocations(query)

  if (!matches.length) {
    throw new ApiError('cityNotFound')
  }

  return matches[0]
}

async function resolveLocationFromCoords(fallbackName) {
  if (!navigator.geolocation) {
    throw new ApiError('geolocationUnavailable')
  }

  const coords = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: position }) => resolve(position),
      () => reject(new ApiError('geolocationFailed')),
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    )
  })

  const matches = await reverseGeocode(coords.latitude, coords.longitude)

  if (matches.length) {
    return matches[0]
  }

  return {
    name: fallbackName,
    lat: coords.latitude,
    lon: coords.longitude,
    country: '',
    state: '',
  }
}

export function useWeather(language) {
  const [primary, setPrimary] = useState(createPanelState)
  const [comparison, setComparison] = useState(createPanelState)
  const [primaryQuery, setPrimaryQuery] = useState(DEFAULT_CITY)
  const [comparisonQuery, setComparisonQuery] = useState('')
  const [favorites, setFavorites] = useState(loadFavorites)
  const bootstrapped = useRef(false)
  const previousLanguage = useRef(language)

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Ignore storage quota or privacy mode failures.
    }
  }, [favorites])

  async function runRequest(setter, request) {
    setter((previous) => ({
      ...previous,
      status: 'loading',
      error: '',
      lastRequest: request,
    }))

    try {
      const fallbackName = getCopy(language).current.currentLocation
      const location =
        request.type === 'location'
          ? request.value
          : request.type === 'coords'
            ? await resolveLocationFromCoords(fallbackName)
            : await resolveLocationFromQuery(request.value)

      const bundle = await getWeatherBundle(location, { language })

      setter({
        status: 'success',
        data: bundle,
        error: '',
        lastRequest: {
          type: 'location',
          value: bundle.location,
        },
      })

      return bundle
    } catch (error) {
      setter({
        status: 'error',
        data: null,
        error: toErrorCode(error),
        lastRequest: request,
      })

      return null
    }
  }

  async function executePrimary(request) {
    return runRequest(setPrimary, request)
  }

  async function executeComparison(request) {
    return runRequest(setComparison, request)
  }

  const bootstrapPrimary = useEffectEvent(() => {
    void executePrimary({ type: 'query', value: DEFAULT_CITY })
  })

  const refreshLocalizedData = useEffectEvent(() => {
    if (primary.lastRequest) {
      void executePrimary(primary.lastRequest)
    }

    if (comparison.lastRequest) {
      void executeComparison(comparison.lastRequest)
    }
  })

  useEffect(() => {
    if (bootstrapped.current) {
      return
    }

    bootstrapped.current = true
    bootstrapPrimary()
  }, [])

  useEffect(() => {
    if (previousLanguage.current === language) {
      return
    }

    previousLanguage.current = language
    refreshLocalizedData()
  }, [language])

  async function loadPrimaryByQuery(query) {
    const value = query.trim()

    if (!value) {
      setPrimary({
        status: 'error',
        data: null,
        error: 'emptyCity',
        lastRequest: null,
      })
      return
    }

    setPrimaryQuery(value)
    await executePrimary({ type: 'query', value })
  }

  async function loadComparisonByQuery(query) {
    const value = query.trim()

    if (!value) {
      setComparison({
        status: 'error',
        data: null,
        error: 'emptyCompare',
        lastRequest: null,
      })
      return
    }

    setComparisonQuery(value)
    await executeComparison({ type: 'query', value })
  }

  async function loadPrimaryByCoords() {
    await executePrimary({ type: 'coords', value: 'current-position' })
  }

  async function loadPrimaryByLocation(location) {
    setPrimaryQuery(location.label)
    await executePrimary({ type: 'location', value: location })
  }

  async function loadComparisonByLocation(location) {
    setComparisonQuery(location.label)
    await executeComparison({ type: 'location', value: location })
  }

  async function retryPrimary() {
    if (primary.lastRequest) {
      await executePrimary(primary.lastRequest)
    }
  }

  async function retryComparison() {
    if (comparison.lastRequest) {
      await executeComparison(comparison.lastRequest)
    }
  }

  async function loadFavoriteAsPrimary(location) {
    await loadPrimaryByLocation(location)
  }

  async function loadFavoriteAsComparison(location) {
    await loadComparisonByLocation(location)
  }

  function toggleFavorite(location) {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some((favorite) => favorite.id === location.id)

      if (exists) {
        return currentFavorites.filter((favorite) => favorite.id !== location.id)
      }

      return [...currentFavorites, location]
    })
  }

  function isFavorite(location) {
    return favorites.some((favorite) => favorite.id === location.id)
  }

  return {
    primary,
    comparison,
    favorites,
    primaryQuery,
    comparisonQuery,
    setPrimaryQuery,
    setComparisonQuery,
    loadPrimaryByQuery,
    loadComparisonByQuery,
    loadPrimaryByCoords,
    loadPrimaryByLocation,
    loadComparisonByLocation,
    retryPrimary,
    retryComparison,
    loadFavoriteAsPrimary,
    loadFavoriteAsComparison,
    toggleFavorite,
    isFavorite,
  }
}
