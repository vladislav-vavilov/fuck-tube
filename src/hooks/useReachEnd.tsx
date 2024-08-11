import { useEffect, useRef } from 'react'

export const useReachEnd = <Element extends HTMLElement>(
  callback: () => void
) => {
  const ref = useRef<Element>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const windowScroll = window.scrollY + window.innerHeight
      const elementScroll = ref.current.scrollHeight

      if (windowScroll > elementScroll) callback()
    }

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [ref.current])

  return ref
}
