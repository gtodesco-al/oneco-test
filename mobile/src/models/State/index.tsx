import {DashboardWidgets} from '../DashboardWidgets';
import {Merchant} from '../Merchant';
// import {User} from '../User';
import {Location} from '../Location';
import {Timestamp} from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes';

export type UserContextState = {
  // user?: User;
  first_name: string;
  last_name: string;
  email: string;
  office_phone: string;
  resources: Object;
  user_type_id: string;
  ui_prefs: {
    default_terminal: string;
    entry_page: string;
    page_size: number;
    process_method: string;
    report_export_type: string;
  };
};

export type DashboardWidgetsContextState = {
  dashboardWidgets?: Array<DashboardWidgets>;
};

export type MerchantsContextState = {
  merchants?: Array<Merchant>;
};

export type LocationContextState = {
  locationSelected?: Location;
  locations?: Array<Location>;
};

export type CustomerFilterContextState = {
  date_of_birth?: string;
  address?: {
    city?: string;
    country?: string;
    state?: string;
    street?: string;
  };
  active?: string;
};

export type GatewayTransactionsFilterContextState = {
  created_ts?: {$gte?: Timestamp; $lte?: Timestamp};
  transaction_amount?: number;
  batch?: number;
  account_holder_name?: string;
  type_id?: string;
  status_code?: string;
  last_four?: string;
  product_transaction?: {title?: string};
  reason_code_id?: number;
  is_recurring?: boolean;
  is_wallet?: boolean; // We need to implement it
};

export type BatchesDetailsFilterContextState = {
  created_ts?: {$gte?: Timestamp; $lte?: Timestamp};
  transaction_amount?: string;
  batch?: number;
  type_id?: number;
  account_type?: string;
  last_four?: string;
  auth_code?: string;
};

export type BatchesFilterContextState = {
  batch_num?: string;
  total_sale_amount?: string;
  total_sale_count?: string;
  total_refund_amount?: string;
  total_refund_count?: string;
  processing_status_id?: number;
  is_open?: number;
  created_ts?: {$gte?: Timestamp; $lte?: Timestamp};
};

export type DepositsFilterContextState = {
  date_effective_ts?: {$gte?: Timestamp; $lte?: Timestamp};
  amount?: number;
  merchant_name?: string;
};

export type ChargebacksFilterContextState = {
  receive_dt_ts?: {$gte?: Timestamp; $lte?: Timestamp};
  pos_trxn_dt_ts?: {$gte?: Timestamp; $lte?: Timestamp};
  amount?: number;
  card_last_4_nbr?: string;
  card_type?: string;
  reason_desc?: string;
};
