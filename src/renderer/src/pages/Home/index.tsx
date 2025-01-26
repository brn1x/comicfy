import { useEffect, useState } from 'react'

import Example from '@components/Example'
import { useMenu } from '@context/MenuContext'
import Layout from '@renderer/Layout'

const Home: React.FC = () => {
  const { setSelected } = useMenu()

  const [loading, setLoading] = useState(false)

  const openDialog = (): void => window.electron.ipcRenderer.send('open-dialog')

  window.electron.ipcRenderer.on('loading', () => setLoading(!loading))

  useEffect(() => {
    setSelected('Home')
  }, [])

  return (
    <Layout>
      <Example />
      <button onClick={openDialog}>OpenDialog</button>
      {loading && <div>Loading...</div>}
    </Layout>
  )
}

export default Home
