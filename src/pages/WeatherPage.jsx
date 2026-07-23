import { useEffect, useEffectEvent, useRef } from 'react'
import CurrentWeatherCard from '../components/CurrentWeatherCard.jsx'
import ForecastList from '../components/ForecastList.jsx'
import WeatherScene from '../components/WeatherScene.jsx'
import WeatherCharts from '../components/WeatherCharts.jsx'
import WeatherSearch from '../components/WeatherSearch.jsx'
import { getCopy, translateErrorMessage } from '../content/siteCopy.js'
import { useWeather } from '../hooks/useWeather.js'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function StatDelta({ label, value, unit }) {
  const amount = Number.isFinite(value) ? `${value > 0 ? '+' : ''}${value}${unit}` : '—'
  const tone =
    value > 0 ? 'trend trend-warm' : value < 0 ? 'trend trend-cool' : 'trend trend-neutral'

  return (
    <article className="stat-tile">
      <p>{label}</p>
      <strong className={tone}>{amount}</strong>
    </article>
  )
}

function SummaryItem({ label, value }) {
  return (
    <article className="summary-item">
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  )
}

function ThemeGlyph({ mode }) {
  return <span aria-hidden="true" className={`toggle-glyph toggle-glyph-${mode}`} />
}

function PreferenceSwitch({ label, leftLabel, rightLabel, checked, onToggle, variant = 'text' }) {
  return (
    <button
      aria-checked={checked}
      aria-label={label}
      className={`preference-toggle preference-toggle-${variant}${checked ? ' preference-toggle-active' : ''}`}
      onClick={onToggle}
      role="switch"
      type="button"
    >
      <span aria-hidden="true" className="preference-thumb" />
      <span className={`preference-option preference-option-left${checked ? '' : ' preference-option-selected'}`}>
        {variant === 'theme' ? <ThemeGlyph mode="sun" /> : <span className="toggle-code">{leftLabel}</span>}
      </span>
      <span className={`preference-option preference-option-right${checked ? ' preference-option-selected' : ''}`}>
        {variant === 'theme' ? <ThemeGlyph mode="moon" /> : <span className="toggle-code">{rightLabel}</span>}
      </span>
    </button>
  )
}

function SavedLocationButton({ favorite, onLoad, onCompare, active, compareLabel }) {
  return (
    <div className={`favorite-item${active ? ' favorite-item-active' : ''}`}>
      <button className="favorite-button" onClick={() => onLoad(favorite)} type="button">
        <span>{favorite.name}</span>
        <small>{favorite.label}</small>
      </button>
      <button className="favorite-action" onClick={() => onCompare(favorite)} type="button">
        {compareLabel}
      </button>
    </div>
  )
}

function LoadingPanel({ label }) {
  return (
    <section aria-busy="true" aria-live="polite" className="panel skeleton-panel motion-panel">
      <div className="skeleton skeleton-badge" />
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-copy" />
      <div className="skeleton-grid">
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
      </div>
      <p className="loading-copy">{label}</p>
    </section>
  )
}

function FeedbackPanel({ title, description, actionLabel, onAction, tone = 'neutral' }) {
  return (
    <section className={`panel feedback-panel feedback-${tone} motion-panel`}>
      <div className="feedback-copy">
        <p className="eyebrow">{title}</p>
        <h3>{description}</h3>
      </div>
      {onAction ? (
        <button className="primary-button" onClick={onAction} type="button">
          {actionLabel}
        </button>
      ) : null}
    </section>
  )
}

function ComparisonPanel({ primary, comparison, labels, currentLabels }) {
  const temperatureDelta = comparison.current.temperature - primary.current.temperature
  const humidityDelta = comparison.current.humidity - primary.current.humidity
  const windDelta = Number((comparison.current.windSpeed - primary.current.windSpeed).toFixed(1))

  return (
    <section className="panel comparison-panel motion-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{labels.eyebrow}</p>
          <h2>
            {primary.location.name} vs {comparison.location.name}
          </h2>
        </div>
      </div>

      <div className="comparison-stats">
        <StatDelta label={labels.temperature} value={temperatureDelta} unit="°C" />
        <StatDelta label={labels.humidity} value={humidityDelta} unit="%" />
        <StatDelta label={labels.wind} value={windDelta} unit=" m/s" />
      </div>

      <div className="comparison-grid">
        <CurrentWeatherCard
          data={primary}
          labels={currentLabels}
          title={currentLabels.baseTitle}
          variant="compact"
        />
        <CurrentWeatherCard
          data={comparison}
          labels={currentLabels}
          title={currentLabels.compareTitle}
          variant="compact"
        />
      </div>
    </section>
  )
}

function WeatherPage({ language, theme, onToggleLanguage, onToggleTheme }) {
  const heroRef = useRef(null)
  const parallaxFrameRef = useRef(0)
  const copy = getCopy(language)
  const {
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
  } = useWeather(language)
  const scene = primary.status === 'success' ? primary.data.current.scene : 'default'

  const syncHeroParallax = useEffectEvent(() => {
    const heroElement = heroRef.current

    if (!heroElement) {
      return
    }

    const rect = heroElement.getBoundingClientRect()
    const viewportHeight = window.innerHeight || 1
    const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1)
    const scrollDepth = clamp(window.scrollY, 0, 360)

    heroElement.style.setProperty('--hero-parallax-y', `${(scrollDepth * 0.14).toFixed(2)}px`)
    heroElement.style.setProperty('--hero-parallax-x', `${((progress - 0.5) * 20).toFixed(2)}px`)
    heroElement.style.setProperty('--hero-parallax-scale', (1 + progress * 0.045).toFixed(3))
    heroElement.style.setProperty('--hero-orbit-opacity', (0.78 + progress * 0.18).toFixed(3))
  })

  useEffect(() => {
    document.documentElement.dataset.scene = scene
  }, [scene])

  useEffect(() => {
    return () => {
      delete document.documentElement.dataset.scene
    }
  }, [])

  useEffect(() => {
    const updateParallax = () => {
      window.cancelAnimationFrame(parallaxFrameRef.current)
      parallaxFrameRef.current = window.requestAnimationFrame(() => {
        syncHeroParallax()
      })
    }

    updateParallax()
    window.addEventListener('scroll', updateParallax, { passive: true })
    window.addEventListener('resize', updateParallax)

    return () => {
      window.cancelAnimationFrame(parallaxFrameRef.current)
      window.removeEventListener('scroll', updateParallax)
      window.removeEventListener('resize', updateParallax)
    }
  }, [])

  const renderPrimaryContent = () => {
    if (primary.status === 'loading') {
      return <LoadingPanel label={copy.panels.primaryLoading} />
    }

    if (primary.status === 'error') {
      return (
        <FeedbackPanel
          actionLabel={copy.panels.retry}
          description={translateErrorMessage(primary.error, language)}
          onAction={retryPrimary}
          title={copy.panels.error}
          tone="error"
        />
      )
    }

    if (primary.status !== 'success') {
      return (
        <FeedbackPanel
          actionLabel={copy.search.useLocation}
          description={copy.panels.primaryEmpty}
          onAction={loadPrimaryByCoords}
          title={copy.panels.empty}
        />
      )
    }

    return (
      <>
        <CurrentWeatherCard
          data={primary.data}
          isFavorite={isFavorite(primary.data.location)}
          labels={copy.current}
          onToggleFavorite={() => toggleFavorite(primary.data.location)}
          title={copy.current.title}
        />
        <div className="analytics-grid">
          <ForecastList days={primary.data.forecast.daily} labels={copy.forecast} />
          <WeatherCharts data={primary.data.forecast.timeline} labels={copy.charts} />
        </div>
      </>
    )
  }

  const renderComparisonContent = () => {
    if (comparison.status === 'loading') {
      return <LoadingPanel label={copy.panels.comparisonLoading} />
    }

    if (comparison.status === 'error') {
      return (
        <FeedbackPanel
          actionLabel={copy.panels.retry}
          description={translateErrorMessage(comparison.error, language)}
          onAction={retryComparison}
          title={copy.panels.comparison}
          tone="error"
        />
      )
    }

    if (comparison.status === 'success' && primary.status === 'success') {
      return (
        <ComparisonPanel
          comparison={comparison.data}
          currentLabels={copy.current}
          labels={copy.comparison}
          primary={primary.data}
        />
      )
    }

    return (
      <FeedbackPanel
        description={copy.panels.comparisonEmpty}
        title={copy.panels.comparison}
      />
    )
  }

  return (
    <main className="app-shell" data-scene={scene}>
      <section
        className="panel hero hero-frame motion-panel motion-panel-hero"
        data-scene={scene}
        ref={heroRef}
      >
        <div aria-hidden="true" className="hero-atmosphere">
          <WeatherScene scene={scene} />
          <span className="hero-glow hero-glow-1" />
          <span className="hero-glow hero-glow-2" />
          <span className="hero-flake hero-flake-1" />
          <span className="hero-flake hero-flake-2" />
          <span className="hero-flake hero-flake-3" />
          <span className="hero-flake hero-flake-4" />
        </div>
        <div className="hero-toolbar">
          <div className="window-bar" aria-hidden="true">
            <span className="window-dot window-dot-red" />
            <span className="window-dot window-dot-yellow" />
            <span className="window-dot window-dot-green" />
          </div>

          <div className="display-controls">
            <PreferenceSwitch
              checked={language === 'es'}
              label={copy.controls.language}
              leftLabel={copy.controls.languageLeft}
              onToggle={onToggleLanguage}
              rightLabel={copy.controls.languageRight}
              variant="language"
            />
            <PreferenceSwitch
              checked={theme === 'dark'}
              label={copy.controls.theme}
              leftLabel={copy.controls.themeLeft}
              onToggle={onToggleTheme}
              rightLabel={copy.controls.themeRight}
              variant="theme"
            />
          </div>
        </div>

        <div className="hero-layout">
          <div className="hero-copy motion-rise motion-delay-2">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1>
              {copy.hero.titleLead}
              <span>{copy.hero.titleAccent}</span>
            </h1>
            <p className="hero-text">{copy.hero.text}</p>
          </div>

          <div className="hero-summary motion-rise motion-delay-3">
            {copy.hero.summary.map((item) => (
              <SummaryItem key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
      </section>

      <section className="search-grid">
        <WeatherSearch
          description={copy.search.primaryDescription}
          enableAutocomplete
          enableLocation
          labels={copy.search}
          language={language}
          loading={primary.status === 'loading'}
          onQueryChange={setPrimaryQuery}
          onSelectSuggestion={loadPrimaryByLocation}
          onSubmit={loadPrimaryByQuery}
          onUseLocation={loadPrimaryByCoords}
          query={primaryQuery}
          submitLabel={copy.search.searchCta}
          title={copy.search.primaryTitle}
        />

        <WeatherSearch
          description={copy.search.compareDescription}
          enableAutocomplete
          labels={copy.search}
          language={language}
          loading={comparison.status === 'loading'}
          onQueryChange={setComparisonQuery}
          onSelectSuggestion={loadComparisonByLocation}
          onSubmit={loadComparisonByQuery}
          query={comparisonQuery}
          submitLabel={copy.search.compareCta}
          title={copy.search.compareTitle}
        />
      </section>

      <section className="content-grid">
        <div className="content-main">
          {renderPrimaryContent()}
          {renderComparisonContent()}
        </div>

        <aside className="sidebar">
          <section className="panel sidebar-panel motion-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{copy.watchlist.eyebrow}</p>
                <h2>{copy.watchlist.title}</h2>
              </div>
            </div>

            {favorites.length ? (
              <div className="favorites-list">
                {favorites.map((favorite) => (
                  <SavedLocationButton
                    active={primary.data?.location.id === favorite.id}
                    compareLabel={copy.watchlist.compare}
                    favorite={favorite}
                    key={favorite.id}
                    onCompare={loadFavoriteAsComparison}
                    onLoad={loadFavoriteAsPrimary}
                  />
                ))}
              </div>
            ) : (
              <p className="muted-copy">{copy.watchlist.empty}</p>
            )}
          </section>
        </aside>
      </section>
    </main>
  )
}

export default WeatherPage
