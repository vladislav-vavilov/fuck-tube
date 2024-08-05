import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { API_URL } from '@/constants'

export const useSuggestions = () => {
  const [query, setQuery] = useState('')
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)

  const queryClient = useQueryClient()
  const { data: suggestions = [] } = useQuery({
    queryKey: ['suggestions'],
    queryFn: () =>
      fetch(`${API_URL}/suggestions?query=${query}`).then((res) => res.json()),
    enabled: !!query
  })

  const invalidateSuggestions = useDebounce(() => {
    queryClient.invalidateQueries({ queryKey: ['suggestions'] })
  }, 500)

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setSelectedSuggestionIndex(-1)
    invalidateSuggestions()
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
