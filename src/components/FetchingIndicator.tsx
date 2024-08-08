import { FC } from 'react'

export const FetchingIndicator: FC = () => {
  return (
    <div className='fixed top-0 z-40 h-1 w-full overflow-hidden bg-blue-200'>
      <div className='h-full w-full animate-line'>
        <div className='h-full w-1/4 bg-blue-400' />
      </div>
    </div>
  )
}
