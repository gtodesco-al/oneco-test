import { User } from '@fortis/api'
import classNames from 'classnames'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FormField } from '../../../components/FormField/FormField'
import { FormRadioGroup } from '../../../components/FormRadioGroup/FormRadioGroup'
import FormSelect from '../../../components/FormSelect/FormSelect'
import FormTextInput, {
  UnlabeledFormTextInput,
} from '../../../components/FormTextInput/FormTextInput'
import { FormTypeahead } from '../../../components/FormTypeahead/FormTypeahead'
import { RadioGroup } from '../../../components/RadioGroup/RadioGroup'
import { getProcessMethodOptions } from '../utils/options/getProcessMethodOptions'
import { getValidTerminals } from '../utils/options/getValidTerminals'
import { getRoutingNumbers } from '../../../utils/getRoutingNumbers'
import VirtualTerminalSection from '../VirtualTerminalSection/VirtualTerminalSection'
import {
  AccountType,
  DepositAccount,
  LocationWithDepositAccounts,
  ProcessMethod,
} from '../virtualTerminalTypes'
import { businessSECCodes, personalSECCodes } from '../../../utils/secCodes'
import { Contact } from '@fortis/api/src/services/contacts.service'
import { Token } from '@fortis/api/src/services/tokens.service'
import WalletItemSelector from '../WalletItemSelector/WalletItemSelector'

interface ProcessMethodOption {
  label: string
  value: ProcessMethod
}

const methodOptions: ProcessMethodOption[] = [
  {
    label: 'manual/swipe',
    value: 'manual',
  },

  {
    label: 'terminal',
    value: 'terminal',
  },

  {
    label: 'customer wallet',
    value: 'wallet',
  },
]

interface PaymentAccountDetailsProps {
  user: User
  location: LocationWithDepositAccounts
  account?: DepositAccount
  customer: Contact | undefined
  walletItems: Token[]
  selectedWalletItem: Token | undefined
  onChangeWalletItem: (token: Token | undefined) => void
  onCreateBankAccount: () => void
  onCreateCreditCard: () => void
  processMethod: ProcessMethod
  setProcessMethod: (value: ProcessMethod) => void
  accountType: AccountType
  setAccountType: (value: AccountType) => void
  routingNumberService?: (value: string) => Promise<string[]>
}

/**
 * Provides a version of the Payment Account Details without a routing number service.
 * Used for testing and to make it easier to swap out routing number services.
 */
export const UnboundPaymentAccountDetails = ({
  user,
  location,
  account,
  customer,
  walletItems,
  selectedWalletItem,
  onChangeWalletItem,
  onCreateBankAccount,
  onCreateCreditCard,
  processMethod,
  setProcessMethod,
  accountType,
  setAccountType,
  routingNumberService = undefined,
}: PaymentAccountDetailsProps) => {
  const { t } = useTranslation('VirtualTerminal')

  const availableProcessMethods = useMemo(() => {
    const availableMethods = getProcessMethodOptions(
      location,
      account,
      user,
      customer !== undefined
    )

    return methodOptions
      .filter((methodOption) => availableMethods.includes(methodOption.value))
      .map((methodOption) => ({
        ...methodOption,
        label: t(methodOption.label),
      })) //Localize labels
  }, [location, account, user, customer])

  const validTerminals = useMemo(() => {
    return getValidTerminals(location, account, user)
  }, [location, account, user])

  return (
    <>
      <VirtualTerminalSection header={t('payment account details')}>
        <div className="flex gap-6 mobile:block">
          {availableProcessMethods.length > 1 && (
            <RadioGroup
              label={t('payment method type')}
              name="paymentMethodType"
              options={availableProcessMethods}
              selectedValue={processMethod}
              onChange={(value) =>
                setProcessMethod(value as ProcessMethodOption['value'])
              }
            />
          )}

          {processMethod === 'terminal' && (
            <div className="flex-grow">
              <FormSelect
                label={t('select a terminal')}
                name="terminal_id"
                placeholder={t('terminal identification name')}
                options={
                  validTerminals.map(({ id, title }) => ({
                    label: title,
                    value: id,
                  })) ?? []
                }
              />
            </div>
          )}

          {processMethod === 'wallet' && (
            <div className="flex-grow">
              <WalletItemSelector
                user={user}
                walletItems={walletItems}
                selectedWalletItem={selectedWalletItem}
                onChangeWalletItem={onChangeWalletItem}
                onCreateBankAccount={onCreateBankAccount}
                onCreateCreditCard={onCreateCreditCard}
              />
            </div>
          )}
        </div>

        {processMethod === 'manual' && account?.payment_method === 'cc' && (
          <>
            <FormTextInput
              label={t('card holder name')}
              name="account_holder_name"
              placeholder={t('enter card holder name')}
            />

            <FormField label={t('card details')} name="cardDetails">
              <div className="grid grid-cols-2">
                <UnlabeledFormTextInput
                  placeholder={t('card number')}
                  usePlaceholderAsAriaLabel={true}
                  name="account_number"
                  className="col-span-2 rounded-b-none focus:z-10"
                />
                <UnlabeledFormTextInput
                  placeholder={t('mm/yy')}
                  usePlaceholderAsAriaLabel={true}
                  name="exp_date"
                  className={classNames('rounded-t-none focus:z-10', {
                    'rounded-br-none': account?.vt_cvv,
                    'col-span-2': !account?.vt_cvv,
                  })}
                />

                {account?.vt_cvv && (
                  <UnlabeledFormTextInput
                    placeholder={t('cvv')}
                    usePlaceholderAsAriaLabel={true}
                    name="cvv"
                    className="rounded-t-none rounded-bl-none focus:z-10"
                  />
                )}
              </div>
            </FormField>
          </>
        )}

        {processMethod === 'manual' && account?.payment_method === 'ach' && (
          <>
            <FormSelect
              label={t('sec code')}
              placeholder={t('select an sec code')}
              name="ach_sec_code"
              options={
                accountType === 'personal' ? personalSECCodes : businessSECCodes
              }
            />

            <div className="flex gap-6 mobile:block">
              <FormRadioGroup
                label={t('account options')}
                name="account_type"
                options={[
                  {
                    label: t('checking'),
                    value: 'checking',
                  },
                  {
                    label: t('saving'),
                    value: 'savings',
                  },
                ]}
              />

              <RadioGroup
                label={t('account type')}
                name="account_type_field"
                options={[
                  {
                    label: t('personal'),
                    value: 'personal',
                  },
                  {
                    label: t('business'),
                    value: 'business',
                  },
                ]}
                selectedValue={accountType}
                onChange={(value) => setAccountType(value as AccountType)}
              />
            </div>

            <FormTextInput
              label={t('account holder name')}
              name="account_holder_name"
              placeholder={t('enter an account holder name')}
            />

            <div className="flex gap-6 mobile:block">
              <div className="flex-grow">
                <FormTextInput
                  label={t('account number')}
                  name="account_number"
                  placeholder={t('enter an account number')}
                />
              </div>

              <div className="flex-grow">
                {routingNumberService !== undefined ? (
                  <FormTypeahead
                    label={t('routing number')}
                    placeholder={t('enter a routing number')}
                    ariaClearLabel={t('clear routing number')}
                    name="routing_number"
                    source={routingNumberService}
                  />
                ) : (
                  <FormTextInput
                    label={t('routing number')}
                    name="routing_number"
                    placeholder={t('enter a routing number')}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </VirtualTerminalSection>
    </>
  )
}

export const PaymentAccountDetails = ({
  user,
  location,
  account,
  customer,
  walletItems,
  selectedWalletItem,
  onChangeWalletItem,
  onCreateBankAccount,
  onCreateCreditCard,
  processMethod,
  setProcessMethod,
  accountType,
  setAccountType,
}: Omit<PaymentAccountDetailsProps, 'routingNumberService'>) => {
  return (
    <UnboundPaymentAccountDetails
      user={user}
      location={location}
      account={account}
      customer={customer}
      walletItems={walletItems}
      selectedWalletItem={selectedWalletItem}
      onChangeWalletItem={onChangeWalletItem}
      onCreateBankAccount={onCreateBankAccount}
      onCreateCreditCard={onCreateCreditCard}
      processMethod={processMethod}
      setProcessMethod={setProcessMethod}
      accountType={accountType}
      setAccountType={setAccountType}
      routingNumberService={getRoutingNumbers}
    />
  )
}

export default PaymentAccountDetails
