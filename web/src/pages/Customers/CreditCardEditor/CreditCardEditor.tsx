import { Token } from '@fortis/api'
import { useFormikContext } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BillingInformation } from '../../../components/BillingInformation/BillingInformation'
import { FormCheckbox } from '../../../components/FormCheckbox/FormCheckbox'
import { FormField } from '../../../components/FormField/FormField'
import FormTextInput, {
  UnlabeledFormTextInput,
} from '../../../components/FormTextInput/FormTextInput'
import { InfoList } from '../../../components/InfoList/InfoList'
import Switch from '../../../components/Switch/Switch'
import { accountTypeToString } from '../../VirtualTerminal/utils/accountTypeToString'

interface CardFieldProps {
  t: (text: string) => string
}

const EditableCardFields = ({ t }: CardFieldProps) => (
  <FormField label={t('card details')} name="cardDetails" required>
    <UnlabeledFormTextInput
      placeholder={t('card number')}
      usePlaceholderAsAriaLabel={true}
      name="account_number"
      className="rounded-b-none"
      autoComplete="cc-number"
    />
    <UnlabeledFormTextInput
      placeholder={t('mm/yy')}
      usePlaceholderAsAriaLabel={true}
      name="exp_date"
      className="rounded-t-none"
      autoComplete="cc-exp"
    />
  </FormField>
)

const ReadOnlyCardFields = ({ t }: CardFieldProps) => {
  const { values } = useFormikContext<Token>()

  return (
    <InfoList className="mb-5">
      <InfoList.Item title={t('card details')}>
        {accountTypeToString(values.account_type)} •{' '}
        {values.last_four ?? '0000'}
      </InfoList.Item>
      <InfoList.Item title={t('expiry date')}>
        {values.exp_date
          ? `${values.exp_date.slice(0, 2)}/${values.exp_date.slice(-2)}`
          : '00/00'}
      </InfoList.Item>
    </InfoList>
  )
}

interface CreditCardEditorProps {
  readOnlyAccountNumber?: boolean
}

export const CreditCardEditor = ({
  readOnlyAccountNumber = false,
}: CreditCardEditorProps) => {
  const { t } = useTranslation('Customers')

  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div>
      <h1 className="text-xl font-medium mb-5">{t('card details')}</h1>

      <FormTextInput
        label={t('title')}
        placeholder={t('enter wallet title')}
        name="title"
        required
      />

      <FormTextInput
        label={t('card holder name')}
        placeholder={t('enter card holder name')}
        name="account_holder_name"
        autoComplete="cc-name"
        required
      />

      {readOnlyAccountNumber ? (
        <ReadOnlyCardFields t={t} />
      ) : (
        <EditableCardFields t={t} />
      )}

      <FormCheckbox
        checkboxCentered={false}
        label={
          <>
            <p className="text-sm font-medium">{t('run avs transaction')}</p>
            <p className="text-sm text-gray-500">
              {t(
                'select this setting to verify the customer wallet if a transaction has not been ran within the last 12 months to avoid potential fees from card brands.'
              )}
            </p>
          </>
        }
        name="run_avs"
      />

      <hr className="my-6" />

      <h1 className="text-xl font-medium mb-5">{t('billing information')}</h1>

      <BillingInformation translator={t} />

      <hr className="my-6" />

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium mb-5">{t('advanced settings')}</h1>
        <Switch
          active={showAdvanced}
          handleChange={() => {
            setShowAdvanced(!showAdvanced)
          }}
        />
      </div>

      {showAdvanced ? (
        <div className="pt-5 pb-5 xl:pb-0">
          <FormTextInput
            label={t('wallet api id')}
            placeholder={t('enter api id')}
            name="account_vault_api_id"
          />

          <span className="block text-gray-500 font-medium text-xs pt-1">
            {t('leave this field blank if you are unsure of what to do')}
          </span>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
