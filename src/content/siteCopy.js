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
        'Set OPENWEATHER_API_KEY in your environment (.env for local dev, project settings in production). The key stays server-side and is never exposed to the browser.',
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
      currentLocation: 'Current location',
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
      min: 'min',
      max: 'max',
      now: 'now',
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
      missingApiKey: 'The weather service is not configured on the server.',
      invalidApiKey:
        'OpenWeather rejected the API key. New keys can take a few minutes to activate.',
      emptyCity: 'Type a valid city before searching.',
      emptyCompare: 'Type a city before comparing.',
      cityNotFound: 'We could not find that city. Try city plus country.',
      geolocationUnavailable: 'Your browser does not support geolocation.',
      geolocationFailed: 'Could not access your location.',
      queryInvalid: 'Type a valid city to search.',
      searchFailed: 'We could not search for that city.',
      locationFailed: 'We could not resolve your location.',
      weatherFailed: 'We could not load the current weather.',
      forecastFailed: 'We could not load the forecast.',
      upstream: 'The weather service is temporarily unavailable.',
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
        'Configura OPENWEATHER_API_KEY en tu entorno (.env en local, ajustes del proyecto en producción). La clave vive en el servidor y nunca se expone al navegador.',
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
      currentLocation: 'Ubicación actual',
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
      min: 'mín',
      max: 'máx',
      now: 'ahora',
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
      missingApiKey: 'El servicio de clima no está configurado en el servidor.',
      invalidApiKey:
        'OpenWeather rechazó la API key. Las claves nuevas pueden tardar unos minutos en activarse.',
      emptyCity: 'Escribe una ciudad válida antes de buscar.',
      emptyCompare: 'Escribe una ciudad antes de comparar.',
      cityNotFound: 'No encontramos esa ciudad. Intenta con ciudad y país.',
      geolocationUnavailable: 'Tu navegador no soporta geolocalización.',
      geolocationFailed: 'No fue posible obtener tu ubicación.',
      queryInvalid: 'Escribe una ciudad válida para buscar.',
      searchFailed: 'No se pudo buscar esa ciudad.',
      locationFailed: 'No se pudo resolver tu ubicación.',
      weatherFailed: 'No se pudo cargar el clima actual.',
      forecastFailed: 'No se pudo cargar el pronóstico.',
      upstream: 'El servicio de clima no está disponible por el momento.',
      unexpected: 'Ocurrió un error inesperado. Intenta otra vez.',
    },
  },
}

export function getCopy(language) {
  return copy[language] ?? copy.en
}

// Errors are carried as stable codes (keys of the `errors` dictionary), so we
// look them up directly. Unknown codes fall back to a generic message.
export function translateErrorMessage(code, language) {
  const dictionary = getCopy(language).errors
  return dictionary[code] ?? dictionary.unexpected
}
