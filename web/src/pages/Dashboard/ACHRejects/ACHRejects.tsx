import { startOfToday, startOfDay, sub } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { ACHReject } from '@fortis/api/src/services/ach-rejects.service'

import { BaseDashboardWidget } from '../BaseDashboardWidget/BaseDashboardWidget'
import { AchAccountPlaceholder } from '../AchAccountPlaceholder/AchAccountPlaceholder'
import { CashInfoPanel } from '../CashInfoPanel/CashInfoPanel'

export type ACHRejectsProps = {
  transactions: ACHReject[]
}

export const ACHRejectsName = 'ach rejects'
export const ACHRejectsDescription =
  'displays the number of ach rejects received'
export const ACHRejectsReportPrivs = ['v2.reports.get', 'v2.transactions.get']

const todayTime = startOfToday().getTime() / 1000
const last7DaysTime = startOfDay(sub(new Date(), { days: 7 })).getTime() / 1000

const ACHRejects = ({ transactions }: ACHRejectsProps) => {
  const { t } = useTranslation('Dashboard')

  const [today, last7Days] = transactions
  return (
    <div className="flex mobile:flex-col justify-between gap-2">
      <CashInfoPanel
        to={`/reports/ach-rejects?filter[created_ts][$gte]=${todayTime}`}
        title={t('today')}
        cashAmount={today.values[1]}
        details={`${today.values[0]} ${t('rejects')}`}
      />

      <CashInfoPanel
        to={`/reports/ach-rejects?filter[created_ts][$gte]=${last7DaysTime}`}
        title={t('last 7 days')}
        cashAmount={last7Days.values[1]}
        details={`${last7Days.values[0]} ${t('rejects')}`}
      />
    </div>
  )
}

type WrappedACHRejectsProps = {
  hasACHAccounts?: boolean
  transactions?: ACHReject[]
}

export const WrappedACHRejects = ({
  hasACHAccounts = true,
  transactions,
}: WrappedACHRejectsProps) => {
  const { t } = useTranslation('Dashboard')

  const widgetName = t(ACHRejectsName)
  return (
    <BaseDashboardWidget
      name={widgetName}
      description={t(ACHRejectsDescription)}
      isLoading={!transactions}
      hasTransactions={!!transactions && transactions.length > 0}
      reportURL="/reports/ach-rejects"
      viewReportPrivs={ACHRejectsReportPrivs}
    >
      {hasACHAccounts && transactions ? (
        <ACHRejects transactions={transactions} />
      ) : (
        <AchAccountPlaceholder widgetName={widgetName} />
      )}
    </BaseDashboardWidget>
  )
}

export default WrappedACHRejects
