import { Token } from '@fortis/api/src/services/tokens.service'
import { useTranslation } from 'react-i18next'
import { InfoList } from '../../../components/InfoList/InfoList'
import { accountTypeToString } from '../../VirtualTerminal/utils/accountTypeToString'
import { ViewAddress } from '../ViewBillingInfo/ViewBillingInfo'

export const ViewCreditCard = ({ card }: { card: Token }) => {
  const { t } = useTranslation('Customers')

  return (
    <div>
      <h1 className="text-xl font-medium mb-5">{t('card details')}</h1>
      <InfoList>
        <InfoList.Item title={t('title')} fullWidth>
          {card.title}
        </InfoList.Item>

        <InfoList.Item title={t('card holder name')} fullWidth>
          {card.account_holder_name}
        </InfoList.Item>

        <InfoList.Item title={t('card details')}>
          {accountTypeToString(card.account_type)} • {card.last_four ?? '0000'}
        </InfoList.Item>

        <InfoList.Item title={t('expiry date')}>
          {card.exp_date
            ? `${card.exp_date.slice(0, 2)}/${card.exp_date.slice(-2)}`
            : '00/00'}
        </InfoList.Item>
      </InfoList>

      <hr className="my-6" />
      <h1 className="text-xl font-medium mb-5">{t('billing information')}</h1>
      <ViewAddress {...card.billing_address} />
    </div>
  )
}
