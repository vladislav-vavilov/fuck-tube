import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface VideoCardUploaderProps {
  name: string
  url: string
  avatar: string
}

export const VideoCardUploader: FC<VideoCardUploaderProps> = ({
  name,
  url,
  avatar
}) => {
  return (
    <Link
      href={url}
      className='group z-20 flex max-w-max items-center gap-2 py-4 text-sm text-neutral-200'
    >
      <Image
        src={avatar}
        width={28}
        height={28}
        className='rounded-full'
        alt={name}
      />
      <span className='transition-colors duration-200 group-hover:text-white'>
        {name}
      </span>
    </Link>
  )
}
