import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export type ProcessingStatusProps = {
  text: string
}

export function ProcessingStatus({ text }: ProcessingStatusProps) {
  const { t } = useTranslation('ProcessingStatus')
  return (
    <span
      className={classNames('text-sm rounded font-medium px-2', {
        ['text-yellow-800 bg-yellow-50']: ['Error', 'Processing'],
        ['text-teal-800 bg-teal-100']: text === 'Settled',
        ['text-sky-800 bg-sky-100']: text === 'Re-process',
      })}
    >
      {t(text)}
    </span>
  )
}

export default ProcessingStatus
