import { API_URL } from '@/constants'
import { useDebounce } from './useDebounce'
import { useState } from 'react'

export const useQuerySuggestions = () => {
  const [querySuggestions, setQuerySuggestions] = useState<string[]>([])

  const fetchQuerySuggestions = useDebounce((query: string) => {
    if (!query) return setQuerySuggestions([])

    fetch(`${API_URL}/suggestions?query=${query}`)
      .then((res) => res.json())
      .then(setQuerySuggestions)
  }, 500)

  return { querySuggestions, fetchQuerySuggestions }
}
