'use client'

import { FC, KeyboardEvent, useState } from 'react'
import { SearchSuggestions } from '@/components/Search/SearchSuggestions'
import { useSuggestions } from '@/hooks/useSuggestions'
import { appendSearchHistory } from '@/helpers'

export const Search: FC = () => {
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const {
    query,
    suggestions,
    selectedSuggestionIndex,
    func: { onQueryChange, selectSuggestion }
  } = useSuggestions()

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
        selectSuggestion('prev')
        break
      case 'ArrowDown':
        e.preventDefault()
        selectSuggestion('next')
        break
      default:
        break
    }
  }

  return (
    <div className='relative mx-auto max-w-3xl'>
      <input
        value={query}
        onChange={onQueryChange}
        onKeyDown={onKeyDown}
        onBlur={() => setIsSuggestionsOpen(false)}
        onFocus={() => setIsSuggestionsOpen(true)}
        className='w-full border-b border-neutral-700 bg-transparent p-2 text-neutral-200 transition-colors duration-200 focus:border-neutral-500'
        placeholder='Type to search'
      />
      {!!suggestions.length && (
        <SearchSuggestions
          isOpen={isSuggestionsOpen}
          items={suggestions}
          selectedItemIndex={selectedSuggestionIndex}
          handleSearch={handleSearch}
        />
      )}
    </div>
  )
}
