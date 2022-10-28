import { User } from '@fortis/api'
import { Token } from '@fortis/api/src/services/tokens.service'
import { TFunction } from 'i18next'
import { isNil, negate } from 'lodash'
import { useTranslation } from 'react-i18next'
import Typeahead from '../../../components/Typeahead/Typeahead'
import { canCreateWallet } from '../../Customers/utils/permissions'
import { accountTypeToString } from '../utils/accountTypeToString'

interface WalletItemSelectorProps {
  /**
   * The user accessing the wallet item selector.  If not provided, options to create wallet items will not be available.
   */
  user?: User

  /**
   * All of the available wallet items.
   */
  walletItems: Token[]

  /**
   * The currently selected wallet item, if any.
   */
  selectedWalletItem: Token | undefined

  /**
   * The function called when the user selects a wallet item.
   */
  onChangeWalletItem: (item: Token | undefined) => void

  /**
   * The function called when the user chooses to add a bank account.  If not provided, the option is not available.
   */
  onCreateBankAccount?: () => void

  /**
   * The function called when the user chooses to add a credit card.  If not provided, the option is not available.
   */
  onCreateCreditCard?: () => void
}

const paymentMethods = {
  cc: 'Credit Card',
  ach: 'ACH',
}

const walletItemToString = (t: TFunction) => (item: Token) =>
  [
    item?.title,
    item?.account_type ? t(accountTypeToString(item.account_type)) : undefined,
    item?.account_number,
    item?.payment_method ? t(paymentMethods[item.payment_method]) : undefined,
  ]
    .filter(negate(isNil))
    .join(' • ')

export const WalletItemSelector = ({
  user,
  walletItems,
  selectedWalletItem,
  onChangeWalletItem,
  onCreateCreditCard,
  onCreateBankAccount,
}: WalletItemSelectorProps) => {
  const { t } = useTranslation('Customers')

  return (
    <Typeahead
      label={t('select customers wallet')}
      ariaClearLabel={'clear wallet'}
      source={walletItems}
      itemToString={walletItemToString(t)}
      value={selectedWalletItem}
      onChange={onChangeWalletItem}
      extraOptions={
        user && canCreateWallet(user) ? (
          <>
            {onCreateCreditCard && (
              <Typeahead.ExtraOption onClick={onCreateCreditCard}>
                {t('add new credit card')}
              </Typeahead.ExtraOption>
            )}
            {onCreateBankAccount && (
              <Typeahead.ExtraOption onClick={onCreateBankAccount}>
                {t('add new bank account')}
              </Typeahead.ExtraOption>
            )}
          </>
        ) : undefined
      }
    />
  )
}

export default WalletItemSelector
