'use client'

import { getChannel } from '@/services/api'
import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { FC } from 'react'
import { ChannelError } from './ChannelError'
import { ChannelEmpty } from './ChannelEmpty'
import { ChannelLoading } from './ChannelLoading'
import { ChannelInfo } from './ChannelInfo'
import { ChannelVideos } from './ChannelVideos'
import { useReachEnd } from '@/hooks/useReachEnd'

export const Channel: FC = () => {
  const { id } = useParams()

  const { data, isPending, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [id],
      queryFn: ({ pageParam }: { pageParam: string | null }) => {
        return getChannel(id as string, pageParam)
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage?.nextpage
    })

  const firstPage = data?.pages[0]

  useReachEnd(() => {
    if (!isFetchingNextPage) fetchNextPage()
  })

  if (isError) return <ChannelError />
  if (isPending) return <ChannelLoading />
  if (!firstPage) return <ChannelEmpty />

  return (
    <>
      <Image
        src={firstPage.bannerUrl}
        priority={true}
        width={1920}
        height={318}
        className='rounded-xl'
        alt={firstPage.name}
      />
      <ChannelInfo {...firstPage} />
      <hr className='my-4 border-neutral-600' />
      <ChannelVideos pages={data.pages} />
    </>
  )
}
