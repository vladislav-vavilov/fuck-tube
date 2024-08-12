import { FC } from 'react'
import { CardSkeleton } from './CardSkeleton'
import { cn } from '@/utils'

export const CardSkeletons: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      {Array.from({ length: 4 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}
