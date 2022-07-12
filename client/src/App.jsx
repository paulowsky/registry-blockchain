import { BrowserRouter } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import { AppProvider } from '@/contexts'

import { AppRoutes } from '@/routes'

import '@fontsource/roboto'

function App() {
  return (
    <ChakraProvider>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </ChakraProvider>
  )
}

export default App
