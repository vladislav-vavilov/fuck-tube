import { Dispatch, SetStateAction } from 'react'

export interface SearchContextValue {
  suggestions: {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    values: {
      history: string[]
      query: string[]
    }
  }
  select: {
    currentItem?: string
    currentIndex: number
    prev: () => void
    next: () => void
    unselect: () => void
  }
  input: {
    query: string
    changeQuery: (value: string) => void
    clear: () => void
    handleSearch: (query?: string) => void
  }
  history: {
    removeFromHistory: (value: string) => void
  }
}
