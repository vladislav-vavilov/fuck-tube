import { Channel } from '@/types'
import { FC, Fragment } from 'react'
import { VideoCard } from '../Cards/VideoCard'
import { useIsFetching } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { CardSkeletonSmall } from '../Cards/CardSkeletonSmall'

export const ChannelVideos: FC<{ pages: Channel[] }> = ({ pages }) => {
  const { id } = useParams()
  const isFetching = useIsFetching({ queryKey: [id] }) > 0

  return (
    <div className='grid grid-cols-4 gap-x-4 gap-y-10 overflow-y-auto'>
      {pages.map(({ relatedStreams }, index) => (
        <Fragment key={index}>
          {relatedStreams.map((stream) => {
            return (
              <VideoCard
                key={stream.url}
                className='max-w-xs flex-col'
                title={stream.title}
                thumbnail={stream.thumbnail}
                duration={stream.duration}
                url={stream.url}
                views={stream.views}
                uploadedDate={stream.uploadedDate}
                isShort={stream.isShort}
              />
            )
          })}
        </Fragment>
      ))}
      {isFetching &&
        Array.from({ length: 20 }).map((_, index) => (
          <CardSkeletonSmall key={index} />
        ))}
    </div>
  )
}
