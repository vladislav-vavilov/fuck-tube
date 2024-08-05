import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useDebounce } from './useDebounce'
import { API_URL } from '@/constants'
import { getSearchHistory, removeDuplicates } from '@/helpers'

export const useSuggestions = () => {
  const [query, setQuery] = useState('')
  const [historySuggestions, setHistorySuggestions] = useState(getSearchHistory)
  const [querySuggestions, setQuerySuggestions] = useState<string[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)

  const suggestions = useMemo(() => {
    return [
      ...historySuggestions.map((value) => ({ value, type: 'history' })),
      ...querySuggestions.map((value) => ({ value, type: 'query' }))
    ]
  }, [history, querySuggestions])

  // Fetch query suggestions from API
  const fetchQuerySuggestions = useDebounce((query) => {
    fetch(`${API_URL}/suggestions?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        // Remove duplicates from query suggestions that contains history
        return removeDuplicates(data, historySuggestions) as string[]
      })
      .then(setQuerySuggestions)
  }, 500)

  // Filter history suggestions according to query
  const filterHistorySuggestions = (query: string) => {
    setHistorySuggestions((values) => {
      return values.filter((value) => value.includes(query))
    })
  }

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const queryValue = e.target.value

    setQuery(queryValue)
    setSelectedSuggestionIndex(-1)

    if (queryValue) {
      fetchQuerySuggestions(queryValue)
      filterHistorySuggestions(queryValue)
    } else {
      // Set back to default if query is empty
      setQuerySuggestions([])
      setHistorySuggestions(getSearchHistory)
    }
  }

  const prevSuggestionIndex = useCallback(() => {
    if (selectedSuggestionIndex > 0) {
      return selectedSuggestionIndex - 1
    }
    return suggestions.length - 1 // Loop around if at the start
  }, [selectedSuggestionIndex, suggestions])

  const nextSuggestionIndex = useCallback(() => {
    if (selectedSuggestionIndex < suggestions.length - 1) {
      return selectedSuggestionIndex + 1
    }
    return 0 // Loop around if at the end
  }, [selectedSuggestionIndex, suggestions])

  const selectSuggestion = useCallback(
    (direction: 'prev' | 'next') => {
      if (suggestions.length === 0) return

      const newSuggestionIndex =
        direction === 'prev' ? prevSuggestionIndex() : nextSuggestionIndex()
      const selectedSuggestionValue = suggestions[newSuggestionIndex].value

      setSelectedSuggestionIndex(newSuggestionIndex)
      setQuery(selectedSuggestionValue)
    },
    [suggestions, prevSuggestionIndex, nextSuggestionIndex]
  )

  return {
    query,
    suggestions,
    selectedSuggestionIndex,
    func: { onQueryChange, selectSuggestion }
  }
}
