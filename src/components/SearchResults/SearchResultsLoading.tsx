import { FC } from 'react'
import { CardSkeleton } from '../Cards/CardSkeleton'

export const SearchResultsLoading: FC = () => {
  return (
    <div className='flex w-full flex-col gap-4'>
      {Array.from({ length: 4 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}
