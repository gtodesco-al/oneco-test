import FormCurrencyInput from '../../../components/FormCurrencyInput/FormCurrencyInput'
import FormTextInput from '../../../components/FormTextInput/FormTextInput'
import VirtualTerminalSection from '../VirtualTerminalSection/VirtualTerminalSection'
import {
  DepositAccount,
  LocationWithDepositAccounts,
  TransactionType,
} from '../virtualTerminalTypes'
import { getVirtualTerminalDepositAccounts } from '../utils/options/getVirtualTerminalDepositAccounts'
import { getTransactionTypesForAccount } from '../utils/options/getTransactionTypesForAccount'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from '@fortis/api'
import { RadioGroup } from '../../../components/RadioGroup/RadioGroup'
import { Select, SelectOption } from '../../../components/Select/Select'

const depositAccountToOption = (
  account: DepositAccount
): SelectOption<DepositAccount> => ({
  label: `${account.title} - ${account.payment_method.toUpperCase()}`,
  value: account,
})

interface TransactionInformationProps {
  location: LocationWithDepositAccounts
  user: User
  depositAccount?: DepositAccount
  onChangeDepositAccount: (value: DepositAccount) => void
  transactionType: TransactionType
  onChangeTransactionType: (value: TransactionType) => void
  showHeader?: boolean
}

export const TransactionInformation = ({
  location,
  user,
  depositAccount,
  onChangeDepositAccount,
  transactionType,
  onChangeTransactionType,
  showHeader = true,
}: TransactionInformationProps) => {
  const { t } = useTranslation('VirtualTerminal')

  const depositAccounts = getVirtualTerminalDepositAccounts(location)
  const showDepositAccountSelect = depositAccounts.length > 1

  const transactionOptions = useMemo(
    () =>
      getTransactionTypesForAccount(depositAccount, user).map((o) => ({
        ...o,
        label: t(o.label),
      })),
    [depositAccount, user]
  )

  return (
    <VirtualTerminalSection
      header={showHeader ? t('transaction information') : undefined}
    >
      {showDepositAccountSelect && (
        <div className="mb-5">
          <Select<DepositAccount>
            label={t('select a deposit account')}
            showLabel
            placeholder={t('account identification name - cc')}
            options={depositAccounts.map(depositAccountToOption)}
            value={depositAccount}
            onChange={onChangeDepositAccount}
          />
        </div>
      )}

      <div className="mobile:hidden">
        <RadioGroup
          label={t('type of transaction')}
          name="transactionType"
          options={transactionOptions}
          selectedValue={transactionType}
          onChange={onChangeTransactionType as (value: string) => void}
        />
      </div>

      <div className="hidden mobile:block mb-5">
        <Select
          label={t('type of transaction')}
          showLabel
          options={transactionOptions}
          value={transactionType}
          onChange={onChangeTransactionType}
        />
      </div>

      {transactionType !== 'avsonly' && (
        <div className="grid grid-flow-col gap-6 justify-items-stretch mobile:block">
          <FormCurrencyInput
            label={t('amount')}
            name="subtotal_amount"
            currency="USD"
          />

          {Boolean(depositAccount?.vt_enable_tip) && (
            <FormCurrencyInput
              label={t('tip')}
              name="tip_amount"
              currency="USD"
            />
          )}

          {Boolean(depositAccount?.vt_enable_sales_tax) &&
            Boolean(depositAccount?.vt_override_sales_tax_allowed) && (
              <FormCurrencyInput label={t('tax')} name="tax" currency="USD" />
            )}
        </div>
      )}

      <FormTextInput
        label={t('description')}
        name="description"
        placeholder={t('enter a description')}
      />

      {depositAccount?.payment_method === 'cc' && (
        <>
          {Boolean(depositAccount?.vt_clerk_number) && (
            <FormTextInput
              label={t('clerk number')}
              name="clerk_number"
              placeholder={t('enter a clerk number')}
            />
          )}

          {Boolean(depositAccount?.vt_order_number) && (
            <FormTextInput
              label={
                depositAccount?.industry_type === 'lodging'
                  ? t('folio number')
                  : t('order number')
              }
              name="order_number"
              placeholder={
                depositAccount?.industry_type === 'lodging'
                  ? t('enter a folio number')
                  : t('enter an order number')
              }
            />
          )}
        </>
      )}

      {Boolean(depositAccount?.vt_show_custom_fields) && (
        <>
          <FormTextInput
            label={`${t('custom field')} 1`}
            name="transaction_c1"
          />

          <FormTextInput
            label={`${t('custom field')} 2`}
            name="transaction_c2"
          />

          <FormTextInput
            label={
              depositAccount?.partner === 'vericle' ||
              depositAccount?.partner === 'vericle-statement'
                ? t('service date')
                : `${t('custom field')} 3`
            }
            name="transaction_c3"
          />

          <FormTextInput
            label={`${t('custom field')} 4`}
            name="transaction_c4"
          />
        </>
      )}
    </VirtualTerminalSection>
  )
}

export default TransactionInformation
