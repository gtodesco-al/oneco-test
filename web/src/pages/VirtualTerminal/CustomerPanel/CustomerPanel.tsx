import { Contact } from '@fortis/api/src/services/contacts.service'
import { UserIcon, DeviceMobileIcon, MailIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import CodePage from '../../../images/CodePage'
import { MapPin } from '../../../images/MapPin'

interface PanelFieldProps {
  fullWidth?: boolean
  icon: ReactNode
  name: string
  children: string
}

const PanelField = ({
  fullWidth = false,
  name,
  icon,
  children,
}: PanelFieldProps) => (
  <div
    className={classNames('flex gap-1 mobile:gap-0 text-sm mobile:flex-col', {
      'col-span-2 mobile:col-span-1': fullWidth,
    })}
  >
    <dt className="text-gray-600 flex gap-1 items-center">
      {icon}
      <span>{name}</span>
    </dt>
    <dd className="font-medium text-gray-900">{children}</dd>
  </div>
)

const iconClass = 'w-[0.875rem] h-[0.875rem] text-secondary-700'

interface CustomerPanelProps {
  customer: Contact
}

export const CustomerPanel = ({ customer }: CustomerPanelProps) => {
  const { t } = useTranslation('Customers')

  const doubleWidth = Boolean(customer.contact_api_id) //Width is two columns if the contact API exists
  return (
    <div className="flex gap-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="bg-white border border-gray-200 rounded-full w-[3.25rem] h-[3.25rem] flex justify-center items-center mobile:hidden">
        <UserIcon className="h-9 text-secondary-700" />
      </div>

      <dl
        className={classNames(
          'grow grid mobile:grid-cols-1 gap-1 mobile:gap-2',
          {
            'grid-cols-2': doubleWidth,
            'grid-cols-1': !doubleWidth,
          }
        )}
      >
        <PanelField
          name={t('address')}
          icon={<MapPin className={iconClass} />}
          fullWidth={doubleWidth}
        >
          {[
            customer.address?.street,
            customer.address?.city,
            customer.address?.state,
          ]
            .filter((v) => Boolean(v))
            .join(', ')}
        </PanelField>

        <PanelField name={t('email')} icon={<MailIcon className={iconClass} />}>
          {customer.email ?? ''}
        </PanelField>

        <PanelField
          name={t('phone')}
          icon={<DeviceMobileIcon className={iconClass} />}
        >
          {customer.cell_phone ?? ''}
        </PanelField>

        {doubleWidth && (
          <PanelField name={'API'} icon={<CodePage className={iconClass} />}>
            {customer.contact_api_id ?? ''}
          </PanelField>
        )}
      </dl>
    </div>
  )
}

export default CustomerPanel
