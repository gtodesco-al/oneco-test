import { useTranslation } from 'react-i18next'
import { InfoList } from '../../../components/InfoList/InfoList'

interface ViewAddressProps {
  street?: string | null
  city?: string | null
  state?: string | null
  postal_code?: string | null
  country?: 'US' | 'CA' | null
}

export const ViewAddress = ({
  street,
  city,
  state,
  postal_code,
  country,
}: ViewAddressProps) => {
  const { t } = useTranslation('Customers')

  return (
    <InfoList>
      <InfoList.Item title={t('street')}>{street}</InfoList.Item>

      <InfoList.Item title={t('city')}>{city}</InfoList.Item>

      <InfoList.Item title={t('state')}>{state}</InfoList.Item>

      <InfoList.Item title={t('country')}>{country ?? ''}</InfoList.Item>

      <InfoList.Item title={t('zip code')}>{postal_code}</InfoList.Item>
    </InfoList>
  )
}
