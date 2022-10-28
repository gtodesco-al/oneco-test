import { ArrowSmRightIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { currency } from '../../../utils/format'

interface CashInfoPanelProps {
  /**
   * The title displayed at the top of the panel.
   */
  title: string

  /**
   * The cash amount to display at the center of the panel.
   */
  cashAmount: number

  /**
   * The description of the info at the bottom of the panel (usually a count of something, like "12 Declines")
   */
  details: string

  /**
   * The path to navigate to on click.
   */
  to: string
}

/**
 * Provides a consistent display format for cash details in dashboard widgets like Chargebacks and ACH Rejects
 */
export const CashInfoPanel = ({
  title,
  cashAmount,
  details,
  to,
}: CashInfoPanelProps) => (
  <Link
    to={to}
    className="block flex-grow cursor-pointer h-[6.25rem] bg-blue-50 border border-blue-100 rounded-md pt-[0.9rem] pb-3 px-3 text-gray-900 hover:text-white hover:bg-sky-600"
  >
    <div className="flex flex-row justify-between">
      <h3 className="font-bold text-xs underline mb-[0.6rem]">{title}</h3>
      <ArrowSmRightIcon className="w-5" />
    </div>

    <p className="mb-1 text-lg">{currency(cashAmount)}</p>
    <p className="text-xs">{details}</p>
  </Link>
)
