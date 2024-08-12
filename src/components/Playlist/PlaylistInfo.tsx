import { FC } from 'react'
import { Uploader } from '../Uploader'
import Image from 'next/image'

interface PlaylistInfoProps {
  thumbnail: string
  title: string
  videos: number
  description?: string
  uploaderName: string
  uploaderAvatar: string
  uploaderUrl: string | null
}

export const PlaylistInfo: FC<PlaylistInfoProps> = ({
  thumbnail,
  title,
  videos,
  description,
  uploaderName,
  uploaderAvatar,
  uploaderUrl
}) => {
  return (
    <div className='sticky top-[74px] flex h-full basis-1/4 flex-col gap-2 overflow-hidden rounded-md bg-neutral-700 p-4'>
      <Image
        src={thumbnail}
        width={320}
        height={240}
        className='rounded-md'
        alt={title}
      />
      <h3 className='line-clamp-2 text-2xl font-medium'>{title}</h3>
      <Uploader name={uploaderName} url={uploaderUrl} avatar={uploaderAvatar} />
      <span className='text-sm'>{videos} videos</span>
      {description && (
        <p className='overflow-hidden text-ellipsis text-sm'>{description}</p>
      )}
    </div>
  )
}
