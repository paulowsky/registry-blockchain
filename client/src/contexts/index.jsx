import React from 'react'

import { Web3Provider } from './Web3Context'

export const AppProvider = ({ children }) => {
  return <Web3Provider>{children}</Web3Provider>
}
