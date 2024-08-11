export const API_URL = 'https://pipedapi.ducks.party'

export const filters = [
  { label: 'All', value: 'all' },
  { label: 'Videos', value: 'videos' },
  { label: 'Playlists', value: 'playlists' },
  { label: 'Channels', value: 'channels' },
  { label: 'Songs', value: 'music_songs' },
  { label: 'Music videos', value: 'music_videos' },
  { label: 'Music albums', value: 'music_albums' },
  { label: 'Music playlists', value: 'music_playlists' },
  { label: 'Music artists', value: 'music_artists' }
] as const
