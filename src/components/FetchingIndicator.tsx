import { cn } from '@/utils'
import { FC, useEffect, useState } from 'react'

export const FetchingIndicator: FC = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={cn(
        'fixed top-0 z-40 h-1 w-full overflow-hidden bg-blue-200 transition-all duration-200',
        !show && 'invisible opacity-0'
      )}
    >
      <div className='h-full w-full animate-line'>
        <div className='h-full w-1/4 bg-blue-400' />
      </div>
    </div>
  )
}
