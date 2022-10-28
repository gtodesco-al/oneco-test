import { useTranslation } from 'react-i18next'
import { PopupForm } from '../../../components/PopupForm/PopupForm'
import NewCreditCard from '../../Customers/NewCreditCard/NewCreditCard'

interface PopupCreditCardEditorProps {
  contactId: string
  locationId: string
  isOpen: boolean
  onSubmit: () => void
  onClose: () => void
}

export const PopupCreditCardEditor = ({
  contactId,
  locationId,
  isOpen,
  onSubmit,
  onClose,
}: PopupCreditCardEditorProps) => {
  const { t } = useTranslation('Customers')

  return (
    <PopupForm
      title={t('add new credit card')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <NewCreditCard
        contactId={contactId}
        locationId={locationId}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </PopupForm>
  )
}

export default PopupCreditCardEditor
