import { useTranslation } from 'react-i18next'
import ButtonFilterSet from '../../../components/ButtonFilterSet/ButtonFilterSet'
import { currency, numberString } from '../../../utils/format'

interface TransactionChartWidgetProps {
  filters: string[]
  selectedFilter: string
  onSelect: (filter: string) => void
  totalTransactions: number
  totalAmount: number
  children: React.ReactNode
}

/**
 * Provides a commonplace widget for layout and markup used by transaction graph widgets (ie. Gateway Transactions, Recurring Transaction Forecast)
 */
export function TransactionChartWidget({
  filters,
  selectedFilter,
  onSelect: onSelect,
  totalTransactions = 0,
  totalAmount = 0,
  children,
}: TransactionChartWidgetProps) {
  const { t } = useTranslation('Dashboard')

  return (
    <>
      <div className="flex mobile:block justify-between items-center">
        <ButtonFilterSet
          options={filters}
          selectedOption={selectedFilter}
          onSelect={onSelect}
        />
      </div>

      <div className="flex my-4">
        <div className="mr-6">
          <p className="font-normal text-sm text-gray-800">
            {t('total transactions')}
          </p>
          <p className="font-bold text-sm text-gray-800">
            {numberString(totalTransactions)}
          </p>
        </div>
        <div>
          <p className="font-normal text-sm text-gray-800">
            {t('total amount')}
          </p>
          <p className="font-bold text-sm text-gray-800">
            {currency(totalAmount)}
          </p>
        </div>
      </div>

      {children}

      <div className="hidden mobile:flex justify-center my-4 gap-[0.625rem]">
        {filters.map((filter) => (
          <div
            key={filter}
            className={`w-2 h-2 bg-slate-400 rounded-full ${
              selectedFilter === filter && 'bg-red-700'
            }`}
          />
        ))}
      </div>
    </>
  )
}

export default TransactionChartWidget
