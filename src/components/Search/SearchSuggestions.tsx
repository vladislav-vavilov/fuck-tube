import { cn } from '@/utils'
import { FC } from 'react'
import { IoMdClose } from 'react-icons/io'
import { SearchSuggestionsItem } from './SearchSuggestionsItem'

interface SearchSuggestionsProps {
  isOpen: boolean
  items: string[]
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
      {items.map((suggestion, index) => (
        <SearchSuggestionsItem
          key={suggestion}
          suggestion={suggestion}
          selected={index === selectedItemIndex}
          onClick={() => handleSearch(suggestion)}
        />
      ))}
    </ul>
  )
}
