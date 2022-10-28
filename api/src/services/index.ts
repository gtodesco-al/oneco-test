import { Application } from '../declarations'
import { gatewayTransactions } from './gateway-transactions.service'
import { gatewayTransactionsReports } from './gateway-transactions-reports.service'
import { batchesReports } from './batches-reports.service'
import { depositsReports } from './deposits-reports.service'
import { locations } from './locations.service'
import { transactions } from './transactions.service'
import { users } from './users.service'
import { settledTransactions } from './settled-transactions.service'
import { recurringBillingDeclinesReports } from './recurring-billing-declines-reports.service'
import { recurringTransactionsHistory } from './recurring-transactions-history.service'
import { chargebacks } from './chargebacks.service'
import { chargebackReports } from './chargebacks-reports.service'
import { recurringTransactionsForecast } from './recurring-transactions-forecast.service'
import { recurringBillingDeclines } from './recurring-billing-declines.service'
import { achRejects } from './ach-rejects.service'
import { achRejectsReports } from './ach-rejects-reports.service'
import { contacts } from './contacts.service'
import { creditCardTokens } from './tokens_cc.service'
import { tokens } from './tokens.service'
import { achTokens } from './tokens_ach.service'
import { passwordResetCode } from './password-reset-code.service';
import { routingNumbers } from './routing-numbers.service';
import { salesTaxes } from './sales-taxes.service';
import { asyncStatus } from './asyncStatus.service';

export const services = (app: Application) => {
  app.configure(gatewayTransactions)
  app.configure(gatewayTransactionsReports)
  app.configure(batchesReports)
  app.configure(depositsReports)
  app.configure(locations)
  app.configure(recurringBillingDeclinesReports)
  app.configure(recurringTransactionsHistory)
  app.configure(settledTransactions)
  app.configure(transactions)
  app.configure(users)
  app.configure(recurringTransactionsForecast)
  app.configure(chargebacks)
  app.configure(chargebackReports)
  app.configure(recurringBillingDeclines)
  app.configure(achRejects)
  app.configure(achRejectsReports)
  app.configure(contacts)
  app.configure(creditCardTokens)
  app.configure(tokens)
  app.configure(achTokens)
  app.configure(achTokens)
  app.configure(passwordResetCode)
  app.configure(routingNumbers)
  app.configure(asyncStatus)
  app.configure(salesTaxes);
  app.configure(depositsReports);
  app.configure(batchesReports)
  app.configure(achRejectsReports);
}
