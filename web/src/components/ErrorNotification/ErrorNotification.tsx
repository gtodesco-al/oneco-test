import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { api } from '../../api'
import Notification from '../Notification/Notification'

export function ErrorNotification() {
  const { t } = useTranslation('Errors')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    api.on('apiError', (error: any) => {
      setErrorMessage(t(error.message))
    })
  }, [])

  if (errorMessage) {
    return (
      <Notification type="error" onClose={() => setErrorMessage(null)}>
        {errorMessage}
      </Notification>
    )
  }

  return null
}
