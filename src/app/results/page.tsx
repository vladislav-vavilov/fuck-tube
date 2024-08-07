'use client'

import { useSearchParams } from 'next/navigation'

export default function Results() {
  const searchParams = useSearchParams()
  const query = searchParams.get('search_query')

  return <span>{query}</span>
}
