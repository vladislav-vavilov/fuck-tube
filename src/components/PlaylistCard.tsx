import { Playlist } from '@/types'
import { FC } from 'react'
import { Card } from '@/components/Card'
import { Uploader } from '@/components/Uploader'

export const PlaylistCard: FC<Playlist> = (props) => {
  return (
    <Card
      {...props}
      title={props.name}
      badge={props.videos > -1 ? `${props.videos} videos` : undefined}
    >
      <Uploader
        name={props.uploaderName}
        url={props.uploaderUrl}
        verified={props.uploaderVerified}
      />
    </Card>
  )
}
