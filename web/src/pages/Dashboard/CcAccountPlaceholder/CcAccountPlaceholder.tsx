import { PlaceholderPanel } from '../../../components/PlaceholderPanel/PlaceholderPanel'
import Link from '../../../components/Link/Link'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'

export interface CcAccountPlaceholderProps {
  widgetName: string
  halfWidth?: boolean
}

export const CcAccountPlaceholder = ({
  widgetName,
  halfWidth = false,
}: CcAccountPlaceholderProps) => {
  const { t } = useTranslation('Placeholders')

  return (
    <PlaceholderPanel halfWidth={halfWidth}>
      <div
        className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex justify-center mb-6"
        aria-hidden
      >
        <ExclamationCircleIcon className="w-8" />
      </div>

      <p>
        {widgetName} {t('are not available to your account.')}
      </p>

      <p>{t('for assistance please contact support.')}</p>
    </PlaceholderPanel>
  )
}
