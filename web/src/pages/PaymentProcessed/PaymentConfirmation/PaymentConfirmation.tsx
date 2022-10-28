import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Button from '../../../components/Button/Button'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'
import { Transaction } from '@fortis/api'
import { api } from '../../../api'
import { useParams } from 'react-router-dom'
import TransactionDetails from '../../../components/TransactionDetails/TransactionDetails'
import { VoidTransaction } from '../../../components/VoidTransaction/VoidTransaction'
import Notification from '../../../components/Notification/Notification'
import { HasPermission } from '../../../components/HasPermission/HasPermission'

export type PaymentConfirmationProps = {
  transaction: Transaction
  onClickVoid: () => void
  onVoid: () => void
}

export const UnwrappedPaymentConfirmation = ({
  transaction,
  onClickVoid,
  onVoid,
}: PaymentConfirmationProps) => {
  const { t } = useTranslation('PaymentConfirmation')
  const [showTransactionDetail, setShowTransactionDetail] = useState(false)

  const isAch = transaction.product_transaction?.payment_method === 'ach'
  const hasTerminal = Boolean(transaction.terminal_id)

  return (
    <>
      {showTransactionDetail && (
        <TransactionDetails
          transaction={transaction}
          handleClose={() => setShowTransactionDetail(false)}
          onVoid={onVoid}
        />
      )}
      <div className="w-full h-screen flex items-center justify-center bg-white rounded-md flex-col">
        <CheckCircleIcon className="text-green-500 w-16 h-S16 mb-8" />

        <h1 className="text-gray-900 text-2xl">
          {t('payment successfully processed')}
        </h1>

        {!isAch && (
          <p className="mt-2 mb-8 text-gray-600 text-sm">
            {t('auth code')} ${transaction.auth_code}
          </p>
        )}

        <p className="text-sm text-gray-600 max-w-md text-center">
          {t('you can view')}{' '}
          <button
            className="font-semibold text-sm underline underline-offset-2 text-primary-color"
            onClick={() => setShowTransactionDetail(true)}
          >
            {t('transaction details')}
          </button>{' '}
          {t(
            'or see this transaction on your transactions report for more actions'
          )}
        </p>

        <div className="flex mt-16">
          {transaction.is_voidable && (
            <HasPermission permission="v2.transactions.put.void">
              <Button
                className="bg-gray-50 border rounded-md text-gray-900 font-medium"
                onClick={onClickVoid}
              >
                {t('void transaction')}
              </Button>
            </HasPermission>
          )}

          {hasTerminal && !isAch && (
            <Button className="bg-gray-50 border rounded-md text-gray-900 mx-6 font-medium">
              {t('print authorization')}
            </Button>
          )}
          <Button
            className={classNames(
              'bg-gray-50 border rounded-md text-gray-900 font-medium',
              {
                ['ml-6']: !hasTerminal || isAch,
              }
            )}
          >
            {t('email receipt')}
          </Button>
          {(hasTerminal || isAch) && (
            <Button className="bg-gray-50 border rounded-md text-gray-900 ml-6 font-medium">
              {t('paper transaction')}
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

const PaymentConfirmation = () => {
  const { t } = useTranslation('PaymentConfirmation')
  const { transactionId } = useParams()
  const [transaction, setTransaction] = useState<Transaction>()
  const [showVoidModal, setShowVoidModal] = useState(false)
  const [notification, setNotification] = useState<string>()

  const loadTransaction = () =>
    api
      .service('transactions')
      .get(transactionId ?? '')
      .then(setTransaction)
      .catch(console.log)

  useEffect(() => {
    loadTransaction()
  }, [])

  return transaction === undefined ? (
    <></>
  ) : (
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
          loadTransaction()
        }}
      />

      <UnwrappedPaymentConfirmation
        transaction={transaction}
        onClickVoid={() => setShowVoidModal(true)}
        onVoid={() => loadTransaction()}
      />
    </>
  )
}

export default PaymentConfirmation
