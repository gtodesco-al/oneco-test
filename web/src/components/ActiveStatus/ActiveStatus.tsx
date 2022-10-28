import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { codeToActiveStatus } from '@fortis/api/src/utils/status-codes'

export type ActiveStatusProps = {
  code: string
}

export function ActiveStatus({ code }: ActiveStatusProps) {
  const { t } = useTranslation('Status')

  const active = codeToActiveStatus(code)
  return (
    <span
      className={classNames('text-sm rounded font-medium px-2', {
        ['text-gray-800 bg-gray-200']: !active,
        ['text-teal-800 bg-teal-50']: active,
      })}
    >
      {t('active')}
    </span>
  )
}

export default ActiveStatus
