import React from 'react'
import { HeaderContainer } from './styles'
import Menu from '@components/Menu'

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Menu />
    </HeaderContainer>
  )
}

export default Header
