import { FC } from 'react'

interface VideoCardDurationProps {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const VideoCardDuration: FC<VideoCardDurationProps> = ({
  days,
  hours,
  minutes,
  seconds
}) => {
  return (
    <div className='absolute bottom-2 right-2 rounded-md bg-neutral-700 px-1 py-0.5 text-sm'>
      {days > 0 && `${days}s `}
      {hours > 0 && `${hours}h `}
      {minutes > 0 && `${minutes}m `}
      {seconds}s
    </div>
  )
}
