import { FC } from 'react'
import { SearchSuggestions } from '@/components/Search/SearchSuggestions'
import { SearchInput } from './SearchInput'

export const Search: FC = () => {
  return (
    <div className='relative mx-auto max-w-3xl'>
      <div className='flex w-full items-center gap-2 border-b border-neutral-700'>
        <SearchInput />
      </div>
      <SearchSuggestions />
    </div>
  )
}
