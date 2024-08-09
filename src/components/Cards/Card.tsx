import { Card as CardType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

interface CardProps extends CardType {
  children: ReactNode
  title: string
  badge?: string
}

export const Card: FC<CardProps> = ({
  children,
  title,
  url,
  thumbnail,
  badge
}) => {
  return (
    <div className='relative flex w-full items-stretch gap-4 rounded-md transition-colors duration-200 active:bg-neutral-700/70'>
      {/* Avoid nested links*/}
      <Link href={url} className='absolute inset-0 z-10' />
      <div className='relative basis-2/5'>
        <Image
          src={thumbnail}
          width={420}
          height={240}
          className='h-auto w-full rounded-md'
          alt={title}
        />
        {badge && (
          <div className='absolute bottom-2 right-2 rounded-md bg-neutral-700 px-1 py-0.5 text-sm'>
            {badge}
          </div>
        )}
      </div>
      <div className='flex basis-3/5 flex-col'>
        <h3 className='text-lg font-medium'>{title}</h3>
        {children}
      </div>
    </div>
  )
}
