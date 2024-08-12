import { FC } from 'react'
import { Message } from '../Message'
import { Empty } from '../Illustrations'

export const ChannelEmpty: FC = () => {
  return (
    <Message illustration={<Empty.Telescope />}>
      It looks like the channel you are looking for does not exist
    </Message>
  )
}
