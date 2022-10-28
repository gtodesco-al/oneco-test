import { ContactPost } from '@fortis/api/src/services/contacts.service'
import { ArrowSmRightIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { contactSchema } from '@fortis/api'
import { api } from '../../../api'
import Button from '../../../components/Button/Button'
import FormContainer from '../../../components/FormContainer/FormContainer'
import { PageHeader } from '../../../components/PageHeader/PageHeader'
import { useLocations } from '../../../hooks/useLocations'
import CustomerEditor from '../CustomerEditor/CustomerEditor'
import { Location } from '@fortis/api'
import { useUserProfile } from '../../../hooks/useUserProfile'
import { canCreateCustomer } from '../utils/permissions'

const WalletPlaceholder = () => {
  const { t } = useTranslation('Customers')

  return (
    <section className="bg-gray-100 border rounded-md border-gray-200 px-5 pt-5 pb-5 h-56">
      <div className="wallet-heading mb-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-gray-900">{t('wallet')}</h1>
        </div>
      </div>
      <div className="wallet-body max-h-[340px] overflow-y-auto">
        <div className="text-center text-sm text-gray-600">
          <div className="w-16 h-16 rounded-full flex mx-auto mb-7 items-center justify-center bg-blue-100">
            <svg
              className="w-[27px] h-[27px] text-blue-500"
              width="27"
              height="24"
              viewBox="0 0 27 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.166656 8H25.5C25.8536 8 26.1928 8.14048 26.4428 8.39052C26.6929 8.64057 26.8333 8.97971 26.8333 9.33333V22.6667C26.8333 23.0203 26.6929 23.3594 26.4428 23.6095C26.1928 23.8595 25.8536 24 25.5 24H1.49999C1.14637 24 0.807229 23.8595 0.557181 23.6095C0.307132 23.3594 0.166656 23.0203 0.166656 22.6667V8ZM1.49999 0H21.5V5.33333H0.166656V1.33333C0.166656 0.979711 0.307132 0.640573 0.557181 0.390524C0.807229 0.140476 1.14637 0 1.49999 0ZM17.5 14.6667V17.3333H21.5V14.6667H17.5Z"
                fill="#0EA5E9"
              />
            </svg>
          </div>
          <div className="font-medium">
            <p>{t('customer creation is required to add a wallet item.')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

interface UnboundNewCustomerProps {
  location: Location
  onSubmit: (data: ContactPost) => void | Promise<void>
}

export const UnboundNewCustomer = ({
  location,
  onSubmit,
}: UnboundNewCustomerProps) => {
  const { t } = useTranslation('Customers')

  return (
    <FormContainer<ContactPost>
      jsonSchema={contactSchema}
      initialValues={{
        location_id: location.id,
      }}
      onSubmit={onSubmit}
    >
      <PageHeader navText={t('customers')} headerText={t('add customer')}>
        <Button
          type="submit"
          className="mobile:hidden"
          icon={<ArrowSmRightIcon className="w-6 ml-3" />}
        >
          {t('save')}
        </Button>
      </PageHeader>

      <div className="bg-white p-6 border border-gray-100 rounded-md xl:flex gap-10 justify-between mobile:p-4 ">
        <div className="flex-grow">
          <CustomerEditor />
        </div>

        {Boolean(location.product_accountvault) && <WalletPlaceholder />}
      </div>

      <Button
        type="submit"
        className="hidden mobile:flex mobile:w-full mt-8"
        icon={<ArrowSmRightIcon className="w-6 ml-3" />}
      >
        {t('save')}
      </Button>
    </FormContainer>
  )
}

export const NewCustomerPrivs = ['v2.contacts.post']

export const NewCustomer = () => {
  const { selectedLocation } = useLocations()
  const service = api.service('contacts')
  const navigate = useNavigate()

  const { userProfile } = useUserProfile()

  if (!canCreateCustomer(userProfile)) {
    navigate('/customers', { replace: true })
  }

  const save = async (data: ContactPost) => {
    //Location ID is set here in case user changes locations while editing
    data.location_id = selectedLocation.id

    try {
      const result = await service.create(data)

      navigate(`/customers/view/${result.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return <UnboundNewCustomer location={selectedLocation} onSubmit={save} />
}
