import { useEffect } from 'react'

import Example from '@components/Example'
import { useMenu } from '@context/MenuContext'

const Home: React.FC = () => {
  const { setSelected, selected } = useMenu()

  useEffect(() => {
    setSelected('Home')
    console.log(selected)
  }, [])

  return (
    <>
      <Example />
      <button onClick={(): void => setSelected('Setup')}>Salve</button>
      <button onClick={(): void => setSelected('Home')}>Salve</button>
    </>
  )
}

export default Home
