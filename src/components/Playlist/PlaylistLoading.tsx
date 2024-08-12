import { FC } from 'react'
import { CardSkeletons } from '../Cards/CardSkeletons'

export const PlaylistLoading: FC = () => {
  return (
    <>
      <div className='skeleton h-72 w-full basis-1/4'></div>
      <CardSkeletons className='basis-3/4' />
    </>
  )
}
