import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {api} from '../../src/api';

import type {
  Contact,
  Location,
  Token,
  ACHReject,
  Chargeback,
  GatewayTransaction,
  SettledTransaction,
  RecurringTransactionsHistory,
  RecurringBillingDecline,
} from '@fortis/api';

import RootStackParamList from '../../src/screens/RootStackParamList';
import {CustomerFilterContextState} from '../../src/models/State';

let globalAPITimeout: NodeJS.Timeout;

const middleware = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  clearTimeout(globalAPITimeout);

  globalAPITimeout = setTimeout(() => {
    // Shows message
    // TO-DO

    // Goes to the login screen
    navigation.navigate('SignIn');
  }, 600000); // Ten minutes
};

export const getCustomers = async (
  navigation: NativeStackNavigationProp<RootStackParamList>,
  location_id: string,
  paginate?: boolean,
  page_number?: number,
  pageSize?: number,
  filters?: CustomerFilterContextState,
) => {
  middleware(navigation);

  try {
    const processedFilters = filters ? {...filters} : {active: '0,1'};

    if (processedFilters.active === '') {
      processedFilters.active = '0,1';
    }

    const payload: any = {
      paginate,
      query: {
        filter: {
          location_id,
          ...processedFilters,
        },
      },
    };

    if (paginate) {
      payload.query = {
        page: {
          number: page_number,
          size: pageSize,
        },
        ...payload.query,
      };
    }

    const customers = await api.service('contacts').find(payload);

    return customers;
  } catch (error) {
    throw error;
  }
};

export const getCustomer = async (
  customer_id: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const customers = (await api.service('contacts').find({
      query: {
        filter: {
          active: '0,1',
          id: customer_id,
        },
      },
    })) as Contact[];

    return customers;
  } catch (error) {
    throw error;
  }
};

export const updateCustomer = async (
  customerId: string,
  customer: Contact,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    await api.service('contacts').update(customerId, customer);

    return;
  } catch (error) {
    throw error;
  }
};

export const createACH = async (
  newACH: any,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    await api.service('ach-tokens').create(newACH);

    return;
  } catch (error) {
    throw error;
  }
};

export const updateACH = async (
  tokenId: string,
  newACH: Token,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    await api.service('tokens').update_ach(tokenId, newACH);

    return;
  } catch (error) {
    throw error;
  }
};

export const createCreditCard = async (
  newCreditCard: any,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    await api.service('credit-card-tokens').create(newCreditCard);

    return;
  } catch (error) {
    throw error;
  }
};

export const updateCC = async (
  tokenId: string,
  newCC: Token,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    await api.service('tokens').update_cc(tokenId, newCC);

    return;
  } catch (error) {
    throw error;
  }
};

export const createContact = async (
  newContact: any,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    await api.service('contacts').create(newContact);

    return;
  } catch (error) {
    throw error;
  }
};

export const getToken = async (
  tokenId: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const tokens = (await api.service('tokens').find({
      query: {
        filter: {
          active: '0,1',
          id: tokenId,
        },
      },
    })) as Token[];

    return tokens;
  } catch (error) {
    throw error;
  }
};

export const getTokens = async (
  customerId: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const tokens = (await api.service('tokens').find({
      query: {
        filter: {
          contact_id: customerId,
          active: '0,1',
        },
      },
    })) as Token[];

    return tokens;
  } catch (error) {
    throw error;
  }
};

export const getACHRejects = async (
  locationId: string | undefined,
  $in: any[] | undefined,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const achRejects = (await api.service('ach-rejects').find({
      query: {
        filter: {
          location_id: locationId,
          product_transaction_id: {$in},
        },
      },
    })) as ACHReject[];

    return achRejects;
  } catch (error) {
    throw error;
  }
};

export const getChargebacks = async (
  locationId: string | undefined,
  $in: any[] | undefined,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const chargebacks = (await api.service('chargebacks').find({
      query: {
        filter: {
          location_id: locationId,
          product_transaction_id: {$in},
        },
      },
    })) as Chargeback[];

    return chargebacks;
  } catch (error) {
    throw error;
  }
};

export const getRecurringTransactionsForecast = async (
  locationId: string | undefined,
  $in: any[] | undefined,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const recurringTransactionsForecast = (await api
      .service('recurring-transactions-forecast')
      .find({
        query: {
          filter: {
            location_id: locationId,
            product_transaction_id: {$in},
          },
        },
      })) as RecurringTransactionsForecast[];

    return recurringTransactionsForecast;
  } catch (error) {
    throw error;
  }
};

export const getGatewayTransactions = async (
  locationId: string | undefined,
  $in: any[] | undefined,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const gatewayTransactions = (await api
      .service('gateway-transactions')
      .find({
        query: {
          filter: {
            location_id: locationId,
            product_transaction_id: {$in},
          },
        },
      })) as GatewayTransaction[];

    return gatewayTransactions;
  } catch (error) {
    throw error;
  }
};

export const getSettledTransactions = async (
  locationId: string | undefined,
  $in: any[] | undefined,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const settledTransactions = (await api
      .service('settled-transactions')
      .find({
        query: {
          filter: {
            location_id: locationId,
            product_transaction_id: {$in},
          },
        },
      })) as SettledTransaction[];

    return settledTransactions;
  } catch (error) {
    throw error;
  }
};

export const getRecurringTransactionsHistory = async (
  locationId: string | undefined,
  $in: any[] | undefined,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const recurringTransactionsHistory = (await api
      .service('recurring-transactions-history')
      .find({
        query: {
          filter: {
            location_id: locationId,
            product_transaction_id: {$in},
          },
        },
      })) as RecurringTransactionsHistory[];

    return recurringTransactionsHistory;
  } catch (error) {
    throw error;
  }
};

export const getRecurringBillingDeclines = async (
  locationId: string | undefined,
  $in: any[] | undefined,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const recurringBillingDeclines = (await api
      .service('recurring-billing-declines')
      .find({
        query: {
          filter: {
            location_id: locationId,
            product_transaction_id: {$in},
          },
        },
      })) as RecurringBillingDecline[];

    return recurringBillingDeclines;
  } catch (error) {
    throw error;
  }
};

export const createResetCode = async (
  email: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    await api.service('public/users').create_code(email);
    return;
  } catch (error) {
    throw error;
  }
};

export const checkResetCode = async (
  email: string,
  code: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const result = await api.service('public/users').check_code(email, code);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updatePasswordResetCode = async (
  email: string,
  code: string,
  new_password: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    await api
      .service('public/users')
      .update_password(email, code, new_password);
    return;
  } catch (error) {
    throw error;
  }
};

export const closeBatch = async (
  batchID: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const result = await api.service('batches-reports').close(batchID);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getLocations = async (
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const locations = (await api.service('locations').find()) as Location[];
    return locations;
  } catch (error) {
    throw error;
  }
};

export const getDepositsReports = async (
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    const deposits = (await api
      .service('reporting/reports')
      .getDeposits()) as any;
    return deposits;
  } catch (error) {
    throw error;
  }
};

export const updateVoidTransaction = async (
  transactionID: string,
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  middleware(navigation);

  try {
    await api.service('transactions').void(transactionID);
    return;
  } catch (error) {
    throw error;
  }
};
