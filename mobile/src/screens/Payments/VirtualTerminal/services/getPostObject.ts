import {CountryType} from '../../../../../services/lists/countries';
import {StateType} from '../../../../../services/lists/states';

type Account = {
  industry_type: string;
  payment_method: string;
};

type Values = {
  locationId?: string | undefined;
  depositAccount?: string | undefined;
  amount: string;
  tip?: string | undefined;
  tax?: string | undefined;
  description?: string | undefined;
  roomRate?: string | undefined;
  roomNumber?: string | undefined;
  checkIn?: string | number | Date;
  checkOut?: string | number | Date;
  extraFlag?: string | undefined;
  clerkNumber?: string | undefined;
  orderNumber?: string | undefined;
  custom1?: string | undefined;
  custom2?: string | undefined;
  custom3?: string | undefined;
  custom4?: string | undefined;
  customer?: string | undefined;
  paymentMethod?: string | number | undefined;
  token_id?: string | undefined;
  sec?: string | undefined;
  accountOption?: string | undefined;
  accountType?: string | undefined;
  cardHoldName?: string | undefined;
  creditCardNumber?: string | undefined;
  creditCardDate?: string | undefined;
  creditCardCVC?: string | undefined;
  routingNumber?: string | undefined;
  street?: string | undefined;
  city?: string | undefined;
  country?: CountryType | undefined;
  state?: StateType | undefined;
  zipCode?: string | undefined;
  billingPhone?: string | undefined;
  totalAmount?: number | undefined;
  terminal?: string | undefined;
};

/**
 * Returns the correct object to be sent to API. In some cases, replaces the default value by undefined
 */
export const getPostObject = (account: Account, values: Values) => {
  const obj = {
    billing_address: {
      city: values.city || undefined,
      state: values.state?.name || undefined,
      postal_code: values.zipCode || undefined,
      street: values.street || undefined,
      phone: values.billingPhone || undefined,
    },
    checkin_date: values.checkIn
      ? new Date(values.checkIn).toISOString().split('T')[0]
      : undefined,
    checkout_date: values.checkOut
      ? new Date(values.checkOut).toISOString().split('T')[0]
      : undefined,
    clerk_number: values.clerkNumber || undefined,
    cvv: values.creditCardCVC || undefined,
    description: values.description,
    location_id: values.locationId,
    order_number: values.orderNumber || undefined,
    product_transaction_id: values.depositAccount,
    room_num: values.roomNumber || undefined,
    room_rate: values.roomRate || undefined,
    subtotal_amount: parseInt(values.amount, 10),
    surcharge_amount: undefined,
    tax: values.tax ? parseInt(values.tax, 10) : undefined,
    tip: values.tip ? parseInt(values.tip, 10) : undefined,
    transaction_amount: values.totalAmount,
    ach_sec_code: values.sec,
    account_holder_name: values.cardHoldName || undefined,
    account_number: values.creditCardNumber || undefined,
    account_type: values.accountOption,
    routing_number: values.routingNumber || undefined,
    exp_date: values.creditCardDate || undefined,
    terminal_id: values.terminal || undefined,
    token_id: values.token_id || undefined,
  };

  // General rules
  if (values.paymentMethod !== 'manual' || account.payment_method !== 'ach') {
    obj.ach_sec_code = undefined;
    obj.account_type = undefined;
  }
  if (account.industry_type !== 'lodging') {
    obj.checkin_date = undefined;
    obj.checkout_date = undefined;
  }

  return obj;
};
