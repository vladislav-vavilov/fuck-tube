import { deduplicate } from '@/helpers'
import { useLocalStorage } from './useLocalStorage'
import { useCallback, useState } from 'react'
import { useDebounce } from './useDebounce'

export const useSearchHistory = () => {
  const [history, setHistory] = useLocalStorage<string[]>('history', [])
  const [historySuggestions, setHistorySuggestions] = useState(history)

  const appendHistory = useCallback(
    (value: string) => {
      if (history.includes(value)) return
      setHistory(deduplicate([value, ...history]))
    },
    [history, setHistory]
  )

  const removeFromHistory = useCallback(
    (value: string) => {
      setHistory(history.filter((item) => item !== value))
    },
    [history, setHistory]
  )

  // Suggestions based on search history according to search query
  const getHistorySuggestions = useDebounce((query: string) => {
    if (!query) return setHistorySuggestions(history) // Back to default
    setHistorySuggestions(history.filter((value) => value.includes(query)))
  }, 200)

  return {
    suggestions: !!historySuggestions.length ? historySuggestions : history, // Prevent empty array
    functions: { appendHistory, removeFromHistory, getHistorySuggestions }
  }
}
