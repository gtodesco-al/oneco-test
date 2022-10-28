import CanViewPage, { PagePrivs } from '../CanViewPage'

import { ACHRejectsReportPrivs } from '../Dashboard/ACHRejects/ACHRejects'
import { BatchesReportPrivs } from './Batches/Batches'
import { ChargebackReportPrivs } from '../Dashboard/Chargebacks/Chargebacks'
import { DepositsReportPrivs } from './Deposits/Deposits'
import { TransactionsReportPrivs } from './Transactions/Transactions'
import { RecurringBillingDeclinesReportPrivs } from './RecurringBillingDeclines/RecurringBillingDeclines'

const AllReportPrivs: PagePrivs = {
  'ach-rejects': ACHRejectsReportPrivs,
  batches: BatchesReportPrivs,
  deposits: DepositsReportPrivs,
  chargebacks: ChargebackReportPrivs,
  'recurring-billing-declines': RecurringBillingDeclinesReportPrivs,
  transactions: TransactionsReportPrivs,
}

function CanViewReports() {
  return <CanViewPage root="reports" pagePrivs={AllReportPrivs} />
}

export default CanViewReports
