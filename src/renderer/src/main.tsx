import './assets/global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { MenuProvider } from '@context/MenuContext'
import { ComicProvider } from './context/ComicContext'
import { SerieProvider } from './context/SerieContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MenuProvider>
      <SerieProvider>
        <ComicProvider>
          <App />
        </ComicProvider>
      </SerieProvider>
    </MenuProvider>
  </React.StrictMode>
)
