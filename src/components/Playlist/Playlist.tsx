'use client'

import { getPlaylist } from '@/services/api'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { FC, Fragment } from 'react'
import Image from 'next/image'
import { Uploader } from '../Uploader'
import { VideoCard } from '../Cards/VideoCard'
import { useReachEnd } from '@/hooks/useReachEnd'
import { PlaylistError } from './PlaylistError'
import { PlaylistEmpty } from './PlaylistEmpty'
import { CardSkeletons } from '../Cards/CardSkeletons'
import { PlaylistLoading } from './PlaylistLoading'
import { PlaylistInfo } from './PlaylistInfo'
import { PlaylistVideos } from './PlaylistVideos'

export const Playlist: FC = () => {
  const searchParams = useSearchParams()
  const list = searchParams.get('list')

  const {
    data,
    isFetching,
    isError,
    isFetched,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: [list],
    queryFn: ({ pageParam }: { pageParam: string | null }) => {
      return getPlaylist(list ?? '', pageParam)
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextpage
  })

  const firstPage = data?.pages[0]

  const ref = useReachEnd<HTMLDivElement>(() => {
    if (!isFetchingNextPage) fetchNextPage()
  })

  if (isError) return <PlaylistError />

  return (
    <div ref={ref} className='mx-auto h-full w-full max-w-7xl px-4'>
      {!firstPage && isFetched && <PlaylistEmpty />}
      <div className='flex gap-4'>
        {isFetching && <PlaylistLoading />}
        {firstPage && (
          <>
            <PlaylistInfo
              title={firstPage.name}
              thumbnail={firstPage.thumbnailUrl}
              uploaderName={firstPage.name}
              {...firstPage}
            />
            <PlaylistVideos pages={data.pages} />
          </>
        )}
      </div>
    </div>
  )
}
