'use client'

import { FC, KeyboardEvent, useState } from 'react'
import { SearchSuggestions } from '@/components/Search/SearchSuggestions'
import { useSuggestions } from '@/hooks/useSuggestions'
import { useClickAway } from '@/hooks/useClickAway'
import { IoMdClose } from 'react-icons/io'
import { cn } from '@/utils'

export const Search: FC = () => {
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const {
    query,
    suggestions,
    selectedSuggestionIndex,
    func: {
      onQueryChange,
      cleanQuery,
      prevSuggestion,
      nextSuggestion,
      appendSearchHistory,
      removeFromSearchHistory
    }
  } = useSuggestions()

  const ref = useClickAway(() => {
    setIsSuggestionsOpen(false)
  })

  const handleSearch = (searchQuery: string = query) => {
    console.log(searchQuery)
    appendSearchHistory(searchQuery)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        handleSearch()
        break
      case 'ArrowUp':
        e.preventDefault()
        prevSuggestion()
        break
      case 'ArrowDown':
        e.preventDefault()
        nextSuggestion()
        break
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
          onClick={cleanQuery}
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
          items={suggestions}
          selectedItemIndex={selectedSuggestionIndex}
          handleSearch={handleSearch}
          removeFromSearchHistory={removeFromSearchHistory}
        />
      )}
    </div>
  )
}
