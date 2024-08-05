import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useDebounce } from './useDebounce'
import { API_URL } from '@/constants'
import { removeDuplicates } from '@/helpers'
import { Suggestion } from '@/types'
import { useSearchHistory } from './useSearchHistory'

export const useSuggestions = () => {
  const [query, setQuery] = useState('')
  const {
    searchHistory: searchHistorySuggestions,
    func: { filter: filterSearchHistory, resetFilter, append, remove }
  } = useSearchHistory()
  const [querySuggestions, setQuerySuggestions] = useState<string[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)

  const suggestions: Suggestion[] = useMemo(() => {
    return [
      ...searchHistorySuggestions.map((value) => {
        return { value, type: 'history' } as Suggestion
      }),
      ...querySuggestions.map((value) => {
        return { value, type: 'query' } as Suggestion
      })
    ]
  }, [searchHistorySuggestions, querySuggestions])

  // Fetch query suggestions from API
  const fetchQuerySuggestions = useDebounce((query) => {
    fetch(`${API_URL}/suggestions?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        // Remove duplicates from query suggestions that contains history
        return removeDuplicates(data, searchHistorySuggestions) as string[]
      })
      .then(setQuerySuggestions)
  }, 500)

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const queryValue = e.target.value

    setQuery(queryValue)
    setSelectedSuggestionIndex(-1)

    if (queryValue) {
      fetchQuerySuggestions(queryValue)
      filterSearchHistory(queryValue) // Filter search history according to query
    } else {
      // Set back to default if query is empty
      setQuerySuggestions([])
      resetFilter()
    }
  }

  const selectSuggestion = (suggestionIndex: number) => {
    if (suggestions.length === 0) return

    const selectedSuggestionValue = suggestions[suggestionIndex].value
    setSelectedSuggestionIndex(suggestionIndex)
    setQuery(selectedSuggestionValue) // Set query to suggestion value
  }

  const prevSuggestionIndex = () => {
    if (selectedSuggestionIndex > 0) {
      return selectedSuggestionIndex - 1
    }
    return suggestions.length - 1 // Loop around if at the start
  }

  const nextSuggestionIndex = () => {
    if (selectedSuggestionIndex < suggestions.length - 1) {
      return selectedSuggestionIndex + 1
    }
    return 0 // Loop around if at the end
  }

  // Select previous suggestion
  const prevSuggestion = useCallback(() => {
    selectSuggestion(prevSuggestionIndex())
  }, [selectSuggestion, prevSuggestionIndex])

  // Select next suggestion
  const nextSuggestion = useCallback(() => {
    selectSuggestion(nextSuggestionIndex())
  }, [selectSuggestion, prevSuggestionIndex])

  // Remove suggestion from query suggestions and add to search history
  const appendSearchHistory = (value: string) => {
    setQuerySuggestions((querySuggestions) => {
      return querySuggestions.filter((item) => item !== value)
    })
    append(value)
  }

  return {
    query,
    suggestions,
    selectedSuggestionIndex,
    func: {
      onQueryChange,
      prevSuggestion,
      nextSuggestion,
      appendSearchHistory,
      removeFromSearchHistory: remove
    }
  }
}
