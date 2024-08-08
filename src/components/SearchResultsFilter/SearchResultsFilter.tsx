import { filters } from '@/constants'
import { FC } from 'react'
import { SearchResultsFilterItem } from './SearchResultsFilterItem'

export const SearchResultFilter: FC = () => {
  return (
    <div className='flex items-center justify-center gap-1'>
      {filters.map(({ label, value }) => (
        <SearchResultsFilterItem key={value} label={label} value={value} />
      ))}
    </div>
  )
}
