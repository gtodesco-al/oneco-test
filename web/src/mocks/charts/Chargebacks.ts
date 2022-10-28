import { Chargeback } from '@fortis/api'

export const chargebacks: Chargeback[] = [
  {
    id: 'open',
    scale: 'total',
    metrics: ['transactions', 'amount'],
    values: [29, 64.38],
  },
  {
    id: 'received_last7days',
    scale: 'total',
    metrics: ['transactions', 'amount'],
    values: [42, 1234.8],
  },
]
