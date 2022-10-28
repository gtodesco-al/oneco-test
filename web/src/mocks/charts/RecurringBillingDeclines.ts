import { RecurringBillingDecline } from '@fortis/api'

export const recurringBillingDeclines: RecurringBillingDecline[] = [
  {
    id: 'today',
    scale: 'total',
    metrics: ['transactions', 'amount'],
    values: [7, 22.05],
  },
  {
    id: 'yesterday',
    scale: 'total',
    metrics: ['transactions', 'amount'],
    values: [25, 90],
  },
  {
    id: 'last30days',
    scale: 'total',
    metrics: ['transactions', 'amount'],
    values: [617, 1870.5899999999997],
  },
]
