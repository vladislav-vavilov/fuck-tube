import { cn } from '@/utils'
import { FC } from 'react'
import { IoMdClose } from 'react-icons/io'

interface SearchSuggestionsProps {
  isOpen: boolean
  items: string[]
  selectedItemIndex: number | null
  handleSearch: (searchQuery: string) => void
}

export const SearchSuggestions: FC<SearchSuggestionsProps> = ({
  isOpen,
  items,
  selectedItemIndex,
  handleSearch
}) => {
  return (
    <ul
      className={cn(
        'absolute mt-2 max-h-[50vh] w-full overflow-y-scroll rounded-md bg-neutral-700 p-1 transition-all',
        {
          'invisible scale-95 opacity-0 ease-out': !isOpen
        }
      )}
    >
      {items.map((suggestion, index) => (
        <li
          key={suggestion}
          onClick={() => handleSearch(suggestion)}
          className={cn(
            'group flex cursor-pointer items-center justify-between gap-4 rounded-md p-2 text-white transition-colors duration-200 hover:bg-neutral-600',
            {
              'bg-neutral-600': selectedItemIndex === index
            }
          )}
        >
          <span>{suggestion}</span>
          <button className='invisible rounded-md p-1 opacity-0 transition-all duration-200 hover:bg-neutral-500/50 group-hover:visible group-hover:opacity-100'>
            <IoMdClose />
          </button>
        </li>
      ))}
    </ul>
  )
}
