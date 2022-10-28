import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useCallback, useState, useEffect } from 'react'

import { ACHReject } from '@fortis/api/src/services/ach-rejects.service'
import { Chargeback } from '@fortis/api/src/services/chargebacks.service'
import { GatewayTransaction } from '@fortis/api/src/services/gateway-transactions.service'
import { RecurringBillingDecline } from '@fortis/api/src/services/recurring-billing-declines.service'
import { RecurringTransactionsHistory } from '@fortis/api/src/services/recurring-transactions-history.service'
import { RecurringTransactionsForecast } from '@fortis/api/src/services/recurring-transactions-forecast.service'
import { SettledTransaction } from '@fortis/api/src/services/settled-transactions.service'

import { api } from '../../api'
import { HasPermission } from '../../components/HasPermission/HasPermission'
import { useLocations } from '../../hooks/useLocations'

import DashboardHeader from './Header/Header'

import ACHRejects, {
  ACHRejectsName,
  ACHRejectsDescription,
} from './ACHRejects/ACHRejects'
// TODO removed for MVP
// import Chargebacks, {
//   ChargebacksName,
//   ChargebacksDescription,
// } from './Chargebacks/Chargebacks'
import GatewayTransactions, {
  GatewayTransactionsName,
  GatewayTransactionsDescription,
} from './GatewayTransactions/GatewayTransactions'
import SettledTransactions, {
  SettledTransactionsName,
  SettledTransactionsDescription,
} from './SettledTransactions/SettledTransactions'
import RecurringTransactionForecast, {
  RecurringTransactionForecastName,
  RecurringTransactionForecastDescription,
} from './RecurringTransactionForecast/RecurringTransactionForecast'
import RecurringTransactionHistory, {
  RecurringTransactionHistoryName,
  RecurringTransactionHistoryDescription,
} from './RecurringTransactionHistory/RecurringTransactionHistory'
import RecurringBillingDeclines, {
  RecurringBillingDeclinesName,
  RecurringBillingDeclinesDescription,
} from './RecurringBillingDeclines/RecurringBillingDeclines'

export type WidgetDisplayOrder = {
  id: string
  header: string
  description: string
  priv: string
  active: boolean
}

enum PaymentMethod {
  CC = 'cc',
  ACH = 'ach',
}
export interface MerchantAccount {
  id: string
  paymentMethod: PaymentMethod
  title: string
}

type WidgetToRenderFn = {
  [widgetID: string]: () => JSX.Element
}

const DASHBOARD_WIDGET_ORDER = 'fortis:display-order:dashboard'

export default function Dashboard() {
  const { t } = useTranslation('Dashboard')
  const { selectedLocation } = useLocations()

  const widgets: WidgetDisplayOrder[] = [
    {
      id: 'gateway-transactions',
      header: t(GatewayTransactionsName),
      description: t(GatewayTransactionsDescription),
      priv: 'v2.transactions.get',
      active: true,
    },
    {
      id: 'settled-transactions',
      header: t(SettledTransactionsName),
      description: t(SettledTransactionsDescription),
      priv: 'v2.transactions.get',
      active: true,
    },
    {
      id: 'recurring-transaction-history',
      header: t(RecurringTransactionHistoryName),
      description: t(RecurringTransactionHistoryDescription),
      priv: 'v2.recurrings.get',
      active: true,
    },
    {
      id: 'recurring-transaction-forecast',
      header: t(RecurringTransactionForecastName),
      description: t(RecurringTransactionForecastDescription),
      priv: 'v2.recurrings.get',
      active: true,
    },
    {
      id: 'recurring-billing-declines',
      header: t(RecurringBillingDeclinesName),
      description: t(RecurringBillingDeclinesDescription),
      priv: 'v2.recurrings.get',
      active: true,
    },
    // TODO removed for MVP
    // {
    //   id: 'chargebacks',
    //   header: t(ChargebacksName),
    //   description: t(ChargebacksDescription),
    //   priv: 'v2.transactions.get',
    //   active: true,
    // },
    {
      id: 'ach-rejects',
      header: t(ACHRejectsName),
      description: t(ACHRejectsDescription),
      priv: 'v2.transactions.get',
      active: true,
    },
  ]

  const [widgetDisplayOrder, setWidgetDisplayOrder] = useState<
    WidgetDisplayOrder[]
  >([])

  const [allMerchantAccounts, setAllMerchantAccounts] = useState<
    MerchantAccount[]
  >([])
  const [selectedMerchantAccounts, setSelectedMerchantAccounts] = useState<
    Array<MerchantAccount>
  >([])
  const [gatewayTransactions, setGatewayTransactions] = useState<
    GatewayTransaction[]
  >([])
  const [settledTransactions, setSettledTransactions] = useState<
    SettledTransaction[]
  >([])
  const [recurringTransactionHistory, setRecurringTransactionHistory] =
    useState<RecurringTransactionsHistory[] | undefined>()

  const [recurringTransactionsForecast, setRecurringTransactionsForecast] =
    useState<RecurringTransactionsForecast[] | undefined>()
  const [recurringBillingDeclines, setRecurringBillingDeclines] = useState<
    RecurringBillingDecline[] | undefined
  >()
  const [chargebacks, setChargebacks] = useState<Chargeback[] | undefined>()
  const [achRejects, setACHRejects] = useState<ACHReject[] | undefined>()

  useEffect(() => {
    const order = window.localStorage.getItem(DASHBOARD_WIDGET_ORDER)
    if (!order) {
      setWidgetDisplayOrder(widgets)
      return
    }

    try {
      const storedOrder = JSON.parse(order) as { id: string; active: boolean }[]
      const displayOrder = storedOrder.map((o) => {
        const found = widgets.find((w) => w.id === o.id)
        // if we find one display order item that is not valid, just recent all widgets to
        // the default order
        if (!found) throw Error('unidentified widget')
        found.active = Boolean(o.active)
        return found
      })
      setWidgetDisplayOrder(displayOrder)
    } catch (e) {
      setWidgetDisplayOrder(widgets)
    }
  }, [])

  useEffect(() => {
    const orderToStore = widgetDisplayOrder.reduce((order, w) => {
      order.push({ id: w.id, active: w.active })
      return order
    }, [] as { id: string; active: boolean }[])
    window.localStorage.setItem(
      DASHBOARD_WIDGET_ORDER,
      JSON.stringify(orderToStore)
    )
  }, [widgetDisplayOrder])

  useEffect(() => {
    if (!(selectedLocation as any).product_transactions) return
    const accounts = (selectedLocation as any).product_transactions.map(
      (a: any) => ({
        id: a.id,
        paymentMethod: a.payment_method,
        title: a.title,
      })
    )
    setAllMerchantAccounts(accounts)
  }, [selectedLocation])

  useEffect(() => {
    if (!selectedLocation.id || widgetDisplayOrder.length === 0) return

    const $in = selectedMerchantAccounts.map((s) => s.id)
    const productTransactions = { product_transaction_id: { $in } }
    const locationID = { location_id: selectedLocation.id }

    const servicesToSetters = [
      ['gateway-transactions', setGatewayTransactions],
      ['settled-transactions', setSettledTransactions],
      ['recurring-transactions-history', setRecurringTransactionHistory],
      ['recurring-transactions-forecast', setRecurringTransactionsForecast],
      ['recurring-billing-declines', setRecurringBillingDeclines],
      // TODO removed for MVP
      // ['chargebacks', setChargebacks],
      ['ach-rejects', setACHRejects],
    ] as const

    servicesToSetters.forEach(([service, setter]) =>
      api
        .service(service)
        .find({
          query: { filter: { ...locationID, ...productTransactions } },
        })
        .then((result: any) => {
          setter(result)
        })
    )
  }, [widgetDisplayOrder, selectedLocation.id, selectedMerchantAccounts])

  const includesAccountTypes = useCallback(
    (t: PaymentMethod): boolean => {
      const found =
        selectedMerchantAccounts.length > 0
          ? selectedMerchantAccounts.some((a) => a.paymentMethod === t)
          : allMerchantAccounts.some((a) => a.paymentMethod === t)
      return found
    },
    [allMerchantAccounts, selectedMerchantAccounts]
  )

  const widgetIDToRenderFn: WidgetToRenderFn = {
    'gateway-transactions': useCallback(
      () => <GatewayTransactions transactions={gatewayTransactions} />,
      [gatewayTransactions]
    ),
    'settled-transactions': useCallback(
      () => <SettledTransactions transactions={settledTransactions} />,
      [settledTransactions]
    ),
    'recurring-transaction-history': useCallback(
      () => (
        <div
          className={classNames({
            'order-last': !includesAccountTypes(PaymentMethod.CC),
          })}
        >
          <RecurringTransactionHistory
            transactions={recurringTransactionHistory}
            hasCCAccounts={includesAccountTypes(PaymentMethod.CC)}
          />
        </div>
      ),
      [recurringTransactionHistory, includesAccountTypes]
    ),
    'recurring-transaction-forecast': useCallback(
      () => (
        <div
          className={classNames({
            'order-last': !includesAccountTypes(PaymentMethod.CC),
          })}
        >
          <RecurringTransactionForecast
            transactions={recurringTransactionsForecast}
            hasCCAccounts={includesAccountTypes(PaymentMethod.CC)}
          />
        </div>
      ),
      [recurringTransactionsForecast, includesAccountTypes]
    ),
    'recurring-billing-declines': useCallback(
      () => (
        <div
          className={classNames({
            'order-last': !includesAccountTypes(PaymentMethod.CC),
          })}
        >
          <RecurringBillingDeclines
            transactions={recurringBillingDeclines}
            hasCCAccounts={includesAccountTypes(PaymentMethod.CC)}
          />
        </div>
      ),
      [recurringBillingDeclines, includesAccountTypes]
    ),
    // TODO removed for MVP
    // chargebacks: useCallback(
    //   () => (
    //     <div
    //       className={classNames('justify-self-stretch', {
    //         'order-last': !includesAccountTypes(PaymentMethod.CC),
    //       })}
    //     >
    //       <Chargebacks
    //         transactions={chargebacks}
    //         hasCCAccounts={includesAccountTypes(PaymentMethod.CC)}
    //       />
    //     </div>
    //   ),
    //   [chargebacks, includesAccountTypes]
    // ),
    'ach-rejects': useCallback(
      () => (
        <div
          className={classNames({
            'order-last': !includesAccountTypes(PaymentMethod.ACH),
          })}
        >
          <ACHRejects
            transactions={achRejects}
            hasACHAccounts={includesAccountTypes(PaymentMethod.ACH)}
          />
        </div>
      ),
      [achRejects, includesAccountTypes]
    ),
  }

  return (
    <>
      <DashboardHeader
        merchantAccounts={allMerchantAccounts}
        selectedAccounts={selectedMerchantAccounts}
        setSelectedAccounts={setSelectedMerchantAccounts}
        timezone={selectedLocation.tz as string}
        widgetDisplayOrder={widgetDisplayOrder}
        onWidgetDisplayOrderChanged={(list) => setWidgetDisplayOrder(list)}
      />

      <div className="mt-6 grid grid-cols-2 tablet:grid-cols-1 gap-6">
        {widgetDisplayOrder.map((w) => {
          if (!w.active) return

          const WidgetToRender = widgetIDToRenderFn[w.id]
          return (
            <HasPermission permission={w.priv} key={w.id}>
              <WidgetToRender />
            </HasPermission>
          )
        })}
      </div>
    </>
  )
}
