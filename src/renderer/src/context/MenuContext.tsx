import React, { createContext, useState, ReactNode, useContext } from 'react'

interface MenuContextProps {
  selected: string
  setSelected: (selected: string) => void
}

const MenuContext = createContext<MenuContextProps>({} as MenuContextProps)

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selected, setSelected] = useState('')

  return <MenuContext.Provider value={{ selected, setSelected }}>{children}</MenuContext.Provider>
}

export const useMenu = (): MenuContextProps => {
  const context = useContext(MenuContext)

  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider')
  }

  return context
}
