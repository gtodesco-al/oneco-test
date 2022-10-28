import {DashboardWidgets} from '../models';

export default [
  {key: 'live_transactions', text: 'Live Transactions', enabled: true},
  {key: 'settled_transactions', text: 'Settled Transactions', enabled: true},
  {
    key: 'recurring_transaction_forecast',
    text: 'Recurring Transaction Forecast',
    enabled: true,
  },
  {
    key: 'recurring_transaction_history',
    text: 'Recurring Transaction History',
    enabled: true,
  },
  {
    key: 'recurring_billing_declines',
    text: 'Recurring Billing Declines',
    enabled: true,
  },
  {key: 'chargebacks', text: 'Chargebacks', enabled: true},
  {key: 'ach_rejects', text: 'ACH Rejects', enabled: true},
] as Array<DashboardWidgets>;
