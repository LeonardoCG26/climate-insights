import {
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from 'react'
import { searchLocations } from '../services/weatherApi.js'

function createSuggestionState() {
  return {
    query: '',
    status: 'idle',
    suggestions: [],
    error: '',
  }
}

export function useCitySuggestions(
  query,
  { enabled = true, limit = 5, minLength = 2, delayMs = 180 } = {}
) {
  const deferredQuery = useDeferredValue(query.trim())
  const [state, setState] = useState(createSuggestionState)
  const requestRef = useRef(0)
  const canSearch = enabled && deferredQuery.length >= minLength

  const commitState = useEffectEvent((requestId, nextState) => {
    if (requestId !== requestRef.current) {
      return
    }

    startTransition(() => {
      setState(nextState)
    })
  })

  useEffect(() => {
    if (!canSearch) {
      requestRef.current += 1
      return
    }

    const requestId = requestRef.current + 1
    requestRef.current = requestId

    const timerId = window.setTimeout(async () => {
      try {
        const suggestions = await searchLocations(deferredQuery, limit)

        commitState(requestId, {
          query: deferredQuery,
          status: 'success',
          suggestions,
          error: '',
        })
      } catch (error) {
        commitState(requestId, {
          query: deferredQuery,
          status: 'error',
          suggestions: [],
          error:
            error instanceof Error ? error.message : 'No se pudieron cargar sugerencias ahora.',
        })
      }
    }, delayMs)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [canSearch, deferredQuery, delayMs, limit])

  if (!canSearch) {
    return {
      status: 'idle',
      suggestions: [],
      error: '',
      hasQuery: false,
    }
  }

  const isCurrentQuery = state.query === deferredQuery

  return {
    status: isCurrentQuery ? state.status : 'loading',
    suggestions: isCurrentQuery ? state.suggestions : [],
    error: isCurrentQuery ? state.error : '',
    hasQuery: true,
  }
}
