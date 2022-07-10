import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { Metamask } from '@/pages/Metamask'
import { PageNotFound } from '@/pages/404'
import { Home } from '@/pages/Home'

import { NewContract } from '@/pages/Contract/new'

function RequireMetamask({ children }) {
  const location = useLocation()

  if (!window.ethereum)
    return <Navigate to="/metamask" state={{ from: location }} replace />

  return children
}

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireMetamask>
            <Home />
          </RequireMetamask>
        }
      />

      <Route
        path="/contract/new"
        element={
          <RequireMetamask>
            <NewContract />
          </RequireMetamask>
        }
      />

      <Route path="/metamask" element={<Metamask />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
