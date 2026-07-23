function buildCharts(labels) {
  return [
    { key: 'temp', label: labels.items.temp, unit: '°C', color: '#f59e0b' },
    { key: 'humidity', label: labels.items.humidity, unit: '%', color: '#38bdf8' },
    { key: 'windSpeed', label: labels.items.windSpeed, unit: 'm/s', color: '#34d399' },
  ]
}

function buildPolyline(data, key, width, height, padding) {
  const values = data.map((item) => item[key])
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1

  return data
    .map((item, index) => {
      const x = padding + (index / (data.length - 1 || 1)) * (width - padding * 2)
      const y = height - padding - ((item[key] - min) / span) * (height - padding * 2)
      return `${x},${y}`
    })
    .join(' ')
}

function ChartCard({ chart, data, labels }) {
  const width = 340
  const height = 180
  const points = buildPolyline(data, chart.key, width, height, 18)
  const values = data.map((item) => item[chart.key]).filter(Number.isFinite)
  const first = data[0]?.[chart.key]
  const last = data.at(-1)?.[chart.key]
  const min = values.length ? Math.min(...values) : 0
  const max = values.length ? Math.max(...values) : 0
  const delta =
    Number.isFinite(first) && Number.isFinite(last) ? Number((last - first).toFixed(1)) : 0
  const summary = `${chart.label}: ${min}${chart.unit} ${labels.min}, ${max}${chart.unit} ${labels.max}, ${last}${chart.unit} ${labels.now}`

  return (
    <article className="chart-card">
      <p className="sr-only">{summary}</p>
      <div className="chart-copy">
        <div>
          <p className="eyebrow">{chart.label}</p>
          <h3>
            {last}
            {chart.unit}
          </h3>
        </div>
        <span
          className={`trend ${
            delta > 0 ? 'trend-warm' : delta < 0 ? 'trend-cool' : 'trend-neutral'
          }`}
        >
          {delta > 0 ? '+' : ''}
          {delta}
          {chart.unit}
        </span>
      </div>

      <svg
        aria-hidden="true"
        className="chart-svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        <polyline
          className="chart-line-ghost"
          fill="none"
          pathLength="100"
          points={points}
          stroke={chart.color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.14"
          strokeWidth="8"
        />
        <polyline
          className="chart-line"
          fill="none"
          pathLength="100"
          points={points}
          stroke={chart.color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
      </svg>

      <div className="chart-axis" aria-hidden="true">
        {data.map((item) => (
          <span key={item.timestamp}>{item.label}</span>
        ))}
      </div>
    </article>
  )
}

function WeatherCharts({ data, labels }) {
  const charts = buildCharts(labels)

  if (!data.length) {
    return (
      <section className="panel charts-panel motion-panel">
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
    <section className="panel charts-panel motion-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{labels.eyebrow}</p>
          <h2>{labels.title}</h2>
        </div>
      </div>

      <div className="charts-grid">
        {charts.map((chart) => (
          <ChartCard chart={chart} data={data} key={chart.key} labels={labels} />
        ))}
      </div>
    </section>
  )
}

export default WeatherCharts
