import { FC, useContext, useMemo } from 'react'
import { SearchSuggestionsItem } from './SearchSuggestionsItem'
import { cn } from '@/utils'
import { SearchContext } from '@/contexts/SearchContext'
import { SearchContextValue } from '@/types/contexts'

type Suggestion = { value: string; type: 'history' | 'query' }

export const SearchSuggestions: FC = () => {
  const {
    suggestions: { isOpen, values },
    input: { handleSearch },
    select: { currentIndex },
    history: { removeFromHistory }
  } = useContext(SearchContext) as SearchContextValue

  const suggestionsArray = useMemo(() => {
    const result: Suggestion[] = []

    for (const key in values) {
      values[key as keyof typeof values].forEach((value) => {
        result.push({
          value,
          type: key as keyof typeof values
        })
      })
    }

    return result
  }, [values])

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
            isSelected={index === currentIndex}
            onClick={() => handleSearch(value)}
            remove={() => removeFromHistory(value)}
          />
        ))}
      </ul>
    </div>
  )
}
