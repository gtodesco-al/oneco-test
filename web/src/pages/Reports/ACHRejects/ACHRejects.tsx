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

import { currency } from '../../../utils/format'
import PaginatedTable from '../../../components/PaginatedTable/PaginatedTable'

const reasonFilterOptions = Object.keys(
  reasonCodes
).reduce<EnumeratedFilterOptions>((all, value) => {
  const label = reasonCodes[value]
  return [...all, { label, value }]
}, [])

export const ACHRejectsReportsPrivs = ['v2.reports.get', 'v2.transactions.get']

const ACHRejectsReports = () => {
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
      id: 'transaction_history.event_date_ts',
      header: 'Reported Date',
      render: (reject: TableRow, columnID: string) => {
        const ts = get(reject, columnID)
        return format(new Date(ts * 1000), 'MM/dd/y')
      },
      active: true,
      filter: {
        type: ColumnFilterType.DateRange,
      },
    },
    {
      id: 'created_ts',
      header: 'Transaction Date',
      render: (reject: TableRow, columnID: string) => {
        const timestamp = reject[columnID]
        return format(new Date(timestamp * 1000), 'MM/dd/y')
      },
      active: true,
      filter: {
        type: ColumnFilterType.DateRange,
      },
    },
    {
      id: 'transaction_amount',
      header: 'Reject Amount',
      render: (reject: TableRow, columnID: string) => (
        <Button
          onClick={() => setSelectedTransactionID(reject.id)}
          className="bg-transparent text-primary-700 px-0"
          isLink
        >
          {currency(Number(reject[columnID]))}
        </Button>
      ),
      active: true,
    },
    {
      id: 'reason_code_id',
      header: 'Reason Code',
      render: (reject: TableRow, columnID: string) => {
        return codeToReason(reject[columnID])
      },
      active: true,
      filter: {
        type: ColumnFilterType.Enumerated,
        options: reasonFilterOptions,
      },
    },
    {
      id: 'verbiage',
      header: 'Reason Description',
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'last_four',
      header: 'Account Number',
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    // TODO Account Number, Trace Number and Merchant Account are
    // listed in the designs but not in the API documentation
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
        headerText="ach rejects"
        columns={transactionsColumns}
        serviceName="ach-rejects-reports"
        columnOrderStorageID="fortis:display-order:ach-rejects-report"
      />
    </>
  )
}

export default ACHRejectsReports
