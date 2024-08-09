import { formatNumber } from '@/helpers'
import { Channel } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { HiMiniCheckBadge } from 'react-icons/hi2'

export const ChannelCard: FC<Channel> = (props) => {
  return (
    <>
      <div className='w-full rounded-md p-4 transition-colors duration-200 hover:bg-neutral-700/70'>
        <Link href={props.url} className='flex max-w-2xl gap-4'>
          <Image
            src={props.thumbnail}
            width={128}
            height={128}
            className='rounded-full'
            alt={props.name}
          />
          <div className='mt-4 flex flex-col'>
            <h3 className='flex items-center gap-0.5 text-xl font-medium'>
              <span>{props.name}</span>
              {props.verified && <HiMiniCheckBadge />}
            </h3>
            {props.subscribers > -1 && (
              <span className='text-sm'>
                {formatNumber(props.subscribers)} subscribers
              </span>
            )}
            {props.description && (
              <p className='pt-4 text-sm text-neutral-200'>
                {props.description}
              </p>
            )}
          </div>
        </Link>
      </div>
      <hr className='border-neutral-600' />
    </>
  )
}
