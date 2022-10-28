import { Contact, Token } from '@fortis/api'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import FormContainer from '../../../components/FormContainer/FormContainer'
import { PopupForm } from '../../../components/PopupForm/PopupForm'
import { useLocations } from '../../../hooks/useLocations'
import { useUserProfile } from '../../../hooks/useUserProfile'
import TransactionInformation from '../../VirtualTerminal/TransactionInformation/TransactionInformation'
import { getDefaultDepositAccount } from '../../VirtualTerminal/utils/defaults/getDefaultDepositAccount'
import { getDefaultTransactionType } from '../../VirtualTerminal/utils/defaults/getDefaultTransactionType'
import { submitTokenTransaction } from '../../VirtualTerminal/utils/services/transactions'
import {
  DepositAccount,
  TransactionType,
  VirtualTerminalTransaction,
} from '../../VirtualTerminal/virtualTerminalTypes'
import WalletItemSelector from '../../VirtualTerminal/WalletItemSelector/WalletItemSelector'
import { getWalletByCustomerId } from '../utils/services/wallet'
import { calculateInitialVirtualTerminalValues } from '../../VirtualTerminal/utils/defaults/calculateInitialVirtualTerminalValues'
import { getDefaultTransactionAmounts } from '../../VirtualTerminal/utils/defaults/getDefaultTransactionAmounts'
import { getDefaultSECCode } from '../../VirtualTerminal/utils/defaults/getDefaultSECCode'
import { calculateTransactionTotals } from '../../VirtualTerminal/utils/processing/calculateTransactionTotals'
import { getSalesTaxByZipCode } from '../../VirtualTerminal/utils/services/getSalesTax'
import { ArrowSmRightIcon } from '@heroicons/react/outline'

interface PopupTransactionFormProps {
  customer: Contact
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
}

export const PopupTransactionForm = ({
  customer,
  isOpen,
  onClose,
}: PopupTransactionFormProps) => {
  const { t } = useTranslation('VirtualTerminal')
  const navigate = useNavigate()
  const { userProfile } = useUserProfile()
  const { selectedLocation } = useLocations()

  const [depositAccount, setDepositAccount] = useState<
    DepositAccount | undefined
  >(getDefaultDepositAccount(selectedLocation))
  const [transactionType, setTransactionType] = useState<TransactionType>(
    getDefaultTransactionType(userProfile, depositAccount)
  )

  const [walletItems, setWalletItems] = useState<Token[]>([])
  const [selectedWalletItem, setSelectedWalletItem] = useState<Token>()
  const [taxRate, setTaxRate] = useState(0)

  const handleSubmit = async (data: VirtualTerminalTransaction) => {
    try {
      const transactionId = await submitTokenTransaction(transactionType, data)

      navigate(`/customers/confirmation/${transactionId}`)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <PopupForm title={t('run transaction')} isOpen={isOpen} onClose={onClose}>
      <FormContainer
        initialValues={
          {
            transaction_amount: 0,
          } as VirtualTerminalTransaction
        }
        onSubmit={handleSubmit}
      >
        {({ values, setValues, setFieldValue }) => {
          useEffect(() => {
            setTransactionType(
              getDefaultTransactionType(userProfile, depositAccount)
            )

            setValues(
              calculateInitialVirtualTerminalValues(
                selectedLocation,
                userProfile,
                depositAccount,
                'wallet',
                transactionType,
                (selectedWalletItem?.account_type ?? 'personal') as
                  | 'personal'
                  | 'business'
              )
            )

            getWalletByCustomerId(
              customer.id,
              true,
              depositAccount?.payment_method ?? 'cc'
            ).then(setWalletItems)
          }, [depositAccount])

          useEffect(() => {
            setValues({
              ...values,
              ...getDefaultTransactionAmounts(depositAccount, transactionType),
            })
          }, [transactionType])

          useEffect(() => {
            setFieldValue(
              'ach_sec_code',
              getDefaultSECCode(
                depositAccount,
                (selectedWalletItem?.account_type ?? 'personal') as
                  | 'personal'
                  | 'business'
              )
            )
          }, [selectedWalletItem?.account_type])

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
              <div className="flex flex-col gap-5">
                <div>
                  <Input
                    label={t('customer name')}
                    className="text-gray-400"
                    value={`${customer?.first_name ?? ''} ${
                      customer?.last_name ?? ''
                    }`}
                    disabled
                  />
                </div>

                <WalletItemSelector
                  walletItems={walletItems}
                  selectedWalletItem={selectedWalletItem}
                  onChangeWalletItem={setSelectedWalletItem}
                />

                <TransactionInformation
                  location={selectedLocation}
                  user={userProfile}
                  depositAccount={depositAccount}
                  onChangeDepositAccount={setDepositAccount}
                  transactionType={transactionType}
                  onChangeTransactionType={setTransactionType}
                  showHeader={false}
                />
              </div>
              <Button
                buttonType="primary"
                type="submit"
                className="h-11 w-full"
                icon={<ArrowSmRightIcon className="w-6 ml-3" />}
              >
                Process Transaction
              </Button>
            </>
          )
        }}
      </FormContainer>
    </PopupForm>
  )
}

export default PopupTransactionForm
