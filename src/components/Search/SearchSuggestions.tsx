import { cn } from '@/utils'
import { FC, useMemo } from 'react'
import { SearchSuggestionsItem } from './SearchSuggestionsItem'

interface SearchSuggestionsProps {
  isOpen: boolean
  suggestions: {
    history: string[] // Suggestions from search history
    query: string[] // Suggestion from API
  }
  selectedItemIndex: number | null
  handleSearch: (searchQuery: string) => void
  removeFromSearchHistory: (value: string) => void
}

export const SearchSuggestions: FC<SearchSuggestionsProps> = ({
  isOpen,
  suggestions,
  selectedItemIndex,
  handleSearch,
  removeFromSearchHistory
}) => {
  const suggestionsArray = useMemo(() => {
    return Object.keys(suggestions).flatMap((key) =>
      suggestions[key as keyof typeof suggestions].map((value) => ({
        value,
        type: key
      }))
    )
  }, [suggestions])

  return (
    <ul
      className={cn(
        'absolute mt-2 max-h-[50vh] w-full overflow-y-scroll rounded-md bg-neutral-700 p-1 transition-all',
        {
          'invisible scale-95 opacity-0 ease-out': !isOpen
        }
      )}
    >
      {suggestionsArray.map(({ value, type }, index) => (
        <SearchSuggestionsItem
          key={value}
          type={type}
          suggestion={value}
          isSelected={index === selectedItemIndex}
          onClick={() => handleSearch(value)}
          remove={() => removeFromSearchHistory(value)}
        />
      ))}
    </ul>
  )
}
