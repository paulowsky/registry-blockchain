import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import App from './App'

import './i18n'

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
