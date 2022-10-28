import { Location, User } from '@fortis/api'
import { Contact } from '@fortis/api/src/services/contacts.service'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { InfoList } from '../../../components/InfoList/InfoList'
import { PageHeader } from '../../../components/PageHeader/PageHeader'
import { useLocations } from '../../../hooks/useLocations'
import { useUserProfile } from '../../../hooks/useUserProfile'
import { isActive } from '../../../utils/isActive'
import CustomerActivationToggle from '../CustomerActivationToggle/CustomerActivationToggle'
import PopupTransactionForm from '../PopupTransactionForm/PopupTransactionForm'
import {
  canChargeCustomer,
  canDeactivateCustomer,
  canEditCustomer,
  canReactivateCustomer,
} from '../utils/permissions'
import { getCustomerById } from '../utils/services/customers'
import { ViewAddress } from '../ViewBillingInfo/ViewBillingInfo'
import { Wallet } from '../Wallet/Wallet'

interface UnboundViewCustomerProps {
  user: User
  location: Location
  customer: Contact | undefined
  setShowActivationModal: (value: boolean) => void
  setShowTransactionModal: (value: boolean) => void
}

export const UnboundViewCustomer = ({
  user,
  location,
  customer,
  setShowActivationModal,
  setShowTransactionModal,
}: UnboundViewCustomerProps) => {
  const { t } = useTranslation('Customers')
  const navigate = useNavigate()

  return (
    <>
      <PageHeader navText={t('customers')} headerText={t('view customer')}>
        <PageHeader.Buttons
          options={[
            {
              name: t(isActive(customer) ? 'deactivate' : 'reactivate'),
              action: () => setShowActivationModal(true),
              isShown:
                (isActive(customer) && canDeactivateCustomer(user)) ||
                (!isActive(customer) && canReactivateCustomer(user)),
            },
            {
              name: t('charge'),
              action: () => setShowTransactionModal(true),
              isShown: canChargeCustomer(user),
            },
            {
              name: t('edit'),
              primary: true,
              action: () => navigate(`/customers/edit/${customer?.id}`),
              isShown: canEditCustomer(user),
            },
          ]}
        />
      </PageHeader>

      <div className="bg-white p-6 border border-gray-100 rounded-md flex gap-10 justify-between tablet:flex-col mobile:p-4">
        <div className="flex-grow">
          <h1 className="text-xl font-medium mb-5">{t('customer details')}</h1>
          <InfoList>
            <InfoList.Item title={t('first name')}>
              {customer?.first_name}
            </InfoList.Item>

            <InfoList.Item title={t('last name')}>
              {customer?.last_name}
            </InfoList.Item>

            <InfoList.Item title={t('customer number')}>
              {customer?.account_number}
            </InfoList.Item>

            <InfoList.Item title={t('date of birth')}>
              {customer?.date_of_birth ?? '00/00/0000'}
            </InfoList.Item>
          </InfoList>

          <hr className="my-6" />

          <h1 className="text-xl font-medium mb-5">
            {t('contact information')}
          </h1>
          <InfoList>
            <InfoList.Item title={t('email')} fullWidth>
              {customer?.email}
            </InfoList.Item>

            <InfoList.Item title={t('home phone')}>
              {customer?.home_phone}
            </InfoList.Item>

            <InfoList.Item title={t('cell phone')}>
              {customer?.cell_phone}
            </InfoList.Item>
          </InfoList>

          <hr className="my-6" />

          <h1 className="text-xl font-medium mb-5">
            {t('address information')}
          </h1>
          <ViewAddress {...customer?.address} />
        </div>

        {Boolean(location.product_accountvault) && (
          <Wallet user={user} customer={customer} />
        )}
      </div>
    </>
  )
}

export const ViewCustomerPrivs = ['v2.contacts.get']

export const ViewCustomer = () => {
  const { customerId } = useParams()

  if (!customerId) {
    //This component should never be used on a page route without a customer ID, but if it is this should make the mistake obvious.
    return <p>A customer ID must be provided.</p>
  }

  const [showActivationModal, setShowActivationModal] = useState(false)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [customer, setCustomer] = useState<Contact>()
  const { selectedLocation } = useLocations()
  const { userProfile } = useUserProfile()

  const loadCustomer = async () => {
    try {
      const customer = await getCustomerById(customerId)
      setCustomer(customer)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!selectedLocation.id || customer) {
      return
    }

    loadCustomer()
  }, [selectedLocation.id, customerId])

  return (
    <>
      <CustomerActivationToggle
        isOpen={showActivationModal}
        customer={customer}
        onToggleComplete={loadCustomer}
        onClose={() => setShowActivationModal(false)}
      />

      {customer && (
        <PopupTransactionForm
          customer={customer}
          isOpen={showTransactionModal}
          onClose={() => setShowTransactionModal(false)}
          onSubmit={() => setShowTransactionModal(false)}
        />
      )}

      <UnboundViewCustomer
        user={userProfile}
        location={selectedLocation}
        customer={customer}
        setShowActivationModal={setShowActivationModal}
        setShowTransactionModal={setShowTransactionModal}
      />
    </>
  )
}

export default ViewCustomer
