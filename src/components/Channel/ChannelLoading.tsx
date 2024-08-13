import { FC } from 'react'

export const ChannelLoading: FC = () => {
  return (
    <div className='flex flex-col'>
      <div className='skeleton h-[212px]' />
      <div className='my-8 flex gap-4'>
        <div className='skeleton h-40 w-40 rounded-full' />
        <div className='flex flex-col gap-4'>
          <div className='skeleton h-8 w-64' />
          <div className='skeleton h-4 w-40' />
          <div className='skeleton h-2 w-80' />
          <div className='skeleton h-2 w-80' />
        </div>
      </div>
      <hr className='skeleton my-4 border-neutral-600' />
      <div className='grid grid-cols-4 gap-x-4 gap-y-10'>
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <div className='skeleton h-44 w-full' />
            <div className='skeleton h-4 w-3/4' />
            <div className='skeleton h-4 w-1/2' />
          </div>
        ))}
      </div>
    </div>
  )
}
