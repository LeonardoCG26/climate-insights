import { useId, useState } from 'react'
import { translateErrorMessage } from '../content/siteCopy.js'
import { useCitySuggestions } from '../hooks/useCitySuggestions.js'

function formatSuggestionMeta(location) {
  return [location.state, location.country].filter(Boolean).join(', ')
}

function WeatherSearch({
  title,
  description,
  query,
  onQueryChange,
  onSubmit,
  onUseLocation,
  onSelectSuggestion,
  loading,
  submitLabel,
  enableLocation = false,
  enableAutocomplete = false,
  labels,
  language,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const { suggestions, status, error, hasQuery } = useCitySuggestions(query, {
    enabled: enableAutocomplete,
  })
  const inputId = useId()
  const listId = `${inputId}-listbox`
  const resolvedActiveIndex =
    suggestions.length === 0 ? -1 : activeIndex >= 0 && activeIndex < suggestions.length ? activeIndex : 0

  const showSuggestions =
    isOpen &&
    enableAutocomplete &&
    hasQuery &&
    (status === 'loading' || status === 'error' || suggestions.length > 0)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (showSuggestions && resolvedActiveIndex >= 0 && suggestions[resolvedActiveIndex]) {
      handleSuggestionSelect(suggestions[resolvedActiveIndex])
      return
    }

    setIsOpen(false)
    onSubmit(query)
  }

  const handleChange = (event) => {
    onQueryChange(event.target.value)
    setIsOpen(true)
  }

  const handleSuggestionSelect = (location) => {
    onQueryChange(location.label)
    setIsOpen(false)
    setActiveIndex(-1)

    if (onSelectSuggestion) {
      onSelectSuggestion(location)
      return
    }

    onSubmit(location.label)
  }

  const handleKeyDown = (event) => {
    if (!showSuggestions || !suggestions.length) {
      if (event.key === 'ArrowDown' && hasQuery) {
        setIsOpen(true)
      }

      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => {
        if (current < 0 || current >= suggestions.length) {
          return 0
        }

        return (current + 1) % suggestions.length
      })
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => {
        if (current < 0 || current >= suggestions.length) {
          return suggestions.length - 1
        }

        return current <= 0 ? suggestions.length - 1 : current - 1
      })
    }

    if (event.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }

  return (
    <section className="panel search-panel motion-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{title}</p>
          <h2>{description}</h2>
        </div>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-stack">
          <label className="search-input-wrap">
            <span className="sr-only">{title}</span>
            <input
              aria-autocomplete="list"
              aria-controls={showSuggestions ? listId : undefined}
              aria-expanded={showSuggestions}
              aria-label={title}
              autoComplete="off"
              className="search-input"
              id={inputId}
              name={title}
              onBlur={() => {
                window.setTimeout(() => {
                  setIsOpen(false)
                }, 120)
              }}
              onChange={handleChange}
              onFocus={() => {
                if (hasQuery) {
                  setIsOpen(true)
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder={labels.placeholder}
              role="combobox"
              type="text"
              value={query}
            />
          </label>

          {showSuggestions ? (
            <div className="search-dropdown" id={listId} role="listbox">
              {status === 'loading' ? (
                <p className="search-dropdown-copy">{labels.suggestionsLoading}</p>
              ) : null}

              {status === 'error' ? (
                <p className="search-dropdown-copy">{translateErrorMessage(error, language)}</p>
              ) : null}

              {status === 'success' && !suggestions.length ? (
                <p className="search-dropdown-copy">{labels.noMatches}</p>
              ) : null}

              {suggestions.map((location, index) => (
                <button
                  aria-selected={index === resolvedActiveIndex}
                  className={`search-option${index === resolvedActiveIndex ? ' search-option-active' : ''}`}
                  key={location.id}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    handleSuggestionSelect(location)
                  }}
                  role="option"
                  type="button"
                >
                  <span className="search-option-title">{location.name}</span>
                  <span className="search-option-meta">{formatSuggestionMeta(location)}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="search-actions">
          <button className="primary-button" disabled={loading} type="submit">
            {loading ? labels.loading : submitLabel}
          </button>
          {enableLocation ? (
            <button
              className="ghost-button"
              disabled={loading}
              onClick={onUseLocation}
              type="button"
            >
              {labels.useLocation}
            </button>
          ) : null}
        </div>
      </form>
    </section>
  )
}

export default WeatherSearch
