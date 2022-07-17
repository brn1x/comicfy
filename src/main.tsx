import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.sass'
import App from './App'
import '@fontsource/roboto'
import '@fontsource/roboto/700.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
