import { FC } from 'react'
import { Empty } from '../Illustrations'
import { Message } from '../Message'

export const SearchResultsEmpty: FC = () => {
  return (
    <Message illustration={<Empty.Astronaut />}>
      It seems like there's nothing here
    </Message>
  )
}
