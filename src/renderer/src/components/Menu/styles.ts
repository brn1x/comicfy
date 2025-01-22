import styled from 'styled-components'

interface MenuItemProps {
  active?: boolean
}

export const MenuContainer = styled.div`
  background-color: #333;
  width: 100%;
  height: 48px;
  border-bottom: 2px solid black;
  box-shadow: 1px 10px 10px black;
`

export const MenuList = styled.ul`
  color: #ccc;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  list-style: none;
  line-height: 24px;

  &:hover {
    color: white;
  }
`

export const MenuItem = styled.li<MenuItemProps>`
  height: 28px;
  margin-left: 32px;
  cursor: pointer;
  margin-top: 18px;

  ${({ active }): string | undefined => (active ? 'border-bottom: 4px solid #a9a7d1;' : undefined)}
`
