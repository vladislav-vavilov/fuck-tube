import { FC, useMemo } from 'react'
import { SearchSuggestionsItem } from './SearchSuggestionsItem'
import { cn } from '@/utils'

interface SearchSuggestionsProps {
  isOpen: boolean
  suggestions: {
    history: string[] // Suggestions from search history
    query: string[] // Suggestion from API
  }
  selectedItemIndex: number | null
  handleSearch: (searchQuery: string) => void
  removeFromHistory: (value: string) => void
}

export const SearchSuggestions: FC<SearchSuggestionsProps> = ({
  isOpen,
  suggestions,
  selectedItemIndex,
  handleSearch,
  removeFromHistory
}) => {
  const suggestionsArray = useMemo(() => {
    return Object.keys(suggestions).flatMap((key) =>
      suggestions[key as keyof typeof suggestions].map((value) => ({
        value,
        type: key as keyof typeof suggestions
      }))
    )
  }, [suggestions])

  return (
    <div
      onMouseDown={(e) => e.preventDefault()} // Prevent input from losing focus
      className={cn(
        'absolute z-30 mt-2 w-full transition-all duration-200',
        !isOpen && 'invisible scale-95 opacity-0 ease-out'
      )}
    >
      <ul className='h-full max-h-[50vh] w-full overflow-y-scroll rounded-md bg-neutral-700 p-1 shadow-md'>
        {suggestionsArray.map(({ value, type }, index) => (
          <SearchSuggestionsItem
            key={value}
            type={type}
            suggestion={value}
            isSelected={index === selectedItemIndex}
            onClick={() => handleSearch(value)}
            remove={() => removeFromHistory(value)}
          />
        ))}
      </ul>
    </div>
  )
}
