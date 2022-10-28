import { format, startOfDay, sub } from 'date-fns'
import { RecurringTransactionsHistory } from '@fortis/api/src/services/recurring-transactions-history.service'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import BarChart from '../../../components/BarChart/BarChart'
import { currency } from '../../../utils/format'
import { partitionArray } from '../../../utils/array'
import { BaseDashboardWidget } from '../BaseDashboardWidget/BaseDashboardWidget'
import { CcAccountPlaceholder } from '../CcAccountPlaceholder/CcAccountPlaceholder'
import TransactionChartWidget from '../TransactionChartWidget/TransactionChartWidget'
import { useTheme } from '@nivo/core'
import { AxisTickProps } from '@nivo/axes'

type RecurringTransactionHistoryProps = {
  hasCCAccounts: boolean
  transactions?: RecurringTransactionsHistory[]
}

const filters = [
  {
    id: 'last30days',
    name: 'last 30 days',
    range: 10,
    property: 'filter[is_recurring]="true"&sfilter[created_ts][$gte]',
    value: startOfDay(sub(new Date(), { days: 30 })).getTime() / 1000,
  },
  {
    id: 'last12months',
    name: 'last 12 months',
    range: 3,
    property: 'filter[is_recurring]="true"&sfilter[created_ts][$gte]',
    value: startOfDay(sub(new Date(), { months: 12 })).getTime() / 1000,
  },
]

type FilterMap = { id: string; name: string; range: number }[]
type IDNameMap = { id: string; name: string }[]

type ChartColors = {
  [key: string]: string
}
const colors: ChartColors = {
  Paid: '#34D399',
  Unpaid: '#A78BFA',
}

function largeForecastTransactions(
  filters: FilterMap,
  types: IDNameMap,
  colors: ChartColors,
  data: RecurringTransactionsHistory[]
) {
  return filters.reduce((acc, filter) => {
    const raw = data.find(
      (data) => data.id === filter.id
    ) as RecurringTransactionsHistory
    const totals = raw.values.map((v) => {
      return {
        id: types.find((t) => t.id === v.id)?.name,
        values: v.values,
      }
    })

    let total = 0
    let count = 0

    const transactions = raw.range.map((r, i) => ({
      date: `${format(new Date(1000 * r), 'M/dd')}`,
      ...totals.reduce((all, t) => {
        total += t.values[i][1]
        count += t.values[i][0]
        return {
          ...all,
          [`${t.id}Amount`]: t.values[i][1],
          [`${t.id}Color`]: colors[t.id as string],
          [t.id as string]: t.values[i][0],
        }
      }, {}),
    }))

    return {
      ...acc,
      [filter.id]: {
        data: transactions,
        total,
        count,
      },
    }
  }, {})
}

function smallForecastTransactions(
  filters: FilterMap,
  types: IDNameMap,
  colors: ChartColors,
  data: RecurringTransactionsHistory[]
) {
  return filters.reduce((acc, filter) => {
    const raw = data.find(
      (data) => data.id === filter.id
    ) as RecurringTransactionsHistory
    const ranges = partitionArray<number>(raw.range, filter.range)
    const totals = raw.values.map((v) => {
      return {
        id: types.find((t) => t.id === v.id)?.name,
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
          [t.id as string]: t.values[i].reduce(
            (total, v) => parseFloat((v[1] + total).toFixed(2)),
            0
          ),
          [`${t.id}Color`]: colors[t.id as string],
          [`${t.id}Transactions`]: t.values[i].reduce(
            (total, v) => v[0] + total,
            0
          ),
        }),
        {}
      ),
    }))

    return { ...acc, [filter.id]: transactions }
  }, {})
}

export const RecurringTransactionHistoryName = 'recurring transaction history'
export const RecurringTransactionHistoryDescription =
  'displays past recurring billings, paid and unpaid.'
export const RecurringTransactionHistoryReportPrivs = [
  'v2.reports.get',
  'v2.recurrings.get',
]

const RecurringTransactionHistory = ({
  hasCCAccounts = true,
  transactions,
}: RecurringTransactionHistoryProps) => {
  const { t } = useTranslation('Dashboard')

  const barParts = [
    { id: 'paid', name: t('paid') },
    { id: 'unpaid', name: t('unpaid') },
  ]

  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0)
  const [largeData, setLargeData] = useState<any>({})
  const [largeTransactions, setLargeTransactions] = useState<any>({})
  const [smallData, setSmallData] = useState<any>([])
  const [smallTransactions, setSmallTransactions] = useState<any>([])
  const [reportURL, setReportURL] = useState<string>('')

  const BarChartCustomTicker = (props: AxisTickProps<string>) => {
    const theme = useTheme()

    return (
      <g
        transform={`translate(${props.x},${props.y})`}
        style={{ opacity: props.opacity }}
      >
        {filters[selectedFilterIndex].id === 'last30days' ? (
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
    if (!transactions) return
    if (transactions.length > 0) {
      const large = largeForecastTransactions(
        filters,
        barParts,
        colors,
        transactions
      )
      setLargeData(large)

      const small = smallForecastTransactions(
        filters,
        barParts,
        colors,
        transactions
      )
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

  useEffect(() => {
    const filter = filters[selectedFilterIndex]
    const reportURL = `/reports/transactions?${filter.property}=${filter.value}`
    setReportURL(reportURL)
  }, [selectedFilterIndex])

  return (
    <BaseDashboardWidget
      halfWidth={true}
      name={t(RecurringTransactionHistoryName)}
      description={t(RecurringTransactionHistoryDescription)}
      hasTransactions={!!transactions && transactions.length > 0}
      isLoading={!transactions}
      reportURL={hasCCAccounts ? reportURL : undefined}
      viewReportPrivs={RecurringTransactionHistoryReportPrivs}
    >
      {!hasCCAccounts ? (
        <CcAccountPlaceholder widgetName={t('recurring transaction history')} />
      ) : (
        <TransactionChartWidget
          filters={filters.map((f) => t(f.name))}
          selectedFilter={t(filters[selectedFilterIndex].name)}
          onSelect={(s) =>
            setSelectedFilterIndex(
              filters.findIndex((f) => f.name === s.toLowerCase())
            )
          }
          totalTransactions={largeTransactions.count}
          totalAmount={largeTransactions.total}
        >
          <div className=" h-60 mobile:hidden">
            <BarChart
              axisBottom={{
                renderTick: BarChartCustomTicker,
              }}
              colors={({ id, data }) => String(data[`${id}Color`])}
              data={largeTransactions.data}
              indexBy="date"
              keys={['Paid', 'Unpaid']}
              valueFormat={(value) => currency(Number(value))}
              margin={{ top: 30, bottom: 55, right: 20, left: 30 }}
              tooltip={({ id, data: dataValues }) => {
                return (
                  <div className="flex flex-col p-2 bg-gray-800 text-white text-xs rounded-md">
                    <span>{dataValues.date}</span>
                    <span className="font-bold">
                      {t('transactions')}: {dataValues[id]}
                    </span>
                    <span className="font-bold">
                      {t('amount')}:{' '}
                      {currency(dataValues[`${id}Amount`] as number)}
                    </span>
                  </div>
                )
              }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'top-left',
                  direction: 'row',
                  translateX: -22,
                  translateY: -35,
                  itemsSpacing: 10,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 8,
                  symbolShape: 'circle',
                },
              ]}
            />
          </div>
          <div className="hidden w-full h-72 mobile:block">
            <BarChart
              colors={({ id, data }) => String(data[`${id}Color`])}
              data={smallTransactions}
              indexBy="date"
              keys={['Paid', 'Unpaid']}
              valueFormat={(value) => currency(Number(value))}
              margin={{ top: 30, bottom: 55, right: 15, left: 45 }}
              tooltip={({ id, data: dataValues }) => {
                return (
                  <div className="flex flex-col p-2 bg-gray-800 text-white text-xs rounded-md">
                    <span className="font-bold">
                      {t('transactions')}: {dataValues[id]}
                    </span>
                    <span className="font-bold">
                      {t('amount')}:{' '}
                      {currency(dataValues[`${id}Amount`] as number)}
                    </span>
                  </div>
                )
              }}
            />
          </div>
        </TransactionChartWidget>
      )}
    </BaseDashboardWidget>
  )
}

export default RecurringTransactionHistory
