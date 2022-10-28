import { useTranslation } from 'react-i18next'

import Button from '../../../components/Button/Button'

type InactivityModalProps = {
  onClickOK: () => void
}

function InactivityModal({ onClickOK }: InactivityModalProps) {
  const { t } = useTranslation('InactivityModal')

  return (
    <div className="fixed z-[999] bg-gray-600 bg-opacity-50 overflow-y-auto w-full h-screen flex justify-center p-28">
      <div className="flex flex-col p-6 bg-white max-w-sm h-[13rem] rounded-md shadow-md">
        <h1 className="text-gray-900 text-base font-medium text-center">
          {t('your session is about to expire.')}
        </h1>
        <h2 className="text-gray-900 text-base font-medium text-center">
          {t('are you still there?')}
        </h2>
        <p className="text-gray-600 text-sm mt-3 mb-6">
          {t("you're going to have to click")}
          <span className="font-medium"> {t('ok')} </span>
          {t('to stay logged in.')}
        </p>
        <Button
          className="bg-gray-50 border rounded-md text-gray-900 font-medium"
          onClick={onClickOK}
        >
          {t('ok')}
        </Button>
      </div>
    </div>
  )
}

export default InactivityModal
