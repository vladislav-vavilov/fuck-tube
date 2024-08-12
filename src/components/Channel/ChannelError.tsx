import { FC } from 'react'
import { Message } from '../Message'
import { Error } from '../Illustrations'

export const ChannelError: FC = () => {
  return (
    <Message illustration={<Error.Laptop />}>
      It seems like an error has occurred
    </Message>
  )
}
