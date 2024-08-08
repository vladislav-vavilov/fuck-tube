import { cn } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface UploaderProps {
  name: string
  url: string
  avatar?: string
  className?: string
}

export const Uploader: FC<UploaderProps> = ({
  name,
  url,
  avatar,
  className
}) => {
  return (
    <Link
      href={url}
      className={cn(
        'group z-20 flex max-w-max items-center gap-2 py-4 text-sm text-neutral-200',
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
        className={cn(
          'transition-colors duration-200 group-hover:text-white',
          !avatar && 'underline'
        )}
      >
        {name}
      </span>
    </Link>
  )
}
