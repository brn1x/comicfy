import React from 'react'

import { ListContainer } from './style'

interface ListProps {
  children: React.ReactNode
}

export const List: React.FC<ListProps> = ({ children }) => {
  return <ListContainer>{children}</ListContainer>
}
