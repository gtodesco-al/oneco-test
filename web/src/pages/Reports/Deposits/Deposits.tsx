import { format } from 'date-fns'

import {
  ColumnFilterType,
  TableColumn,
  TableRow,
} from '../../../components/Table/Table'
import PaginatedTable from '../../../components/PaginatedTable/PaginatedTable'
import { currency } from '../../../utils/format'

export const DepositsReportPrivs = ['v2.reports.get', 'v2.transactions.get']

const DepositsReport = () => {
  const depositsColumns = [
    {
      id: 'bank_account_number',
      header: 'Account Number',
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'date_effective_ts',
      header: 'Effective Date',
      render: (deposit: TableRow, columnID: string) => {
        const timestamp = deposit[columnID]
        return format(new Date(timestamp * 1000), 'MM/dd/y')
      },
      active: true,
      filter: {
        type: ColumnFilterType.DateRange,
      },
    },
    {
      id: 'amount',
      header: 'Amount',
      render: (deposit: TableRow, columnID: string) =>
        currency(Number(deposit[columnID])),
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'merchant_name',
      header: 'Merchant Account',
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
  ] as TableColumn[]

  return (
    <PaginatedTable
      translationNamespace="Reports"
      navigationText="reports"
      headerText="deposits"
      columns={depositsColumns}
      serviceName="deposits-reports"
      columnOrderStorageID="fortis:display-order:deposits-report"
    />
  )
}

export default DepositsReport
