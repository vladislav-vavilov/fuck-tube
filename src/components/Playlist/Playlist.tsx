'use client'

import { getPlaylist } from '@/services/api'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { useReachEnd } from '@/hooks/useReachEnd'
import { PlaylistError } from './PlaylistError'
import { PlaylistEmpty } from './PlaylistEmpty'
import { PlaylistInfo } from './PlaylistInfo'
import { PlaylistVideos } from './PlaylistVideos'
import { PlaylistLoading } from './PlaylistLoading'

export const Playlist: FC = () => {
  const searchParams = useSearchParams()
  const list = searchParams.get('list')

  const { data, isPending, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [list],
      queryFn: ({ pageParam }: { pageParam: string | null }) => {
        return getPlaylist(list ?? '', pageParam)
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage?.nextpage
    })

  const firstPage = data?.pages[0]

  useReachEnd(() => {
    if (!isFetchingNextPage) fetchNextPage()
  })

  if (isError) return <PlaylistError />
  if (isPending) return <PlaylistLoading />
  if (!firstPage) return <PlaylistEmpty />

  return (
    <>
      <PlaylistInfo
        title={firstPage.name}
        thumbnail={firstPage.thumbnailUrl}
        uploaderName={firstPage.name}
        {...firstPage}
      />
      <PlaylistVideos pages={data.pages} />
    </>
  )
}
