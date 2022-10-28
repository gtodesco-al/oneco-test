import {Contact} from '@fortis/api';
import {Timestamp} from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes';

type RootStackParamList = {
  SignIn: undefined;
  EnableBiometrics: {
    email: string;
    password: string;
  };
  ResetPassword: undefined;
  PasswordInstructions: {email: string};
  CreateNewPassword: {email: string; resetCode: string};
  Dashboard: undefined;
  Payments: undefined;
  VirtualTerminal: undefined;
  Reports: undefined;
  MenuScreen: undefined;
  PaymentConfirmation: {
    paymentDetails: {
      auth_code: string;
      id: string;
      type: string;
    } | null;
    terminal_id?: string;
  };
  ConfirmationLoading: {
    postObj: {terminal_id: string; token_id?: string};
    typeOfTransaction: string;
  };
  PaymentError: {
    data: {
      statusCode: number | undefined;
      error: string | undefined;
      message: string | undefined;
      details: Object | undefined;
      verbiage: string | undefined;
    };
  };
  PasswordSuccessfully: undefined;
  Customers: {forceReload?: number} | undefined;
  AddNewCustomer: undefined;
  ViewCustomer: {
    customerId: string;
  };
  ChargeCustomer: {
    customerId: string;
    tokenId: string | undefined;
  };
  EditCustomer: {
    customerId: string;
  };
  AddNewCreditCard: {
    customerId: string;
  };
  FilterCustomer: undefined;
  ViewCreditCard: {
    tokenId: string;
    customer: Contact;
  };
  ViewACH: {
    tokenId: string;
    customer: Contact;
  };
  AddNewACH: {
    customerId: string;
  };
  EditACH: {
    tokenId: string;
  };
  EditCreditCard: {
    tokenId: string;
  };
  ReportGatewayTransactions: {
    created_ts?: {
      $gte: Timestamp;
      $lte: Timestamp;
    };
    status_code?: number;
  };
  ReportBatches: {
    dates?: {
      dateFrom: Timestamp;
      dateTo: Timestamp;
    };
  };
  BatchDetails: {
    transactionBatchId?: string;
  };
  Deposit: undefined;
  FilterDeposit: undefined;
  Chargebacks: {
    receive_dt_ts?: {
      $gte: Timestamp;
      $lte: Timestamp;
    };
  };
  FilterChargebacks: undefined;
  RecurringBillingsDeclines: {
    created_ts?: {
      $gte: Timestamp;
      $lte: Timestamp;
    };
  };
  FilterRecurringBillingsDeclines: undefined;
  ACHRejects: {
    created_ts?: {
      $gte: Timestamp;
      $lte: Timestamp;
    };
  };
  FilterACHRejects: undefined;
};

export default RootStackParamList;
