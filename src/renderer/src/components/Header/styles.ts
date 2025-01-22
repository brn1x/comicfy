import styled from 'styled-components'
import BookOpenSVG from '../../assets/book-open.svg'
import ComicfySVG from '../../assets/comicfy.svg'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 12px 50px 12px 50px;
`

export const Title = styled.h1`
  font-size: 1.5rem;
  color: #343a40;
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
