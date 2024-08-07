import { FC } from 'react'
import { Logo } from '@/components/Logo'
import { Search } from '@/components/Search/Search'
import Link from 'next/link'

export const Header: FC = () => {
  return (
    <header className='flex items-center justify-between px-8 py-4'>
      <Link href='/'>
        <Logo />
      </Link>
      <div className='flex-auto'>
        <Search />
      </div>
      <div className='h-10 w-10 rounded-full bg-gray-400' />
    </header>
  )
}
