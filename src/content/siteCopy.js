const copy = {
  en: {
    controls: {
      language: 'Language',
      languageLeft: 'EN',
      languageRight: 'ES',
      theme: 'Theme',
      themeLeft: 'Dark',
      themeRight: 'Light',
    },
    hero: {
      eyebrow: 'Climate Insights',
      titleLead: 'Live weather signals',
      titleAccent: 'for every city you track.',
      text:
        'A real-time weather dashboard with fast city search, side-by-side comparison, and visual trends for everyday planning.',
      summary: [
        { label: 'Search', value: 'Autocomplete + geolocation' },
        { label: 'Forecast', value: 'Current + 5 day outlook' },
        { label: 'Compare', value: 'Two cities, one view' },
        { label: 'Persist', value: 'Favorites in localStorage' },
      ],
    },
    config: {
      eyebrow: 'Configuration',
      title: 'Add your API key',
      text:
        'Create a .env file with VITE_OPENWEATHER_API_KEY=your_api_key. The project is already wired for geocoding, current weather, forecast, and autocomplete.',
    },
    search: {
      primaryTitle: 'Main city',
      primaryDescription: 'Type a city and pick a suggestion to load the main dashboard.',
      compareTitle: 'Compare city',
      compareDescription: 'Find a second city and compare it side by side with the base city.',
      placeholder: 'e.g. Mexico City, Tokyo, Buenos Aires',
      searchCta: 'Search',
      compareCta: 'Compare',
      useLocation: 'Use location',
      loading: 'Loading...',
      suggestionsLoading: 'Finding cities...',
      noMatches: 'No matches for that search.',
    },
    panels: {
      error: 'Error',
      retry: 'Retry',
      empty: 'Empty',
      comparison: 'Comparison',
      comparisonEmpty: 'Load a second city to compare temperature, humidity, and wind in real time.',
      primaryEmpty:
        'Search for a city, pick a suggestion, or use your location to open the dashboard.',
      missingKey: 'Add your OpenWeather API key to enable the dashboard.',
      primaryLoading: 'Fetching current weather, trends, and forecast...',
      comparisonLoading: 'Preparing the city comparison...',
    },
    current: {
      title: 'Current weather',
      baseTitle: 'Base city',
      compareTitle: 'Compared city',
      save: 'Save',
      saved: 'Saved',
      feelsLike: 'Feels like',
      high: 'High',
      low: 'Low',
      humidity: 'Humidity',
      wind: 'Wind',
      visibility: 'Visibility',
      cloudiness: 'Cloud cover',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
    },
    forecast: {
      eyebrow: 'Forecast',
      title: 'Next 5 days',
      empty: 'Not enough data to build the forecast yet.',
      humidity: 'humidity',
      rain: 'rain',
    },
    charts: {
      eyebrow: 'Trends',
      title: 'Next hours',
      empty: 'There are not enough points to draw the chart yet.',
      items: {
        temp: 'Temperature',
        humidity: 'Humidity',
        windSpeed: 'Wind',
      },
    },
    comparison: {
      eyebrow: 'Comparison',
      temperature: 'Temperature',
      humidity: 'Humidity',
      wind: 'Wind',
    },
    watchlist: {
      eyebrow: 'Watchlist',
      title: 'Favorites',
      empty: 'Save cities from the main card to reuse them instantly.',
      compare: 'Compare',
    },
    errors: {
      missingApiKey: 'Add VITE_OPENWEATHER_API_KEY before requesting weather data.',
      invalidApiKey:
        'OpenWeather rejected the API key. New keys can take a few minutes to activate.',
      emptyCity: 'Type a valid city before searching.',
      emptyCompare: 'Type a city before comparing.',
      cityNotFound: 'We could not find that city. Try city plus country.',
      geolocationUnavailable: 'Your browser does not support geolocation.',
      geolocationFailed: 'Could not access your location.',
      queryInvalid: 'Type a valid city to search.',
      unexpected: 'Something went wrong. Try again.',
    },
  },
  es: {
    controls: {
      language: 'Idioma',
      languageLeft: 'EN',
      languageRight: 'ES',
      theme: 'Tema',
      themeLeft: 'Oscuro',
      themeRight: 'Claro',
    },
    hero: {
      eyebrow: 'Climate Insights',
      titleLead: 'Señales climáticas en vivo',
      titleAccent: 'para cada ciudad que sigues.',
      text:
        'Un dashboard de clima en tiempo real con búsqueda rápida, comparador entre ciudades y tendencias visuales para planear mejor.',
      summary: [
        { label: 'Búsqueda', value: 'Autocomplete + geolocalización' },
        { label: 'Pronóstico', value: 'Actual + 5 días' },
        { label: 'Comparador', value: 'Dos ciudades, una vista' },
        { label: 'Persistencia', value: 'Favoritos en localStorage' },
      ],
    },
    config: {
      eyebrow: 'Configuración',
      title: 'Agrega tu API key',
      text:
        'Crea un archivo .env con VITE_OPENWEATHER_API_KEY=tu_api_key. El proyecto ya está preparado para geocoding, clima actual, pronóstico y autocomplete.',
    },
    search: {
      primaryTitle: 'Ciudad principal',
      primaryDescription: 'Escribe una ciudad y elige una sugerencia para cargar el dashboard.',
      compareTitle: 'Comparar ciudad',
      compareDescription: 'Busca una segunda ciudad y compárala lado a lado con la ciudad base.',
      placeholder: 'Ej. Mexico City, Tokyo, Buenos Aires',
      searchCta: 'Buscar',
      compareCta: 'Comparar',
      useLocation: 'Usar ubicación',
      loading: 'Cargando...',
      suggestionsLoading: 'Buscando ciudades...',
      noMatches: 'No hay coincidencias para esa búsqueda.',
    },
    panels: {
      error: 'Error',
      retry: 'Reintentar',
      empty: 'Sin datos',
      comparison: 'Comparación',
      comparisonEmpty:
        'Carga una segunda ciudad para comparar temperatura, humedad y viento en tiempo real.',
      primaryEmpty:
        'Busca una ciudad, elige una sugerencia o usa tu ubicación para abrir el dashboard.',
      missingKey: 'Agrega tu API key de OpenWeather para activar el dashboard.',
      primaryLoading: 'Consultando clima actual, tendencias y pronóstico...',
      comparisonLoading: 'Preparando la comparación entre ciudades...',
    },
    current: {
      title: 'Clima actual',
      baseTitle: 'Ciudad base',
      compareTitle: 'Ciudad comparada',
      save: 'Guardar',
      saved: 'Guardada',
      feelsLike: 'Sensación',
      high: 'Max',
      low: 'Min',
      humidity: 'Humedad',
      wind: 'Viento',
      visibility: 'Visibilidad',
      cloudiness: 'Nubosidad',
      sunrise: 'Amanecer',
      sunset: 'Atardecer',
    },
    forecast: {
      eyebrow: 'Pronóstico',
      title: 'Próximos 5 días',
      empty: 'Todavía no hay suficientes datos para construir el pronóstico.',
      humidity: 'humedad',
      rain: 'lluvia',
    },
    charts: {
      eyebrow: 'Tendencias',
      title: 'Próximas horas',
      empty: 'Todavía no hay suficientes puntos para dibujar la gráfica.',
      items: {
        temp: 'Temperatura',
        humidity: 'Humedad',
        windSpeed: 'Viento',
      },
    },
    comparison: {
      eyebrow: 'Comparador',
      temperature: 'Temperatura',
      humidity: 'Humedad',
      wind: 'Viento',
    },
    watchlist: {
      eyebrow: 'Watchlist',
      title: 'Favoritos',
      empty: 'Guarda ciudades desde la tarjeta principal para reutilizarlas al instante.',
      compare: 'Comparar',
    },
    errors: {
      missingApiKey: 'Agrega VITE_OPENWEATHER_API_KEY antes de consultar el clima.',
      invalidApiKey:
        'OpenWeather rechazó la API key. Las claves nuevas pueden tardar unos minutos en activarse.',
      emptyCity: 'Escribe una ciudad válida antes de buscar.',
      emptyCompare: 'Escribe una ciudad antes de comparar.',
      cityNotFound: 'No encontramos esa ciudad. Intenta con ciudad y país.',
      geolocationUnavailable: 'Tu navegador no soporta geolocalización.',
      geolocationFailed: 'No fue posible obtener tu ubicación.',
      queryInvalid: 'Escribe una ciudad válida para buscar.',
      unexpected: 'Ocurrió un error inesperado. Intenta otra vez.',
    },
  },
}

const errorMatchers = [
  ['configura vite_openweather_api_key', 'missingApiKey'],
  ['add vite_openweather_api_key', 'missingApiKey'],
  ['openweather rechazo la api key', 'invalidApiKey'],
  ['openweather rejected the api key', 'invalidApiKey'],
  ['invalid api key', 'invalidApiKey'],
  ['escribe una ciudad antes de buscar', 'emptyCity'],
  ['type a valid city before searching', 'emptyCity'],
  ['escribe una ciudad para comparar', 'emptyCompare'],
  ['type a city before comparing', 'emptyCompare'],
  ['no encontramos esa ciudad', 'cityNotFound'],
  ['we could not find that city', 'cityNotFound'],
  ['tu navegador no soporta geolocalizacion', 'geolocationUnavailable'],
  ['your browser does not support geolocation', 'geolocationUnavailable'],
  ['no fue posible obtener tu ubicacion', 'geolocationFailed'],
  ['could not access your location', 'geolocationFailed'],
  ['escribe una ciudad valida para buscar', 'queryInvalid'],
  ['type a valid city to search', 'queryInvalid'],
  ['ocurrio un error inesperado', 'unexpected'],
  ['something went wrong', 'unexpected'],
]

export function getCopy(language) {
  return copy[language] ?? copy.en
}

export function translateErrorMessage(message, language) {
  const value = (message ?? '').trim()

  if (!value) {
    return value
  }

  const dictionary = getCopy(language).errors
  const normalized = value.toLowerCase()

  for (const [needle, key] of errorMatchers) {
    if (normalized.includes(needle)) {
      return dictionary[key]
    }
  }

  return value
}
