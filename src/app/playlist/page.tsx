import { PlaylistInfo } from '@/components/PlaylistInfo/PlaylistInfo'
import { getPlaylistInfo } from '@/services/api'

interface PlaylistProps {
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata({ searchParams }: PlaylistProps) {
  try {
    const data = await getPlaylistInfo(searchParams.list ?? '')
    return { title: `${data.name ? data.name : 'Playlist'} - TouYube` }
  } catch {
    return { title: 'Playlist - TouYube' }
  }
}

export default async function Playlist() {
  return <PlaylistInfo />
}
