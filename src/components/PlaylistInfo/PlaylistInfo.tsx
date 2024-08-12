'use client'

import { getPlaylistInfo } from '@/services/api'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { FC, Fragment } from 'react'
import { PlaylistInfoError } from './PlaylistInfoError'
import Image from 'next/image'
import { PlaylistInfoEmpty } from './PlaylistInfoEmpty'
import { Uploader } from '../Uploader'
import { VideoCard } from '../Cards/VideoCard'
import { useReachEnd } from '@/hooks/useReachEnd'

export const PlaylistInfo: FC = () => {
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
      return getPlaylistInfo(list ?? '', pageParam)
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextpage
  })

  const firstPage = data?.pages[0]

  const ref = useReachEnd<HTMLDivElement>(() => {
    if (!isFetchingNextPage) fetchNextPage()
  })

  if (isError) return <PlaylistInfoError />

  return (
    <div ref={ref} className='mx-auto h-full w-full max-w-7xl px-4'>
      {isFetching && <span>Loading...</span>}
      {!firstPage && isFetched && <PlaylistInfoEmpty />}
      {firstPage && (
        <div className='flex gap-4'>
          <div className='sticky top-[74px] flex h-full basis-1/4 flex-col gap-2 overflow-hidden rounded-md bg-neutral-700 p-4'>
            <Image
              src={firstPage.thumbnailUrl}
              width={320}
              height={240}
              className='rounded-md'
              alt={firstPage.name}
            />
            <h3 className='line-clamp-2 text-2xl font-medium'>
              {firstPage.name}
            </h3>
            <Uploader
              name={firstPage.uploader}
              url={firstPage.uploaderUrl}
              avatar={firstPage.uploaderAvatar}
            />
            <span className='text-sm'>{firstPage.videos} videos</span>
            <p className='overflow-hidden text-ellipsis text-sm'>
              {firstPage.description}
            </p>
          </div>
          <div className='flex basis-3/4 flex-col gap-4 overflow-y-auto'>
            {data.pages.map((page, index) => (
              <Fragment key={index}>
                {page.relatedStreams.map((stream) => {
                  return <VideoCard key={stream.url} {...stream} />
                })}
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
