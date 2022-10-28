export const codeToTransactionType = (code: string): string => {
  return transactionTypes[code]
}

export const transactionTypes: { [key: string]: string } = {
  '20': 'Sale',
  '21': 'AVS Only',
  '22': 'Settle',
  '30': 'Refund',
  '40': 'Credit',
  '50': 'Debit',
}

export const transactionAccountTypes: { [key: string]: string } = {
  'amex': 'AMEX',
  'checking': 'Checking',
  'debit': 'Debit',
  'diners': 'Diners',
  'disc': 'Discover',
  'jcb': 'JCB',
  'mc': 'MasterCard',
  'savings': 'Savings',
  'visa': 'Visa'
}
