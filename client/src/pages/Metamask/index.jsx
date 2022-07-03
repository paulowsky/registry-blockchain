import { useLocation, useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export function Metamask() {
  const [t] = useTranslation()

  const location = useLocation()
  const navigate = useNavigate()

  const from = location.state?.from?.pathname || {
    pathname: '/'
  }

  useEffect(() => {
    if (window.ethereum) navigate(from, { replace: true })
  }, [])

  return (
    <div className="Page">
      <h3>{t('metamask.error.title')}</h3>

      <a href="https://metamask.io/download.html">
        {t('metamask.error.button_install')}
      </a>
    </div>
  )
}
