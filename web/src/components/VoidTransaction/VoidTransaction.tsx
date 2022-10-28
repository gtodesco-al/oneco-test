import { Transaction } from '@fortis/api'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../Button/Button'
import FormContainer from '../FormContainer/FormContainer'
import FormTextInput from '../FormTextInput/FormTextInput'
import { PopupForm } from '../PopupForm/PopupForm'
import { creditCardTypeMap } from '../../utils/creditCards'
import { currency } from '../../utils/format'
import { voidTransaction } from '../../pages/VirtualTerminal/utils/services/transactions'

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

interface VoidTransactionProps {
  transaction: Transaction
  isOpen: boolean
  onClose: () => void
}

export const UnboundVoidTransaction = ({
  transaction,
  isOpen,
  onClose,
  onSubmit,
}: VoidTransactionProps & { onSubmit: (description: string) => void }) => {
  const { t } = useTranslation('TransactionDetails')

  return (
    <PopupForm title={t('void transaction')} isOpen={isOpen} onClose={onClose}>
      <h1 className="text-gray-700 text-xl font-medium mb-5">
        {t('transaction details')}
      </h1>

      <FormContainer
        className="flex flex-col gap-4 text-sm"
        initialValues={{ description: '' }}
        onSubmit={({ description }) => {
          onSubmit(description)
        }}
      >
        <TransactionField label={t('account type last 4')}>
          <p>
            {creditCardTypeMap.get(transaction.account_type ?? '') ?? 'Unknown'}{' '}
            - {transaction.last_four ?? '0000'}
          </p>
        </TransactionField>

        <TransactionField label={t('transaction amount')}>
          <p>{currency(transaction.transaction_amount ?? 0)}</p>
        </TransactionField>

        <FormTextInput
          label={t('description')}
          placeholder={t('enter description')}
          name="description"
        />

        <hr className="-mx-4" />

        <div className="grid grid-cols-2 gap-6">
          <Button buttonType="bordered" onClick={onClose}>
            {t('cancel')}
          </Button>

          <Button type="submit">{t('void transaction')}</Button>
        </div>
      </FormContainer>
    </PopupForm>
  )
}

export const VoidTransaction = ({
  transaction,
  isOpen,
  onClose,
  onSubmit,
}: VoidTransactionProps & { onSubmit: () => void }) => (
  <UnboundVoidTransaction
    transaction={transaction}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={async (description: string) => {
      await voidTransaction(transaction.id, description ? description : null) //If the description is a blank string, provide no description to the API
      onSubmit()
    }}
  />
)

export default VoidTransaction
