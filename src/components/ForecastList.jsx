import WeatherIcon from './WeatherIcon'

function ForecastList({ days, labels }) {
  if (!days.length) {
    return (
      <section className="panel forecast-panel motion-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{labels.eyebrow}</p>
            <h2>{labels.title}</h2>
          </div>
        </div>
        <p className="muted-copy">{labels.empty}</p>
      </section>
    )
  }

  return (
    <section className="panel forecast-panel motion-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{labels.eyebrow}</p>
          <h2>{labels.title}</h2>
        </div>
      </div>

      <div className="forecast-list">
        {days.map((day) => (
          <article className="forecast-item" key={day.date}>
            <div className="forecast-heading">
              <div>
                <strong>{day.label}</strong>
                <p>{day.description}</p>
              </div>
              <div className="forecast-icon-wrap">
                <WeatherIcon
                  className="forecast-icon"
                  conditionCode={day.conditionCode}
                  description={day.description}
                  iconUrl={day.iconUrl}
                />
              </div>
            </div>

            <div className="forecast-meta">
              <span>
                {day.tempMax}° / {day.tempMin}°
              </span>
              <span>
                {day.humidity}% {labels.humidity}
              </span>
              <span>{day.windSpeed} m/s</span>
              <span>
                {day.precipitationChance}% {labels.rain}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ForecastList
