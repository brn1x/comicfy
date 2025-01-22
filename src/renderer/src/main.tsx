import './assets/global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { MenuProvider } from '@context/MenuContext'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MenuProvider>
      <App />
    </MenuProvider>
  </React.StrictMode>
)
