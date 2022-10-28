import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FormSelect from '../../../components/FormSelect/FormSelect'
import FormTextInput from '../../../components/FormTextInput/FormTextInput'
import Switch from '../../../components/Switch/Switch'

export const CustomerEditor = () => {
  const { t } = useTranslation('Customers')
  const [show, setShow] = useState(false)
  return (
    <div>
      <div className="border-b border-b-gray-200 pb-6 mb-6">
        <h3 className="text-xl text-gray-700 mb-4 md:mb-5">
          {t('customer details')}
        </h3>
        <div className="grid grid-cols-1 gap-y-5 gap-x-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <FormTextInput
              label={t('first name')}
              placeholder={t('enter first name')}
              name="first_name"
              autoComplete="given-name"
            />
          </div>
          <div className="sm:col-span-3">
            <FormTextInput
              label={t('last name')}
              placeholder={t('enter last name')}
              name="last_name"
              autoComplete="family-name"
              required
              errorMessage={t('last name required')}
            />
          </div>
          <div className="sm:col-span-3">
            <FormTextInput
              label={t('customer number')}
              placeholder={t('enter customer number')}
              name="account_number"
            />
          </div>
          <div className="sm:col-span-3">
            <FormTextInput
              label={t('date of birth')}
              placeholder="0000-00-00"
              name="date_of_birth"
              autoComplete="bday"
              errorMessage={t('bday format')}
            />
          </div>
        </div>
      </div>

      <div className="border-b border-b-gray-200 pb-6 mb-6">
        <h3 className="text-xl text-gray-700 mb-4 md:mb-5">
          {t('contact information')}
        </h3>
        <div className="grid grid-cols-1 gap-y-5 gap-x-6 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <FormTextInput
              label={t('email')}
              placeholder={t('enter customer email')}
              name="email"
              autoComplete="email"
              errorMessage={t('invalid email')}
            />
          </div>
          <div className="sm:col-span-3">
            <FormTextInput
              label={t('home phone')}
              placeholder="(000) 000-0000"
              name="home_phone"
              autoComplete="tel"
              errorMessage={t('must be 10 digits')}
            />
          </div>
          <div className="sm:col-span-3">
            <FormTextInput
              label={t('cell phone')}
              placeholder="+1 (000) 000-0000"
              name="cell_phone"
              autoComplete="tel"
              errorMessage={t('must be 10 digits')}
            />
          </div>
        </div>
      </div>

      <div className="border-b border-b-gray-200 pb-6 mb-6">
        <h3 className="text-xl text-gray-700 mb-4 md:mb-5">
          {t('address information')}
        </h3>
        <div className="grid grid-cols-1 gap-y-5 gap-x-6 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <FormTextInput
              label={t('street')}
              placeholder={t('enter street address')}
              name="address.street"
              autoComplete="address-line1"
            />
          </div>
          <div className="sm:col-span-3">
            <FormTextInput
              label={t('city')}
              placeholder={t('enter city name')}
              name="address.city"
              autoComplete="address-level2"
              errorMessage={t('invalid city name')}
            />
          </div>

          <div className="sm:col-span-3">
            <FormSelect
              label={t('country')}
              placeholder={t('select a country')}
              name="address.country"
              options={[
                {
                  label: t('united states of america'),
                  value: 'US',
                },
                {
                  label: t('canada'),
                  value: 'CA',
                },
              ]}
            />
          </div>
          <div className="sm:col-span-3">
            <FormTextInput
              label={t('state')}
              placeholder={t('select state')}
              name="address.state"
              autoComplete="address-level1"
            />
          </div>
          <div className="sm:col-span-3">
            <FormTextInput
              label={t('zip code')}
              placeholder={t('enter zip code')}
              name="address.postal_code"
              autoComplete="postal-code"
              errorMessage={t('invalid postal code')}
            />
          </div>
        </div>
      </div>

      <div className="border-b border-b-gray-200 pb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-gray-700 mr-2">
            {t('advanced settings')}
          </h3>
          <Switch
            active={show}
            handleChange={() => {
              setShow(!show)
            }}
          />
        </div>
        {show ? (
          <div className="pt-5 pb-5 xl:pb-0">
            <FormTextInput
              label={t('customer api id')}
              placeholder={t('enter api id')}
              name="contact_api_id"
              errorMessage={t('invalid contact api id')}
            />
            <span className="block text-gray-500 font-medium text-xs pt-1">
              {t('leave this field blank if you are unsure of what to do')}
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default CustomerEditor
