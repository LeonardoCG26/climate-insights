import { describe, expect, it } from 'vitest'
import { getCopy, translateErrorMessage } from './siteCopy.js'

describe('getCopy', () => {
  it('returns the requested language and falls back to English', () => {
    expect(getCopy('es').controls.language).toBe('Idioma')
    expect(getCopy('en').controls.language).toBe('Language')
    expect(getCopy('fr').controls.language).toBe('Language')
  })
})

describe('translateErrorMessage', () => {
  it('looks up a known error code in the requested language', () => {
    expect(translateErrorMessage('cityNotFound', 'es')).toBe(
      'No encontramos esa ciudad. Intenta con ciudad y país.'
    )
    expect(translateErrorMessage('cityNotFound', 'en')).toBe(
      'We could not find that city. Try city plus country.'
    )
  })

  it('falls back to the generic message for unknown codes', () => {
    expect(translateErrorMessage('does-not-exist', 'en')).toBe(getCopy('en').errors.unexpected)
    expect(translateErrorMessage(undefined, 'es')).toBe(getCopy('es').errors.unexpected)
  })
})
