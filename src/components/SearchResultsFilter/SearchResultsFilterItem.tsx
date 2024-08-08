import { cn } from '@/utils'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { FC } from 'react'

interface SearchResultFilterItem {
  label: string
  value: string
}

export const SearchResultsFilterItem: FC<SearchResultFilterItem> = ({
  label,
  value
}) => {
  const searchParams = useSearchParams()
  const currentFilter = searchParams.get('currentFilter')
  const pathname = usePathname()

  const params = new URLSearchParams()
  params.set('filter', value)

  return (
    <Link
      key={value}
      href={pathname + '?' + params.toString()}
      className={cn('whitespace-nowrap rounded-md p-2 leading-none', {
        'bg-neutral-100 text-black': value === currentFilter,
        'bg-neutral-700': value !== currentFilter
      })}
    >
      {label}
    </Link>
  )
}
