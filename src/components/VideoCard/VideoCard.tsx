import { secondsToDDHHMMSS } from '@/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { VideoCardDuration } from './VideoCardDuration'
import { VideoCardUploader } from './VideoCardUploader'

const data = {
  url: '/watch?v=IjBjm6vm2D0',
  type: 'stream',
  title: "The funniest product placement I've ever seen (w/ Danny Gonzalez)",
  thumbnail:
    'https://pipedproxy.leptons.xyz/vi/IjBjm6vm2D0/hqdefault.jpg?host=i.ytimg.com&rs=AOn4CLDhfjgPA0XRR-U4FDGPer3VGtOdpw&sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg%3D%3D',
  uploaderName: 'Drew Gooden',
  uploaderUrl: '/channel/UCTSRIY3GLFYIpkR2QwyeklA',
  uploaderAvatar:
    'https://pipedproxy.leptons.xyz/ytc/AIdro_k6nOBtpDfkW6O9KBWiLn7LhKsXfOuo_ikV8Gyjf6l_QFo=s68-c-k-c0x00ffffff-no-rw?host=yt3.ggpht.com',
  uploadedDate: '22 hours ago',
  shortDescription:
    'Use code gooden at the link below to get an exclusive 60% off an annual Incogni plan: https://incogni.com/gooden\nThanks to Incogni for sponsoring this video!\n\nthanks to @Danny-Gonzalez for...',
  duration: 1903,
  views: 1576276,
  uploaded: 1722969861554,
  uploaderVerified: true,
  isShort: false
}

export const VideoCard: FC = () => {
  const { format } = Intl.NumberFormat('en', { notation: 'compact' })
  const duration = secondsToDDHHMMSS(data.duration)

  return (
    <div className='relative flex items-stretch gap-4'>
      {/* Avoid nested links*/}
      <Link href={data.url} className='absolute inset-0 z-10' />
      <div className='relative min-h-full w-full max-w-max'>
        <Image
          src={data.thumbnail}
          width={420}
          height={150}
          className='rounded-md'
          alt={data.title}
        />
        <VideoCardDuration {...duration} />
      </div>
      <div className='flex flex-col'>
        <h3 className='text-lg font-medium'>{data.title}</h3>
        <div className='flex text-sm text-neutral-200'>
          <span>{format(data.views)} views ~&nbsp;</span>
          <span>{data.uploadedDate}</span>
        </div>
        <VideoCardUploader
          name={data.uploaderName}
          url={data.uploaderUrl}
          avatar={data.uploaderAvatar}
        />
        <p className='line-clamp-2 text-sm text-neutral-200'>
          {data.shortDescription}
        </p>
      </div>
    </div>
  )
}
