import { FC } from 'react'
import { CardSkeleton } from '../Cards/CardSkeleton'

export const PlaylistLoading: FC = () => {
  return (
    <>
      <div className='skeleton h-72 w-full basis-1/4' />
      <div className='flex basis-3/4 flex-col gap-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </>
  )
}
