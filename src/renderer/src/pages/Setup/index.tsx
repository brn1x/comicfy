import { useMenu } from '@context/MenuContext'
import Layout from '@renderer/Layout'
import React, { useEffect } from 'react'

const Setup: React.FC = () => {
  const { setSelected } = useMenu()

  useEffect(() => {
    setSelected('Setup')
  }, [])

  return (
    <Layout>
      <h1>Setup Page</h1>
    </Layout>
  )
}

export default Setup
