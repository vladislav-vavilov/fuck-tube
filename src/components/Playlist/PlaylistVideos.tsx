import { FC, Fragment } from 'react'
import { VideoCard } from '../Cards/VideoCard'
import type { VideoCard as Video } from '@/types'
import { useIsFetching } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { CardSkeleton } from '../Cards/CardSkeleton'

type Page = { relatedStreams: Video[] }

export const PlaylistVideos: FC<{ pages: Page[] }> = ({ pages }) => {
  const searchParams = useSearchParams()
  const list = searchParams.get('list')

  const isFetching = useIsFetching({ queryKey: [list] }) > 0

  return (
    <div className='flex basis-3/4 flex-col gap-4 overflow-y-auto'>
      {pages.map(({ relatedStreams }, index) => (
        <Fragment key={index}>
          {relatedStreams.map((stream) => {
            return <VideoCard key={stream.url} {...stream} />
          })}
        </Fragment>
      ))}
      {isFetching &&
        Array.from({ length: 4 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
    </div>
  )
}
