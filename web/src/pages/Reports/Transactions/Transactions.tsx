import { format } from 'date-fns'
import { get } from 'lodash'
import { useEffect, useState } from 'react'

import { Transaction } from '@fortis/api'
import {
  codeToTransactionStatus,
  transactionStatusCodes,
} from '@fortis/api/src/utils/status-codes'
import { codeToReason } from '@fortis/api/src/utils/reason-codes'
import { transactionAccountTypes } from '@fortis/api/src/utils/transaction-type'

import { api } from '../../../api'

import AccountType from '../../../components/AccountType/AccountType'
import Button from '../../../components/Button/Button'
import {
  ColumnFilterType,
  TableColumn,
  TableRow,
} from '../../../components/Table/Table'
import { EnumeratedFilterOptions } from '../../../components/Table/EnumeratedFilter'
import TransactionDetails from '../../../components/TransactionDetails/TransactionDetails'
import TransactionStatus from '../../../components/TransactionDetails/TransactionStatus/TransactionStatus'
import PaginatedTable from '../../../components/PaginatedTable/PaginatedTable'
import { useLocations } from '../../../hooks/useLocations'
import { currency } from '../../../utils/format'

const statusFilterOptions = Object.keys(
  transactionStatusCodes
).reduce<EnumeratedFilterOptions>((all, value) => {
  const label = transactionStatusCodes[value]
  return [...all, { label, value }]
}, [])

const reasonFilterOptions = Object.keys(
  transactionStatusCodes
).reduce<EnumeratedFilterOptions>((all, value) => {
  const label = transactionStatusCodes[value]
  return [...all, { label, value }]
}, [])

const accountTypeFilterOptions = Object.keys(
  transactionAccountTypes
).reduce<EnumeratedFilterOptions>((all, value) => {
  const label = transactionAccountTypes[value]
  return [...all, { label, value }]
}, [])

export const TransactionsReportPrivs = ['v2.reports.get', 'v2.transactions.get']

const TransactionsReport = () => {
  const { selectedLocation } = useLocations()
  const [selectedTransactionID, setSelectedTransactionID] = useState()
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>()
  const [showTransactionDetail, setShowTransactionDetail] =
    useState<boolean>(false)
  const [merchantAccountFilterOptions, setMerchantAccountFilterOptions] =
    useState([])
  const [transactionColumns, setTransactionColumns] = useState<TableColumn[]>(
    []
  )

  useEffect(() => {
    const accounts = (
      selectedLocation.product_transactions as Array<any>
    ).reduce((all, v) => {
      return [...all, { label: v.title, value: v.title }]
    }, [])
    setMerchantAccountFilterOptions(accounts)
  }, [selectedLocation])

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

  useEffect(() => {
    const transactionsColumns = [
      {
        id: 'transaction_amount',
        header: 'Transaction Amount',
        render: (transaction: TableRow, columnID: string) => (
          <Button
            onClick={() => setSelectedTransactionID(transaction.id)}
            className="bg-transparent text-primary-700 px-0"
            isLink
          >
            {currency(Number(transaction[columnID]))}
          </Button>
        ),
        active: true,
        locked: true,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'created_ts',
        header: 'Transaction Date',
        render: (transaction: TableRow, columnID: string) => {
          const timestamp = transaction[columnID]
          return format(new Date(timestamp * 1000), 'MM/dd/y')
        },
        active: true,
        filter: {
          type: ColumnFilterType.DateRange,
        },
      },
      {
        id: 'batch',
        header: 'Batch',
        active: true,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'account_holder_name',
        header: 'Account Holder Name',
        active: true,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'type_id',
        header: 'Transaction Type',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'status_code',
        header: 'Status',
        render: (transaction: TableRow, columnID: string) => {
          const status = codeToTransactionStatus(transaction[columnID])
          return <TransactionStatus text={status} />
        },
        active: true,
        filter: {
          type: ColumnFilterType.Enumerated,
          options: statusFilterOptions,
        },
      },
      {
        id: 'account_type',
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
      {
        id: 'last_four',
        header: 'Last 4',
        active: true,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'product_transaction.title',
        header: 'Merchant Account',
        active: true,
        render: (transaction: TableRow, columnID: string) => {
          return get(transaction, columnID)
        },
        filter: {
          type: ColumnFilterType.Enumerated,
          options: merchantAccountFilterOptions,
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
      {
        id: 'contact.first_name',
        header: 'Customer First Name',
        active: true,
        render: (transaction: TableRow, columnID: string) => {
          return get(transaction, columnID)
        },
      },
      {
        id: 'contact.last_name',
        header: 'Customer Last Name',
        active: true,
        render: (transaction: TableRow, columnID: string) => {
          return get(transaction, columnID)
        },
      },
      {
        id: 'is_recurring',
        header: 'Is Recurring Billing',
        active: true,
        render: (transaction: TableRow, columnID: string) => {
          return transaction[columnID] ? 'Yes' : 'No'
        },
      },
      {
        id: 'is_accountvault',
        header: 'Is Wallet',
        active: true,
        render: (transaction: TableRow, columnID: string) => {
          return transaction[columnID] ? 'Yes' : 'No'
        },
      },
      {
        id: 'payment_method',
        header: 'Payment Method',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'quick_invoice.title',
        header: 'Quick Invoice Title',
        render: (transaction: TableRow, columnID: string) => {
          return get(transaction, columnID)
        },
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'avs',
        header: 'AVS Response',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'billing_address.street',
        header: 'Billing Street',
        active: false,
        render: (transaction: TableRow, columnID: string) => {
          return get(transaction, columnID)
        },
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'billing_address.city',
        header: 'Billing City',
        active: false,
        render: (transaction: TableRow, columnID: string) => {
          return get(transaction, columnID)
        },
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'billing_address.state',
        header: 'Billing State',
        active: false,
        render: (transaction: TableRow, columnID: string) => {
          return get(transaction, columnID)
        },
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'billing_address.postal_code',
        header: 'Billing Zip',
        active: false,
        render: (transaction: TableRow, columnID: string) => {
          return get(transaction, columnID)
        },
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'billing_address.phone',
        header: 'Billing Phone',
        active: false,
        render: (transaction: TableRow, columnID: string) => {
          return get(transaction, columnID)
        },
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'currency_code',
        header: 'Currency',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'transaction_c1',
        header: 'Custom Field 1',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'transaction_c2',
        header: 'Custom Field 2',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'transaction_c3',
        header: 'Custom Field 3',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'description',
        header: 'Description',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'entry_mode_id',
        header: 'Entry Mode',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'first_six',
        header: 'First Six',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'order_num',
        header: 'Order Number',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'trx_source',
        header: 'Payment Source',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'po_number',
        header: 'PO Number',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'tax',
        header: 'Sales Tax',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'surcharge_amount',
        header: 'Surcharge Amount',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'ach_sec_code',
        header: 'SEC Code',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'transaction_api_id',
        header: 'Transaction API ID',
        active: false,
        filter: {
          type: ColumnFilterType.Exact,
        },
      },
      {
        id: 'options',
        header: null,
        active: true,
        options: [
          {
            text: 'View',
            onOptionClick: (row: TableRow) => setSelectedTransactionID(row.id),
            active: true,
          },
          {
            text: 'Send Receipt',
            onOptionClick: (row: TableRow) =>
              console.log(`Send receipt for ${row}`),
            active: true,
          },
        ],
      },
    ] as TableColumn[]
    setTransactionColumns(transactionsColumns)
  }, [merchantAccountFilterOptions])

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
        headerText="gateway transactions"
        columns={transactionColumns}
        serviceName="gateway-transactions-reports"
        columnOrderStorageID="fortis:display-order:transactions-report"
      />
    </>
  )
}

export default TransactionsReport
