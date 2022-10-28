import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export type TransactionStatusProps = {
  text: string
}

export function TransactionStatus({ text }: TransactionStatusProps) {
  const { t } = useTranslation('TransactionDetails')
  return (
    <span
      className={classNames('text-sm rounded font-medium px-2', {
        ['text-yellow-800 bg-yellow-50']: text === 'Pending-origination',
        ['text-teal-800 bg-teal-100']: [
          'Approved',
          'Refunded',
          'Voided',
        ].includes(text),
        ['text-sky-800 bg-sky-100']: text === 'AuthOnly',
      })}
    >
      {t(text)}
    </span>
  )
}

export default TransactionStatus
