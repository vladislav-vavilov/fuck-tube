import type {
  ChannelCard as Channel,
  PlaylistCard as Playlist,
  VideoCard as Video
} from '@/types'
import { FC } from 'react'
import { VideoCard } from '../Cards/VideoCard'
import { PlaylistCard } from '../Cards/PlaylistCard'
import { ChannelCard } from '../Cards/ChannelCard'

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
