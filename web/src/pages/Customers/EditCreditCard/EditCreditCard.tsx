import { Token } from '@fortis/api'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/Button/Button'
import FormContainer from '../../../components/FormContainer/FormContainer'
import { CreditCardEditor } from '../CreditCardEditor/CreditCardEditor'
import { updateCreditCard } from '../utils/services/wallet'

interface EditCreditCardProps {
  card: Token
  onSubmit: (card: Token) => Promise<void> | void
  onCancel: () => void
}

export const EditCreditCard = ({
  card,
  onSubmit,
  onCancel,
}: EditCreditCardProps) => {
  const { t } = useTranslation('Customers')

  const save = async (token: Token) => {
    const updatedToken = await updateCreditCard(token)

    onSubmit(updatedToken as Token)
  }

  return (
    <FormContainer
      className="w-[40rem] mobile:w-auto"
      initialValues={card}
      onSubmit={save}
    >
      <CreditCardEditor readOnlyAccountNumber={true} />
      <hr />
      <div className="flex justify-between">
        <Button onClick={onCancel}>{t('cancel')}</Button>
        <Button type="submit">{t('save changes')}</Button>
      </div>
    </FormContainer>
  )
}

export default EditCreditCard
