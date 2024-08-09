import { FC, KeyboardEvent, useContext, useRef } from 'react'
import { SearchContext } from '@/contexts/SearchContext'
import { SearchContextValue } from '@/types/contexts'
import { InputHint } from '../InputHint'
import { SearchClear } from './SearchClear'
import { useKeyDown } from '@/hooks/useKeyDown'

export const SearchInput: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    input: { query, changeQuery, clear, handleSearch },
    suggestions: { isOpen, setIsOpen },
    select: { currentItem, prev, next, unselect },
    history: { removeFromHistory }
  } = useContext(SearchContext) as SearchContextValue

  useKeyDown((e) => {
    if (e.key === 'k' && e.ctrlKey) {
      e.preventDefault()
      inputRef.current?.focus()
    }
  })

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key, ctrlKey } = e

    switch (key) {
      case 'Enter':
        handleSearch()
        inputRef.current?.blur()
        break
      case 'l':
        if (ctrlKey) {
          e.preventDefault()
          clear()
        }
        break
    }

    if (!isOpen) return
    // When suggestions are open
    switch (key) {
      case 'ArrowUp':
      case 'k':
        if (key === 'k' && !ctrlKey) return
        e.preventDefault()
        prev()
        break
      case 'ArrowDown':
      case 'j':
        if (key === 'j' && !ctrlKey) return
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
    <div className='flex w-full items-center gap-2 border-b border-neutral-700'>
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => changeQuery(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className='w-full bg-transparent p-2 text-neutral-200 transition-colors duration-200 focus:border-neutral-500'
        placeholder='Type to search'
      />
      <SearchClear show={!!query} onClick={clear} />
      <InputHint>{isOpen ? '↑↓ (Ctrl J/K)' : 'Ctrl K'}</InputHint>
    </div>
  )
}
