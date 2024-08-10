import { PlaylistInfo } from '@/components/PlaylistInfo/PlaylistInfo'
import { API_URL } from '@/constants'

interface PlaylistProps {
  searchParams: { [key: string]: string | undefined }
}

const getData = async (playlistId: string) => {
  if (!playlistId) return null

  try {
    const res = await fetch(`${API_URL}/playlists/${playlistId}`)
    return await res.json()
  } catch {
    return null
  }
}

export default async function Playlist({ searchParams }: PlaylistProps) {
  const { list } = searchParams
  const data = await getData(list ?? '')
  console.log(data)

  return <PlaylistInfo />
}
