import { Token } from '@fortis/api'
import { useEffect, useState } from 'react'
import { api } from '../../../api'
import Button from '../../../components/Button/Button'
import FormContainer from '../../../components/FormContainer/FormContainer'
import { ACHEditor } from '../ACHEditor/ACHEditor'

interface NewACHAccountProps {
  contactId: string
  locationId: string
  onSubmit: (card: Token) => Promise<void> | void
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
  ach_sec_code: 'PPD',
  account_type: 'checking',
}

export const NewACHAccount = ({
  contactId,
  locationId,
  onSubmit,
  onCancel,
}: NewACHAccountProps) => {
  const service = api.service('ach-tokens')

  const save = async (token: Partial<Token>) => {
    const createdToken = await service.create(token)

    onSubmit(createdToken)
  }

  const [accountType, setAccountType] = useState<'personal' | 'business'>(
    'personal'
  )

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
      {({ setFieldValue }) => {
        useEffect(() => {
          if (accountType === 'personal') {
            setFieldValue('ach_sec_code', 'PPD')
          } else {
            setFieldValue('ach_sec_code', 'CCD')
          }
        }, [accountType])

        return (
          <>
            <ACHEditor
              accountType={accountType}
              setAccountType={setAccountType}
            />

            <hr />

            <div className="flex justify-between">
              <Button onClick={onCancel}>Cancel</Button>
              <Button type="submit">Save Account</Button>
            </div>
          </>
        )
      }}
    </FormContainer>
  )
}

export default NewACHAccount
