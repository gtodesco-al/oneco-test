import { Token } from '@fortis/api'
import { useTranslation } from 'react-i18next'
import { InfoList } from '../../../components/InfoList/InfoList'
import { secCodeToAccountType } from '../utils/secCodeToAccountType'
import { ViewAddress } from '../ViewBillingInfo/ViewBillingInfo'

export const ViewACHAccount = ({ account }: { account: Token }) => {
  const { t } = useTranslation('Customers')
  return (
    <div>
      <h1 className="text-xl font-medium mb-5">{t('account details')}</h1>
      <InfoList>
        <InfoList.Item title={t('title')}>{account.title}</InfoList.Item>

        <InfoList.Item title={t('sec code')}>
          {account.ach_sec_code}
        </InfoList.Item>

        <InfoList.Item title={t('account holder name')} fullWidth>
          {account.account_holder_name}
        </InfoList.Item>

        <InfoList.Item title={t('account options')}>
          {t(account.account_type ?? '')}
        </InfoList.Item>

        <InfoList.Item title={t('account type')}>
          {t(secCodeToAccountType(account.ach_sec_code))}
        </InfoList.Item>

        <InfoList.Item title={t('routing number')}>
          {account.routing_number}
        </InfoList.Item>

        <InfoList.Item title={t('account number')}>
          {account.account_number}
        </InfoList.Item>
      </InfoList>

      <hr className="my-6" />
      <h1 className="text-xl font-medium mb-5">{t('billing information')}</h1>
      <ViewAddress {...account.billing_address} />
    </div>
  )
}
