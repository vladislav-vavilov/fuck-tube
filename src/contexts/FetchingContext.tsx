import { useRouter } from 'next/router'
import { createContext, FC, ReactNode, useEffect, useState } from 'react'

export const FetchingContext = createContext(null)

export const FetchingContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isLoading, setIsLoading] = useState(true)
  console.log(isLoading)
  const { events } = useRouter()

  useEffect(() => {
    events.on('routeChangeStart', () => setIsLoading(true))
    events.on('routeChangeComplete', () => setIsLoading(false))
    events.on('routeChangeError', () => setIsLoading(false))

    return () => {
      events.off('routeChangeStart', () => setIsLoading(false))
      events.off('routeChangeComplete', () => setIsLoading(false))
      events.off('routeChangeError', () => setIsLoading(false))
    }
  }, [])

  return (
    <FetchingContext.Provider value={null}>{children}</FetchingContext.Provider>
  )
}
