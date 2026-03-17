import { useEffect, useState } from 'react'
import './App.css'
import WeatherPage from './pages/WeatherPage.jsx'

const LANGUAGE_STORAGE_KEY = 'climate-insights:language'
const THEME_STORAGE_KEY = 'climate-insights:theme'

function readStoredPreference(storageKey, fallbackValue) {
  try {
    return localStorage.getItem(storageKey) ?? fallbackValue
  } catch {
    return fallbackValue
  }
}

function App() {
  const [language, setLanguage] = useState(() => readStoredPreference(LANGUAGE_STORAGE_KEY, 'en'))
  const [theme, setTheme] = useState(() => readStoredPreference(THEME_STORAGE_KEY, 'dark'))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.lang = language

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    } catch {
      // Ignore private mode or storage quota failures.
    }
  }, [language, theme])

  return (
    <WeatherPage
      language={language}
      onToggleLanguage={() => {
        setLanguage((current) => (current === 'en' ? 'es' : 'en'))
      }}
      onToggleTheme={() => {
        setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
      }}
      theme={theme}
    />
  )
}

export default App
