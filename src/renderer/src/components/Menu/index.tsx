import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuContainer, MenuItem, MenuList, IconWrapper, ComicfyIcon, ComicIcon } from './styles'
import { useMenu } from '@renderer/context/MenuContext'

const Menu: React.FC = () => {
  const { selected, setSelected } = useMenu()
  const navigate = useNavigate()

  function handleHome(): void {
    setSelected('Home')
    navigate('/')
  }

  function handleSetup(): void {
    setSelected('Setup')
    navigate('/setup')
  }

  return (
    <MenuContainer className="menu-container">
      <IconWrapper>
        <ComicIcon />
        <ComicfyIcon />
      </IconWrapper>
      <MenuList>
        <MenuItem active={selected === 'Home'} onClick={handleHome}>
          Home
        </MenuItem>
        <MenuItem active={selected === 'Setup'} onClick={handleSetup}>
          Setup
        </MenuItem>
      </MenuList>
    </MenuContainer>
  )
}

export default Menu
