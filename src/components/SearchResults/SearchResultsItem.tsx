import { Channel, Playlist, Video } from '@/types'
import { FC } from 'react'
import { VideoCard } from '@/components/Cards/VideoCard'
import { PlaylistCard } from '@/components/Cards/PlaylistCard'
import { ChannelCard } from '@/components/Cards/ChannelCard'

export const SearchResultsItem: FC<Video | Playlist | Channel> = ({
  ...props
}) => {
  switch (props.type) {
    case 'stream':
      return <VideoCard {...props} />
    case 'playlist':
      return <PlaylistCard {...props} />
    case 'channel':
      return <ChannelCard {...props} />
    default:
      return null
  }
}
