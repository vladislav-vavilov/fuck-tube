import { filters } from '@/constants'
import { Filter } from '@/types'
import { cn } from '@/utils'
import { Dispatch, FC, SetStateAction } from 'react'

interface SearchResultFilterProps {
  filter: Filter
  setFilter: Dispatch<SetStateAction<Filter>>
}

export const SearchResultFilter: FC<SearchResultFilterProps> = ({
  filter,
  setFilter
}) => {
  return (
    <div className='flex items-center gap-1'>
      {filters.map(({ label, value }) => (
        <button
          onClick={() => setFilter(value)}
          className={cn('whitespace-nowrap rounded-md p-2 leading-none', {
            'bg-neutral-100 text-black': value === filter,
            'bg-neutral-700': value !== filter
          })}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
