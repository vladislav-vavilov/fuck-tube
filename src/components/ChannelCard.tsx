import { formatNumber } from '@/helpers'
import { Channel } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const ChannelCard: FC<Channel> = (props) => {
  return (
    <>
      <div className='rounded-md p-4 transition-all duration-200 hover:-translate-y-1 hover:bg-neutral-700/70'>
        <Link href={props.url} className='flex max-w-2xl gap-4'>
          <Image
            src={props.thumbnail}
            width={164}
            height={164}
            className='rounded-full'
            alt={props.name}
          />
          <div className='mt-4 flex flex-col'>
            <h3 className='text-xl font-medium'>{props.name}</h3>
            <span className='text-sm'>
              {formatNumber(props.subscribers)} subscribers
            </span>
            <p className='pt-4 text-sm text-neutral-200'>{props.description}</p>
          </div>
        </Link>
      </div>
      <hr className='border-neutral-600' />
    </>
  )
}
