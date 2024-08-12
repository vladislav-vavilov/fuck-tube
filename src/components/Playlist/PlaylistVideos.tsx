import { FC, Fragment } from 'react'
import { VideoCard } from '../Cards/VideoCard'
import type { VideoCard as Video } from '@/types'

type Page = { relatedStreams: Video[] }

export const PlaylistVideos: FC<{ pages: Page[] }> = ({ pages }) => {
  return (
    <div className='flex basis-3/4 flex-col gap-4 overflow-y-auto'>
      {pages.map(({ relatedStreams }, index) => (
        <Fragment key={index}>
          {relatedStreams.map((stream) => {
            return <VideoCard key={stream.url} {...stream} />
          })}
        </Fragment>
      ))}
    </div>
  )
}
