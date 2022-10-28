import { User } from '@fortis/api'
import { useFormikContext } from 'formik'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { currency } from '../../../utils/format'
import {
  DepositAccount,
  TransactionType,
  VirtualTerminalTransaction,
} from '../virtualTerminalTypes'

interface LineItemProps {
  name: string
  value?: number
}

const LineItem = ({ name, value }: LineItemProps) => (
  <div className="flex justify-between text-sm">
    <p aria-hidden className="font-medium">
      {name}
    </p>
    <p aria-label={name}>{currency(value ?? 0)}</p>
  </div>
)

interface TransactionSummaryProps {
  account?: DepositAccount
  user: User
  transactionType: TransactionType
}

//Values may have commas in strings for larger numbers, this cleans them up a bit to provide consistent numbers
const valueToNumber = (value: string | number | null | undefined) => {
  if (!value) {
    return 0
  }

  if (typeof value === 'string') {
    value = Number(value.replace(',', ''))
  }

  return isNaN(value) ? 0 : value
}

export const TransactionSummary = ({
  account,
  user,
  transactionType,
}: TransactionSummaryProps) => {
  const { t } = useTranslation('VirtualTerminal')

  const { values } = useFormikContext<VirtualTerminalTransaction>()

  const showTip = account?.vt_enable_tip ?? false
  const showSalesTax = account?.vt_enable_sales_tax ?? false
  const showSurcharge =
    !isNil(account?.surcharge) &&
    (isNil(account?.surcharge?.apply_to_user_type_id) ||
      account?.surcharge.apply_to_user_type_id === user.user_type_id) &&
    (transactionType !== 'refund' || account?.surcharge?.refund_surcharges)

  const showSubtotal = showTip || showSalesTax || showSurcharge

  return (
    <section className="bg-gray-100 border rounded-md border-gray-200 px-5 pt-5 pb-9">
      <h1 className="text-xl font-medium text-gray-900 mb-6">
        {t('transaction summary')}
      </h1>

      <div className="flex flex-col gap-4 mb-8">
        {Boolean(showSubtotal) && (
          <>
            <LineItem
              name={t('subtotal amount')}
              value={valueToNumber(values.subtotal_amount)}
            />
            <hr />
          </>
        )}

        {Boolean(showTip) && (
          <LineItem name={t('tip')} value={valueToNumber(values.tip_amount)} />
        )}

        {Boolean(showSalesTax) && (
          <LineItem name={t('tax')} value={valueToNumber(values.tax)} />
        )}

        {Boolean(showSurcharge) && (
          <LineItem
            name={account?.surcharge?.surcharge_label ?? t('surcharge')}
            value={valueToNumber(values.surcharge_amount)}
          />
        )}

        {Boolean(showSubtotal) && <hr />}
      </div>

      <div className="flex justify-between text-sm font-medium items-center">
        <p aria-hidden>{t('total amount')}</p>

        <p className="text-xl font-bold" aria-label={t('total amount')}>
          {currency(valueToNumber(values.transaction_amount))}
        </p>
      </div>
    </section>
  )
}

export default TransactionSummary
