import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'
import { remove } from '@/helpers'

const getSearchHistory = () => {
  if (typeof window === 'undefined') return []

  const value = localStorage.getItem('history')
  if (!value) return []

  try {
    const parsedValue = JSON.parse(value)
    if (Array.isArray(parsedValue)) return parsedValue.map(String)

    return []
  } catch (error) {
    console.log(error)
    return []
  }
}

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]) // Entire search history
  const [historySuggestions, setHistorySuggestions] = useState<string[]>([]) // Filtered by getHistorySuggestions

  // useEffect instead of useState callback to prevent hydration errors
  useEffect(() => {
    const history = getSearchHistory()
    setHistory(history)
    setHistorySuggestions(history)
  }, [])

  const set = (value: string[] | ((value: string[]) => string[])) => {
    setHistory(value)
    const valueToStore = value instanceof Function ? value(history) : value
    localStorage.setItem('history', JSON.stringify(valueToStore))
  }

  const appendHistory = useCallback(
    (value: string) => {
      if (history.includes(value)) return

      setHistorySuggestions((history) => [value, ...history])
      set((history) => [...history, value])
    },
    [history]
  )

  const removeFromHistory = useCallback((value: string) => {
    setHistorySuggestions((history) =>
      remove({ from: history, toRemove: value })
    ) // From suggestions
    set((history) => remove({ from: history, toRemove: value })) // From entire history
  }, [])

  // Suggestions based on search history according to search query
  const getHistorySuggestions = useCallback(
    useDebounce((query: string) => {
      if (!query) return setHistorySuggestions(history) // Back to default
      setHistorySuggestions(history.filter((value) => value.includes(query)))
    }, 200),
    [history]
  )

  return {
    historySuggestions,
    functions: { appendHistory, removeFromHistory, getHistorySuggestions }
  }
}
