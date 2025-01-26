import styled from 'styled-components'

import BookOpenSVG from '../../assets/book-open.svg'
import ComicfySVG from '../../assets/comicfy.svg'

interface MenuItemProps {
  active?: boolean
}

export const MenuContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  padding: 12px 20px 12px 20px;
  border-bottom: 2px solid black;
  box-shadow: 1px 10px 10px black;
`

export const MenuList = styled.ul`
  color: #ccc;
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 24px;
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
  margin-top: 68px;
  color: #c1c1c1;
  font-size: 20px;
  font-weight: 500;

  ${({ active }): string | undefined => (active ? 'border-bottom: 4px solid #a9a7d1;' : undefined)}
`

export const IconWrapper = styled.div`
  width: 160px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ComicIcon = styled(BookOpenSVG)`
  color: #808099;
  width: 50px;
  height: 100px;
`

export const ComicfyIcon = styled(ComicfySVG)`
  margin-top: 8px;
  width: 110px;
  height: 100px;
`
