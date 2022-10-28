import { ReactNode, useState } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'
import { Transaction } from '@fortis/api'
import { calculateSubtotal } from '@fortis/api/src/utils/calculateSubtotal'
import { codeToTransactionType } from '@fortis/api/src/utils/transaction-type'
import { codeToTransactionStatus } from '@fortis/api/src/utils/status-codes'
import { codeToReason } from '@fortis/api/src/utils/reason-codes'
import { codeToEntryMode } from '@fortis/api/src/utils/entry-modes'
import { format } from 'date-fns'
import { isNil, noop } from 'lodash'

import TransactionStatus from './TransactionStatus/TransactionStatus'
import Button from '../Button/Button'
import { currency } from '../../utils/format'
import { HasPermission } from '../HasPermission/HasPermission'
import { creditCardTypeMap } from '../../utils/creditCards'
import VoidTransaction from '../VoidTransaction/VoidTransaction'
import { Notification } from '../Notification/Notification'

const dateFormatString = 'dd/MM/yyyy hh:mm:ssaaa'

interface TransactionFieldProps {
  label: string
  className?: string
  children: ReactNode
}

const TransactionField = ({ label, children }: TransactionFieldProps) => (
  <div className="flex justify-between items-center">
    <p className="text-sm text-gray-600">{label}</p>
    {children}
  </div>
)

export type TransactionDetailsProps = {
  transaction: Transaction
  handleClose(): void
  onVoid?: () => void
}

const TransactionDetails = ({
  transaction,
  handleClose,
  onVoid = noop,
}: TransactionDetailsProps) => {
  const { t } = useTranslation('TransactionDetails')
  const isAch = transaction.payment_method === 'ach'

  //Amount field show/hide is based on whether or not they have values in order to ensure that they show if there is an amount.
  const showTip = !isNil(transaction.tip_amount)
  const showSalesTax = !isNil(transaction.tax)
  const showSurcharge = !isNil(transaction.surcharge_amount)

  const showSubtotal = showTip || showSalesTax || showSurcharge

  //Void transaction modal is included here so that it doesn't have to be replicated across every form using the transaction details
  const [showVoidModal, setShowVoidModal] = useState(false)
  const [notification, setNotification] = useState<string>()

  return (
    <>
      {notification && (
        <Notification type="success" onClose={() => setNotification(undefined)}>
          {notification}
        </Notification>
      )}

      <VoidTransaction
        isOpen={showVoidModal}
        onClose={() => setShowVoidModal(false)}
        transaction={transaction}
        onSubmit={() => {
          setShowVoidModal(false)
          setNotification(t('transaction was successfully voided'))
          onVoid()
        }}
      />

      <div className="z-[100] flex flex-col h-full w-96 fixed top-0 right-0 bg-white p-6 shadow">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-900 font-semibold text-lg">
            {t('transaction details')}
          </h1>
          <Button
            buttonType="outline"
            onClick={handleClose}
            icon={<XIcon className="w-5 h-5 text-gray-400" />}
          />
        </div>

        {/* This element always shows the scrollbar to ensure the padding doesn't throw off the layout */}
        <div className="flex flex-col gap-4 mt-4 overflow-y-scroll pr-3 text-sm">
          <TransactionField label={t('transaction amount')}>
            <p className="text-2xl">
              {currency(transaction.transaction_amount ?? 0)}
            </p>
          </TransactionField>

          <hr />

          {showSubtotal && (
            <TransactionField label={t('subtotal')}>
              <p>{currency(calculateSubtotal(transaction))}</p>
            </TransactionField>
          )}

          {showSurcharge && (
            <TransactionField label={t('surcharge')}>
              <p>{currency(transaction.surcharge_amount ?? 0)}</p>
            </TransactionField>
          )}

          {showSalesTax && (
            <TransactionField label={t('tax')}>
              <p>{currency(transaction.tax ?? 0)}</p>
            </TransactionField>
          )}

          {showTip && (
            <TransactionField label={t('tip')}>
              <p>{currency(transaction.tip_amount ?? 0)}</p>
            </TransactionField>
          )}

          {showSubtotal && <hr />}

          {Boolean(transaction.product_transaction?.vt_show_custom_fields) && (
            <>
              <TransactionField label={`${t('custom field')} 1`}>
                {transaction.transaction_c1}
              </TransactionField>

              <TransactionField label={`${t('custom field')} 2`}>
                {transaction.transaction_c2}
              </TransactionField>

              <TransactionField
                label={
                  transaction.product_transaction?.partner?.toLowerCase() ===
                    'vericle' ||
                  transaction.product_transaction?.partner?.toLowerCase() ===
                    'vericle-statement'
                    ? t('service date')
                    : `${t('custom field')} 3`
                }
              >
                {transaction.transaction_c3}
              </TransactionField>

              <TransactionField label={`${t('custom field')} 4`}>
                {transaction.transaction_c4}
              </TransactionField>
            </>
          )}

          <TransactionField label={t('transaction type')}>
            <p>
              {transaction.type_id
                ? codeToTransactionType(transaction.type_id.toString())
                : 'Unknown'}
            </p>
          </TransactionField>

          <TransactionField label={t('transaction status')}>
            <TransactionStatus
              text={codeToTransactionStatus(transaction.status_code)}
            />
          </TransactionField>

          <TransactionField label={t('transaction verbiage')}>
            <p>{transaction.verbiage}</p>
          </TransactionField>

          <TransactionField label={t('reason')}>
            <p>
              {transaction.reason_code_id
                ? codeToReason(transaction.reason_code_id.toString())
                : 'Unknown'}
            </p>
          </TransactionField>

          {!isAch && (
            <TransactionField label={t('auth code')}>
              <p>{transaction.auth_code ?? ''}</p>
            </TransactionField>
          )}

          <hr />

          <TransactionField label={t('account holder')}>
            <p>{transaction.account_holder_name ?? ''}</p>
          </TransactionField>

          <TransactionField label={t('account type last 4')}>
            <p>
              {creditCardTypeMap.get(transaction.account_type ?? '') ??
                'Unknown'}{' '}
              - {transaction.last_four ?? '0000'}
            </p>
          </TransactionField>

          <TransactionField label={t('entry mode')}>
            <p>
              {transaction.entry_mode_id
                ? codeToEntryMode(transaction.entry_mode_id.toString())
                : 'Unknown'}
            </p>
          </TransactionField>

          <hr />

          <div>
            <p className="text-sm text-gray-600">{t('description')}</p>
            <p>{transaction.description ?? ''}</p>
          </div>

          <hr />

          <TransactionField label={t('date time')}>
            <p>{format(transaction.created_ts, dateFormatString)}</p>
          </TransactionField>

          <TransactionField label={t('transaction id')}>
            <p>{transaction.id}</p>
          </TransactionField>

          <hr />

          <div className="flex flex-col py-8">
            <p className="font-semibold text-base text-gray-700 mb-4">
              {t('transaction history')}
            </p>

            {transaction.transaction_histories?.map((historyItem) => (
              <TransactionField
                key={historyItem.id}
                label={format(historyItem.event_date_ts ?? 0, dateFormatString)}
              >
                <TransactionStatus
                  text={codeToTransactionStatus(transaction.status_code)}
                />
              </TransactionField>
            )) ?? ''}
          </div>
        </div>
        <div className="flex flex-col pt-4">
          {transaction.is_voidable && (
            <HasPermission permission="v2.transactions.put.void">
              <Button onClick={() => setShowVoidModal(true)}>
                {t('void transaction')}
              </Button>
            </HasPermission>
          )}
          {isAch ? (
            <HasPermission permission="v2.notifications.post">
              <Button>{t('send email receipt')}</Button>
            </HasPermission>
          ) : (
            <Button>{t('print authorization')}</Button>
          )}
        </div>
      </div>
    </>
  )
}

export default TransactionDetails
