import { formatNumber, secondsToDDHHMMSS } from '@/helpers'
import { FC } from 'react'
import { Card } from '@/components/Card'
import { Video } from '@/types'
import { Uploader } from '@/components/Uploader'

export const VideoCard: FC<Video> = (props) => {
  const duration = secondsToDDHHMMSS(props.duration).string

  return (
    <Card {...props} badge={duration}>
      <div className='flex text-sm text-neutral-200'>
        <span>{formatNumber(props.views)} views ~&nbsp;</span>
        <span>{props.uploadedDate}</span>
      </div>
      <Uploader
        name={props.uploaderName}
        url={props.uploaderUrl}
        avatar={props.uploaderAvatar}
      />
      <p className='line-clamp-2 text-sm text-neutral-200'>
        {props.shortDescription}
      </p>
    </Card>
  )
}
