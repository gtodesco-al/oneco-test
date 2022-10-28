import { User } from '@fortis/api'
import { Token } from '@fortis/api/src/services/tokens.service'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { PopupMenu } from '../../../components/PopupMenu/PopupMenu'
import { isActive } from '../../../utils/isActive'
import { accountTypeToString } from '../../VirtualTerminal/utils/accountTypeToString'
import {
  canEditWallet,
  canDeactivateWallet,
  canReactivateWallet,
} from '../utils/permissions'

const CardTag = ({ type }: { type: Token['account_type'] }) => (
  <div
    className={classNames(
      'w-8 h-5 bg-no-repeat bg-center bg-white border border-gray-300',
      {
        'bg-visa-card': type === 'visa',
        'bg-mastercard': type === 'mc',
        'bg-ach-card': type !== 'visa' && type !== 'mc',
      }
    )}
  />
)

interface ColorTagProps {
  className?: string
  status: 'active' | 'warning' | 'inactive'
  children: string
}

const ColorTag = ({ className = '', status, children }: ColorTagProps) => (
  <p
    className={classNames(
      className,
      'px-2.5 py-0.5 rounded text-xs font-medium',
      {
        'bg-teal-50 text-teal-800': status === 'active',
        'bg-yellow-50 text-yellow-800': status === 'warning',
        'bg-gray-200 text-gray-800': status === 'inactive',
      }
    )}
  >
    {children}
  </p>
)

const StatusTag = ({ item }: { item: Token }) => {
  const { t } = useTranslation('Customers')

  return isActive(item) ? (
    <ColorTag status="active">{t('active')}</ColorTag>
  ) : (
    <ColorTag status="inactive">{t('inactive')}</ColorTag>
  )
}

const ExpiryTag = ({ expiry }: { expiry: Token['expiring_in_months'] }) => {
  const { t } = useTranslation('Customers')

  if (isNil(expiry)) {
    return <></>
  }

  if (expiry < 0) {
    return <ColorTag status="inactive">{t('expired')}</ColorTag>
  }

  if (expiry <= 3) {
    return <ColorTag status="warning">{t('expiring soon')}</ColorTag>
  }

  return <></>
}

interface WalletItemProps {
  item: Token
  user: User
  onView: (item: Token) => void
  onEdit: (item: Token) => void
  onDeactivate: (item: Token) => void
  onActivate: (item: Token) => void
}

export const WalletItem = ({
  item,
  user,
  onView,
  onEdit,
  onDeactivate,
  onActivate,
}: WalletItemProps) => {
  const { t } = useTranslation('Customers')

  return (
    <div
      className={classNames('grid items-center grid-flow-col gap-[0.875rem]', {
        'grid-cols-[repeat(2,1fr)_min-content] xl:grid-cols-[1fr_min-content] mobile:grid-cols-[1fr_min-content] xl:grid-rows-2 mobile:grid-rows-2':
          item.payment_method !== 'ach',
        'grid-cols-[1fr_min-content]': item.payment_method === 'ach',
      })}
    >
      <div className="flex items-center gap-[0.375rem]">
        <CardTag type={item.account_type} />
        <p className="text-gray-700 font-medium text-sm">
          {accountTypeToString(item.account_type)} • {item.last_four}
        </p>

        <StatusTag item={item} />
      </div>

      {item.payment_method === 'cc' && (
        <div className="flex gap-[0.375rem] xl:col-span-2 mobile:col-span-2">
          <>
            <p className="text-gray-600 text-sm">{t('expires')} 00/00</p>
            <ExpiryTag expiry={item.expiring_in_months} />
          </>
        </div>
      )}

      <PopupMenu
        button={
          <button
            className="h-min text-primary-color p-0"
            aria-label="Show options"
          >
            <DotsVerticalIcon className="h-4" />
          </button>
        }
      >
        <PopupMenu.Item action={() => onView(item)}>{t('view')}</PopupMenu.Item>

        {isActive(item) && canEditWallet(user) && (
          <PopupMenu.Item action={() => onEdit(item)}>
            {t('edit')}
          </PopupMenu.Item>
        )}

        <PopupMenu.Item action={() => undefined}>{t('charge')}</PopupMenu.Item>

        {isActive(item) && canDeactivateWallet(user) && (
          <PopupMenu.Item action={() => onDeactivate(item)}>
            {t('deactivate')}
          </PopupMenu.Item>
        )}

        {!isActive(item) && canReactivateWallet(user) && (
          <PopupMenu.Item action={() => onActivate(item)}>
            {t('reactivate')}
          </PopupMenu.Item>
        )}
      </PopupMenu>
    </div>
  )
}
