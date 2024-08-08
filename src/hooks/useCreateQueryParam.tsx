import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useUpdateQueryParam = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const createQueryParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return pathname + '?' + params.toString()
    },
    [searchParams, pathname]
  )

  return createQueryParam
}
