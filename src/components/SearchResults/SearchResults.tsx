'use client'

import { API_URL } from '@/constants'
import { Filter, SearchResult } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { SearchResultFilter } from '@/components/SearchResults/SearchResultsFilter'
import { SearchResultsEmpty } from '@/components/SearchResults/SearchResultsEmpty'
import { SearchResultsItem } from '@/components/SearchResults/SearchResultsItem'

const getData = async (
  query: string,
  filter: Filter = 'all'
): Promise<SearchResult> => {
  const res = await fetch(`${API_URL}/search?q=${query}&filter=${filter}`)
  return await res.json()
}

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('search_query')
  const filter = searchParams.get('filter') || 'all'

  const { data, isFetched } = useQuery({
    queryKey: [query, filter],
    queryFn: () => getData(query || '', filter as Filter)
  })

  return (
    <div className='mx-auto flex h-full max-w-4xl flex-col items-center gap-4'>
      <SearchResultFilter />
      {isFetched && !data?.items.length && <SearchResultsEmpty />}
      {data?.items.map((item) => (
        <SearchResultsItem key={item.url} {...item} />
      ))}
    </div>
  )
}
