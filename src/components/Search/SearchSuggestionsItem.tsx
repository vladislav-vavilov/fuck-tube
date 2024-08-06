import { cn } from '@/utils'
import { FC, MouseEvent, useEffect, useRef } from 'react'
import { IoMdClose, IoMdSearch, IoMdTime } from 'react-icons/io'

interface SearchSuggestionsItemProps {
  type: 'query' | 'history'
  suggestion: string
  isSelected: boolean
  onClick: () => void
  remove: () => void
}

export const SearchSuggestionsItem: FC<SearchSuggestionsItemProps> = ({
  type,
  suggestion,
  isSelected,
  onClick,
  remove
}) => {
  const ref = useRef<HTMLLIElement>(null)

  // Scroll into view
  useEffect(() => {
    if (!ref.current || !isSelected) return
    ref.current.scrollIntoView({ block: 'nearest' })
  }, [ref, isSelected])

  const handleRemove = (e: MouseEvent) => {
    e.stopPropagation()
    remove()
  }

  return (
    <li
      ref={ref}
      onClick={onClick}
      className={cn(
        'group flex cursor-pointer select-none items-center justify-between gap-4 rounded-md p-2 text-white transition-colors duration-200 hover:bg-neutral-600',
        {
          'bg-neutral-600': isSelected
        }
      )}
    >
      <div className='flex items-center gap-2'>
        {type === 'history' && <IoMdTime size={20} />}
        {type === 'query' && <IoMdSearch size={20} />}
        <span>{suggestion}</span>
      </div>
      {type === 'history' && (
        <button
          onClick={handleRemove}
          className='invisible rounded-md p-1 opacity-0 transition-all duration-200 hover:bg-neutral-500/50 group-hover:visible group-hover:opacity-100'
        >
          <IoMdClose />
        </button>
      )}
    </li>
  )
}
