import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { PageNotFound } from '@/pages/404'
import { Metamask } from '@/pages/Metamask'
import { Home } from '@/pages/Home'

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

      <Route path="/metamask" element={<Metamask />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
