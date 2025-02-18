import './assets/global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { MenuProvider } from '@context/MenuContext'
import App from './App'
import { ComicProvider } from './context/ComicContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MenuProvider>
      <ComicProvider>
        <App />
      </ComicProvider>
    </MenuProvider>
  </React.StrictMode>
)
