import { FC } from 'react'
import { Logo } from '@/components/Logo'
import { Search } from '@/components/Search/Search'
import Link from 'next/link'

export const Header: FC = () => {
  return (
    <header className='sticky top-0 z-30 flex items-center justify-between bg-neutral-800/80 px-8 py-4 backdrop-blur-md'>
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
