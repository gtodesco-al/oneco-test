import { User } from '@fortis/api'
import { ArrowSmRightIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button/Button'
import FormContainer from '../../components/FormContainer/FormContainer'
import { useLocations } from '../../hooks/useLocations'
import { useUserProfile } from '../../hooks/useUserProfile'
import {
  AccountType,
  DepositAccount,
  LocationWithDepositAccounts,
  ProcessMethod,
  TransactionType,
  VirtualTerminalTransaction,
} from './virtualTerminalTypes'
import PaymentAccountDetails from './PaymentAccountDetails/PaymentAccountDetails'
import TransactionInformation from './TransactionInformation/TransactionInformation'
import TransactionSummary from './TransactionSummary/TransactionSummary'

import VirtualTerminalBillingInformation from './VirtualTerminalBillingInformation/VirtualTerminalBillingInformation'
import { getDefaultDepositAccount } from './utils/defaults/getDefaultDepositAccount'
import { calculateInitialVirtualTerminalValues } from './utils/defaults/calculateInitialVirtualTerminalValues'
import { getDefaultTransactionType } from './utils/defaults/getDefaultTransactionType'
import { getDefaultPaymentDetails } from './utils/defaults/getDefaultPaymentDetails'
import { getDefaultSECCode } from './utils/defaults/getDefaultSECCode'
import { getDefaultTransactionAmounts } from './utils/defaults/getDefaultTransactionAmounts'
import { getDefaultBillingAddress } from './utils/defaults/getDefaultBillingAddress'
import { getDefaultProcessMethod } from './utils/defaults/getDefaultProcessMethod'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { calculateTransactionTotals } from './utils/processing/calculateTransactionTotals'
import { useNavigate } from 'react-router-dom'
import {
  submitTerminalTransaction,
  submitTokenTransaction,
  submitTransaction,
} from './utils/services/transactions'
import { getSalesTaxByZipCode } from './utils/services/getSalesTax'
import CustomerDetails from './CustomerDetails/CustomerDetails'
import PopupCustomerEditor from './PopupCustomerEditor/PopupCustomerEditor'
import { Contact } from '@fortis/api/src/services/contacts.service'
import { searchCustomers } from '../Customers/utils/services/customers'
import { Token } from '@fortis/api/src/services/tokens.service'
import { getWalletByCustomerId } from '../Customers/utils/services/wallet'
import PopupBankAccountEditor from './PopupBankAccountEditor/PopupBankAccountEditor'
import PopupCreditCardEditor from './PopupCreditCardEditor/PopupCreditCardEditor'

interface TerminalButtonProps {
  className?: string
  processMethod: ProcessMethod
}

const TerminalButton = ({ className, processMethod }: TerminalButtonProps) => {
  const { t } = useTranslation('VirtualTerminal')

  return (
    <Button
      className={className}
      icon={<ArrowSmRightIcon className="w-6 ml-3" />}
      type="submit"
    >
      {processMethod !== 'terminal'
        ? t('process transaction')
        : t('send to terminal')}
    </Button>
  )
}

interface VirtualTerminalProps {
  user: User
  location: LocationWithDepositAccounts
  depositAccount: DepositAccount | undefined
  onChangeDepositAccount: (value: DepositAccount) => void
  transactionType: TransactionType
  onChangeTransactionType: (value: TransactionType) => void
  processMethod: ProcessMethod
  onChangeProcessMethod: (value: ProcessMethod) => void
  accountType: AccountType
  onChangeAccountType: (value: AccountType) => void
  customerSource: (filter: string) => Promise<Contact[]>
  selectedCustomer: Contact | undefined
  onChangeCustomer: (customer: Contact | undefined) => void
  onAddCustomer: () => void
  walletItems: Token[]
  selectedWalletItem: Token | undefined
  onChangeWalletItem: (item: Token | undefined) => void
  onCreateCreditCard: () => void
  onCreateBankAccount: () => void
}

/**
 * Provides code and markup for the virtual terminal, including header, submit button, and form wrapper.
 */
export const VirtualTerminalFrame = ({
  user,
  location,
  depositAccount,
  onChangeDepositAccount,
  transactionType,
  onChangeTransactionType,
  processMethod,
  onChangeProcessMethod,
  accountType,
  onChangeAccountType,
  customerSource,
  selectedCustomer,
  onChangeCustomer,
  onAddCustomer,
  walletItems,
  selectedWalletItem,
  onChangeWalletItem,
  onCreateCreditCard,
  onCreateBankAccount,
}: VirtualTerminalProps) => {
  const { t } = useTranslation('VirtualTerminal')

  const [showCustomers, setShowCustomers] = useState(false)

  return (
    <>
      <PageHeader navText={t('payments')} headerText={t('virtual terminal')}>
        <TerminalButton
          className="mobile:hidden"
          processMethod={processMethod}
        />
      </PageHeader>

      <div className="bg-white p-6 mobile:p-4 border border-gray-100 rounded-md">
        <div className="xl:flex gap-10 space-between">
          <div className="grow">
            <TransactionInformation
              location={location}
              user={user}
              depositAccount={depositAccount}
              onChangeDepositAccount={onChangeDepositAccount}
              transactionType={transactionType}
              onChangeTransactionType={onChangeTransactionType}
            />

            <hr className="mt-5 mb-8" />

            <CustomerDetails
              user={user}
              customer={selectedCustomer}
              source={customerSource}
              onChange={onChangeCustomer}
              onAddNew={onAddCustomer}
              isOpen={showCustomers}
              onClickOpen={setShowCustomers}
            />

            <hr className="mt-5 mb-8" />

            <PaymentAccountDetails
              location={location}
              user={user}
              account={depositAccount}
              customer={selectedCustomer}
              walletItems={walletItems}
              selectedWalletItem={selectedWalletItem}
              onChangeWalletItem={onChangeWalletItem}
              onCreateCreditCard={onCreateCreditCard}
              onCreateBankAccount={onCreateBankAccount}
              processMethod={processMethod}
              setProcessMethod={onChangeProcessMethod}
              accountType={accountType}
              setAccountType={onChangeAccountType}
            />

            {processMethod === 'manual' && depositAccount !== undefined && (
              <>
                <hr className="mt-5 mb-8" />

                <VirtualTerminalBillingInformation account={depositAccount} />
              </>
            )}
          </div>

          {transactionType !== 'avsonly' && (
            <div className="xl:w-[19rem]">
              <TransactionSummary
                account={depositAccount}
                user={user}
                transactionType={transactionType}
              />
            </div>
          )}
        </div>

        <TerminalButton
          className="hidden mobile:flex mobile:w-full mt-8"
          processMethod={processMethod}
        />
      </div>
    </>
  )
}

export const VirtualTerminalPrivs = ['v2.transactions.post']

//Loads and binds virtual terminal values and handles related logic.
export const VirtualTerminal = () => {
  const { t } = useTranslation('VirtualTerminal')

  const navigate = useNavigate()

  const { selectedLocation } = useLocations()
  const { userProfile } = useUserProfile()

  const [depositAccount, setDepositAccount] = useState<DepositAccount>()
  const [taxRate, setTaxRate] = useState<number>(0)

  const [transactionType, setTransactionType] =
    useState<TransactionType>('sale')

  const [processMethod, setProcessMethod] = useState<ProcessMethod>('manual')

  const [accountType, setAccountType] = useState<AccountType>('personal')
  const [showProcessingModal, setShowProcessingModal] = useState(false)

  const [showNewCustomer, setShowNewCustomer] = useState(false)

  const [selectedCustomer, setSelectedCustomer] = useState<Contact | undefined>(
    undefined
  )

  const [walletItems, setWalletItems] = useState<Token[]>([])
  const [selectedWalletItem, setSelectedWalletItem] = useState<
    Token | undefined
  >()

  const [showNewCreditCard, setShowNewCreditCard] = useState(false)
  const [showNewBankAccount, setShowNewBankAccount] = useState(false)

  const loadWallet = () => {
    setSelectedWalletItem(undefined)

    if (!selectedCustomer) {
      setWalletItems([])
      return
    }

    getWalletByCustomerId(
      selectedCustomer.id,
      true,
      depositAccount?.payment_method
    ).then(setWalletItems)
  }

  useEffect(loadWallet, [selectedCustomer, transactionType])

  return (
    <>
      {showProcessingModal && (
        <>
          <div className="absolute left-0 top-0 z-50 w-screen h-screen bg-gray-700 opacity-50" />
          <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 flex flex-col p-6 bg-white max-w-sm h-72 rounded-md shadow-md">
            <div className="flex w-16 h-16 mb-8 bg-loading bg-contain bg-no-repeat self-center" />

            <h1 className="text-gray-900 text-base font-medium">
              {t('customer is completing the transaction on terminal')}
            </h1>
            <p className="text-gray-600 text-sm mt-3 mb-6">
              {t('prompting terminal to cancel this transaction press the')}
              <span className="font-medium"> {t('cancel button')} </span>
              {t('on the terminal device.')}
            </p>
          </div>
        </>
      )}

      <PopupCustomerEditor
        locationId={selectedLocation.id}
        isOpen={showNewCustomer}
        onClose={() => setShowNewCustomer(false)}
        onSubmit={() => setShowNewCustomer(false)}
      />

      <PopupBankAccountEditor
        locationId={selectedLocation.id}
        contactId={selectedCustomer?.id ?? ''}
        isOpen={showNewBankAccount}
        onClose={() => setShowNewBankAccount(false)}
        onSubmit={async () => {
          setShowNewBankAccount(false)
          await loadWallet()
        }}
      />

      <PopupCreditCardEditor
        locationId={selectedLocation.id}
        contactId={selectedCustomer?.id ?? ''}
        isOpen={showNewCreditCard}
        onClose={() => setShowNewCreditCard(false)}
        onSubmit={async () => {
          setShowNewCreditCard(false)
          await loadWallet()
        }}
      />

      <FormContainer<VirtualTerminalTransaction>
        initialValues={{
          transaction_amount: 0,
          exp_date: '',
          account_number: '',
        }}
        enableReinitialize={true}
        onSubmit={async (data) => {
          try {
            let transactionId = ''

            if (processMethod === 'manual') {
              transactionId = await submitTransaction(transactionType, data)
            } else if (processMethod === 'terminal') {
              setShowProcessingModal(true)
              transactionId = await submitTerminalTransaction(
                transactionType,
                data
              )
            } else if (processMethod === 'wallet') {
              transactionId = await submitTokenTransaction(
                transactionType,
                data
              )
            }

            navigate(`/payments/confirmation/${transactionId}`)
          } catch (err) {
            alert(err)
          } finally {
            setShowProcessingModal(false)
          }
        }}
      >
        {({ values, setValues, setFieldValue }) => {
          //Effects are defined here to enable access to form values and helpers.

          useEffect(() => {
            setDepositAccount(getDefaultDepositAccount(selectedLocation))
            setSelectedCustomer(undefined)
          }, [selectedLocation])

          useEffect(() => {
            setTransactionType(
              getDefaultTransactionType(userProfile, depositAccount)
            )
            setProcessMethod(
              getDefaultProcessMethod(
                selectedLocation,
                depositAccount,
                userProfile
              )
            )

            setAccountType('personal')

            setValues(
              calculateInitialVirtualTerminalValues(
                selectedLocation,
                userProfile,
                depositAccount,
                processMethod,
                transactionType,
                accountType
              )
            )
          }, [depositAccount])

          useEffect(() => {
            setValues({
              ...values,
              ...getDefaultTransactionAmounts(depositAccount, transactionType),
            })
          }, [transactionType])

          useEffect(() => {
            setValues({
              ...values,
              ...getDefaultPaymentDetails(
                selectedLocation,
                userProfile,
                depositAccount,
                processMethod,
                accountType
              ),
              billing_address: getDefaultBillingAddress(
                depositAccount,
                processMethod
              ),
            })
          }, [processMethod])

          useEffect(() => {
            setFieldValue(
              'ach_sec_code',
              getDefaultSECCode(depositAccount, accountType)
            )
          }, [accountType])

          useEffect(() => {
            if (depositAccount) {
              const newTotals = calculateTransactionTotals(
                userProfile,
                depositAccount,
                transactionType,
                values.subtotal_amount ?? 0,
                taxRate
              )

              setFieldValue('tax', newTotals.tax)
              setFieldValue('surcharge_amount', newTotals.surcharge_amount)
              setFieldValue('transaction_amount', newTotals.transaction_amount)
            }
          }, [values.subtotal_amount, taxRate])

          //This effect runs even if the tax is set by the totals calculation effect, but running the computations twice is worth the lower complexity
          useEffect(() => {
            if (!depositAccount?.vt_enable_sales_tax) {
              return
            }

            const taxNumber = Number(values.tax)

            if (isNaN(taxNumber)) {
              return
            }

            const newTotals = calculateTransactionTotals(
              userProfile,
              depositAccount,
              transactionType,
              values.subtotal_amount ?? 0,
              taxRate,
              taxNumber
            )

            setFieldValue('tax', newTotals.tax)
            setFieldValue('surcharge_amount', newTotals.surcharge_amount)
            setFieldValue('transaction_amount', newTotals.transaction_amount)
          }, [values.tax])

          useEffect(() => {
            //Don't process anything if the account has no sales tax
            if (!depositAccount?.vt_enable_sales_tax) {
              setTaxRate(0)
              return
            }

            const zip = values.billing_address?.postal_code
            if (zip && zip.length === 5) {
              getSalesTaxByZipCode(zip)
                .then((rate) => {
                  if (rate === undefined) {
                    console.log(`No tax rate found for location ID ${zip}`)
                  } else {
                    setTaxRate(rate)
                  }
                })
                .catch((error) => {
                  console.error(error)
                  setTaxRate(0)
                })
            } else {
              setTaxRate(0)
            }
          }, [
            values.billing_address?.postal_code,
            depositAccount?.vt_enable_sales_tax,
          ])

          useEffect(() => {
            if (!selectedWalletItem) {
              setFieldValue('token_id', undefined)
              return
            }

            setFieldValue('token_id', selectedWalletItem.id)
          }, [selectedWalletItem])

          return (
            <>
              <VirtualTerminalFrame
                user={userProfile}
                location={selectedLocation}
                depositAccount={depositAccount}
                onChangeDepositAccount={setDepositAccount}
                transactionType={transactionType}
                onChangeTransactionType={setTransactionType}
                processMethod={processMethod}
                onChangeProcessMethod={setProcessMethod}
                accountType={accountType}
                onChangeAccountType={setAccountType}
                customerSource={(filter: string) =>
                  searchCustomers(selectedLocation.id, filter)
                }
                selectedCustomer={selectedCustomer}
                onChangeCustomer={setSelectedCustomer}
                onAddCustomer={() => setShowNewCustomer(true)}
                walletItems={walletItems}
                selectedWalletItem={selectedWalletItem}
                onChangeWalletItem={setSelectedWalletItem}
                onCreateCreditCard={() => setShowNewCreditCard(true)}
                onCreateBankAccount={() => setShowNewBankAccount(true)}
              />
            </>
          )
        }}
      </FormContainer>
    </>
  )
}

export default VirtualTerminal
