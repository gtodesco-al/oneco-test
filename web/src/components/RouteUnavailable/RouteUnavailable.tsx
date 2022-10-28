import { ArrowSmRightIcon } from '@heroicons/react/outline'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Button from '../Button/Button'

import { useUserProfile } from '../../hooks/useUserProfile'
import urlRedirects, { urlRedirectLabels } from '../../utils/urlRedirect'

type RouteUnavailableProps = {
  heading: string
  body: string
}

const RouteUnavailable = ({ heading, body }: RouteUnavailableProps) => {
  const { t } = useTranslation('Unavailable')

  const navigate = useNavigate()
  const { userProfile } = useUserProfile()
  const [userEntry, setUserEntry] = useState<{ label: string; route: string }>({
    label: 'Go to Dashboard',
    route: '/dashboard',
  })

  useEffect(() => {
    const entry = userProfile.ui_prefs?.entry_page
    if (entry) {
      const route = urlRedirects[entry]
      const label = urlRedirectLabels[entry]
      if (route && label) {
        setUserEntry({ route, label: `Go to ${t(label)}` })
      }
    }
  }, [userProfile])

  return (
    <>
      <div className="bg-white p-6 mobile:p-4 border border-gray-100 rounded-md h-full flex items-center justify-center">
        <div className="xl:flex gap-10 space-between">
          <div className="grow">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-red-100 mx-auto mb-8 flex items-center justify-center">
                <ExclamationCircleIcon className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="font-medium text-xl md:text-2xl text-gray-900 mb-8">
                {heading}
              </h2>
              <p className="text-sm text-gray-500 mb-6 md:mb-10">{body}</p>
              <div className="flex justify-center">
                <Button
                  type="button"
                  buttonType="primary"
                  icon={<ArrowSmRightIcon className="w-6 ml-3" />}
                  onClick={() => navigate(userEntry.route)}
                >
                  {userEntry.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function NotFound() {
  const { t } = useTranslation('NotFound')

  return (
    <RouteUnavailable
      heading={t('page not found')}
      body={t(
        "sorry, the page you are looking for doesn't exist or has been removed."
      )}
    />
  )
}

export function AccessDenied() {
  const { t } = useTranslation('AccessDenied')

  return (
    <RouteUnavailable
      heading={t('access denied')}
      body={t(
        "sorry, you don't have permission to access the page you are looking for."
      )}
    />
  )
}
