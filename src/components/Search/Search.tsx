'use client'

import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { SearchSuggestions } from '@/components/Search/SearchSuggestions'
import { useClickAway } from '@/hooks/useClickAway'
import { IoMdClose } from 'react-icons/io'
import { cn } from '@/utils'
import { useSelect } from '@/hooks/useSelect'
import { useQuerySuggestions } from '@/hooks/useQuerySuggestions'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import { deduplicateArrays } from '@/helpers'

export const Search: FC = () => {
  const [query, setQuery] = useState('')
  const { querySuggestions, fetchQuerySuggestions } = useQuerySuggestions()
  const {
    searchHistory: historySuggestions,
    functions: {
      append: appendSearchHistory,
      getSuggestions: getHistorySuggestions,
      remove: removeFromSearchHistory
    }
  } = useSearchHistory()

  // Deduplicate query suggestions with search history
  const deduplicatedQuerySuggestions = deduplicateArrays(
    querySuggestions,
    historySuggestions
  )

  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const suggestions = [...historySuggestions, ...deduplicatedQuerySuggestions]

  const {
    currentIndex,
    currentItem,
    functions: { prev, next, unselect }
  } = useSelect(suggestions)

  console.log('search', suggestions)
  console.log('INDEX: ', currentIndex)

  const ref = useClickAway(() => {
    setIsSuggestionsOpen(false)
  })

  const handleSearch = (searchQuery: string = query) => {
    console.log(searchQuery)
    appendSearchHistory(searchQuery)
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
        handleSearch(currentItem)
        break
      case 'ArrowUp':
        e.preventDefault()
        setQuery(suggestions[prev()])
        break
      case 'ArrowDown':
        e.preventDefault()
        setQuery(suggestions[next()])
        break
      case 'Delete':
        if (currentItem) {
          removeFromSearchHistory(currentItem)
        }
      default:
        break
    }
  }

  return (
    <div ref={ref} className='relative mx-auto max-w-3xl'>
      <div className='flex w-full items-center border-b border-neutral-700'>
        <input
          value={query}
          onChange={onQueryChange}
          onKeyDown={onKeyDown}
          onFocus={() => setIsSuggestionsOpen(true)}
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
        <SearchSuggestions
          isOpen={isSuggestionsOpen}
          suggestions={{
            history: historySuggestions,
            query: deduplicatedQuerySuggestions
          }}
          selectedItemIndex={currentIndex}
          handleSearch={handleSearch}
          removeFromSearchHistory={removeFromSearchHistory}
        />
      )}
    </div>
  )
}
