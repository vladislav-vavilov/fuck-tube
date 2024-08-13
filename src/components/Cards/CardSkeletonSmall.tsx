import { FC } from 'react'

export const CardSkeletonSmall: FC = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='skeleton h-44 w-full' />
      <div className='skeleton h-4 w-3/4' />
      <div className='skeleton h-4 w-1/2' />
    </div>
  )
}
