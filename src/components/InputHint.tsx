import { FC, ReactNode } from 'react'

export const InputHint: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='pointer-events-none whitespace-nowrap rounded-md border border-neutral-600 bg-neutral-700 p-1 text-xs text-neutral-200'>
      {children}
    </div>
  )
}
