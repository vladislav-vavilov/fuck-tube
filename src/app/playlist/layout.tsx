import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='mx-auto flex h-full w-full max-w-7xl gap-4'>{children}</div>
  )
}
