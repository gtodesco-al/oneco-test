import { User } from '@fortis/api'
import { Contact } from '@fortis/api/src/services/contacts.service'
import { SearchIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'
import Typeahead from '../../../components/Typeahead/Typeahead'
import { canCreateCustomer } from '../../Customers/utils/permissions'
import CustomerPanel from '../CustomerPanel/CustomerPanel'

type ContactSource = Contact[] | ((filter: string) => Promise<Contact[]>)

interface CustomerSelectorProps {
  user: User
  customer: Contact | undefined
  source: ContactSource
  onChange: (customer: Contact | undefined) => void
  onAddNew: () => void
}

const customerToString = (customer: Contact) =>
  `${customer?.first_name ?? ''} ${customer?.last_name} ${
    customer?.account_number ? '• ' + customer.account_number : ''
  }`

export const CustomerSelector = ({
  user,
  customer,
  source,
  onChange,
  onAddNew,
}: CustomerSelectorProps) => {
  //Uses the Customers translation due to overlap with some elements
  const { t } = useTranslation('Customers')

  return (
    <div className="flex flex-col gap-5">
      <Typeahead
        label={t('select customer')}
        ariaClearLabel={t('clear customer')}
        source={source}
        itemToString={customerToString}
        value={customer}
        onChange={onChange}
        icon={<SearchIcon />}
        extraOptions={
          canCreateCustomer(user) ? (
            <Typeahead.ExtraOption onClick={onAddNew}>
              {t('add new customer')}
            </Typeahead.ExtraOption>
          ) : undefined
        }
      />

      {customer && <CustomerPanel customer={customer} />}
    </div>
  )
}

export default CustomerSelector
