import { Empty } from '../Illustrations'

export const PlaylistEmpty = () => {
  return (
    <div className='mt-[10vh] flex flex-col items-center justify-center'>
      <Empty.Box />
      <h2 className='text-center text-2xl font-medium'>
        It seems like there's nothing here
      </h2>
    </div>
  )
}
