import { Token } from '@fortis/api'
import { useFormikContext } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BillingInformation } from '../../../components/BillingInformation/BillingInformation'
import { FormRadioGroup } from '../../../components/FormRadioGroup/FormRadioGroup'
import FormSelect from '../../../components/FormSelect/FormSelect'
import FormTextInput from '../../../components/FormTextInput/FormTextInput'
import { FormTypeahead } from '../../../components/FormTypeahead/FormTypeahead'
import { InfoList } from '../../../components/InfoList/InfoList'
import { RadioGroup } from '../../../components/RadioGroup/RadioGroup'
import Switch from '../../../components/Switch/Switch'
import { getRoutingNumbers } from '../../../utils/getRoutingNumbers'
import { businessSECCodes, personalSECCodes } from '../../../utils/secCodes'

type AccountType = 'personal' | 'business'

const ReadOnlyAccountDetails = ({
  accountType,
  t,
}: {
  accountType: AccountType
  t: (text: string) => string
}) => {
  const { values } = useFormikContext<Token>()

  return (
    <InfoList>
      <InfoList.Item title={t('sec code')} fullWidth>
        {values.ach_sec_code}
      </InfoList.Item>

      <InfoList.Item title={t('account options')}>
        {t(values.account_type ?? '')}
      </InfoList.Item>

      <InfoList.Item title={t('account type')}>{t(accountType)}</InfoList.Item>

      <InfoList.Item title={t('routing number')}>
        {values.routing_number}
      </InfoList.Item>

      <InfoList.Item title={t('account number')}>
        {values.account_number}
      </InfoList.Item>
    </InfoList>
  )
}

interface EditableAccountDetailsProps {
  t: (text: string) => string
  routingNumberService?: (value: string) => Promise<string[]>
  accountType: AccountType
  setAccountType: (value: AccountType) => void
}

const EditableAccountDetails = ({
  t,
  routingNumberService,
  accountType,
  setAccountType,
}: EditableAccountDetailsProps) => (
  <>
    <div className="flex gap-6">
      {routingNumberService !== undefined ? (
        <FormTypeahead
          label={t('routing number')}
          placeholder={t('enter a routing number')}
          ariaClearLabel={t('clear routing number')}
          name="routing_number"
          source={routingNumberService}
        />
      ) : (
        <FormTextInput
          label={t('routing number')}
          name="routing_number"
          placeholder={t('enter a routing number')}
        />
      )}

      <FormTextInput
        label={t('account number')}
        placeholder={t('enter account number')}
        name="account_number"
        required
      />
    </div>

    <FormSelect
      label={t('sec code')}
      placeholder={t('select an sec code')}
      name="ach_sec_code"
      options={accountType === 'personal' ? personalSECCodes : businessSECCodes}
    />

    <div className="flex gap-6 mobile:block">
      <FormRadioGroup
        label={t('account options')}
        name="account_type"
        options={[
          {
            label: t('checking'),
            value: 'checking',
          },
          {
            label: t('saving'),
            value: 'savings',
          },
        ]}
      />

      <RadioGroup
        label={t('account type')}
        name="account_type_field"
        options={[
          {
            label: t('personal'),
            value: 'personal',
          },
          {
            label: t('business'),
            value: 'business',
          },
        ]}
        selectedValue={accountType}
        onChange={(value) => setAccountType(value as AccountType)}
      />
    </div>
  </>
)

interface ACHEditorProps {
  accountType: AccountType
  setAccountType: (value: AccountType) => void
  readOnlyBankInfo?: boolean
}

export const UnboundACHEditor = ({
  accountType,
  setAccountType,
  readOnlyBankInfo = false,
  routingNumberService,
}: ACHEditorProps & {
  routingNumberService?: (value: string) => Promise<string[]>
}) => {
  const { t } = useTranslation('Customers')

  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div>
      <h1 className="text-xl font-medium mb-5">{t('account details')}</h1>

      <FormTextInput
        label={t('title')}
        placeholder={t('enter wallet title')}
        name="title"
        required
      />

      <FormTextInput
        label={t('Account Holder Name')}
        placeholder={t('enter account holder name')}
        name="account_holder_name"
        required
      />

      {readOnlyBankInfo ? (
        <ReadOnlyAccountDetails t={t} accountType={accountType} />
      ) : (
        <EditableAccountDetails
          t={t}
          accountType={accountType}
          setAccountType={setAccountType}
          routingNumberService={routingNumberService}
        />
      )}

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

export const ACHEditor = (props: ACHEditorProps) => (
  <UnboundACHEditor {...props} routingNumberService={getRoutingNumbers} />
)
