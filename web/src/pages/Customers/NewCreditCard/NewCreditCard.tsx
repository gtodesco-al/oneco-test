import { Token } from '@fortis/api/src/services/tokens.service'
import { api } from '../../../api'
import Button from '../../../components/Button/Button'
import FormContainer from '../../../components/FormContainer/FormContainer'
import { CreditCardEditor } from '../CreditCardEditor/CreditCardEditor'

interface NewCreditCardProps {
  contactId: string
  locationId: string
  onSubmit: (card: Partial<Token>) => Promise<void> | void
  onCancel: () => void
}

const defaultToken: Omit<Token, 'contact_id' | 'location_id'> = {
  title: '',
  account_holder_name: '',
  billing_address: {
    state: null,
    city: '',
    postal_code: '',
    phone: null,
    street: '',
  },
  account_number: '',
}

export const NewCreditCard = ({
  contactId,
  locationId,
  onSubmit,
  onCancel,
}: NewCreditCardProps) => {
  const service = api.service('credit-card-tokens')

  const save = async (token: Partial<Token>) => {
    const createdToken = await service.create(token)

    onSubmit(createdToken)
  }

  return (
    <FormContainer
      className="w-[40rem] mobile:w-auto"
      initialValues={{
        ...defaultToken,
        contact_id: contactId,
        location_id: locationId,
      }}
      onSubmit={save}
    >
      <CreditCardEditor />
      <hr />
      <div className="flex justify-between">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Card</Button>
      </div>
    </FormContainer>
  )
}

export default NewCreditCard
