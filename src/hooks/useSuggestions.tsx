import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useDebounce } from './useDebounce'
import { API_URL } from '@/constants'
import { getSearchHistory, removeDuplicates } from '@/helpers'
import { Suggestion } from '@/types'

export const useSuggestions = () => {
  const [query, setQuery] = useState('')
  const [historySuggestions, setHistorySuggestions] = useState(getSearchHistory)
  const [querySuggestions, setQuerySuggestions] = useState<string[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)

  const suggestions: Suggestion[] = useMemo(() => {
    return [
      ...historySuggestions.map((value) => {
        return { value, type: 'history' } as Suggestion
      }),
      ...querySuggestions.map((value) => {
        return { value, type: 'query' } as Suggestion
      })
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

  return {
    query,
    suggestions,
    selectedSuggestionIndex,
    func: { onQueryChange, prevSuggestion, nextSuggestion }
  }
}
