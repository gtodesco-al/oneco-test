import { PlaceholderPanel } from '../../../components/PlaceholderPanel/PlaceholderPanel'
import Link from '../../../components/Link/Link'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'

export interface AchAccountPlaceholderProps {
  widgetName: string
  halfWidth?: boolean
}

export const AchAccountPlaceholder = ({
  widgetName,
  halfWidth = false,
}: AchAccountPlaceholderProps) => {
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
        {widgetName} {t('are only applied to ach accounts.')}
      </p>

      <p>
        {t('to manage your accounts, go to')}{' '}
        <Link text={t('portal settings')} to="/settings/portal" />.
      </p>
    </PlaceholderPanel>
  )
}
