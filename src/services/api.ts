import { API_URL } from '@/constants'
import { Filter, Playlist, SearchResult, Channel } from '@/types'

type GetSearchResults = (
  pageParam: string | null,
  query: string,
  filter: Filter
) => Promise<SearchResult>

export const getSearchResults: GetSearchResults = async (
  pageParam,
  query,
  filter
) => {
  const URL = pageParam
    ? `${API_URL}/nextpage/search?nextpage=${pageParam}&q=${query}&filter=${filter}`
    : `${API_URL}/search?q=${query}&filter=${filter}`

  const res = await fetch(URL)
  return await res.json()
}

export const getPlaylist = async (
  playlistId: string,
  pageParam: string | null = null
): Promise<Playlist> => {
  const URL = pageParam
    ? `${API_URL}/nextpage/playlists/${playlistId}?nextpage=${pageParam}`
    : `${API_URL}/playlists/${playlistId}`

  const res = await fetch(URL)
  const data = await res.json()

  if (data.hasOwnProperty('error')) throw new Error(data.error)
  return data
}

export const getChannel = async (
  channelId: string,
  pageParam: string | null = null
): Promise<Channel> => {
  const URL = pageParam
    ? `${API_URL}/nextpage/channel/${channelId}?nextpage=${pageParam}`
    : `${API_URL}/channel/${channelId}`

  const res = await fetch(URL)
  const data = await res.json()

  if (data.hasOwnProperty('error')) throw new Error(data.error)
  return data
}
