import { filters } from '@/constants'

export interface Card {
  url: string
  thumbnail: string
  uploaderName: string
  uploaderUrl: string
  uploaderVerified: boolean
}

export interface Video extends Card {
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

export interface Playlist extends Card {
  type: 'playlist'
  playlistType: string
  name: string
  videos: number
}

export interface Channel extends Pick<Card, 'url' | 'thumbnail'> {
  type: 'channel'
  name: string
  subscribers: number
  description: string
  verified: boolean
}

export interface SearchResult {
  items: (Video | Playlist | Channel)[]
  nextpage: string
}

export type Filter = (typeof filters)[number]['value']

export interface PlaylistInfo {
  name: string
  thumbnailUrl: string
  description: string
  bannerUrl: null
  nextpage: string | null
  uploader: string
  uploaderUrl: string
  uploaderAvatar: string
  videos: number
  relatedStreams: Video[]
}
