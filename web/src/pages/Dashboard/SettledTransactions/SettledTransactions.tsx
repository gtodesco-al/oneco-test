import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import { linearGradientDef, useTheme } from '@nivo/core'
import { useTranslation } from 'react-i18next'
import { SettledTransaction } from '@fortis/api/src/services/settled-transactions.service'

import LineChart, {
  LineChartPoint,
} from '../../../components/LineChart/LineChart'
import BarChart from '../../../components/BarChart/BarChart'
import { currency } from '../../../utils/format'
import { partitionArray } from '../../../utils/array'

import { BaseDashboardWidget } from '../BaseDashboardWidget/BaseDashboardWidget'
import TransactionChartWidget from '../TransactionChartWidget/TransactionChartWidget'

type SettledTransactionsProps = {
  transactions: SettledTransaction[]
}

type LineSettledTransactionsProps = {
  last30days: any
  last12months: any
}

const filters = [
  {
    id: 'last30days',
    name: 'last 30 days',
    range: 10,
  },
  {
    id: 'last12months',
    name: 'last 12 months',
    range: 3,
  },
]

type FilterMap = { id: string; name: string; range: number }[]

function lineSettledTransactions(
  filters: FilterMap,
  data: SettledTransaction[]
): LineSettledTransactionsProps {
  const result = filters.reduce((acc, filter) => {
    const raw = data.find((d) => d.id === filter.id) as SettledTransaction
    let transactions = 0
    let amount = 0
    return {
      ...acc,
      [filter.id]: {
        data: raw?.values.map((rawValue) => ({
          id: rawValue.id,
          data: rawValue.values.map((lineData: number[], i: number) => {
            transactions += lineData[0]
            amount += lineData[1]
            return {
              x: format(new Date(1000 * raw.range[i]), 'MM/dd'),
              y: lineData[1],
              transactions: lineData[0],
              date: new Date(1000 * raw.range[i]),
            }
          }),
        })),
        transactions,
        amount: parseFloat(amount.toFixed(2)),
      },
    }
  }, {}) as LineSettledTransactionsProps

  let totalTransaction = 0
  let totalAmount = 0
  const array: any[] = []

  result.last30days.data[0].data.forEach((item: any, index: number) => {
    totalTransaction = totalTransaction + item.transactions
    totalAmount = totalAmount + item.y

    if (index > 0 && index % 4 === 0) {
      array.push({
        x: item.x,
        y: totalAmount,
        transactions: totalTransaction,
      })

      totalTransaction = 0
      totalAmount = 0
    }
  })

  result.last30days.data[0].data = array

  return result
}

function barSettledTransactions(
  filters: FilterMap,
  data: SettledTransaction[]
) {
  return filters.reduce((acc, filter) => {
    const raw = data.find((d) => d.id === filter.id) as SettledTransaction
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

export const SettledTransactionsName = 'settled transactions'
export const SettledTransactionsDescription =
  'transactions that have been approved and settled.'

const ViewReportPrivs = ['v2.reports.get', 'v2.transactions.get']

const SettledTransactions = ({ transactions }: SettledTransactionsProps) => {
  const { t } = useTranslation('Dashboard')

  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0)
  const [lineData, setLineData] = useState<any>({})
  const [lineTransactions, setLineTransactions] = useState<any>({})
  const [barData, setBarData] = useState<any>([])
  const [barTransactions, setBarTransactions] = useState<any>([])

  useEffect(() => {
    if (transactions.length > 0) {
      setLineData(lineSettledTransactions(filters, transactions))
      setBarData(barSettledTransactions(filters, transactions))
    }
  }, [transactions])

  useEffect(() => {
    if (Object.keys(lineData).length > 0) {
      setLineTransactions(lineData[filters[selectedFilterIndex].id])
    }
    if (Object.keys(barData).length > 0) {
      setBarTransactions(barData[filters[selectedFilterIndex].id])
    }
  }, [selectedFilterIndex, lineData])

  return (
    <BaseDashboardWidget
      halfWidth={true}
      name={t(SettledTransactionsName)}
      description={t(SettledTransactionsDescription)}
      hasTransactions={Object.keys(lineData).length > 0}
      isLoading={!!transactions}
      viewReportPrivs={ViewReportPrivs}
    >
      <TransactionChartWidget
        filters={filters.map((f) => t(f.name))}
        selectedFilter={t(filters[selectedFilterIndex].name)}
        onSelect={(s) =>
          setSelectedFilterIndex(
            filters.findIndex((f) => f.name === s.toLowerCase())
          )
        }
        totalTransactions={lineTransactions.transactions || 0}
        totalAmount={lineTransactions.amount || 0}
      >
        <div className="w-full h-80 mobile:hidden">
          <LineChart
            data={lineTransactions.data}
            axisLeft={{
              format: (value: number) => currency(value),
            }}
            yFormat={(value) => currency(Number(value))}
            colors="green"
            layers={['axes', 'lines', 'slices', 'mesh', 'legends', 'areas']}
            defs={[
              linearGradientDef('gradientA', [
                { offset: 0, color: 'green' },
                { offset: 100, color: 'green', opacity: 0 },
              ]),
            ]}
            fill={[{ match: '*', id: 'gradientA' }]}
            tooltip={({ point }) => {
              const { data } = point as LineChartPoint
              return (
                <div className="flex flex-col p-2 bg-gray-800 text-white text-xs rounded-md">
                  <span className="font-medium">{data.xFormatted}</span>
                  <span className="font-medium">
                    {t('transactions')}: {data.transactions}
                  </span>
                  <span className="font-medium">
                    {t('amount')}: {currency(point.data.yFormatted as number)}
                  </span>
                </div>
              )
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
            colors="#34D399"
            data={barTransactions}
            indexBy="date"
            keys={['amount']}
            tooltip={({ data: { amount, totalTransactions } }) => {
              return (
                <div className="flex flex-col p-2 bg-gray-800 text-white text-xs">
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
    </BaseDashboardWidget>
  )
}

export default SettledTransactions
