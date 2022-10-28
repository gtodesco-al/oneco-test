import { format } from 'date-fns'
import { RecurringTransactionsForecast } from '@fortis/api/src/services/recurring-transactions-forecast.service'
import { useTheme } from '@nivo/core'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import BarChart from '../../../components/BarChart/BarChart'
import { currency } from '../../../utils/format'
import { partitionArray } from '../../../utils/array'

import { BaseDashboardWidget } from '../BaseDashboardWidget/BaseDashboardWidget'
import { CcAccountPlaceholder } from '../CcAccountPlaceholder/CcAccountPlaceholder'
import TransactionChartWidget from '../TransactionChartWidget/TransactionChartWidget'
import { AxisTickProps } from '@nivo/axes'

type RecurringTransactionForecastProps = {
  transactions: RecurringTransactionsForecast[]
}

const filters = [
  {
    id: 'next30days',
    name: 'next 30 days',
    range: 10,
  },
  {
    id: 'next12months',
    name: 'next 12 months',
    range: 3,
  },
]

type FilterMap = { id: string; name: string; range: number }[]

function largeForecastTransactions(
  filters: FilterMap,
  data: RecurringTransactionsForecast[]
) {
  return filters.reduce((acc, filter) => {
    const raw = data.find(
      (d) => d.id === filter.id
    ) as RecurringTransactionsForecast
    if (!raw) return { ...acc }

    let amount = 0
    let transactions = 0

    const values = raw.values[0]
    return {
      ...acc,
      [filter.id]: {
        data: raw.range.map((r, i) => {
          amount += values.values[i][1]
          transactions += values.values[i][0]
          return {
            date: format(new Date(1000 * r), 'M/dd'),
            amount: values.values[i][1],
            totalTransactions: values.values[i][0],
          }
        }),
        amount: parseFloat(amount.toFixed(2)),
        transactions,
      },
    }
  }, {})
}

function smallForecastTransactions(
  filters: FilterMap,
  data: RecurringTransactionsForecast[]
) {
  return filters.reduce((acc, filter) => {
    const raw = data.find(
      (d) => d.id === filter.id
    ) as RecurringTransactionsForecast
    if (!raw) return { ...acc }

    const ranges = partitionArray<number>(raw.range, filter.range)
    const totals = raw.values.map((v) => {
      return {
        values: partitionArray<number[]>(v.values, filter.range),
      }
    })
    const transactions = ranges.map((r, i) => ({
      date: `${format(new Date(1000 * r[0]), 'M/dd')}-${format(
        new Date(1000 * r[r.length - 1]),
        'M/dd'
      )}`,
      ...totals.reduce(
        (all, t) => ({
          ...all,
          amount: t.values[i].reduce(
            (total, v) => parseFloat((v[1] + total).toFixed(2)),
            0
          ),
          totalTransactions: t.values[i].reduce((total, v) => v[0] + total, 0),
        }),
        {}
      ),
    }))

    return { ...acc, [filter.id]: transactions }
  }, {})
}

export const RecurringTransactionForecastName = 'recurring transaction forecast'
export const RecurringTransactionForecastDescription =
  'forecast is calculated based on the recurring billing set up in the system'

export const RecurringTransactionForecastReportPrivs = [
  'v2.reports.get',
  'v2.recurrings.get',
]

const RecurringTransactionForecast = ({
  transactions,
}: RecurringTransactionForecastProps) => {
  const { t } = useTranslation('Dashboard')

  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0)
  const [largeData, setLargeData] = useState<any>({})
  const [largeTransactions, setLargeTransactions] = useState<any>({})
  const [smallData, setSmallData] = useState<any>([])
  const [smallTransactions, setSmallTransactions] = useState<any>([])

  const BarChartCustomTicker = (props: AxisTickProps<string>) => {
    const theme = useTheme()

    return (
      <g
        transform={`translate(${props.x},${props.y})`}
        style={{ opacity: props.opacity }}
      >
        {filters[selectedFilterIndex].id === 'next30days' ? (
          <text
            alignmentBaseline="middle"
            style={{
              ...theme.axis.ticks.text,
              fontSize: 9,
            }}
            textAnchor={props.textAnchor}
            transform={`translate(${props.textX},${props.textY})`}
            dangerouslySetInnerHTML={{
              __html:
                props.tickIndex % 5 === 0 ||
                props.tickIndex === largeTransactions.data.length - 1
                  ? props.value
                  : '',
            }}
          ></text>
        ) : (
          <text
            alignmentBaseline="middle"
            style={{
              ...theme.axis.ticks.text,
              fontSize: 9,
            }}
            textAnchor={props.textAnchor}
            transform={`translate(${props.textX},${props.textY})`}
            dangerouslySetInnerHTML={{ __html: props.value }}
          ></text>
        )}
      </g>
    )
  }

  useEffect(() => {
    if (transactions.length > 0) {
      const large = largeForecastTransactions(filters, transactions)
      setLargeData(large)

      const small = smallForecastTransactions(filters, transactions)
      setSmallData(small)
    }
  }, [transactions])

  useEffect(() => {
    if (Object.keys(largeData).length > 0) {
      setLargeTransactions(largeData[filters[selectedFilterIndex].id])
    }
    if (Object.keys(smallData).length > 0) {
      setSmallTransactions(smallData[filters[selectedFilterIndex].id])
    }
  }, [selectedFilterIndex, largeData, smallData])

  return (
    <TransactionChartWidget
      filters={filters.map((f) => t(f.name))}
      selectedFilter={t(filters[selectedFilterIndex].name)}
      onSelect={(s) =>
        setSelectedFilterIndex(
          filters.findIndex((f) => f.name === s.toLowerCase())
        )
      }
      totalTransactions={largeTransactions.transactions || 0}
      totalAmount={largeTransactions.amount || 0}
    >
      <div className="w-full h-60 mobile:hidden">
        <BarChart
          axisBottom={{
            renderTick: BarChartCustomTicker,
          }}
          axisLeft={{
            format: (value: number) => currency(value),
          }}
          data={largeTransactions.data}
          indexBy="date"
          colors="#7DD3FC"
          hoverColor="#0369A1"
          keys={['amount']}
          tooltip={({ data: { amount, date, totalTransactions } }) => {
            return (
              <div className="flex flex-col p-2 bg-gray-800 text-white text-xs rounded-md">
                <span>{date}</span>
                <span className="font-bold">
                  {totalTransactions} {t('transactions')}
                </span>
                <span className="font-bold">{currency(amount as number)}</span>
              </div>
            )
          }}
          valueFormat={(value) => {
            return currency(Number(value))
          }}
        />
      </div>
      <div className="hidden w-full h-72 mobile:block">
        <BarChart
          axisLeft={{
            format: (value: number) => currency(value),
          }}
          axisBottom={{
            renderTick: (props) => {
              const theme = useTheme()
              return (
                <g
                  transform={`translate(${props.x},${props.y})`}
                  style={{ opacity: props.opacity }}
                >
                  <text
                    alignmentBaseline="middle"
                    style={{
                      ...theme.axis.ticks.text,
                      fontSize: 9,
                    }}
                    textAnchor={props.textAnchor}
                    transform={`translate(${props.textX},${props.textY})`}
                    dangerouslySetInnerHTML={{ __html: props.value }}
                  ></text>
                </g>
              )
            },
          }}
          colors="#7DD3FC"
          hoverColor="#0369A1"
          data={smallTransactions}
          indexBy="date"
          keys={['amount']}
          tooltip={({ data: { amount, date, totalTransactions } }) => {
            return (
              <div className="flex flex-col p-2 bg-gray-800 text-white text-xs rounded-md">
                <span>{date}</span>
                <span className="font-bold">
                  {t('transactions')}: {totalTransactions}
                </span>
                <span className="font-bold">
                  {t('amount')}: {currency(amount as number)}
                </span>
              </div>
            )
          }}
          valueFormat={(value) => currency(Number(value))}
        />
      </div>
    </TransactionChartWidget>
  )
}

type WrappedRecurringTransactionForecastProps = {
  hasCCAccounts: boolean
  transactions?: RecurringTransactionsForecast[]
}

export const WrappedRecurringTransactionForecast = ({
  hasCCAccounts = true,
  transactions,
}: WrappedRecurringTransactionForecastProps) => {
  const { t } = useTranslation('Dashboard')

  return (
    <BaseDashboardWidget
      halfWidth={true}
      name={t(RecurringTransactionForecastName)}
      description={t(RecurringTransactionForecastDescription)}
      hasTransactions={!!transactions && transactions.length > 0}
      isLoading={!!transactions}
      viewReportPrivs={RecurringTransactionForecastReportPrivs}
    >
      {hasCCAccounts && transactions ? (
        <RecurringTransactionForecast transactions={transactions} />
      ) : (
        <CcAccountPlaceholder widgetName={RecurringTransactionForecastName} />
      )}
    </BaseDashboardWidget>
  )
}

export default WrappedRecurringTransactionForecast
