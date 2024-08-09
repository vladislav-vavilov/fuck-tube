import { cn } from '@/utils'
import { FC } from 'react'
import { IoMdClose } from 'react-icons/io'

interface SearchClearProps {
  show: boolean
  onClick: () => void
}

export const SearchClear: FC<SearchClearProps> = ({ show, onClick }) => {
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()} // Prevent input from losing focus
      className={cn(
        'text-white transition-all duration-200',
        !show && 'invisible rotate-45 scale-95 opacity-0'
      )}
    >
      <IoMdClose size={20} />
    </button>
  )
}
