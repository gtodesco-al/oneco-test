import { startOfDay, sub } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { BaseDashboardWidget } from '../BaseDashboardWidget/BaseDashboardWidget'
import { CcAccountPlaceholder } from '../CcAccountPlaceholder/CcAccountPlaceholder'
import { CashInfoPanel } from '../CashInfoPanel/CashInfoPanel'
import { Chargeback } from '@fortis/api/src/services/chargebacks.service'

export type ChargebacksProps = {
  transactions: Chargeback[]
}

export const ChargebacksName = 'chargebacks'
export const ChargebacksDescription = 'displays unresolved chargebacks'
export const ChargebackReportPrivs = ['v2.reports.get', 'v2.transactions.get']

const last7DaysTime = startOfDay(sub(new Date(), { days: 7 })).getTime() / 1000

const Chargebacks = ({ transactions }: ChargebacksProps) => {
  const { t } = useTranslation('Dashboard')

  const [outstanding, last7Days] = transactions
  return (
    <div className="flex mobile:flex-col justify-between gap-2">
      <CashInfoPanel
        to={`/reports/chargebacks?filter[receive_dt_ts][$gte]=${last7DaysTime}`}
        title={t('received in last 7 days')}
        cashAmount={outstanding.values[1]}
        details={`${outstanding.values[0]} ${t('declines')}`}
      />
      <CashInfoPanel
        // REPORT TODO: what is the filter for open chargebacks on a report
        to="/"
        title={t('open chargebacks')}
        cashAmount={last7Days.values[1]}
        details={`${last7Days.values[0]} ${t('disputes')}`}
      />
    </div>
  )
}

type WrappedChargebacksProps = {
  hasCCAccounts?: boolean
  transactions?: Chargeback[]
}

const WrappedChargebacks = ({
  hasCCAccounts = true,
  transactions,
}: WrappedChargebacksProps) => {
  const { t } = useTranslation('Dashboard')

  const widgetName = t(ChargebacksName)

  return (
    <BaseDashboardWidget
      name={widgetName}
      description={t(ChargebacksDescription)}
      isLoading={!transactions}
      hasTransactions={!!transactions && transactions.length > 0}
      reportURL="/reports/chargebacks"
      viewReportPrivs={ChargebackReportPrivs}
    >
      {hasCCAccounts && transactions ? (
        <Chargebacks transactions={transactions} />
      ) : (
        <CcAccountPlaceholder widgetName={widgetName} />
      )}
    </BaseDashboardWidget>
  )
}

export default WrappedChargebacks
