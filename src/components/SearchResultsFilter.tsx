import { filters } from '@/constants'
import { useUpdateQueryParam } from '@/hooks/useCreateQueryParam'
import { cn } from '@/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'

export const SearchResultFilter: FC = () => {
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter') ?? 'all'
  const getUpdatedPath = useUpdateQueryParam()

  return (
    <div className='flex items-center gap-1'>
      {filters.map(({ label, value }) => (
        <Link
          key={value}
          href={getUpdatedPath('filter', value)}
          className={cn('whitespace-nowrap rounded-md p-2 leading-none', {
            'bg-neutral-100 text-black': value === filter,
            'bg-neutral-700': value !== filter
          })}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}
