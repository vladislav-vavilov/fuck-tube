import { Suggestion } from '@/types'
import { cn } from '@/utils'
import { FC, useEffect, useRef } from 'react'
import { IoMdClose, IoMdSearch, IoMdTime } from 'react-icons/io'

interface SearchSuggestionsItemProps {
  suggestion: Suggestion
  selected: boolean
  onClick: () => void
}

export const SearchSuggestionsItem: FC<SearchSuggestionsItemProps> = ({
  suggestion: { type, value },
  selected,
  onClick
}) => {
  const ref = useRef<HTMLLIElement>(null)

  // Scroll into view
  useEffect(() => {
    if (!ref.current || !selected) return
    ref.current.scrollIntoView({ block: 'nearest' })
  }, [ref, selected])

  return (
    <li
      ref={ref}
      onClick={onClick}
      className={cn(
        'group flex cursor-pointer items-center justify-between gap-4 rounded-md p-2 text-white transition-colors duration-200 hover:bg-neutral-600',
        {
          'bg-neutral-600': selected
        }
      )}
    >
      <div className='flex items-center gap-2'>
        {type === 'history' && <IoMdTime size={20} />}
        {type === 'query' && <IoMdSearch size={20} />}
        <span>{value}</span>
      </div>
      {type === 'history' && (
        <button
          onClick={(e) => e.stopPropagation()}
          className='invisible rounded-md p-1 opacity-0 transition-all duration-200 hover:bg-neutral-500/50 group-hover:visible group-hover:opacity-100'
        >
          <IoMdClose />
        </button>
      )}
    </li>
  )
}
