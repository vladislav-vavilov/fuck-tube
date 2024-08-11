'use client'

import { getPlaylistInfo } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { PlaylistInfoError } from './PlaylistInfoError'
import Image from 'next/image'
import { PlaylistInfoEmpty } from './PlaylistInfoEmpty'

export const PlaylistInfo: FC = () => {
  const searchParams = useSearchParams()

  const { data, isFetching, isError, isFetched } = useQuery({
    queryKey: ['playlist'],
    queryFn: () => getPlaylistInfo(searchParams.get('list') || '')
  })

  if (isError) return <PlaylistInfoError />

  return (
    <div className='mx-auto max-w-4xl'>
      {isFetching && <span>Loading...</span>}
      {!data && isFetched && <PlaylistInfoEmpty />}
      {data && (
        <div>
          <Image
            src={data.thumbnailUrl}
            width={128}
            height={128}
            alt={data.name}
          />
        </div>
      )}
    </div>
  )
}
