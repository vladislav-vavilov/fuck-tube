import { cn } from '@/utils'
import { FC, useMemo } from 'react'
import { SearchSuggestionsItem } from './SearchSuggestionsItem'

interface SearchSuggestionsProps {
  suggestions: {
    history: string[] // Suggestions from search history
    query: string[] // Suggestion from API
  }
  selectedItemIndex: number | null
  handleSearch: (searchQuery: string) => void
  removeFromSearchHistory: (value: string) => void
}

export const SearchSuggestions: FC<SearchSuggestionsProps> = ({
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
    <ul className='h-full w-full overflow-y-scroll rounded-md bg-neutral-700 p-1'>
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
