import { API_URL } from '@/constants'
import { useDebounce } from './useDebounce'
import { useState } from 'react'
import { toast } from 'sonner'
import { deduplicateArrays } from '@/helpers'

export const useQuerySuggestions = ({
  exclude = []
}: {
  exclude: string[]
}) => {
  const [querySuggestions, setQuerySuggestions] = useState<string[]>([])

  const fetchQuerySuggestions = useDebounce((query: string) => {
    if (!query) return setQuerySuggestions([])

    fetch(`${API_URL}/suggestions?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) throw new Error(data.error)
        return data
      })
      .then(setQuerySuggestions)
      .catch(() =>
        toast.error('Something went wrong while fetching query suggestions')
      )
  }, 500)

  return {
    querySuggestions: deduplicateArrays(querySuggestions, exclude),
    fetchQuerySuggestions
  }
}
