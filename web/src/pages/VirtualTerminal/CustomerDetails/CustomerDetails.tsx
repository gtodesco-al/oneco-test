import { User } from '@fortis/api'
import { Contact } from '@fortis/api/src/services/contacts.service'
import { useTranslation } from 'react-i18next'
import CustomerSelector from '../CustomerSelector/CustomerSelector'
import VirtualTerminalSection from '../VirtualTerminalSection/VirtualTerminalSection'

interface CustomerDetailsProps {
  user: User
  customer: Contact | undefined
  source: Contact[] | ((filter: string) => Promise<Contact[]>)
  onChange: (customer: Contact | undefined) => void
  onAddNew: () => void
  isOpen: boolean
  onClickOpen: (open: boolean) => void
}

export const CustomerDetails = ({
  user,
  customer,
  source,
  onChange,
  onAddNew,
  isOpen,
  onClickOpen,
}: CustomerDetailsProps) => {
  const { t } = useTranslation('Customers')

  return (
    <VirtualTerminalSection
      header={t('customer details')}
      subheader={t('add or create a customer for this transaction')}
      open={isOpen}
      setOpen={onClickOpen}
    >
      <CustomerSelector
        user={user}
        customer={customer}
        source={source}
        onChange={onChange}
        onAddNew={onAddNew}
      />
    </VirtualTerminalSection>
  )
}

export default CustomerDetails
