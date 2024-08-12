import { FC, ReactNode } from 'react'

interface MessageProps {
  illustration: ReactNode
  children: ReactNode
}

export const Message: FC<MessageProps> = ({ illustration, children }) => {
  return (
    <div className='mt-[10vh] flex flex-col items-center justify-center'>
      {illustration}
      <h2 className='text-center text-2xl font-medium'>{children}</h2>
    </div>
  )
}
