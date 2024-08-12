import { PlaylistInfo } from '@/components/PlaylistInfo/PlaylistInfo'
import { getPlaylistInfo } from '@/services/api'

interface PlaylistProps {
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata({ searchParams }: PlaylistProps) {
  try {
    const data = await getPlaylistInfo(searchParams.list ?? '')

    if (data) return { title: data.name }
    return { title: 'Playlist - TouYoube' }
  } catch {
    return { title: 'Playlist - TouYoube' }
  }
}

export default async function Playlist() {
  return <PlaylistInfo />
}
