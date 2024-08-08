import { Playlist } from '@/types'
import { FC } from 'react'
import { Card } from '@/components/Card'
import { Uploader } from '@/components/Uploader'

export const PlaylistCard: FC<Playlist> = (props) => {
  return (
    <Card {...props} title={props.name} badge={`${props.videos} videos`}>
      <Uploader
        name={props.uploaderName}
        url={props.uploaderUrl}
        className='p-0'
      />
    </Card>
  )
}