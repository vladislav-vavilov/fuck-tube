import { useEffect } from 'react'

export const useReachEnd = (callback: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
        console.log('reached')
        callback()
      }
    }

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [callback])
}
