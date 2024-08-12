import { filters } from '@/constants'

export interface Card {
  url: string
  thumbnail: string
  uploaderName: string
  uploaderUrl: string
  uploaderVerified: boolean
}

export interface VideoCard extends Card {
  type: 'stream'
  title: string
  uploaderAvatar: string
  uploadedDate: string
  shortDescription: string
  duration: number
  views: number
  uploaded: number
  isShort: boolean
}

export interface PlaylistCard extends Card {
  type: 'playlist'
  playlistType: string
  name: string
  videos: number
}

export interface ChannelCard extends Pick<Card, 'url' | 'thumbnail'> {
  type: 'channel'
  name: string
  subscribers: number
  description: string
  verified: boolean
}

export interface SearchResult {
  items: (VideoCard | PlaylistCard | ChannelCard)[]
  nextpage: string
}

export type Filter = (typeof filters)[number]['value']

export interface Playlist {
  name: string
  thumbnailUrl: string
  description: string
  bannerUrl: null
  nextpage: string | null
  uploader: string
  uploaderUrl: string
  uploaderAvatar: string
  videos: number
  relatedStreams: VideoCard[]
}
