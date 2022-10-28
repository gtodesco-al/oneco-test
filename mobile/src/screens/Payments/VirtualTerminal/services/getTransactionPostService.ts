import {api} from '../../../../api';

/**
 * Provides the appropriate service for a given transaction type.
 */
export const getTransactionPostService = (transactionType: string) => {
  switch (transactionType) {
    case 'authonly':
      return api.service('transaction-cc-authonly');
    case 'avsonly':
      return api.service('transaction-cc-avsonly');
    case 'force':
      return api.service('transaction-cc-force');
    case 'refund':
      return api.service('transaction-cc-refund');
    case 'sale':
      return api.service('transaction-cc-sale');

    case 'credit':
      return api.service('transaction-ach-credit');
    case 'debit':
      return api.service('transaction-ach-debit');

    default:
      throw new Error(`No service for transaction type: ${transactionType}`);
  }
};

/**
 * Provides the appropriate service for a given transaction type.
 */
export const getTransactionPostTerminalService = (transactionType: string) => {
  switch (transactionType) {
    case 'authonly':
      return api.service('transaction-cc-authonly-terminal');
    case 'avsonly':
      return api.service('transaction-cc-avsonly-terminal');
    case 'force':
      return api.service('transaction-cc-force-terminal');
    case 'refund':
      return api.service('transaction-cc-refund-terminal');
    case 'sale':
      return api.service('transaction-cc-sale-terminal');

    default:
      throw new Error(`No service for transaction type: ${transactionType}`);
  }
};

/**
 * Provides the appropriate service for a given transaction type.
 */
export const getTransactionPostWalletService = (transactionType: string) => {
  switch (transactionType) {
    case 'authonly':
      return api.service('transaction-cc-authonly-token');
    case 'avsonly':
      return api.service('transaction-cc-avsonly-token');
    case 'force':
      return api.service('transaction-cc-force-token');
    case 'refund':
      return api.service('transaction-cc-refund-token');
    case 'sale':
      return api.service('transaction-cc-sale-token');

    default:
      throw new Error(`No service for transaction type: ${transactionType}`);
  }
};
