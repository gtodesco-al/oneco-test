import { useTranslation } from 'react-i18next'
import { PopupForm } from '../../../components/PopupForm/PopupForm'
import NewACHAccount from '../../Customers/NewACHAccount/NewACHAccount'

interface PopupBankAccountEditorProps {
  contactId: string
  locationId: string
  isOpen: boolean
  onSubmit: () => void
  onClose: () => void
}

export const PopupBankAccountEditor = ({
  contactId,
  locationId,
  isOpen,
  onSubmit,
  onClose,
}: PopupBankAccountEditorProps) => {
  const { t } = useTranslation('Customers')

  return (
    <PopupForm
      title={t('add new bank account')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <NewACHAccount
        contactId={contactId}
        locationId={locationId}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </PopupForm>
  )
}

export default PopupBankAccountEditor
