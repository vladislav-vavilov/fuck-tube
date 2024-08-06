import { deduplicate } from '@/helpers'
import { useLocalStorage } from './useLocalStorage'
import { useCallback } from 'react'
import { useDebounce } from './useDebounce'

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>(
    'history',
    []
  )
  const [set, setStateOnly] = setSearchHistory

  const append = useCallback(
    (value: string) => {
      if (searchHistory.includes(value)) return
      set(deduplicate([value, ...searchHistory]))
    },
    [searchHistory, set]
  )

  const remove = useCallback(
    (value: string) => {
      set(searchHistory.filter((item) => item !== value))
    },
    [searchHistory, set]
  )

  // Suggestions based on search history according to search query
  const getSuggestions = useDebounce((query: string) => {
    if (!query) return setStateOnly(searchHistory) // Back to default
    setStateOnly(searchHistory.filter((value) => value.includes(query)))
  }, 200)

  return {
    searchHistory,
    functions: { append, remove, getSuggestions }
  }
}
