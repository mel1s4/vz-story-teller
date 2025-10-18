import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'

createRoot(document.getElementById('vz-script-editor')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
