'use client'

import { FC, Fragment } from 'react'
import { SearchResultsItem } from './SearchResultsItem'
import { SearchResultsEmpty } from './SearchResultsEmpty'
import { useSearchParams } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Filter } from '@/types'
import { useReachEnd } from '@/hooks/useReachEnd'
import { getSearchResults } from '@/services/api'
import { CardSkeletons } from '../Cards/CardSkeletons'

export const SearchResultsItems: FC = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('search_query') || ''
  const filter = (searchParams.get('filter') as Filter) || 'all'

  const { data, isFetching, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [query, filter],
      queryFn: ({ pageParam }: { pageParam: string | null }) => {
        return getSearchResults(pageParam, query, filter)
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage?.nextpage
    })

  const ref = useReachEnd<HTMLDivElement>(() => {
    if (!isFetchingNextPage) fetchNextPage()
  })

  if (isFetching) return <CardSkeletons />

  const pages = data?.pages ?? []
  if (!pages.length && !isFetching) return <SearchResultsEmpty />

  return (
    <div ref={ref} className='flex flex-col gap-4'>
      {pages.map((page, index) => (
        <Fragment key={index}>
          {page?.items.map((item) => (
            <SearchResultsItem key={item.url} {...item} />
          ))}
        </Fragment>
      ))}
    </div>
  )
}
