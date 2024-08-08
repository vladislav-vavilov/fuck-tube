'use client'

import { FC } from 'react'
import { Logo } from '@/components/Logo'
import { Search } from '@/components/Search/Search'
import Link from 'next/link'
import { useIsFetching } from '@tanstack/react-query'
import { FetchingIndicator } from './FetchingIndicator'

export const Header: FC = () => {
  const isFetching = useIsFetching()

  return (
    <>
      {isFetching > 0 && <FetchingIndicator />}
      <header className='sticky top-0 z-30 flex items-center justify-between bg-neutral-800/80 px-8 py-4 backdrop-blur-md'>
        <div className='basis-1/4'>
          <Link href='/' className='block w-max'>
            <Logo />
          </Link>
        </div>
        <div className='basis-1/2'>
          <Search />
        </div>
        <div className='flex basis-1/4 justify-end'>
          <div className='h-10 w-10 rounded-full bg-gray-400' />
        </div>
      </header>
    </>
  )
}
