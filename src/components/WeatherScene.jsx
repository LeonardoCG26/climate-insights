import cloudScene from '../assets/weather-scenes/cloud.svg'
import cloudSunScene from '../assets/weather-scenes/cloud-sun.svg'
import dropScene from '../assets/weather-scenes/dropnew.svg'
import stormScene from '../assets/weather-scenes/storm.svg'

const DEFAULT_SCENE_STORAGE_KEY = 'climate-insights:hero-default-scene'
const DEFAULT_SCENE_SEQUENCE = ['clouds', 'clear', 'rain']

const sceneArt = {
  atmosphere: cloudScene,
  clear: cloudSunScene,
  clouds: cloudScene,
  default: cloudScene,
  rain: cloudScene,
  snow: cloudScene,
  storm: stormScene,
}

function readNextDefaultScene() {
  try {
    const rawIndex = Number(localStorage.getItem(DEFAULT_SCENE_STORAGE_KEY))
    const currentIndex = Number.isInteger(rawIndex) ? rawIndex : -1
    const nextIndex = (currentIndex + 1) % DEFAULT_SCENE_SEQUENCE.length

    localStorage.setItem(DEFAULT_SCENE_STORAGE_KEY, String(nextIndex))
    return DEFAULT_SCENE_SEQUENCE[nextIndex]
  } catch {
    return DEFAULT_SCENE_SEQUENCE[0]
  }
}

const PAGE_SCENE_VARIANT = readNextDefaultScene()

function resolveHeroScene(scene) {
  if (scene === 'storm') {
    return 'storm'
  }

  return PAGE_SCENE_VARIANT
}

function DropCluster() {
  return (
    <div className="hero-drop-cluster" aria-hidden="true">
      <img className="hero-drop hero-drop-1" src={dropScene} alt="" />
      <img className="hero-drop hero-drop-2" src={dropScene} alt="" />
      <img className="hero-drop hero-drop-3" src={dropScene} alt="" />
      <img className="hero-drop hero-drop-4" src={dropScene} alt="" />
    </div>
  )
}

function CloudLayer({ className = '', src = cloudScene }) {
  return <img className={`hero-scene-layer ${className}`.trim()} src={src} alt="" />
}

function WeatherScene({ scene }) {
  const resolvedScene = resolveHeroScene(scene)
  const art = sceneArt[resolvedScene] ?? sceneArt.default

  return (
    <div className={`hero-scene hero-scene-${resolvedScene}`} aria-hidden="true">
      {resolvedScene === 'clear' ? (
        <CloudLayer className="hero-scene-secondary hero-scene-secondary-clear" />
      ) : null}
      {resolvedScene === 'clouds' ? (
        <CloudLayer className="hero-scene-secondary hero-scene-secondary-clouds" />
      ) : null}
      {resolvedScene === 'atmosphere' ? (
        <CloudLayer className="hero-scene-secondary hero-scene-secondary-atmosphere" />
      ) : null}
      {resolvedScene === 'snow' ? (
        <CloudLayer className="hero-scene-secondary hero-scene-secondary-snow" />
      ) : null}

      <img className={`hero-scene-art hero-scene-art-${resolvedScene}`} src={art} alt="" />

      {resolvedScene === 'rain' ? <DropCluster /> : null}
    </div>
  )
}

export default WeatherScene
