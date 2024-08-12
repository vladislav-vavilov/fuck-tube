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
  playlistId: string,
  pageParam: string | null = null
): Promise<PlaylistInfo> => {
  const URL = pageParam
    ? `${API_URL}/nextpage/playlists/${playlistId}?nextpage=${pageParam}`
    : `${API_URL}/playlists/${playlistId}`

  const res = await fetch(URL)
  const data = await res.json()

  if (data.hasOwnProperty('error')) throw new Error(data.error)
  return data
}
