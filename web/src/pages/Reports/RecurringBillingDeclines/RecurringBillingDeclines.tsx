import { format } from 'date-fns'
import { get } from 'lodash'
import { useEffect, useState } from 'react'
import { Transaction } from '@fortis/api'
import { codeToReason, reasonCodes } from '@fortis/api/src/utils/reason-codes'

import { api } from '../../../api'

import Button from '../../../components/Button/Button'
import {
  ColumnFilterType,
  TableColumn,
  TableRow,
} from '../../../components/Table/Table'
import { EnumeratedFilterOptions } from '../../../components/Table/EnumeratedFilter'
import TransactionDetails from '../../../components/TransactionDetails/TransactionDetails'
import PaginatedTable from '../../../components/PaginatedTable/PaginatedTable'

import { currency } from '../../../utils/format'

const reasonFilterOptions = Object.keys(
  reasonCodes
).reduce<EnumeratedFilterOptions>((all, value) => {
  const label = reasonCodes[value]
  return [...all, { label, value }]
}, [])

export const RecurringBillingDeclinesReportPrivs = [
  'v2.reports.get',
  'v2.transactions.get',
  'v2.recurrings.get',
]

const RecurringBillingDeclinesReport = () => {
  const [selectedTransactionID, setSelectedTransactionID] = useState()
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>()
  const [showTransactionDetail, setShowTransactionDetail] =
    useState<boolean>(false)

  useEffect(() => {
    if (!selectedTransactionID) return
    api
      .service('transactions')
      .get(selectedTransactionID)
      .then(setSelectedTransaction)
  }, [selectedTransactionID])

  useEffect(() => {
    if (selectedTransaction) setShowTransactionDetail(true)
  }, [selectedTransaction])

  useEffect(() => {
    if (!showTransactionDetail) {
      setSelectedTransactionID(undefined)
      setSelectedTransaction(undefined)
    }
  }, [showTransactionDetail])

  const transactionsColumns = [
    {
      id: 'reported_ts',
      header: 'Reported Date',
      render: (decline: TableRow, columnID: string) => {
        const timestamp = decline[columnID]
        return format(new Date(timestamp * 1000), 'MM/dd/y')
      },
      active: true,
      filter: {
        type: ColumnFilterType.DateRange,
      },
    },
    {
      id: 'last_four',
      header: 'Card/Account Number',
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'created_ts',
      header: 'Transaction Date',
      render: (decline: TableRow, columnID: string) => {
        const timestamp = decline[columnID]
        return format(new Date(timestamp * 1000), 'MM/dd/y')
      },
      active: true,
      filter: {
        type: ColumnFilterType.DateRange,
      },
    },
    {
      id: 'transaction_amount',
      header: 'Transaction Amount',
      render: (deposit: TableRow, columnID: string) => (
        <Button
          onClick={() => setSelectedTransactionID(deposit.id)}
          className="bg-transparent text-primary-700 px-0"
          isLink
        >
          {currency(Number(deposit[columnID]))}
        </Button>
      ),
      active: true,
    },
    {
      id: 'recurring.description',
      header: 'Recurring Title',
      active: true,
      render: (decline: TableRow, columnID: string) => {
        return get(decline, columnID)
      },
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'reason_code_id',
      header: 'Reason Description',
      render: (transaction: TableRow, columnID: string) => {
        return codeToReason(transaction[columnID])
      },
      active: true,
      filter: {
        type: ColumnFilterType.Enumerated,
        options: reasonFilterOptions,
      },
    },
  ] as TableColumn[]

  return (
    <>
      {selectedTransaction && showTransactionDetail && (
        <TransactionDetails
          transaction={selectedTransaction}
          handleClose={() => setShowTransactionDetail(false)}
        />
      )}
      <PaginatedTable
        translationNamespace="Reports"
        navigationText="reports"
        headerText="recurring billing declines"
        columns={transactionsColumns}
        serviceName="recurring-billing-declines-reports"
        columnOrderStorageID="fortis:display-order:recurring-billing-declines-report"
      />
    </>
  )
}

export default RecurringBillingDeclinesReport
