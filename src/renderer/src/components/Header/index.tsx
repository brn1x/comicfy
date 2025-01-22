import React from 'react'
import { HeaderContainer, IconWrapper, ComicfyIcon, ComicIcon } from './styles'
import Menu from '@components/Menu'

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <IconWrapper>
        <ComicIcon />
        <ComicfyIcon />
      </IconWrapper>
      <Menu />
    </HeaderContainer>
  )
}

export default Header
