import { Error } from '../Illustrations'

export const PlaylistInfoError = () => {
  return (
    <div className='mt-[10vh] flex flex-col items-center justify-center'>
      <Error.Robot />
      <h2 className='text-center text-2xl font-medium'>
        It seems like an error occurred
      </h2>
    </div>
  )
}
