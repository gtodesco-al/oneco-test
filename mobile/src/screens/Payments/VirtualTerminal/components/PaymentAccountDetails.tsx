import React, {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import tw from '../../../../../services/tw';
import {userHasResource} from '../../../../../services/permissions';
import {
  H2,
  HR,
  InputNumber,
  InputPhone,
  InputText,
  ToggleButton,
} from '@amplifiui/mobile';
import CloseInput from '../../../../icons/close-input';
import arrowDownBlack from '../../../../icons/chevron-down';
import Dropdown from '../../../../components/amplifi-ui/Dropdown';
import RadioGroup from '../../../../components/amplifi-ui/RadioGroup';
import UserContext from '../../../../context/UserContext';

import {scanForDevices} from '../../../../../services/sdk';

const creditCardMask = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
const zipCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/];
const dateMask = [/\d/, /\d/, '/', /\d/, /\d/];
const cvvMask = [/\d/, /\d/, /\d/];

const optionManual = {
  key: 'manual',
  label: 'Manual',
};
const optionCustomerSelected = {
  key: 'customer_wallet',
  label: 'Customer Wallet',
};

const optionTerminal = {
  key: 'terminal',
  label: 'Terminal',
};

const accountOptions = [
  {
    key: 'checking',
    label: 'Checking',
  },
  {
    key: 'savings',
    label: 'Saving',
  },
];

const accountTypes = [
  {
    key: 'personal',
    label: 'Personal',
  },
  {
    key: 'business',
    label: 'Business',
  },
];

type Values = {
  payment_method: string | number | undefined;
  card_hold_name: string | undefined;
  credit_card_number: string | undefined;
  credit_card_date: string | undefined;
  credit_card_CVC: string | undefined;
  routing_number: string | undefined;
  terminal: string | undefined;
  street: string | undefined;
  zip_code: string | undefined;
};

type typeDepositAccount = {
  industry_type: string;
  payment_method: string;
  processor_data: {ach_sec_codes: []};
  vt_billing_phone: boolean;
  vt_clerk_number: boolean;
  vt_cvv: boolean;
  vt_order_num: boolean;
  vt_require_street: boolean;
  vt_require_zip: boolean;
  vt_street: boolean;
  vt_zip: boolean;
};

type Props = {
  labelWallet: string;
  depositAccount: typeDepositAccount;
  secSelected: string | undefined;
  terminalSelected: string | undefined;
  countrySelected: string | undefined;
  stateSelected: string | undefined;
  isCustomerSelected: boolean;
  onChangeValues: React.Dispatch<
    React.SetStateAction<{
      radioMethodType: string | number | undefined;
      radioAccountOption: string | number | undefined;
      radioAccountType: string | number | undefined;
      city: string | undefined;
      billingPhone: string | undefined;
    }>
  >;
  onPressCloseButton: React.Dispatch<React.SetStateAction<boolean>>;
  onPressSelectCustomersWallet: React.Dispatch<void>;
  onPressSelectSEC: React.Dispatch<void>;
  onPressSelectTerminal: React.Dispatch<void>;
  onPressSelectCountry: React.Dispatch<void>;
  onPressSelectState: React.Dispatch<void>;
  values: Values;
  handleChange: any;
  errors: Values;
  setFieldTouched: any;
};

const PaymentAccountDetails = ({
  labelWallet,
  depositAccount,
  secSelected,
  terminalSelected,
  countrySelected,
  stateSelected,
  isCustomerSelected,
  onChangeValues,
  onPressCloseButton,
  onPressSelectCustomersWallet,
  onPressSelectSEC,
  onPressSelectTerminal,
  onPressSelectCountry,
  onPressSelectState,
  values,
  handleChange,
  errors,
  setFieldTouched,
}: Props): JSX.Element => {
  const [paymentMethodTypes, setPaymentMethodTypes] = useState<
    {label: string; key: string | number}[]
  >([]);
  const [toggleBillingStatus, setToggleBillingStatus] = useState(
    depositAccount?.vt_require_street || depositAccount?.vt_require_zip
      ? true
      : false,
  );

  const [radioMethodType, setRadioMethodType] = useState<string | number>('');
  const [radioAccountOption, setRadioAccountOption] = useState<string | number>(
    '',
  );
  const [radioAccountType, setRadioAccountType] = useState<string | number>('');
  const [cardHoldName, setCardHoldName] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [creditCardDate, setCreditCardDate] = useState('');
  const [creditCardCVV, setCreditCardCVV] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [billingPhone, setBillingPhone] = useState('');
  const {userContextState} = useContext(UserContext);

  useEffect(() => {
    setRadioMethodType(getPreferredTerminal());
    setRadioAccountOption('checking');
    setRadioAccountType('personal');
  }, []);

  useEffect(() => {
    setRadioMethodType(getPreferredTerminal());
    setRadioAccountOption('checking');
    setRadioAccountType('personal');
  }, [depositAccount]);

  useEffect(() => {
    const terminalIndex = paymentMethodTypes.findIndex(
      value => value.key === 'terminal',
    );

    let newPaymentMethodTypes = [...paymentMethodTypes];

    newPaymentMethodTypes[
      terminalIndex
    ].label = `Terminal • ${terminalSelected}`;

    setPaymentMethodTypes(newPaymentMethodTypes);
  }, [terminalSelected]);

  useEffect(() => {
    onChangeValues({
      radioMethodType,
      radioAccountOption,
      radioAccountType,
      city,
      billingPhone,
    });
  }, [
    radioMethodType,
    radioAccountOption,
    radioAccountType,
    city,
    billingPhone,
  ]);

  useEffect(() => {
    values.payment_method = radioMethodType;
  }, [radioMethodType]);

  const getPreferredTerminal = () => {
    if (userContextState?.ui_prefs.process_method === 'virtual_terminal') {
      return 'manual';
    } else if (
      userContextState?.ui_prefs.process_method === 'physical_terminal'
    ) {
      return 'terminal';
    }

    return 'manual';
  };

  useEffect(() => {
    let optionsPayment = [optionManual, optionTerminal];
    if (
      isCustomerSelected &&
      depositAccount?.payment_method === 'cc' &&
      (userHasResource(userContextState, 'terminaltransactions', 'post') ||
        userHasResource(userContextState, 'routertransactions', 'post')) &&
      (depositAccount?.industry_type !== 'moto' ||
        depositAccount?.industry_type !== 'ecommerce')
    ) {
      optionsPayment = [optionManual, optionCustomerSelected, optionTerminal];
    } else if (
      !isCustomerSelected &&
      depositAccount?.payment_method === 'cc' &&
      (depositAccount?.industry_type === 'moto' ||
        depositAccount?.industry_type === 'ecommerce')
    ) {
      optionsPayment = [optionManual];
    } else if (
      !isCustomerSelected &&
      depositAccount?.payment_method === 'cc' &&
      (userHasResource(userContextState, 'terminaltransactions', 'post') ||
        userHasResource(userContextState, 'routertransactions', 'post')) &&
      (depositAccount?.industry_type !== 'moto' ||
        depositAccount?.industry_type !== 'ecommerce')
    ) {
      optionsPayment = [optionManual, optionTerminal];
    } else if (
      isCustomerSelected &&
      depositAccount?.payment_method === 'cc' &&
      (depositAccount?.industry_type === 'moto' ||
        depositAccount?.industry_type === 'ecommerce')
    ) {
      optionsPayment = [optionManual, optionCustomerSelected];
    }

    if (!userHasResource(userContextState, 'accountvaults', 'get')) {
      optionsPayment = optionsPayment.filter(
        item => item.key !== 'customer_wallet',
      );
    }

    return setPaymentMethodTypes(optionsPayment);
  }, [isCustomerSelected, depositAccount]);

  return (
    <>
      <H2 tw={tw} style={tw`pb-5 font-inter text-gray-700`}>
        Payment Account Details
      </H2>
      {paymentMethodTypes.length > 1 ? (
        <RadioGroup
          tw={tw}
          label="Payment Method Type"
          labelStyle={tw`font-inter font-medium text-gray-700`}
          data={paymentMethodTypes}
          showRadio={false}
          onChangeOption={(value: {key: string | number; label: string}) => {
            if (value.key === 'terminal') {
              scanForDevices();

              setRadioMethodType(value.key);
            }
          }}
          value={radioMethodType}
        />
      ) : null}
      <>
        {radioMethodType === 'customer_wallet' && (
          <View style={tw`py-4`}>
            <Text style={tw`font-inter font-medium text-gray-700 pb-1`}>
              Select Customers Wallet
            </Text>
            <TouchableOpacity
              style={tw`bg-white border p-3 h-12 rounded-md border-gray-300 flex-row`}
              onPress={() => onPressSelectCustomersWallet()}>
              {labelWallet !== '' && (
                <View
                  style={tw`flex-row flex-1 bg-blue-50 justify-between rounded h-6 mr-4`}>
                  <Text
                    style={tw`text-sm text-light-blue-800 font-medium pl-2`}>
                    {labelWallet}
                  </Text>
                  <TouchableOpacity
                    style={tw`justify-center pr-2`}
                    onPress={() => onPressCloseButton(true)}>
                    <SvgXml xml={CloseInput} />
                  </TouchableOpacity>
                </View>
              )}
              <View style={tw`justify-center`}>
                <SvgXml xml={arrowDownBlack} />
              </View>
            </TouchableOpacity>
          </View>
        )}
        {radioMethodType === 'manual' && (
          <View>
            {depositAccount?.payment_method === 'ach' ? (
              <>
                <Dropdown
                  tw={tw}
                  label="SEC Code"
                  labelStyle={tw`font-inter font-medium text-gray-700`}
                  style={tw`mt-4`}
                  dropDownStyle={tw`h-11`}
                  placeholder="Select SEC Code"
                  placeholderStyle={tw`font-inter text-sm`}
                  onPress={onPressSelectSEC}
                  value={secSelected}
                />
                <RadioGroup
                  tw={tw}
                  label="Account Options"
                  labelStyle={tw`font-inter font-medium text-gray-700`}
                  style={tw`mt-4`}
                  data={accountOptions}
                  showRadio={false}
                  onChangeOption={(value: {
                    key: string | number;
                    label: string;
                  }) => {
                    setRadioAccountOption(value.key);
                  }}
                  value={radioAccountOption}
                />
                <RadioGroup
                  tw={tw}
                  label="Account Type"
                  labelStyle={tw`font-inter font-medium text-gray-700`}
                  style={tw`mt-4`}
                  data={accountTypes}
                  showRadio={false}
                  onChangeOption={(value: {
                    key: string | number;
                    label: string;
                  }) => {
                    setRadioAccountType(value.key);
                  }}
                  value={radioAccountType}
                />
              </>
            ) : null}
            {depositAccount?.payment_method === 'cc' ? (
              <InputText
                tw={tw}
                label="Card Holder Name"
                labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                onChangeText={(value: string) => {
                  setCardHoldName(value);
                  values.card_hold_name = value;
                  handleChange('card_hold_name');
                }}
                value={cardHoldName}
                placeholder="Enter Card Holder Name"
                placeholderStyle={tw``}
                style={tw.style(
                  'mt-4 mb-12 flex-1',
                  errors.card_hold_name && 'mb-14',
                )}
                required={true}
                error={errors.card_hold_name}
                inputStyle={tw.style(
                  'h-11',
                  errors.card_hold_name && 'border-red-500',
                )}
              />
            ) : null}
            {depositAccount?.payment_method === 'ach' ? (
              <>
                <InputText
                  tw={tw}
                  label="Account Holder Name"
                  labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                  onChangeText={(value: string) => {
                    setCardHoldName(value);
                    values.card_hold_name = value;
                    handleChange('card_hold_name');
                  }}
                  value={cardHoldName}
                  placeholder="Enter Account Holder Name"
                  placeholderStyle={tw``}
                  style={tw.style(
                    'h-11 mt-4 mb-12 flex-1',
                    errors.card_hold_name && 'mb-14',
                  )}
                  required={true}
                  error={errors.card_hold_name}
                  inputStyle={tw.style(
                    'h-11',
                    errors.card_hold_name && 'border-red-500',
                  )}
                />
                <InputNumber
                  style={tw`flex flex-1`}
                  labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                  label="Account Number"
                  tw={tw}
                  value={creditCardNumber}
                  onChangeText={(value: string) => {
                    setCreditCardNumber(value);
                    values.credit_card_number = value;
                    handleChange('credit_card_number');
                  }}
                  placeholder="Enter Account Number"
                  mask={creditCardMask}
                  keyboardType={'number-pad'}
                  required={true}
                  inputStyle={tw.style(
                    'flex-1 h-11 justify-center',
                    errors.credit_card_number && 'border-red-500',
                  )}
                  error={errors.credit_card_number}
                />
                <InputNumber
                  style={tw`flex flex-1 mt-5`}
                  labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                  label="Routing Number"
                  tw={tw}
                  value={routingNumber}
                  onChangeText={(value: string) => {
                    setRoutingNumber(value);
                    values.routing_number = value;
                    handleChange('routing_number');
                  }}
                  placeholder="Enter Routing Number"
                  keyboardType={'number-pad'}
                  required={true}
                  inputStyle={tw.style(
                    'flex-1 h-11 justify-center',
                    errors.routing_number && 'border-red-500',
                  )}
                  error={errors.routing_number}
                />
              </>
            ) : null}
            {depositAccount?.payment_method !== 'cc' ||
            radioMethodType !== 'terminal' ? (
              <View style={tw`flex flex-1`}>
                {depositAccount?.payment_method === 'cc' ? (
                  <View>
                    <InputNumber
                      style={tw`flex flex-1`}
                      labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                      label="Card Details"
                      tw={tw}
                      value={creditCardNumber}
                      onChangeText={(value: string) => {
                        setCreditCardNumber(value);
                        values.credit_card_number = value;
                        handleChange('credit_card_number');
                      }}
                      placeholder="Card Number"
                      mask={creditCardMask}
                      keyboardType={'number-pad'}
                      required={true}
                      inputStyle={tw.style(
                        'flex-1 h-11 justify-center rounded-b-none',
                        errors.credit_card_number && 'border-red-500',
                      )}
                    />
                    <View style={tw`flex-row`}>
                      <InputNumber
                        style={tw`flex flex-1 pt-1`}
                        labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                        tw={tw}
                        onChangeText={(value: string) => {
                          setCreditCardDate(value);
                          values.credit_card_date = value;
                          handleChange('credit_card_date');
                        }}
                        value={creditCardDate}
                        placeholder="MM / YY"
                        mask={dateMask}
                        required={true}
                        inputStyle={tw.style(
                          'flex-1 border-t-0 rounded-t-none h-11',
                          depositAccount?.vt_cvv && 'rounded-br-0',
                          errors.credit_card_date && 'border-red-500',
                        )}
                        error={
                          errors.credit_card_number ||
                          errors.credit_card_date ||
                          errors.credit_card_CVC
                        }
                      />
                      {depositAccount?.vt_cvv ? (
                        <InputNumber
                          style={tw`flex flex-1`}
                          labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                          tw={tw}
                          onChangeText={(value: string) => {
                            setCreditCardCVV(value);
                            values.credit_card_CVC = value;
                            handleChange('credit_card_CVC');
                          }}
                          value={creditCardCVV}
                          placeholder="CVV"
                          mask={cvvMask}
                          required={true}
                          inputStyle={tw.style(
                            'flex-1 border-t-0 border-l-0 rounded-t-none rounded-bl-0 h-11',
                            errors.credit_card_CVC && 'border-red-500',
                          )}
                        />
                      ) : null}
                    </View>
                  </View>
                ) : null}
              </View>
            ) : null}
            <View>
              <HR style={tw`my-8 h-[0.25]`} tw={tw} color="gray-200" />
              <View style={tw`flex-row justify-between pb-8`}>
                <H2 tw={tw}>Billing Informations</H2>
                <View style={tw`mt-2`}>
                  <ToggleButton
                    tw={tw}
                    isOn={toggleBillingStatus}
                    onToggle={() => {
                      if (
                        !depositAccount?.vt_require_street &&
                        !depositAccount?.vt_require_zip
                      ) {
                        setToggleBillingStatus(!toggleBillingStatus);
                      }
                    }}
                    style={tw`h-5 w-9 rounded-full`}
                    innerStyle={tw`h-4.5 w-4.5 rounded-full`}
                  />
                </View>
              </View>
              {toggleBillingStatus && (
                <View style={tw`mb-8`}>
                  {depositAccount?.vt_street ? (
                    <InputText
                      tw={tw}
                      label="Street"
                      labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                      onChangeText={(value: string) => {
                        setStreet(value);
                        values.street = value;
                        handleChange('street');
                      }}
                      value={street}
                      placeholder="Enter street address"
                      style={tw`h-11`}
                      required={depositAccount?.vt_require_street}
                      onBlur={() => setFieldTouched('street', true)}
                      inputStyle={tw.style(
                        'h-11',
                        errors.street && 'border-red-500',
                      )}
                    />
                  ) : null}
                  <InputText
                    tw={tw}
                    label="City"
                    labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                    onChangeText={setCity}
                    value={city}
                    placeholder="Enter city name"
                    style={tw`h-11 mt-12`}
                    inputStyle={tw`h-11`}
                  />
                  <Dropdown
                    tw={tw}
                    label="Country"
                    labelStyle={tw`font-inter font-medium text-gray-700`}
                    style={tw`mt-12`}
                    dropDownStyle={tw`h-11`}
                    placeholder="Select country"
                    placeholderStyle={tw`font-inter text-sm`}
                    onPress={onPressSelectCountry}
                    value={countrySelected}
                  />
                  <Dropdown
                    tw={tw}
                    label="State"
                    labelStyle={tw`font-inter font-medium text-gray-700`}
                    style={tw`mt-5`}
                    dropDownStyle={tw`h-11`}
                    placeholder="Select state"
                    placeholderStyle={tw`font-inter text-sm`}
                    onPress={onPressSelectState}
                    value={stateSelected}
                  />
                  {depositAccount?.vt_zip ? (
                    <InputNumber
                      tw={tw}
                      labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                      label="Zip code"
                      onChangeText={(value: string) => {
                        setZipCode(value);
                        values.zip_code = value;
                        handleChange('zip_code');
                      }}
                      value={zipCode}
                      placeholder="Enter zip code"
                      style={tw`h-11 mt-6 mb-8`}
                      mask={zipCodeMask}
                      required={depositAccount?.vt_require_zip}
                      onBlur={() => setFieldTouched('zip_code', true)}
                      inputStyle={tw.style(
                        'h-11',
                        errors.zip_code && 'border-red-500',
                      )}
                    />
                  ) : null}
                  {depositAccount?.vt_billing_phone ? (
                    <InputPhone
                      tw={tw}
                      label="Billing Phone"
                      labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                      onChangeText={setBillingPhone}
                      value={billingPhone}
                      style={tw`mt-4 py-2`}
                    />
                  ) : null}
                </View>
              )}
            </View>
          </View>
        )}
      </>
    </>
  );
};

export default PaymentAccountDetails;
