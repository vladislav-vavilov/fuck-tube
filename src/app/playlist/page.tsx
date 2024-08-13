import { Playlist } from '@/components/Playlist/Playlist'
import { getPlaylist } from '@/services/api'

interface PlaylistPageProps {
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata({ searchParams }: PlaylistPageProps) {
  try {
    const data = await getPlaylist(searchParams.list ?? '')
    return { title: `${data.name ? data.name : 'Playlist'} - YouRube` }
  } catch {
    return { title: 'Playlist - YouRube' }
  }
}

export default function PlaylistPage() {
  return <Playlist />
}
