import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { API_URL } from '@/constants'

export const useSuggestions = () => {
  const [query, setQuery] = useState('')
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)

  const queryClient = useQueryClient()
  const { data: suggestions } = useQuery({
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

  const prevSuggestion = useCallback(() => {
    if (suggestions?.length === 0) return

    setSelectedSuggestionIndex((index) => {
      if (index > 0) return index - 1
      return suggestions?.length - 1 // Loop around if at the start
    })
  }, [suggestions])

  const nextSuggestion = useCallback(() => {
    if (suggestions?.length === 0) return

    setSelectedSuggestionIndex((index) => {
      if (index < suggestions?.length - 1) return index + 1
      return 0 // Loop around if at the end
    })
  }, [suggestions])

  // TODO: Get rid of effect. Set query inside of prev/next suggestion functions
  useEffect(() => {
    if (selectedSuggestionIndex > -1) {
      setQuery(suggestions[selectedSuggestionIndex])
    }
  }, [selectedSuggestionIndex])

  return {
    query,
    suggestions,
    selectedSuggestionIndex,
    func: {
      onQueryChange,
      prevSuggestion,
      nextSuggestion
    }
  }
}
