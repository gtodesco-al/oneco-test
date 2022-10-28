import { Token } from '@fortis/api'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/Button/Button'
import FormContainer from '../../../components/FormContainer/FormContainer'
import { ACHEditor } from '../ACHEditor/ACHEditor'
import { updateACH } from '../utils/services/wallet'

interface EditACHAccountProps {
  token: Token
  onSubmit: (account: Token) => Promise<void> | void
  onCancel: () => void
}

export const EditACHAccount = ({
  token,
  onSubmit,
  onCancel,
}: EditACHAccountProps) => {
  const { t } = useTranslation('Customers')
  const save = async (token: Token) => {
    const updatedToken = await updateACH(token)

    onSubmit(updatedToken as Token)
  }

  const [accountType, setAccountType] = useState<'personal' | 'business'>(
    'personal'
  )

  return (
    <FormContainer
      className="w-[40rem] mobile:w-auto"
      initialValues={token}
      onSubmit={save}
    >
      <ACHEditor
        accountType={accountType}
        setAccountType={setAccountType}
        readOnlyBankInfo
      />

      <hr />

      <div className="flex justify-between">
        <Button onClick={onCancel}>{t('cancel')}</Button>
        <Button type="submit">{t('save account')}</Button>
      </div>
    </FormContainer>
  )
}

export default EditACHAccount
