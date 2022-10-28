import { startOfDay, sub, startOfToday, startOfYesterday } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { BaseDashboardWidget } from '../BaseDashboardWidget/BaseDashboardWidget'

import { CcAccountPlaceholder } from '../CcAccountPlaceholder/CcAccountPlaceholder'
import { CashInfoPanel } from '../CashInfoPanel/CashInfoPanel'
import { RecurringBillingDecline } from '@fortis/api/src/services/recurring-billing-declines.service'

export type RecurringBillingDeclinesProps = {
  transactions: RecurringBillingDecline[]
}

export const RecurringBillingDeclinesName = 'recurring billing declines'
export const RecurringBillingDeclinesDescription =
  'displays the outstanding recurring billing declines'

export const RecurringBillingDeclinesReportPrivs = [
  'v2.reports.get',
  'v2.recurrings.get',
]

const todayTime = startOfToday().getTime() / 1000
const yesterdayTime = startOfYesterday().getTime() / 1000
const last30DaysTime =
  startOfDay(sub(new Date(), { days: 30 })).getTime() / 1000

const RecurringBillingDeclines = ({
  transactions,
}: RecurringBillingDeclinesProps) => {
  const { t } = useTranslation('Dashboard')

  const [today, yesterday, last30Days] = transactions
  return (
    <div className="flex mobile:flex-col justify-between gap-2">
      <CashInfoPanel
        to={`/reports/recurring-billing-declines?filter[created_ts][$gte]=${todayTime}`}
        title={t('today')}
        cashAmount={today.values[1]}
        details={`${today.values[0]} ${t('declines')}`}
      />

      <CashInfoPanel
        to={`/reports/recurring-billing-declines?filter[created_ts][$gte]=${yesterdayTime}`}
        title={t('yesterday')}
        cashAmount={yesterday.values[1]}
        details={`${yesterday.values[0]} ${t('declines')}`}
      />

      <CashInfoPanel
        to={`/reports/recurring-billing-declines?filter[created_ts][$gte]=${last30DaysTime}`}
        title={t('last 30 days')}
        cashAmount={last30Days.values[1]}
        details={`${last30Days.values[0]} ${t('declines')}`}
      />
    </div>
  )
}

type WrappedRecurringBillingDeclinesProps = {
  hasCCAccounts?: boolean
  transactions?: RecurringBillingDecline[]
}

const WrappedRecurringBillingDeclines = ({
  hasCCAccounts = true,
  transactions,
}: WrappedRecurringBillingDeclinesProps) => {
  const { t } = useTranslation('Dashboard')

  return (
    <BaseDashboardWidget
      name={t(RecurringBillingDeclinesName)}
      description={t(RecurringBillingDeclinesDescription)}
      isLoading={!transactions}
      hasTransactions={!!transactions && transactions.length > 0}
      reportURL="/reports/recurring-billing-declines"
      viewReportPrivs={RecurringBillingDeclinesReportPrivs}
    >
      {hasCCAccounts && transactions ? (
        <RecurringBillingDeclines transactions={transactions} />
      ) : (
        <CcAccountPlaceholder widgetName={RecurringBillingDeclinesName} />
      )}
    </BaseDashboardWidget>
  )
}

export default WrappedRecurringBillingDeclines
