import { useState } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import {
  codeToProcessingStatus,
  processingStatusCodes,
} from '@fortis/api/src/utils/status-codes'

import { api } from '../../../api'

import Button from '../../../components/Button/Button'
import {
  ColumnFilterType,
  TableColumn,
  TableRow,
} from '../../../components/Table/Table'
import { EnumeratedFilterOptions } from '../../../components/Table/EnumeratedFilter'
import ProcessingStatus from '../../../components/ProcessingStatus/ProcessingStatus'
import PaginatedTable from '../../../components/PaginatedTable/PaginatedTable'
import { useUserProfile } from '../../../hooks/useUserProfile'
import { currency } from '../../../utils/format'
import { checkPermission } from '../../../utils/permissions'
import { ConfirmationDialog } from '../../../components/ConfirmationDialog/ConfirmationDialog'

const statusFilterOptions = Object.keys(
  processingStatusCodes
).reduce<EnumeratedFilterOptions>((all, value) => {
  const label = processingStatusCodes[value]
  return [...all, { label, value }]
}, [])

export const BatchesReportPrivs = [
  'v2.reports.get',
  'v2.transactionbatches.get',
]

type BatchCloseID = {
  id: string
  num: string
}

const BatchesReport = () => {
  const navigate = useNavigate()
  const { userProfile } = useUserProfile()

  const [closeBatchID, setCloseBatchID] = useState<BatchCloseID | undefined>(
    undefined
  )

  const batchesColumns = [
    {
      id: 'batch_num',
      header: 'Batch Number',
      render: (batch: TableRow, columnID: string) =>
        checkPermission(userProfile, 'v2.transactions.get') ? (
          <Button
            onClick={() =>
              navigate(
                `/reports/transactions?filter[transaction_batch_id]=${batch['id']}`
              )
            }
            className="bg-transparent text-primary-700 px-0"
            isLink
          >
            {batch[columnID]}
          </Button>
        ) : (
          batch[columnID]
        ),
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'batch_close_ts',
      header: 'Close Date',
      render: (batch: TableRow, columnID: string) => {
        const timestamp = batch[columnID]
        return format(new Date(timestamp * 1000), 'MM/dd/y')
      },
      active: true,
      filter: {
        type: ColumnFilterType.DateRange,
      },
    },
    {
      id: 'total_sale_count',
      header: 'Sale Count',
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'total_refund_amount',
      header: 'Return Amount',
      render: (batch: TableRow, columnID: string) =>
        currency(Number(batch[columnID])),
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'total_refund_count',
      header: 'Return Count',
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'net_amount',
      header: 'Net Amount',
      render: (batch: TableRow) => {
        const net =
          parseFloat(batch['total_sale_amount']) -
          parseFloat(batch['total_refund_amount'])
        return currency(net)
      },
      active: true,
      filter: {
        type: ColumnFilterType.Exact,
      },
    },
    {
      id: 'processing_status_id',
      header: 'Status',
      render: (batch: TableRow, columnID: string) => {
        const status = codeToProcessingStatus(batch[columnID])
        return <ProcessingStatus text={status} />
      },
      active: true,
      filter: {
        type: ColumnFilterType.Enumerated,
        options: statusFilterOptions,
      },
    },
    {
      id: 'options',
      header: null,
      active: true,
      options: [
        {
          text: 'View',
          onOptionClick: (row: TableRow) =>
            navigate(
              `/reports/transactions?filter[transaction_batch_id]=${row['id']}`
            ),
          active: checkPermission(userProfile, 'v2.transactions.get'),
        },
        {
          text: 'Close Batch',
          onOptionClick: async (row: TableRow) => {
            setCloseBatchID({ id: row.id, num: row.batch_num })
          },
          active: checkPermission(userProfile, 'v2.transactionbatches.post'),
        },
      ],
    },
  ] as TableColumn[]

  return (
    <>
      <ConfirmationDialog
        isOpen={!!closeBatchID}
        title="Close Batch"
        body={
          <p>
            Are you sure you want to close batch{' '}
            <strong>{closeBatchID?.num}</strong>?
          </p>
        }
        confirmText="Yes, Close Batch"
        cancelText="Cancel"
        onConfirm={async () => {
          if (closeBatchID?.id) {
            await api.service('batches-reports').close(closeBatchID.id)
            window.location.reload()
          }
          setCloseBatchID(undefined)
        }}
        onCancel={() => setCloseBatchID(undefined)}
      />
      <PaginatedTable
        translationNamespace="Reports"
        navigationText="reports"
        headerText="batches"
        columns={batchesColumns}
        serviceName="batches-reports"
        requestRequiresLocation={false}
        columnOrderStorageID="fortis:display-order:batches-report"
      />
    </>
  )
}

export default BatchesReport
