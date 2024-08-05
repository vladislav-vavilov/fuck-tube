import { useRef } from 'react'

export const useDebounce = (
  callback: (...args: unknown[]) => void,
  delay: number
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (...args: unknown[]) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => callback(...args), delay)
  }
}
