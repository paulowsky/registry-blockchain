import React from 'react'

import { Web3Context } from './Web3Context'

export const AppProvider = ({ children }) => {
  return <Web3Context>{children}</Web3Context>
}
