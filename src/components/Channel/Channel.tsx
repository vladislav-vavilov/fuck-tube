'use client'

import { getChannel } from '@/services/api'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { FC } from 'react'

export const Channel: FC = () => {
  const { id } = useParams()

  const { data, isPending, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [id],
      queryFn: ({ pageParam }: { pageParam: string | null }) => {
        if (typeof id !== 'string') return
        return getChannel(id, pageParam)
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage?.nextpage
    })

  console.log(data)

  const firstPage = data?.pages[0]

  if (isError) return <PlaylistError />
  if (isPending) return <PlaylistLoading />
  if (!firstPage) return <PlaylistEmpty />

  return (
    <div className='mx-auto w-full max-w-7xl bg-neutral-500'>
      <Image src={firstPage.banner} />
    </div>
  )
}
