import { Error } from '../Illustrations'
import { Message } from '../Message'

export const PlaylistError = () => {
  return (
    <Message illustration={<Error.Robot />}>
      It seems like an error has occurred
    </Message>
  )
}
