import { useEffect, useRef } from 'react'

export const useClickAway = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      if (ref?.current && !ref.current.contains(e.target as Node)) callback()
    }

    document.addEventListener('mousedown', handleClickAway)
    return () => document.removeEventListener('mousedown', handleClickAway)
  }, [ref])

  return ref
}
