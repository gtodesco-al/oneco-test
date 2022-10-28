import { Contact } from '@fortis/api/src/services/contacts.service'
import { ArrowSmRightIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import FormContainer from '../../../components/FormContainer/FormContainer'
import { PageHeader } from '../../../components/PageHeader/PageHeader'
import { useLocations } from '../../../hooks/useLocations'
import { isActive } from '../../../utils/isActive'
import CustomerActivationToggle from '../CustomerActivationToggle/CustomerActivationToggle'
import CustomerEditor from '../CustomerEditor/CustomerEditor'
import Notification from '../../../components/Notification/Notification'
import { getCustomerById, updateCustomer } from '../utils/services/customers'
import { Wallet } from '../Wallet/Wallet'
import { Location, User } from '@fortis/api'
import { useUserProfile } from '../../../hooks/useUserProfile'
import {
  canChargeCustomer,
  canDeactivateCustomer,
  canEditCustomer,
} from '../utils/permissions'
import PopupTransactionForm from '../PopupTransactionForm/PopupTransactionForm'

//Used to render the form before the contact is initially loaded.
const defaultCustomer: Contact = {
  id: '',
  last_name: '',
  created_ts: 0,
  modified_ts: 0,
  active: false,
  location_id: '',
  email_trx_receipt: false,
  header_message_type: 0,
}

interface EditCustomerProps {
  user: User
  location: Location
  customer: Contact | undefined
  onSubmit: (customer: Contact) => Promise<void> | void
  setShowActivationModal: (value: boolean) => void
  setShowTransactionModal: (value: boolean) => void
}

export const UnboundEditCustomer = ({
  user,
  location,
  customer,
  onSubmit,
  setShowActivationModal,
  setShowTransactionModal,
}: EditCustomerProps) => {
  const { t } = useTranslation('Customers')

  return (
    <FormContainer<Contact>
      initialValues={customer ?? defaultCustomer}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <>
          <PageHeader navText={t('customers')} headerText={t('edit customer')}>
            <PageHeader.Buttons
              options={[
                {
                  name: t('deactivate'),
                  action: () => setShowActivationModal(true),
                  isShown: canDeactivateCustomer(user),
                },
                {
                  name: t('charge'),
                  action: () => setShowTransactionModal(true),
                  isShown: canChargeCustomer(user),
                },
                {
                  name: t('save'),
                  primary: true,
                  action: () => handleSubmit(),
                  icon: <ArrowSmRightIcon className="w-6 ml-3" />,
                },
              ]}
            />
          </PageHeader>

          <div className="bg-white p-6 border border-gray-100 rounded-md flex gap-10 justify-between mobile:flex-col mobile:p-4 ">
            <div className="flex-grow">
              <CustomerEditor />
            </div>

            {Boolean(location.product_accountvault) && (
              <Wallet user={user} customer={customer} />
            )}
          </div>

          <Button
            type="submit"
            className="hidden mobile:flex mobile:w-full mt-8"
            icon={<ArrowSmRightIcon className="w-6 ml-3" />}
          >
            {t('save')}
          </Button>
        </>
      )}
    </FormContainer>
  )
}

export const EditCustomerPrivs = ['v2.contacts.put']

export const EditCustomer = () => {
  const { t } = useTranslation('Customers')

  const { customerId } = useParams()

  if (!customerId) {
    //This component should never be used on a page route without a customer ID, but if it is this should make the mistake obvious.
    return <p>A customer ID must be provided.</p>
  }

  const navigate = useNavigate()
  const { userProfile } = useUserProfile()

  if (!canEditCustomer(userProfile)) {
    navigate(`/customers/view/${customerId}`, { replace: true })
  }

  const [activationModalShown, setActivationModalShown] =
    useState<boolean>(false)
  const [showTransactionModal, setShowTransactionModal] = useState(false)

  const [customer, setCustomer] = useState<Contact>()
  const { selectedLocation } = useLocations()

  useEffect(() => {
    //Check for a location ID to ensure the tokens are loaded
    if (!selectedLocation.id || customer) {
      return
    }

    getCustomerById(customerId).then(setCustomer).catch(console.error)
  }, [selectedLocation.id])

  useEffect(() => {
    if (customer && !isActive(customer)) {
      navigate(`/customers/view/${customerId}`, { replace: true })
    }
  }, [customer])

  const [successMessage, setSuccessMessage] = useState<string>()

  const saveChanges = async (data: Contact) => {
    try {
      await updateCustomer(data)
      setSuccessMessage(t('changes saved successfully'))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {successMessage && (
        <Notification
          type="success"
          onClose={() => setSuccessMessage(undefined)}
        >
          {successMessage}
        </Notification>
      )}
      <CustomerActivationToggle
        isOpen={activationModalShown}
        customer={customer}
        onToggleComplete={() => navigate(`/customers/view/${customerId}`)}
        onClose={() => setActivationModalShown(false)}
      />

      {customer && (
        <PopupTransactionForm
          customer={customer}
          isOpen={showTransactionModal}
          onClose={() => setShowTransactionModal(false)}
          onSubmit={() => setShowTransactionModal(false)}
        />
      )}

      <UnboundEditCustomer
        user={userProfile}
        location={selectedLocation}
        customer={customer}
        onSubmit={saveChanges}
        setShowActivationModal={setActivationModalShown}
        setShowTransactionModal={setShowTransactionModal}
      />
    </>
  )
}

export default EditCustomer
