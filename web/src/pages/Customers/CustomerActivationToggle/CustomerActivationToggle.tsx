import { Contact } from '@fortis/api/src/services/contacts.service'
import { useTranslation } from 'react-i18next'
import { ConfirmationDialog } from '../../../components/ConfirmationDialog/ConfirmationDialog'
import { isActive } from '../../../utils/isActive'
import {
  activateCustomer,
  deactivateCustomer,
} from '../utils/services/customers'

interface UnboundCustomerActivationToggleProps {
  isOpen: boolean
  customer: Contact | undefined
  onClose: () => void
  onAccept: () => Promise<void>
}

export const UnboundCustomerActivationToggle = ({
  customer,
  isOpen,
  onClose,
  onAccept,
}: UnboundCustomerActivationToggleProps) => {
  const { t } = useTranslation('Customers')

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      title={t(
        isActive(customer) ? 'deactivate customer' : 'reactivate customer'
      )}
      onConfirm={onAccept}
      onCancel={onClose}
      body={
        <>
          {t(
            `are you sure you would like to ${
              isActive(customer) ? 'deactivate' : 'reactivate'
            } customer`
          )}{' '}
          <span className="font-semibold">
            {customer?.first_name ?? ''} {customer?.last_name ?? ''}
          </span>
          ?
        </>
      }
      cancelText={t('cancel')}
      confirmText={t(
        `yes, ${isActive(customer) ? 'deactivate' : 'reactivate'}`
      )}
    />
  )
}

interface CustomerActivationToggleProps {
  isOpen: boolean
  customer: Contact | undefined
  onToggleComplete: () => void | Promise<void>
  onClose: () => void
}

export const CustomerActivationToggle = ({
  isOpen,
  customer,
  onToggleComplete,
  onClose,
}: CustomerActivationToggleProps) => {
  const handleDeactivate = async () => {
    if (!customer) {
      return //If the customer isn't loaded yet and this is triggered, do nothing.
    }

    try {
      if (isActive(customer)) {
        await deactivateCustomer(customer.id)
      } else {
        await activateCustomer(customer.id)
      }

      await onToggleComplete()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <UnboundCustomerActivationToggle
      isOpen={isOpen}
      customer={customer}
      onClose={onClose}
      onAccept={handleDeactivate}
    />
  )
}
export default CustomerActivationToggle
