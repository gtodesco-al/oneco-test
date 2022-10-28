import { ApiService } from '@fortis/api/src/declarations'
import { AsyncStatus } from '@fortis/api/src/services/asyncStatus.service'
import {
  ACHTransactionData,
  api,
  CreditCardTransactionData,
} from '../../../../api'
import { TransactionType } from '../../virtualTerminalTypes'

const getCreditCardTransactionPostService = (
  transactionType: TransactionType
) => {
  switch (transactionType) {
    case 'authonly':
      return api.service('transaction-cc-authonly') as ApiService<any>
    case 'avsonly':
      return api.service('transaction-cc-avsonly') as ApiService<any>
    case 'force':
      return api.service('transaction-cc-force') as ApiService<any>
    case 'refund':
      return api.service('transaction-cc-refund') as ApiService<any>
    case 'sale':
      return api.service('transaction-cc-sale') as ApiService<any>

    default:
      throw new Error(
        `No credit card  service for transaction type: ${transactionType}`
      )
  }
}

const getACHTransactionPostService = (
  transactionType: TransactionType
): ApiService<any> => {
  switch (transactionType) {
    case 'credit':
      return api.service('transaction-ach-credit')
    case 'debit':
      return api.service('transaction-ach-debit')

    default:
      throw new Error(`No ACH service for transaction type: ${transactionType}`)
  }
}

/**
 * Handles non-terminal transactions and returns the resulting ID
 */
export const submitTransaction = async (
  transactionType: TransactionType,
  transaction: CreditCardTransactionData | ACHTransactionData
) => {
  if (transactionType === 'credit' || transactionType === 'debit') {
    const service = getACHTransactionPostService(transactionType)
    const submission = await service.create(transaction as ACHTransactionData)
    return submission.id
  } else {
    const service = getCreditCardTransactionPostService(transactionType)
    const submission = await service.create(
      transaction as CreditCardTransactionData
    )

    return submission.id
  }
}

const getTransactionTerminalService = (transactionType: TransactionType) => {
  switch (transactionType) {
    case 'authonly':
      return api.service('transaction-cc-authonly-terminal')
    case 'avsonly':
      return api.service('transaction-cc-avsonly-terminal')
    case 'force':
      return api.service('transaction-cc-force-terminal')
    case 'refund':
      return api.service('transaction-cc-refund-terminal')
    case 'sale':
      return api.service('transaction-cc-sale-terminal')

    default:
      throw new Error(
        `No service for terminal transaction type: ${transactionType}`
      )
  }
}

/**
 * Handles terminal transactions.  Promise resolves when async status progress 100%, rejects on exceptions or if error ever returns as non-null
 */
export const submitTerminalTransaction = async (
  transactionType: TransactionType,
  transaction: CreditCardTransactionData
) => {
  const service = getTransactionTerminalService(transactionType)

  const statusDetails = await service.create(transaction)

  let status: AsyncStatus | undefined

  do {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    status = await api.service('async-status').get(statusDetails.async.code)

    if (status.error) {
      throw new Error(status.error)
    }
  } while (status.progress < 100)

  return status.id
}

const getTransactionTokenService = (transactionType: TransactionType) => {
  switch (transactionType) {
    case 'authonly':
      return api.service('transaction-cc-authonly-token')
    case 'avsonly':
      return api.service('transaction-cc-avsonly-token')
    case 'force':
      return api.service('transaction-cc-force-token')
    case 'refund':
      return api.service('transaction-cc-refund-token')
    case 'sale':
      return api.service('transaction-cc-sale-token')
    case 'debit':
      return api.service('transaction-ach-debit-token')
    case 'credit':
      return api.service('transaction-ach-credit-token')

    default:
      throw new Error(
        `No service for token transaction type: ${transactionType}`
      )
  }
}

export const submitTokenTransaction = async (
  transactionType: TransactionType,
  transaction: CreditCardTransactionData
) => {
  const service = getTransactionTokenService(transactionType)

  const transactionResult = await service.create(transaction)

  return transactionResult.id
}

export const voidTransaction = async (
  transactionId: string,
  description: string | null
) => {
  const service = api.service('transactions')

  await service.void(transactionId, description)
}
