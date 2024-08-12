import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='mx-auto w-full max-w-7xl bg-neutral-500'>{children}</div>
  )
}
