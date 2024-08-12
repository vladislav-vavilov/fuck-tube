import { Playlist } from '@/components/Playlist/Playlist'
import { getPlaylist } from '@/services/api'

interface PlaylistPageProps {
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata({ searchParams }: PlaylistPageProps) {
  try {
    const data = await getPlaylist(searchParams.list ?? '')
    return { title: `${data.name ? data.name : 'Playlist'} - TouYube` }
  } catch {
    return { title: 'Playlist - TouYube' }
  }
}

export default function PlaylistPage() {
  return <Playlist />
}
