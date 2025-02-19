import styled, { css, keyframes, RuleSet } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -30vw 0;
  }
  100% {
    background-position: 30vw 0;
  }
`

interface ComicContainerProps {
  loading?: boolean
}

const coverShimmerAnimation = css`
  background: linear-gradient(90deg, #444 25%, #666 50%, #444 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
`

const titleShimmerAnitation = css`
  width: 80%;
  height: 18px;
  background: linear-gradient(90deg, #444 25%, #666 50%, #444 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  color: transparent;
  border-radius: 5px;
`

export const ComicContainer = styled.div<ComicContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  height: 360px;
  width: 240px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transform: translateZ(0);
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
  will-change: transform, opacity;
  font-family: 'Roboto', sans-serif;

  &:hover {
    transform: scale(1.05) translateZ(0);
    opacity: 0.8;
  }
`

export const ComicCover = styled.div<ComicContainerProps>`
  height: 312px;
  width: 240px;
  object-fit: cover;
  transition: opacity 0.2s ease;
  background-color: ${({ loading }): '#333' | 'transparent' => (loading ? '#333' : 'transparent')};

  ${({ loading }): RuleSet<object> | undefined => (loading ? coverShimmerAnimation : undefined)}

  img {
    height: 100%;
    width: 100%;
    object-fit: fill;
    display: ${({ loading }): 'none' | 'block' => (loading ? 'none' : 'block')};
  }
`

export const ComicTitle = styled.h3<ComicContainerProps>`
  margin: 15px 10px;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  color: white;
  transition: color 0.2s ease;
  font-family: 'Roboto', sans-serif;

  &:hover {
    color: #808099;
  }

  ${({ loading }): RuleSet<object> | undefined => (loading ? titleShimmerAnitation : undefined)}
`
