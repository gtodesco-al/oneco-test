/**
 * When closing, confirm that the user wants to cancel (?)
 * When submitting, notify the user once the account is made
 * Once the user has been notified and confirmed, then call onSubmit so that parent can do any cleanup and reloading required.
 */
import { ContactPost } from '@fortis/api/src/services/contacts.service'
import { useTranslation } from 'react-i18next'
import { api } from '../../../api'
import Button from '../../../components/Button/Button'
import FormContainer from '../../../components/FormContainer/FormContainer'
import { PopupForm } from '../../../components/PopupForm/PopupForm'
import CustomerEditor from '../../Customers/CustomerEditor/CustomerEditor'

interface UnboundPopupCustomerEditorProps {
  locationId: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (customer: ContactPost) => void
}

export const UnboundPopupCustomerEditor = ({
  locationId,
  isOpen,
  onClose,
  onSubmit,
}: UnboundPopupCustomerEditorProps) => {
  const { t } = useTranslation('Customers')
  return (
    <PopupForm title={t('add new customer')} isOpen={isOpen} onClose={onClose}>
      <FormContainer<ContactPost>
        initialValues={{
          location_id: locationId,
        }}
        onSubmit={onSubmit}
      >
        <CustomerEditor />

        <div className="grid grid-cols-2 gap-6 mobile:grid-cols-1 mobile:gap-4">
          <Button type="button" buttonType="bordered" onClick={onClose}>
            {t('cancel')}
          </Button>

          <Button type="submit">{t('save customer')}</Button>
        </div>
      </FormContainer>
    </PopupForm>
  )
}

export const PopupCustomerEditor = ({
  locationId,
  isOpen,
  onClose,
  onSubmit,
}: UnboundPopupCustomerEditorProps) => {
  const service = api.service('contacts')

  const saveCustomer = async (customer: ContactPost) => {
    try {
      const result = await service.create(customer)

      onSubmit(result)
      //Provide result to parent?
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <UnboundPopupCustomerEditor
      locationId={locationId}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={saveCustomer}
    />
  )
}

export default PopupCustomerEditor
