import { API_URL } from '@/constants'
import { Filter, SearchResult } from '@/types'
import { SearchResultsItem } from '@/components/SearchResults/SearchResultsItem'
import { SearchResultsEmpty } from '@/components/SearchResults/SearchResultsEmpty'

const getData = async (
  query: string = '',
  filter: Filter = 'all'
): Promise<SearchResult | null> => {
  if (!query) return null

  try {
    const res = await fetch(`${API_URL}/search?q=${query}&filter=${filter}`)
    return await res.json()
  } catch {
    return null
  }
}

interface SearchResultsProps {
  searchParams: { [key: string]: string | undefined }
}

export default async function SearchResults({
  searchParams
}: SearchResultsProps) {
  const { search_query, filter } = searchParams
  const data = await getData(search_query, filter as Filter)

  return (
    <>
      {!data?.items.length && <SearchResultsEmpty />}
      {data?.items.map((item) => (
        <SearchResultsItem key={item.url} {...item} />
      ))}
    </>
  )
}
