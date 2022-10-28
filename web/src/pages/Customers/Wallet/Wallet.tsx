import { User } from '@fortis/api'
import { Contact } from '@fortis/api/src/services/contacts.service'
import { Token } from '@fortis/api/src/services/tokens.service'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/Button/Button'
import { Modal } from '../../../components/Modal/Modal'
import { PopupForm } from '../../../components/PopupForm/PopupForm'
import Switch from '../../../components/Switch/Switch'
import { useLocations } from '../../../hooks/useLocations'
import { isActive } from '../../../utils/isActive'
import EditACHAccount from '../EditACHAccount/EditACHAccount'
import EditCreditCard from '../EditCreditCard/EditCreditCard'
import NewACHAccount from '../NewACHAccount/NewACHAccount'
import NewCreditCard from '../NewCreditCard/NewCreditCard'
import { accountTypeToString } from '../../VirtualTerminal/utils/accountTypeToString'
import { canCreateWallet } from '../utils/permissions'
import {
  activateWalletItem,
  deactivateWalletItem,
  getWalletByCustomerId,
} from '../utils/services/wallet'
import { ViewACHAccount } from '../ViewACHAccount/ViewACHAccount'
import { ViewCreditCard } from '../ViewCreditCard/ViewCreditCard'
import { WalletItem } from '../WalletItem/WalletItem'

//TODO Find a way to move embedded forms out
interface UnboundWalletProps {
  user: User
  items: Token[]
  showActive: boolean
  onToggleShowActive: (state: boolean) => void
  onClickAddCreditCard: () => void
  onClickAddBankAccount: () => void
  onClickView: (token: Token) => void
  onClickEdit: (token: Token) => void
  onClickDeactivate: (token: Token) => void
  onClickActivate: (token: Token) => void
}

export const UnboundWallet = ({
  user,
  items,
  showActive,
  onToggleShowActive,
  onClickAddCreditCard,
  onClickAddBankAccount,
  onClickView,
  onClickEdit,
  onClickDeactivate,
  onClickActivate,
}: UnboundWalletProps) => {
  const { t } = useTranslation('Customers')

  return (
    <section className="bg-gray-100 border rounded-md border-gray-200 p-5 xl:w-[19.125rem]">
      <header className="flex items-center mb-[1.625rem]">
        <h1 className="text-xl font-medium text-gray-900 mr-auto">
          {t('wallet')}
        </h1>

        <p className="text-sm font-medium text-gray-900 mr-3">{t('active')}</p>

        <Switch active={showActive} handleChange={onToggleShowActive} />
      </header>

      <div className="flex flex-col gap-5 mb-5">
        <hr />

        {items.map((item) => (
          <Fragment key={item.id}>
            <WalletItem
              item={item}
              user={user}
              onView={onClickView}
              onEdit={onClickEdit}
              onDeactivate={onClickDeactivate}
              onActivate={onClickActivate}
            />
            <hr />
          </Fragment>
        ))}
      </div>

      {canCreateWallet(user) && (
        <div className="grid grid-cols-2 gap-4 xl:gap-2 xl:grid-rows-2 xl:grid-cols-1 mobile:gap-2 mobile:grid-rows-2 mobile:grid-cols-1">
          <Button
            buttonType="outline"
            className="bg-gray-50 border border-gray-200"
            onClick={onClickAddCreditCard}
          >
            {t('add credit card')}
          </Button>

          <Button
            buttonType="outline"
            className="bg-gray-50 border border-gray-200"
            onClick={onClickAddBankAccount}
          >
            {t('add bank account')}
          </Button>
        </div>
      )}
    </section>
  )
}

interface WalletProps {
  user: User
  customer: Contact | undefined
}

export const Wallet = ({ user, customer }: WalletProps) => {
  const customerId = customer?.id
  const { t } = useTranslation('Customers')
  const { selectedLocation } = useLocations()
  const [items, setItems] = useState<Token[]>([])

  const loadWallet = async () => {
    //customerId may be unset on page load
    if (customerId) {
      const wallet = await getWalletByCustomerId(customerId)
      setItems(wallet)
    } else {
      setItems([])
    }
  }

  //Used to track the item being activated/deactivated
  const [activationToggleItem, setActivationToggleItem] = useState<Token>()

  const toggleActivation = async (token: Token | undefined) => {
    if (!token) {
      return
    }

    if (isActive(token)) {
      await deactivateWalletItem(token)
    } else {
      await activateWalletItem(token)
    }

    await loadWallet()
    setActivationToggleItem(undefined)
  }

  useEffect(() => {
    loadWallet()
  }, [customerId])

  const [showActive, setShowActive] = useState(true)

  const filteredItems = useMemo(
    () =>
      items.filter((item) => (showActive ? isActive(item) : !isActive(item))),
    [items, showActive]
  )
  const [showNewCreditCard, setShowNewCreditCard] = useState(false)
  const [showNewAch, setShowNewAch] = useState(false)
  const [editingToken, setEditingToken] = useState<Token>()
  const [viewingToken, setViewingToken] = useState<Token>()

  return (
    <>
      <Modal
        isOpen={activationToggleItem !== undefined}
        title={t(
          isActive(activationToggleItem)
            ? 'deactivate wallet'
            : 'reactivate wallet'
        )}
        onClose={() => setActivationToggleItem(undefined)}
        body={
          <p className="w-[25rem]">
            {t(
              `are you sure you would like to ${
                isActive(activationToggleItem) ? 'deactivate' : 'reactivate'
              } the wallet`
            )}{' '}
            {accountTypeToString(activationToggleItem?.account_type)} •{' '}
            {activationToggleItem?.last_four ?? '0000'} {t('from customer')}{' '}
            <span className="font-semibold">
              {customer?.first_name ?? ''} {customer?.last_name ?? ''}
            </span>
            ?
          </p>
        }
        buttons={
          <>
            <Button
              buttonType="outline"
              className="border bg-gray-50 border-gray-200"
              onClick={() => setActivationToggleItem(undefined)}
            >
              {t('cancel')}
            </Button>
            <Button onClick={() => toggleActivation(activationToggleItem)}>
              {t(
                isActive(activationToggleItem)
                  ? 'yes, deactivate'
                  : 'yes, reactivate'
              )}
            </Button>
          </>
        }
      />
      <UnboundWallet
        user={user}
        items={filteredItems}
        showActive={showActive}
        onToggleShowActive={() => setShowActive(!showActive)}
        onClickAddCreditCard={() => setShowNewCreditCard(true)}
        onClickAddBankAccount={() => setShowNewAch(true)}
        onClickView={setViewingToken}
        onClickEdit={setEditingToken}
        onClickDeactivate={setActivationToggleItem}
        onClickActivate={setActivationToggleItem}
      />

      <PopupForm
        isOpen={showNewCreditCard}
        title="Add New Credit Card"
        onClose={() => setShowNewCreditCard(false)}
      >
        <NewCreditCard
          contactId={customerId ?? ''}
          locationId={selectedLocation?.id}
          onSubmit={async () => {
            setShowNewCreditCard(false)
            await loadWallet()
          }}
          onCancel={() => setShowNewCreditCard(false)}
        />
      </PopupForm>

      <PopupForm
        isOpen={showNewAch}
        title="Add New Bank Account"
        onClose={() => setShowNewAch(false)}
      >
        <NewACHAccount
          contactId={customerId ?? ''}
          locationId={selectedLocation?.id}
          onSubmit={async () => {
            setShowNewAch(false)
            await loadWallet()
          }}
          onCancel={() => setShowNewAch(false)}
        />
      </PopupForm>

      <PopupForm
        isOpen={editingToken?.payment_method === 'cc'}
        title="Edit Credit Card"
        onClose={() => setEditingToken(undefined)}
      >
        <EditCreditCard
          card={editingToken ?? ({} as Token)}
          onSubmit={async () => {
            setEditingToken(undefined)
            await loadWallet()
          }}
          onCancel={() => setEditingToken(undefined)}
        />
      </PopupForm>

      <PopupForm
        isOpen={editingToken?.payment_method === 'ach'}
        title="Edit Bank Account"
        onClose={() => setEditingToken(undefined)}
      >
        <EditACHAccount
          token={editingToken ?? ({} as Token)}
          onSubmit={async () => {
            setEditingToken(undefined)
            await loadWallet()
          }}
          onCancel={() => setEditingToken(undefined)}
        />
      </PopupForm>

      <PopupForm
        isOpen={viewingToken?.payment_method === 'cc'}
        title="View Credit Card"
        onClose={() => setViewingToken(undefined)}
      >
        <ViewCreditCard card={viewingToken ?? ({} as Token)} />
      </PopupForm>

      <PopupForm
        isOpen={viewingToken?.payment_method === 'ach'}
        title="View Bank Account"
        onClose={() => setViewingToken(undefined)}
      >
        <ViewACHAccount account={viewingToken ?? ({} as Token)} />
      </PopupForm>
    </>
  )
}
