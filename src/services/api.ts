import { API_URL } from '@/constants'
import { Filter, SearchResult } from '@/types'

export const getSearchResults = async (
  query: string = '',
  filter: Filter = 'all'
): Promise<SearchResult | null> => {
  try {
    const res = await fetch(`${API_URL}/search?q=${query}&filter=${filter}`)
    return await res.json()
  } catch (error) {
    return null
  }
}
