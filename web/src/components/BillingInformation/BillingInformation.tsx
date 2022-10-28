import { identity } from 'lodash'
import FormTextInput from '../FormTextInput/FormTextInput'

interface BillingInformationProps {
  showStreet?: boolean
  showZip?: boolean
  showPhone?: boolean

  //Optional translator parameter so that translation support can be provided.
  translator?: (value: string) => string
}

export const BillingInformation = ({
  showStreet = true,
  showZip = true,
  showPhone = true,
  translator = identity,
}: BillingInformationProps) => (
  <>
    {showStreet && (
      <FormTextInput
        label={translator('street')}
        placeholder={translator('enter street address')}
        name="billing_address.street"
      />
    )}

    <div className="grid gap-x-5 grid-cols-2 grid-flow-row mobile:block">
      <FormTextInput
        label={translator('city')}
        placeholder={translator('enter city name')}
        name="billing_address.city"
      />

      <FormTextInput
        label={translator('state')}
        placeholder={translator('select state')}
        name="billing_address.state"
      />

      {showZip && (
        <FormTextInput
          label={translator('zip code')}
          placeholder={translator('enter zip code')}
          name="billing_address.postal_code"
        />
      )}

      {showPhone && (
        <FormTextInput
          label={translator('phone')}
          placeholder={translator('enter phone number')}
          name="billing_address.phone"
        />
      )}
    </div>
  </>
)
