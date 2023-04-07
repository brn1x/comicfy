import { createContext, useContext } from 'react'

interface MenuTitleProps {
  title: string
  setTitle: Function
}

const MenuTitleContext = createContext<MenuTitleProps>({ title: '', setTitle: () => {} })

const useMenuTitleContext = () => useContext(MenuTitleContext)

export { MenuTitleContext as MenuTitleContext, useMenuTitleContext as useHeaderTitleContext }
