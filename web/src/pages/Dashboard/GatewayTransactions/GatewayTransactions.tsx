import {
  format,
  startOfDay,
  startOfToday,
  startOfYesterday,
  sub,
} from 'date-fns'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { GatewayTransaction } from '@fortis/api/src/services/gateway-transactions.service'

import LineChart, {
  LineChartPoint,
} from '../../../components/LineChart/LineChart'
import BarChart from '../../../components/BarChart/BarChart'
import { currency } from '../../../utils/format'
import { partitionArray } from '../../../utils/array'
import { BaseDashboardWidget } from '../BaseDashboardWidget/BaseDashboardWidget'
import TransactionChartWidget from '../TransactionChartWidget/TransactionChartWidget'
import { useTheme } from '@nivo/core'
import { AxisTickProps } from '@nivo/axes'

const filters = [
  {
    id: 'last24hours',
    name: 'last 24 hours',
    range: 6,
    property: 'filter[created_ts][$gte]',
    value: startOfToday().getTime() / 1000,
  },
  {
    id: 'last48hours',
    name: 'last 48 hours',
    range: 12,
    property: 'filter[created_ts][$gte]',
    value: startOfYesterday().getTime() / 1000,
  },
  {
    id: 'last72hours',
    name: 'last 72 hours',
    range: 18,
    property: 'filter[created_ts][$gte]',
    value: startOfDay(sub(new Date(), { days: 3 })).getTime() / 1000,
  },
]

type FilterMap = {
  id: string
  name: string
  range: number
  property: string
  value: number
}[]
type IDNameMap = { id: string; name: string }[]

type LineGatewayTransactionsProps = {
  last24hours: any
  last48hours: any
  last72hours: any
}

type ChartColors = {
  [key: string]: string
}
const colors: ChartColors = {
  Sales: '#34D399',
  Auths: '#38BDF8',
  'Returns / Refunds': '#A78BFA',
}

function lineGatewayTransactions(
  filters: FilterMap,
  lines: IDNameMap,
  data: GatewayTransaction[]
): LineGatewayTransactionsProps {
  const result = filters.reduce((acc, filter) => {
    const raw = data.find((d) => d.id === filter.id) as GatewayTransaction
    let transactions = 0
    let amount = 0
    let yAmount = 0
    let lineDataAmount = 0

    return {
      ...acc,
      [filter.id]: {
        data: raw?.values.map((rawValue) => ({
          id: lines.find((line) => line.id === rawValue.id)?.name,
          data: rawValue.values
            .map((lineData: number[], i: number) => {
              transactions += lineData[0]
              amount += lineData[1]

              yAmount += lineData[1]
              lineDataAmount += lineData[0]

              if (
                (i > 0 && i % (filter.id === 'last72hours' ? 8 : 4) === 0) ||
                i === 0
              ) {
                const returnObject = {
                  date: raw.range[i],
                  x: `${format(new Date(raw.range[i] * 1000), 'haaa')} ${format(
                    new Date(raw.range[i] * 1000),
                    'MM/dd'
                  )}`,
                  y: yAmount,
                  transactions: lineDataAmount,
                }

                yAmount = 0
                lineDataAmount = 0

                return returnObject
              }
            })
            .filter((record) => !!record),
        })),
        transactions,
        amount: parseFloat(amount.toFixed(2)),
      },
    }
  }, {}) as LineGatewayTransactionsProps

  return result
}

function barGatewayTransactions(
  filters: FilterMap,
  types: IDNameMap,
  colors: ChartColors,
  data: GatewayTransaction[]
) {
  return filters.reduce((acc, filter) => {
    const raw = data.find((data) => data.id === filter.id) as GatewayTransaction
    const ranges = partitionArray<number>(raw.range, filter.range)
    const totals = raw.values.map((v) => {
      return {
        id: types.find((t) => t.id === v.id)?.name,
        values: partitionArray<number[]>(v.values, filter.range),
      }
    })

    const transactions = ranges.map((r, i) => ({
      end: r[r.length - 1],
      start: r[0],
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

export type GatewayTransactionProps = {
  transactions: GatewayTransaction[]
}

export const GatewayTransactionsName = 'gateway transactions'
export const GatewayTransactionsDescription =
  'hourly summary of all gateway transactions, settled or not.'

const ViewReportPrivs = ['v2.reports.get', 'v2.transactions.get']

const GatewayTransactions = ({ transactions }: GatewayTransactionProps) => {
  const { t } = useTranslation('Dashboard')

  const lines = [
    { id: 'auth', name: t('auths') },
    { id: 'refund', name: t('returns / refunds') },
    { id: 'sale', name: t('sales') },
  ]

  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0)
  const [lineData, setLineData] = useState<any>({})
  const [lineTransactions, setLineTransactions] = useState<any>({})
  const [barData, setBarData] = useState<any>({})
  const [barTransactions, setBarTransactions] = useState<any>({})
  const [reportURL, setReportURL] = useState<string>('')

  useEffect(() => {
    if (transactions.length > 0) {
      setLineData(lineGatewayTransactions(filters, lines, transactions))
      setBarData(barGatewayTransactions(filters, lines, colors, transactions))
    }
  }, [transactions])

  useEffect(() => {
    if (Object.keys(lineData).length > 0) {
      setLineTransactions(lineData[filters[selectedFilterIndex].id])
    }
    if (Object.keys(barData).length > 0) {
      setBarTransactions(barData[filters[selectedFilterIndex].id])
    }
  }, [selectedFilterIndex, lineData, barData])

  useEffect(() => {
    const filter = filters[selectedFilterIndex]
    const reportURL = `/reports/transactions?${filter.property}=${filter.value}`
    setReportURL(reportURL)
  }, [selectedFilterIndex])

  type TGatewayTransactionId = {
    id: 'Sales' | 'Auths' | 'Returns / Refunds'
  }
  const getColor = (bar: TGatewayTransactionId) => colors[bar.id]

  const getTspanGroups = (
    value: string,
    maxLineLength: number,
    maxLines = 2
  ) => {
    const words = value.split(' ')

    type linesAcc = {
      lines: string[]
      currLine: string
    }

    const assembleLines: linesAcc = words.reduce(
      (acc: linesAcc, word: string) => {
        if (
          (word + acc.currLine).length > maxLineLength &&
          acc.currLine !== ''
        ) {
          return {
            lines: acc.lines.concat([acc.currLine]),
            currLine: word,
          }
        }
        return {
          ...acc,
          currLine: acc.currLine + ' ' + word,
        }
      },
      { lines: [], currLine: '' }
    )

    const allLines = assembleLines.lines.concat([assembleLines.currLine])

    const lines = allLines.slice(0, maxLines)
    const children: JSX.Element[] = []
    let dy = 0

    lines.forEach((lineText, i) => {
      children.push(
        <tspan x={0} dy={dy} key={i}>
          {1 === i && allLines.length > 2
            ? lineText.slice(0, maxLineLength - 3) + '...'
            : lineText}
        </tspan>
      )
      dy += 15
    })

    return children
  }

  const BarChartCustomTicker = (props: AxisTickProps<string>) => {
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
            fontSize: 11,
          }}
          textAnchor={props.textAnchor}
          transform={`translate(${props.textX},${props.textY})`}
        >
          {getTspanGroups(props.value, 4)}
        </text>
      </g>
    )
  }

  return (
    <BaseDashboardWidget
      halfWidth={true}
      name={t(GatewayTransactionsName)}
      description={t(GatewayTransactionsDescription)}
      hasTransactions={Object.keys(lineData).length > 0}
      viewReportPrivs={ViewReportPrivs}
      reportURL={reportURL}
      isLoading={!!transactions}
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
            axisBottom={{
              renderTick: BarChartCustomTicker,
            }}
            colors={getColor}
            axisLeft={{
              format: (value: number) => currency(value),
            }}
            yFormat={(value) => currency(Number(value))}
            legends={[
              {
                anchor: 'top-left',
                direction: 'row',
                translateX: -70,
                translateY: -30,
                itemsSpacing: 50,
                itemDirection: 'left-to-right',
                itemWidth: 100,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 8,
                symbolShape: 'circle',
              },
            ]}
            tooltip={({ point }) => {
              const { data } = point as LineChartPoint
              return (
                <div className="flex flex-col p-2 bg-gray-800 text-white text-xs rounded-md">
                  {data.date && (
                    <span className="font-medium">
                      {format(new Date(data.date * 1000), 'haaa - MM/dd')}
                    </span>
                  )}
                  <span className="font-medium">
                    {t('transactions')}: {data.transactions}
                  </span>
                  <span className="font-medium">
                    {t('amount')}: {currency(data.yFormatted as number)}
                  </span>
                </div>
              )
            }}
          />
        </div>
        <div className="hidden w-full h-72 mobile:block my-3">
          <BarChart
            axisLeft={{
              format: (value: number) => currency(value),
            }}
            axisBottom={{
              format: (value: number) => format(new Date(1000 * value), 'haaa'),
            }}
            colors={({ id, data }) => String(data[`${id}Color`])}
            data={barTransactions}
            indexBy="start"
            keys={['Sales', 'Auths', 'Returns / Refunds']}
            valueFormat={(value) => currency(Number(value))}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-left',
                direction: 'row',
                translateX: -70,
                translateY: 50,
                itemsSpacing: 10,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 8,
                symbolShape: 'circle',
              },
            ]}
            tooltip={({ data, formattedValue, id }) => {
              return (
                <div className="flex flex-col p-2 bg-gray-800 text-white text-xs">
                  <span>
                    From:
                    {' ' +
                      format(
                        new Date(1000 * (data.start as number)),
                        'haaa - MM/dd'
                      )}
                  </span>
                  <span>
                    To:
                    {' ' +
                      format(
                        new Date(1000 * (data.end as number)),
                        'haaa - MM/dd'
                      )}
                  </span>
                  <span>
                    {t('transactions')}: {data[`${id}Transactions`]}
                  </span>
                  <span>
                    {t('amount')}: {formattedValue}
                  </span>
                </div>
              )
            }}
          />
        </div>
      </TransactionChartWidget>
    </BaseDashboardWidget>
  )
}

export default GatewayTransactions
