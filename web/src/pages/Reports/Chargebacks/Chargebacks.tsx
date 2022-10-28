import { format } from 'date-fns'

import AccountType from '../../../components/AccountType/AccountType'
import PaginatedTable from '../../../components/PaginatedTable/PaginatedTable'
import {
  ColumnFilterType,
  TableColumn,
  TableRow,
} from '../../../components/Table/Table'
import { currency } from '../../../utils/format'

export const ChargebacksReportPrivs = ['v2.reports.get', 'v2.transactions.get']

const ChargebacksReport = () => {
  const chargebacksColumns = [
    {
      id: 'receive_dt_ts',
      header: 'Dispute Date',
      render: (chargeback: TableRow, columnID: string) => {
        const timestamp = chargeback[columnID]
        return format(new Date(timestamp * 1000), 'MM/dd/y')
      },
      active: true,
      filter: {
        type: ColumnFilterType.DateRange,
      },
    },
    {
      id: 'prcs_trxn_amt',
      header: 'Chargeback Amount',
      render: (chargeback: TableRow, columnID: string) =>
        currency(Number(chargeback[columnID])),
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'pos_trxn_dt_ts',
      header: 'Transaction Date',
      render: (chargeback: TableRow, columnID: string) => {
        const timestamp = chargeback[columnID]
        return format(new Date(timestamp * 1000), 'MM/dd/y')
      },
      active: true,
      filter: {
        type: ColumnFilterType.DateRange,
      },
    },
    {
      id: 'card_last_4_nbr',
      header: 'Card Number',
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'card_type',
      header: 'Account Type',
      render: (transaction: TableRow, columnID: string) => {
        const accountType = transaction[columnID]
        return <AccountType type={accountType} />
      },
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
      headerText="chargebacks"
      columns={chargebacksColumns}
      serviceName="chargebacks-reports"
      columnOrderStorageID="fortis:display-order:chargebacks-report"
    />
  )
}

export default ChargebacksReport
