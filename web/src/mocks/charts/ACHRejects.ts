import { ACHReject } from '@fortis/api'

export const achRejects: ACHReject[] = [
  {
    id: 'today',
    scale: 'total',
    metrics: ['transactions', 'amount'],
    values: [30, 121.8],
  },
  {
    id: 'last7days',
    scale: 'total',
    metrics: ['transactions', 'amount'],
    values: [90, 365.4],
  },
]
