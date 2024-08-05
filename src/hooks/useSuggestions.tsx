import { ChangeEvent, useCallback, useState } from 'react'
import { useDebounce } from './useDebounce'
import { API_URL } from '@/constants'
import { getSearchHistory } from '@/helpers'

export const useSuggestions = () => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState(getSearchHistory)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)

  const fetchSuggestions = useDebounce((query) => {
    fetch(`${API_URL}/suggestions?query=${query}`)
      .then((res) => res.json())
      .then(setSuggestions)
  }, 500)

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const queryValue = e.target.value
    setQuery(queryValue)
    setSelectedSuggestionIndex(-1)
    queryValue && fetchSuggestions(queryValue)
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
      setSelectedSuggestionIndex(newSuggestionIndex)
      setQuery(suggestions[newSuggestionIndex])
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
