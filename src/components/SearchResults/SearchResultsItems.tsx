'use client'

import { FC, Fragment } from 'react'
import { SearchResultsItem } from './SearchResultsItem'
import { SearchResultsEmpty } from './SearchResultsEmpty'
import { useSearchParams } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Filter, SearchResult } from '@/types'
import { API_URL } from '@/constants'
import { useReachEnd } from '@/hooks/useReachEnd'

export const SearchResultsItems: FC = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('search_query') || ''
  const filter = (searchParams.get('filter') as Filter) || 'all'

  const { data, isFetching, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [query, filter],
      queryFn: async ({ pageParam }) => {
        const URL = pageParam
          ? `${API_URL}/nextpage/search?nextpage=${pageParam}&q=${query}&filter=${filter}`
          : `${API_URL}/search?q=${query}&filter=${filter}`

        const res = await fetch(URL)
        return await res.json()
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage?.nextpage
    })

  const ref = useReachEnd<HTMLDivElement>(() => {
    if (!isFetchingNextPage) fetchNextPage()
  })

  const pages = data?.pages ?? []
  if (!pages.length && !isFetching) return <SearchResultsEmpty />

  return (
    <div ref={ref} className='flex flex-col gap-4'>
      {pages.map((data: SearchResult, index) => (
        <Fragment key={index}>
          {data?.items?.map((item) => (
            <SearchResultsItem key={item.url} {...item} />
          ))}
        </Fragment>
      ))}
    </div>
  )
}
