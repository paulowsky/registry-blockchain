import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from '@/routes'

import '@fontsource/roboto'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
