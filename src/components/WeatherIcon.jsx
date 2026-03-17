const CLOUD_BACK_PATH =
  'M14 46c-4.9 0-8.8-3.6-8.8-8 0-3.8 2.9-7.1 6.7-7.8C13.2 24.3 18.6 20 24.9 20c5.8 0 10.8 3.2 13.4 8.1.9-.2 1.8-.3 2.7-.3 5.7 0 10.3 4.3 10.3 9.6 0 .8-.1 1.6-.3 2.3 2.7 1.3 4.4 4 4.4 7.1 0 4.8-3.9 8.7-8.7 8.7H14Z'
const CLOUD_FRONT_PATH =
  'M24 48c-3.9 0-7.1-2.9-7.1-6.4 0-3.1 2.4-5.7 5.5-6.2 1.7-3.7 5.4-6.3 9.7-6.3 4.1 0 7.6 2.1 9.4 5.4.6-.1 1.2-.2 1.8-.2 4.1 0 7.4 3.1 7.4 6.9 0 .6-.1 1.1-.2 1.6 1.9.9 3.2 2.8 3.2 5 0 3.4-2.9 6.2-6.5 6.2H24Z'
const DROP_PATH =
  'M10 1C7.2 6.2 4 9.4 4 13.9c0 4.2 2.7 7.5 6 8.8 3.3-1.3 6-4.6 6-8.8C16 9.4 12.8 6.2 10 1Z'

function resolveIconVariant(conditionCode = '') {
  const prefix = String(conditionCode).slice(0, 2)
  const night = String(conditionCode).endsWith('n')

  if (prefix === '01') {
    return night ? 'clear-night' : 'clear-day'
  }

  if (prefix === '02') {
    return night ? 'partly-cloudy-night' : 'partly-cloudy-day'
  }

  if (prefix === '03' || prefix === '04') {
    return 'clouds'
  }

  if (prefix === '09') {
    return 'showers'
  }

  if (prefix === '10') {
    return night ? 'rain-night' : 'rain-day'
  }

  if (prefix === '11') {
    return 'storm'
  }

  if (prefix === '13') {
    return 'snow'
  }

  if (prefix === '50') {
    return 'mist'
  }

  return 'fallback'
}

function IconRoot({ className, description, variant, children }) {
  return (
    <svg
      aria-label={description}
      className={`${className} weather-icon-art weather-icon-art-${variant}`.trim()}
      role="img"
      viewBox="0 0 64 64"
    >
      {children}
    </svg>
  )
}

function SunGlyph({ className = '', transform = '' }) {
  return (
    <g className={`weather-icon-sun-glyph ${className}`.trim()} transform={transform}>
      <circle className="weather-icon-sun-glow" cx="20" cy="20" r="16" />
      <g className="weather-icon-sun-rays" strokeLinecap="round">
        <path d="M20 5v5" />
        <path d="M20 30v5" />
        <path d="M5 20h5" />
        <path d="M30 20h5" />
        <path d="M9.5 9.5l3.5 3.5" />
        <path d="M27 27l3.5 3.5" />
        <path d="M9.5 30.5l3.5-3.5" />
        <path d="M27 13l3.5-3.5" />
      </g>
      <circle className="weather-icon-sun-core" cx="20" cy="20" r="9" />
      <circle className="weather-icon-sun-inner" cx="20" cy="20" r="5.9" />
    </g>
  )
}

function MoonGlyph({ className = '', transform = '' }) {
  return (
    <g className={`weather-icon-moon-glyph ${className}`.trim()} transform={transform}>
      <circle className="weather-icon-night-glow" cx="24" cy="22" r="16" />
      <circle className="weather-icon-star weather-icon-star-lg" cx="10" cy="11" r="2.2" />
      <circle className="weather-icon-star weather-icon-star-sm" cx="37" cy="9" r="1.5" />
      <circle className="weather-icon-star weather-icon-star-xs" cx="38" cy="30" r="1.2" />
      <path
        className="weather-icon-moon-shadow"
        d="M31 8c-2.8 7.2-9.8 12.3-17.9 12.3-3.1 0-6.1-.8-8.7-2.2 2 10.2 10.8 18 21.7 18 3.9 0 7.6-1 10.8-2.8-3.6-3-6-7.5-6-12.5 0-4.7 2-9.1 5.4-12.1A18.5 18.5 0 0 0 31 8Z"
      />
      <path
        className="weather-icon-moon-core"
        d="M31 8c-2.8 7.2-9.8 12.3-17.9 12.3-3.1 0-6.1-.8-8.7-2.2 2 10.2 10.8 18 21.7 18 3.9 0 7.6-1 10.8-2.8-3.6-3-6-7.5-6-12.5 0-4.7 2-9.1 5.4-12.1A18.5 18.5 0 0 0 31 8Z"
      />
    </g>
  )
}

function CloudGlyph({ transform = '', tone = 'default' }) {
  const toneClass = `weather-icon-cloud-${tone}`

  return (
    <g className={`weather-icon-cloud-group ${toneClass}`.trim()} transform={transform}>
      <path className="weather-icon-cloud-back" d={CLOUD_BACK_PATH} />
      <path className="weather-icon-cloud-front" d={CLOUD_FRONT_PATH} />
    </g>
  )
}

function RainGlyph({ transform = '', compact = false }) {
  return (
    <g className={`weather-icon-rain-glyph${compact ? ' weather-icon-rain-glyph-compact' : ''}`} transform={transform}>
      <path className="weather-icon-rain-drop" d={DROP_PATH} transform="translate(18 42) scale(0.74)" />
      <path className="weather-icon-rain-drop" d={DROP_PATH} transform="translate(28 46) scale(0.62)" />
      <path className="weather-icon-rain-drop" d={DROP_PATH} transform="translate(38 42) scale(0.82)" />
    </g>
  )
}

function SnowGlyph({ transform = '' }) {
  return (
    <g className="weather-icon-snow-glyph" transform={transform}>
      <g className="weather-icon-snowflake" transform="translate(22 46)">
        <path d="M0-4v8" />
        <path d="M-3.5-2l7 4" />
        <path d="M-3.5 2l7-4" />
      </g>
      <g className="weather-icon-snowflake" transform="translate(32 50)">
        <path d="M0-4v8" />
        <path d="M-3.5-2l7 4" />
        <path d="M-3.5 2l7-4" />
      </g>
      <g className="weather-icon-snowflake" transform="translate(42 46)">
        <path d="M0-4v8" />
        <path d="M-3.5-2l7 4" />
        <path d="M-3.5 2l7-4" />
      </g>
    </g>
  )
}

function FogGlyph() {
  return (
    <g className="weather-icon-fog-glyph">
      <path className="weather-icon-fog-line" d="M16 41h30" />
      <path className="weather-icon-fog-line weather-icon-fog-line-short" d="M12 47h26" />
      <path className="weather-icon-fog-line" d="M20 53h28" />
    </g>
  )
}

function LightningGlyph() {
  return (
    <path
      className="weather-icon-bolt"
      d="M31 39h6l-4.2 7.2h5.7L29 59.5l3-9.4h-5.5L31 39Z"
    />
  )
}

function ClearDayIcon({ className, description }) {
  return (
    <IconRoot className={className} description={description} variant="clear">
      <SunGlyph transform="translate(12 12)" />
    </IconRoot>
  )
}

function ClearNightIcon({ className, description }) {
  return (
    <IconRoot className={className} description={description} variant="clear weather-icon-art-night">
      <MoonGlyph transform="translate(10 10)" />
    </IconRoot>
  )
}

function PartlyCloudyIcon({ className, description, night = false }) {
  return (
    <IconRoot className={className} description={description} variant="partly-cloudy">
      {night ? <MoonGlyph transform="translate(6 4) scale(0.8)" /> : <SunGlyph transform="translate(8 6) scale(0.82)" />}
      <CloudGlyph transform="translate(2 4) scale(0.94)" />
    </IconRoot>
  )
}

function CloudyIcon({ className, description }) {
  return (
    <IconRoot className={className} description={description} variant="clouds">
      <CloudGlyph transform="translate(6 0) scale(0.86)" tone="muted" />
      <CloudGlyph transform="translate(-2 5) scale(1.02)" />
    </IconRoot>
  )
}

function RainyIcon({ className, description, night = false }) {
  return (
    <IconRoot className={className} description={description} variant="rain">
      {night ? <MoonGlyph transform="translate(4 4) scale(0.74)" /> : <SunGlyph transform="translate(6 6) scale(0.72)" />}
      <CloudGlyph transform="translate(-1 1) scale(1.02)" tone="storm" />
      <RainGlyph compact={night} />
    </IconRoot>
  )
}

function ShowersIcon({ className, description }) {
  return (
    <IconRoot className={className} description={description} variant="rain">
      <CloudGlyph transform="translate(0 2) scale(1.02)" tone="storm" />
      <RainGlyph />
    </IconRoot>
  )
}

function StormIcon({ className, description }) {
  return (
    <IconRoot className={className} description={description} variant="storm">
      <CloudGlyph transform="translate(0 0) scale(1.02)" tone="storm" />
      <LightningGlyph />
      <RainGlyph transform="translate(0 2)" compact />
    </IconRoot>
  )
}

function SnowIcon({ className, description }) {
  return (
    <IconRoot className={className} description={description} variant="snow">
      <CloudGlyph transform="translate(0 2) scale(1.02)" />
      <SnowGlyph />
    </IconRoot>
  )
}

function MistIcon({ className, description }) {
  return (
    <IconRoot className={className} description={description} variant="mist">
      <CloudGlyph transform="translate(6 -2) scale(0.82)" tone="muted" />
      <FogGlyph />
    </IconRoot>
  )
}

function WeatherIcon({ className, conditionCode, description, iconUrl }) {
  const variant = resolveIconVariant(conditionCode)

  switch (variant) {
    case 'clear-day':
      return <ClearDayIcon className={className} description={description} />
    case 'clear-night':
      return <ClearNightIcon className={className} description={description} />
    case 'partly-cloudy-day':
      return <PartlyCloudyIcon className={className} description={description} />
    case 'partly-cloudy-night':
      return <PartlyCloudyIcon className={className} description={description} night />
    case 'clouds':
      return <CloudyIcon className={className} description={description} />
    case 'showers':
      return <ShowersIcon className={className} description={description} />
    case 'rain-day':
      return <RainyIcon className={className} description={description} />
    case 'rain-night':
      return <RainyIcon className={className} description={description} night />
    case 'storm':
      return <StormIcon className={className} description={description} />
    case 'snow':
      return <SnowIcon className={className} description={description} />
    case 'mist':
      return <MistIcon className={className} description={description} />
    default:
      return <img alt={description} className={className} src={iconUrl} />
  }
}

export default WeatherIcon
