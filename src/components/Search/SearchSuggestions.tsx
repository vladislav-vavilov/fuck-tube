import { cn } from '@/utils'
import { FC } from 'react'
import { SearchSuggestionsItem } from './SearchSuggestionsItem'

type Suggestion = {
  value: string
  type: 'history' | 'query'
}

interface SearchSuggestionsProps {
  isOpen: boolean
  items: Suggestion[]
  selectedItemIndex: number | null
  handleSearch: (searchQuery: string) => void
}

export const SearchSuggestions: FC<SearchSuggestionsProps> = ({
  isOpen,
  items,
  selectedItemIndex,
  handleSearch
}) => {
  return (
    <ul
      className={cn(
        'absolute mt-2 max-h-[50vh] w-full overflow-y-scroll rounded-md bg-neutral-700 p-1 transition-all',
        {
          'invisible scale-95 opacity-0 ease-out': !isOpen
        }
      )}
    >
      {items.map(({ value, type }, index) => (
        <SearchSuggestionsItem
          key={value}
          suggestion={`[${type}]: ${value}`}
          selected={index === selectedItemIndex}
          onClick={() => handleSearch(value)}
        />
      ))}
    </ul>
  )
}
