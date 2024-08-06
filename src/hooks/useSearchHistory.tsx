import { deduplicate } from '@/helpers'
import { useLocalStorage } from './useLocalStorage'
import { useCallback, useState } from 'react'
import { useDebounce } from './useDebounce'

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>(
    'history',
    []
  )
  const [suggestions, setSuggestions] = useState(searchHistory)

  const append = useCallback(
    (value: string) => {
      if (searchHistory.includes(value)) return
      setSearchHistory(deduplicate([value, ...searchHistory]))
    },
    [searchHistory, setSearchHistory]
  )

  const remove = useCallback(
    (value: string) => {
      setSearchHistory(searchHistory.filter((item) => item !== value))
    },
    [searchHistory, setSearchHistory]
  )

  // Suggestions based on search history according to search query
  const getSuggestions = useDebounce((query: string) => {
    if (!query) return setSuggestions(searchHistory) // Back to default
    setSuggestions(searchHistory.filter((value) => value.includes(query)))
  }, 200)

  return {
    suggestions: !!suggestions.length ? suggestions : searchHistory, // Prevent empty array
    functions: { append, remove, getSuggestions }
  }
}
