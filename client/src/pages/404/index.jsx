import { useTranslation } from 'react-i18next'

export function PageNotFound() {
  const [t] = useTranslation()

  return (
    <div className="Page">
      <p>{t('not_found')}</p>
    </div>
  )
}
