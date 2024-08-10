import { SearchResultFilter } from '@/components/SearchResults/SearchResultsFilter'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='mx-auto flex h-full w-full max-w-4xl flex-col items-center gap-4'>
      <SearchResultFilter />
      {children}
    </div>
  )
}
