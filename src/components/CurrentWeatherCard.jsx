import WeatherIcon from './WeatherIcon'

function CurrentWeatherCard({
  data,
  title,
  isFavorite = false,
  onToggleFavorite,
  variant = 'default',
  labels,
}) {
  const current = data.current
  const isCompact = variant === 'compact'

  return (
    <section className={`panel current-card current-card-${variant} motion-panel`}>
      <div className="current-card-top">
        <div>
          <p className="eyebrow">{title}</p>
          <h2>{data.location.label}</h2>
          <p className="muted-copy">{current.observedLabel}</p>
        </div>

        {onToggleFavorite ? (
          <button
            className={`icon-button${isFavorite ? ' icon-button-active' : ''}`}
            onClick={onToggleFavorite}
            type="button"
          >
            {isFavorite ? labels.saved : labels.save}
          </button>
        ) : null}
      </div>

      <div className="current-card-hero">
        <div className="temperature-block">
          <div className="weather-icon-wrap">
            <WeatherIcon
              className="weather-icon"
              conditionCode={current.conditionCode}
              description={current.description}
              iconUrl={current.iconUrl}
            />
          </div>
          <div className="temperature-copy">
            <strong>{current.temperature}°</strong>
            <p>{current.description}</p>
          </div>
        </div>

        <div className="temperature-meta">
          <span>
            {labels.feelsLike} {current.feelsLike}°
          </span>
          <span>
            {labels.high} {current.high}°
          </span>
          <span>
            {labels.low} {current.low}°
          </span>
        </div>
      </div>

      <div className={`metric-grid${isCompact ? ' metric-grid-compact' : ''}`}>
        <article>
          <span>{labels.humidity}</span>
          <strong>{current.humidity}%</strong>
        </article>
        <article>
          <span>{labels.wind}</span>
          <strong>{current.windSpeed} m/s</strong>
        </article>
        <article>
          <span>{labels.visibility}</span>
          <strong>{current.visibilityKm} km</strong>
        </article>
        <article>
          <span>{labels.cloudiness}</span>
          <strong>{current.cloudiness}%</strong>
        </article>
        {!isCompact ? (
          <>
            <article>
              <span>{labels.sunrise}</span>
              <strong>{current.sunriseLabel}</strong>
            </article>
            <article>
              <span>{labels.sunset}</span>
              <strong>{current.sunsetLabel}</strong>
            </article>
          </>
        ) : null}
      </div>
    </section>
  )
}

export default CurrentWeatherCard
