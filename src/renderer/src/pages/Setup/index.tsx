import { useMenu } from '@context/MenuContext'
import React, { useEffect } from 'react'

const Setup: React.FC = () => {
  const { setSelected } = useMenu()

  useEffect(() => {
    setSelected('Setup')
  }, [])

  return (
    <div>
      <h1>Setup Page</h1>
    </div>
  )
}

export default Setup
