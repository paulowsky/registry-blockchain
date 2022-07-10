import { BrowserRouter } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import { AppRoutes } from '@/routes'

import '@fontsource/roboto'

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
