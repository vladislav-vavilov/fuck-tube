import { cn } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { HiMiniCheckBadge } from 'react-icons/hi2'

interface UploaderProps {
  name: string
  url: string | null
  verified?: boolean
  avatar?: string
  className?: string
}

export const Uploader: FC<UploaderProps> = ({
  name,
  url,
  verified = false,
  avatar,
  className
}) => {
  return (
    <Link
      href={url ?? ''}
      className={cn(
        'group z-20 flex max-w-max items-center text-sm text-neutral-200',
        className
      )}
    >
      {avatar && (
        <Image
          src={avatar}
          width={28}
          height={28}
          className='rounded-full'
          alt={name}
        />
      )}
      <span
        className={cn('transition-colors duration-200 group-hover:text-white', {
          'pr-0.5': verified,
          'pl-2': avatar,
          underline: !avatar
        })}
      >
        {name}
      </span>
      {verified && <HiMiniCheckBadge size={18} />}
    </Link>
  )
}
