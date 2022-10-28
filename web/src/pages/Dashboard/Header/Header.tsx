import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { MultipleSelect } from '../../../components/MultipleSelect/MultipleSelect'
import InfoTip from '../../../components/InfoTip/InfoTip'
import Button from '../../../components/Button/Button'
import DraggableItemList from '../../../components/DraggableItemList/DraggableItemList'

import { MerchantAccount, WidgetDisplayOrder } from '../Dashboard'

type DashboardHeaderProps = {
  merchantAccounts: MerchantAccount[]
  selectedAccounts: MerchantAccount[]
  setSelectedAccounts: (accounts: MerchantAccount[]) => void
  timezone?: string
  widgetDisplayOrder: WidgetDisplayOrder[]
  onWidgetDisplayOrderChanged: (order: WidgetDisplayOrder[]) => void
}

const DashboardHeader = ({
  merchantAccounts,
  selectedAccounts,
  setSelectedAccounts,
  timezone = 'America/New_York',
  widgetDisplayOrder,
  onWidgetDisplayOrderChanged,
}: DashboardHeaderProps) => {
  const { t } = useTranslation('Dashboard')

  const [showWidgetDrawer, setShowWidgetDrawer] = useState<boolean>(false)

  return (
    <header className="grid gap-6 grid-cols-[1fr_min-content_min-content] mobile:grid-cols-[1fr_min-content]">
      <div>
        <div className="flex gap-1 mb-1">
          <h1 className="text-gray-900 text-xl font-semibold">
            {t('dashboard')}
          </h1>
          <InfoTip
            className=" w-52"
            text={`${t(
              'dashboard data displayed in location timezone'
            )} ${timezone}`}
          ></InfoTip>
        </div>

        <p className="text-xs text-gray-500">
          {t('quick overview of your business')}
        </p>
      </div>

      <div className="mobile:col-span-2 mobile:order-last w-60">
        <MultipleSelect<MerchantAccount>
          defaultText="Filter by merchant account"
          allItems={merchantAccounts}
          selectedItems={selectedAccounts}
          onChangeSelections={setSelectedAccounts}
          itemToString={(account) =>
            `${account.title} - ${account.paymentMethod.toUpperCase()}`
          }
        />
      </div>

      <Button
        className="w-11 h-11 bg-gray-50 text-sky-500 border-gray-200 shadow-sm"
        buttonType="outline"
        icon={<DotsHorizontalIcon className="w-4" />}
        circular
        onClick={() => setShowWidgetDrawer(true)}
      />

      {showWidgetDrawer && (
        <DraggableItemList
          items={widgetDisplayOrder}
          onListChanged={(list) =>
            onWidgetDisplayOrderChanged(list as WidgetDisplayOrder[])
          }
          handleClose={() => setShowWidgetDrawer(false)}
        />
      )}
    </header>
  )
}

export default DashboardHeader
