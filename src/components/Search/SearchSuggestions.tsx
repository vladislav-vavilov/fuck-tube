import { cn } from '@/utils'
import { FC } from 'react'
import { SearchSuggestionsItem } from './SearchSuggestionsItem'
import { Suggestion } from '@/types'

interface SearchSuggestionsProps {
  isOpen: boolean
  items: Suggestion[]
  selectedItemIndex: number | null
  handleSearch: (searchQuery: string) => void
  removeFromSearchHistory: (value: string) => void
}

export const SearchSuggestions: FC<SearchSuggestionsProps> = ({
  isOpen,
  items,
  selectedItemIndex,
  handleSearch,
  removeFromSearchHistory
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
      {items.map((suggestion, index) => (
        <SearchSuggestionsItem
          key={suggestion.value}
          suggestion={suggestion}
          selected={index === selectedItemIndex}
          onClick={() => handleSearch(suggestion.value)}
          remove={() => removeFromSearchHistory(suggestion.value)}
        />
      ))}
    </ul>
  )
}
