import { cn } from '@/utils'
import { FC } from 'react'

export const CardSkeleton: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex w-full gap-4', className)}>
      <div className='skeleton min-h-48 w-full basis-2/5' />
      <div className='flex basis-3/5 flex-col gap-2'>
        <div className='skeleton h-4 w-2/3' />
        <div className='skeleton h-3 w-1/3' />
        <div className='my-4 flex w-full items-center gap-1'>
          <div className='skeleton h-8 w-8 rounded-full' />
          <div className='skeleton h-3 w-24' />
        </div>
        <div className='skeleton h-3 w-5/6' />
        <div className='skeleton h-3 w-1/3' />
      </div>
    </div>
  )
}
