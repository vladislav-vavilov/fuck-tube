import { useRef } from 'react'

export const useDebounce = <Values extends unknown[]>(
  callback: (...args: Values) => void,
  delay: number
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (...args: Values) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => callback(...args), delay)
  }
}
