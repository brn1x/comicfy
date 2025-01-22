import React from 'react'

import { MenuContainer, MenuItem, MenuList } from './styles'
import { useMenu } from '@renderer/context/MenuContext'

const Menu: React.FC = () => {
  const { selected } = useMenu()

  function handleHome(): void {
    console.log(selected)
    console.log('Working...')
  }

  function handleSetup(): void {
    console.log('Working...')
  }

  return (
    <MenuContainer className="menu-container">
      {/* <MenuTools /> */}
      <MenuList>
        <MenuItem active={selected === 'Home'} onClick={handleHome}>
          Home
        </MenuItem>
        <MenuItem active={selected === 'Setup'} onClick={handleSetup}>
          Setup
        </MenuItem>
        <MenuItem className="">A{/* <PlusCircle onClick={handleAddComic} size={24} /> */}</MenuItem>
      </MenuList>
    </MenuContainer>
  )
}

export default Menu
