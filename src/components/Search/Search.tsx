'use client'

import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { SearchSuggestions } from '@/components/Search/SearchSuggestions'
import { IoMdClose } from 'react-icons/io'
import { cn } from '@/utils'
import { useSelect } from '@/hooks/useSelect'
import { useQuerySuggestions } from '@/hooks/useQuerySuggestions'
import { useSearchHistory } from '@/hooks/useSearchHistory'

export const Search: FC = () => {
  const [query, setQuery] = useState('')
  const {
    historySuggestions,
    functions: { appendHistory, removeFromHistory, getHistorySuggestions }
  } = useSearchHistory()
  const { querySuggestions, fetchQuerySuggestions } = useQuerySuggestions({
    exclude: historySuggestions
  })

  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const suggestions = [...historySuggestions, ...querySuggestions]

  const {
    currentIndex,
    currentItem,
    functions: { prev, next, unselect }
  } = useSelect({
    items: suggestions,
    onIndexChange: (currentIndex) => setQuery(suggestions[currentIndex])
  })

  const handleSearch = (searchQuery: string = query) => {
    console.log(searchQuery)
    unselect()
    appendHistory(searchQuery)
  }

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setQuery(value)
    unselect()

    getHistorySuggestions(value)
    fetchQuerySuggestions(value)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        handleSearch()
        break
      case 'ArrowUp':
        e.preventDefault()
        prev()
        break
      case 'ArrowDown':
        e.preventDefault()
        next()
        break
      case 'Delete':
        if (currentItem) {
          unselect()
          removeFromHistory(currentItem)
        }
      default:
        break
    }
  }

  return (
    <div className='relative mx-auto max-w-3xl'>
      <div className='flex w-full items-center border-b border-neutral-700'>
        <input
          value={query}
          onChange={onQueryChange}
          onKeyDown={onKeyDown}
          onFocus={() => setIsSuggestionsOpen(true)}
          onBlur={() => setIsSuggestionsOpen(false)}
          className='w-full bg-transparent p-2 text-neutral-200 transition-colors duration-200 focus:border-neutral-500'
          placeholder='Type to search'
        />
        <button
          onClick={() => setQuery('')}
          className={cn('text-white transition-all duration-200', {
            'rotate-45 scale-95 opacity-0': !query
          })}
        >
          <IoMdClose size={20} />
        </button>
      </div>
      {!!suggestions.length && (
        <div
          onMouseDown={(e) => e.preventDefault()}
          className={cn(
            'absolute mt-2 w-full transition-all duration-200',
            !isSuggestionsOpen && 'invisible scale-95 opacity-0 ease-out'
          )}
        >
          <SearchSuggestions
            suggestions={{
              history: historySuggestions,
              query: querySuggestions
            }}
            selectedItemIndex={currentIndex}
            handleSearch={handleSearch}
            removeFromHistory={removeFromHistory}
          />
        </div>
      )}
    </div>
  )
}
