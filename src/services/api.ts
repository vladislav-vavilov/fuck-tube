import { API_URL } from '@/constants'
import { Filter, PlaylistInfo, SearchResult } from '@/types'

type GetSearchResults = (
  pageParam: string | null,
  query: string,
  filter: Filter
) => Promise<SearchResult | null>

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

export const getPlaylistInfo = async (
  playlistId: string
): Promise<PlaylistInfo> => {
  const res = await fetch(`${API_URL}/playlists/${playlistId}`)
  const data = await res.json()

  if (data.hasOwnProperty('error')) throw new Error(data.error)
  return data
}
