'use client'

import { PlaylistCard } from '@/components/PlaylistCard'
import { Spinner } from '@/components/Spinner'
import { VideoCard } from '@/components/VideoCard'
import { ChannelCard } from '@/components/ChannelCard'
import { API_URL } from '@/constants'
import { Channel, Playlist, Video } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
const getData = async (
  query: string
): Promise<{ items: (Video | Playlist | Channel)[]; nextpage: string }> => {
  const res = await fetch(`${API_URL}/search?q=${query}&filter=all`)
  return await res.json()
}

export default function Results() {
  const searchParams = useSearchParams()
  const query = searchParams.get('search_query')

  const { data, isFetching } = useQuery({
    queryKey: ['search'],
    queryFn: () => getData(query ?? '')
  })

  console.log(data)

  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-4'>
      {isFetching && <Spinner className='self-center' />}
      {data?.items.map((item) => {
        console.log(item)
        if (item.type === 'stream') {
          return <VideoCard key={item.url} {...item} />
        }

        if (item.type === 'playlist') {
          return <PlaylistCard key={item.url} {...item} />
        }

        if (item.type === 'channel') {
          return <ChannelCard key={item.url} {...item} />
        }
      })}
    </div>
  )
}
