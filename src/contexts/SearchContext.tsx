import { useQuerySuggestions } from '@/hooks/useQuerySuggestions'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import { useSelect } from '@/hooks/useSelect'
import { SearchContextValue } from '@/types/contexts'
import { useRouter, useSearchParams } from 'next/navigation'
import { createContext, FC, ReactNode, useState } from 'react'

export const SearchContext = createContext<SearchContextValue | null>(null)

export const SearchContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
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
  const isOpen = isSuggestionsOpen && !!suggestions.length

  const {
    currentIndex,
    currentItem,
    functions: { prev, next, unselect }
  } = useSelect({
    items: suggestions,
    onIndexChange: (currentIndex) => setQuery(suggestions[currentIndex])
  })

  const { push } = useRouter()
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter')

  const handleSearch = (searchQuery: string = query) => {
    const params = new URLSearchParams()
    params.set('search_query', searchQuery)
    params.set('filter', filter || 'all')

    push(`/results?${params.toString()}`)
    unselect()
    appendHistory(searchQuery)
    setIsSuggestionsOpen(false)
  }

  const changeQuery = (value: string) => {
    setQuery(value)
    unselect()

    getHistorySuggestions(value)
    fetchQuerySuggestions(value)
  }

  const clear = () => changeQuery('')

  const value = {
    suggestions: {
      isOpen: isOpen,
      setIsOpen: setIsSuggestionsOpen,
      values: { history: historySuggestions, query: querySuggestions }
    },
    history: { removeFromHistory },
    select: { currentItem, currentIndex, prev, next, unselect },
    input: { query, changeQuery, clear, handleSearch }
  }

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}
