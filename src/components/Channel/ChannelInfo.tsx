import { formatNumber } from '@/helpers'
import Image from 'next/image'
import { FC } from 'react'
import { HiMiniCheckBadge } from 'react-icons/hi2'

interface ChannelInfoProps {
  avatarUrl: string
  name: string
  verified: boolean
  subscriberCount: number
  description: string
}

export const ChannelInfo: FC<ChannelInfoProps> = ({
  avatarUrl,
  name,
  verified,
  subscriberCount,
  description
}) => {
  return (
    <div className='my-8 flex max-w-xl gap-4'>
      <Image
        src={avatarUrl}
        width={160}
        height={160}
        className='rounded-full'
        alt={name}
      />
      <div className='flex flex-col gap-2'>
        <h2 className='flex items-center gap-2 text-3xl font-bold'>
          <span>{name}</span>
          {verified && <HiMiniCheckBadge />}
        </h2>
        <span className='font-medium'>
          {formatNumber(subscriberCount)} subscribers
        </span>
        <p className='line-clamp-3 overflow-hidden text-ellipsis whitespace-pre-line text-neutral-200'>
          {description}
        </p>
      </div>
    </div>
  )
}
