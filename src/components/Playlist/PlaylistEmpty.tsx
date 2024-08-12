import { Empty } from '../Illustrations'
import { Message } from '../Message'

export const PlaylistEmpty = () => {
  return (
    <Message illustration={<Empty.Box />}>
      It seems like there's nothing here
    </Message>
  )
}
