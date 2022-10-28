import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ErrorNotification } from '../../components/ErrorNotification/ErrorNotification'
import FullScreenLayout from '../../components/FullScreenLayout/FullScreenLayout'
import Link from '../../components/Link/Link'

export function UnauthenicatedLayout() {
  const { t } = useTranslation('UnauthenticatedLayout')

  return (
    <div className="UnauthenticatedLayout">
      <ErrorNotification />
      <FullScreenLayout className="bg-white">
        <div className="flex-1 px-24 pt-20 large-mobile:px-5 tablet:px-14">
          <div className="flex w-5 h-6 bg-sign-in-logo bg-contain bg-no-repeat" />
          <Outlet />
          <div className="flex justify-between items-center mt-8 tablet-sm:flex-row tablet-sm:items-start">
            <Link
              text={t('support')}
              to="https://fortispay.com/support/"
              className="text-gray-500 text-sm font-normal"
              isExternalLink
            />
            <Link
              text={t('terms of service')}
              to="#"
              className="text-gray-500 text-sm font-normal"
            />
            <Link
              text={t('privacy policy')}
              to="https://fortispay.com/wp-content/uploads/2022/03/Privacy-Policy-Final-V4.09152021-v1.pdf"
              className="text-gray-500 text-sm font-normal"
              isExternalLink
            />
          </div>
        </div>
        <div className="flex-2 bg-sign-in bg-no-repeat bg-cover bg-center tablet:flex-1 large-mobile:hidden tablet:bg-sign-in-tablet" />
      </FullScreenLayout>
    </div>
  )
}

export default UnauthenicatedLayout
