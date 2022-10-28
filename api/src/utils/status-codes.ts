export const transactionStatusCodes: { [key: string]: string } = {
  '101': 'Approved',
  '102': 'AuthOnly',
  '111': 'Refunded',
  '130': 'Communicating',
  '131': 'Pending-origination',
  '132': 'Originating',
  '133': 'Originated',
  '134': 'Settled',
  '191': 'Batch Settled',
  '201': 'Voided',
  '301': 'Declined',
  '331': 'Charged Back',
}

export const processingStatusCodes: { [key: string]: string } = {
  '1': 'To Settle',
  '2': 'Settled',
  '3': 'Error',
  '4': 'Re-process',
  '5': 'Processing',
}

export const codeToTransactionStatus = (
  code: string | number | null | undefined
): string => {
  if (code !== undefined && code !== null) {
    return transactionStatusCodes[code.toString()]
  }

  return ''
}

export const codeToProcessingStatus = (code: string): string => {
  return processingStatusCodes[code]
}

export const codeToActiveStatus = (code: string): boolean => {
  return !!parseInt(code)
}
