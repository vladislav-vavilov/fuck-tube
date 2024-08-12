import { Playlist } from '@/components/Playlist/Playlist'
import { getPlaylist } from '@/services/api'

interface PlaylistProps {
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata({ searchParams }: PlaylistProps) {
  try {
    const data = await getPlaylist(searchParams.list ?? '')
    return { title: `${data.name ? data.name : 'Playlist'} - TouYube` }
  } catch {
    return { title: 'Playlist - TouYube' }
  }
}

export default async function PlaylistPage() {
  return <Playlist />
}
