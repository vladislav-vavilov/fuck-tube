'use client'

import { VideoCard } from '@/components/VideoCard/VideoCard'
import { useSearchParams } from 'next/navigation'

export default function Results() {
  const searchParams = useSearchParams()
  const query = searchParams.get('search_query')

  return (
    <div className='mx-auto max-w-4xl'>
      <VideoCard />
    </div>
  )
}
