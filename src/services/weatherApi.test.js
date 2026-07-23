import { describe, expect, it } from 'vitest'
import {
  ApiError,
  formatLocationLabel,
  normalizeLocation,
  resolveWeatherScene,
} from './weatherApi.js'

describe('resolveWeatherScene', () => {
  it('maps OpenWeather groups to scene names', () => {
    expect(resolveWeatherScene({ main: 'Thunderstorm' })).toBe('storm')
    expect(resolveWeatherScene({ main: 'Rain' })).toBe('rain')
    expect(resolveWeatherScene({ main: 'Drizzle' })).toBe('rain')
    expect(resolveWeatherScene({ main: 'Snow' })).toBe('snow')
    expect(resolveWeatherScene({ main: 'Clear' })).toBe('clear')
    expect(resolveWeatherScene({ main: 'Clouds' })).toBe('clouds')
    expect(resolveWeatherScene({ main: 'Fog' })).toBe('atmosphere')
  })

  it('is case-insensitive and defaults for unknown input', () => {
    expect(resolveWeatherScene({ main: 'clear' })).toBe('clear')
    expect(resolveWeatherScene({ main: 'Something' })).toBe('default')
    expect(resolveWeatherScene({})).toBe('default')
    expect(resolveWeatherScene()).toBe('default')
  })
})

describe('formatLocationLabel', () => {
  it('joins present parts and skips empty ones', () => {
    expect(formatLocationLabel({ name: 'Paris', state: '', country: 'FR' })).toBe('Paris, FR')
    expect(
      formatLocationLabel({ name: 'Austin', state: 'Texas', country: 'US' })
    ).toBe('Austin, Texas, US')
    expect(formatLocationLabel({ name: '', state: '', country: '' })).toBe('')
  })
})

describe('normalizeLocation', () => {
  it('derives a stable id from rounded coordinates and builds a label', () => {
    const result = normalizeLocation({ name: 'Tokyo', country: 'JP', lat: 35.6895, lon: 139.6917 })
    expect(result.id).toBe('35.690:139.692')
    expect(result.label).toBe('Tokyo, JP')
    expect(result.lat).toBe(35.6895)
  })

  it('falls back to empty strings for missing fields (no Spanish leak)', () => {
    const result = normalizeLocation({ lat: 0, lon: 0 })
    expect(result.name).toBe('')
    expect(result.label).toBe('')
  })
})

describe('ApiError', () => {
  it('carries a stable code', () => {
    const error = new ApiError('cityNotFound')
    expect(error).toBeInstanceOf(Error)
    expect(error.code).toBe('cityNotFound')
  })
})
