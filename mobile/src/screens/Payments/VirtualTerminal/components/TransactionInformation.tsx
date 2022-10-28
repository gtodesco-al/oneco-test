import React, {useContext, useEffect, useState} from 'react';
import tw from '../../../../../services/tw';
import {userHasResource} from '../../../../../services/permissions';
import {H2, InputNumber, InputText, Masks} from '@amplifiui/mobile';
import Dropdown from '../../../../components/amplifi-ui/Dropdown';
import RadioGroup from '../../../../components/amplifi-ui/RadioGroup';
import Dollar from '../../../../icons/dollar';
import LocationContext from '../../../../context/LocationContext';
import UserContext from '../../../../context/UserContext';
import DatePicker from '../../../../components/amplifi-ui/DatePicker';

const CCTypesOfTransaction = [
  {
    key: 'sale',
    label: 'Sale',
  },
  {
    key: 'authonly',
    label: 'Auth Only',
  },
  {
    key: 'avsonly',
    label: 'AVS Only',
  },
  {
    key: 'force',
    label: 'Force',
  },
  {
    key: 'refund',
    label: 'Refund',
  },
];

const ACHTypesOfTransaction = [
  {
    key: 'debit',
    label: 'Collect (Debit)',
  },
  {
    key: 'credit',
    label: 'Send (Credit)',
  },
];

type Values = {
  is_cc: boolean;
  is_cvv_enabled: boolean;
  is_street_required: boolean;
  is_zip_required: boolean;
  is_avs_only: boolean;
  amount: string;
  description: string;
};

type Props = {
  depositAccountSelected: string | undefined;
  extraFlagSelected: string | undefined;
  extraFlagOptions: {value: string; name: string}[];
  onChangeValues: React.Dispatch<
    React.SetStateAction<{
      typeOfTransaction: string | undefined;
      amount: string | undefined;
      tip: string | undefined;
      tax: string | undefined;
      roomRate: string | undefined;
      roomNumber: string | undefined;
      checkIn: Date | undefined;
      checkOut: Date | undefined;
      clerkNumber: string | undefined;
      orderNumber: string | undefined;
    }>
  >;
  onPressDepositAccount: React.Dispatch<void>;
  onPressExtraFlag: React.Dispatch<void>;
  values: Values;
  handleChange: any;
  errors: Values;
  setFieldTouched: any;
};

const TransactionInformation = ({
  depositAccountSelected,
  extraFlagSelected,
  extraFlagOptions,
  onChangeValues,
  onPressDepositAccount,
  onPressExtraFlag,
  values,
  handleChange,
  errors,
  setFieldTouched,
}: Props): JSX.Element => {
  const {locationContextState} = useContext(LocationContext);
  const {userContextState} = useContext(UserContext);
  const [depositAccount, setDepositAccount] = useState(Object);
  const [extraFlag, setExtraFlag] = useState(Object);
  const [typesOfTransaction, setTypesOfTransaction] =
    useState(CCTypesOfTransaction);

  const [showCurrency, setShowCurrency] = useState(true);
  const [showTip, setShowTip] = useState(true);
  const [showTax, setShowTax] = useState(true);

  const [typeOfTransaction, setTypeOfTransaction] = useState('');
  const [amount, setAmount] = useState('');
  const [tip, setTip] = useState('');
  const [tax, setTax] = useState('');
  const [description, setDescription] = useState('');
  const [roomRate, setRoomRate] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [clerkNumber, setClerkNumber] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [custom1, setCustom1] = useState('');
  const [custom2, setCustom2] = useState('');
  const [custom3, setCustom3] = useState('');
  const [custom4, setCustom4] = useState('');

  useEffect(() => {
    values.is_avs_only = typeOfTransaction === 'avsonly';
    onChangeValues({
      typeOfTransaction,
      amount,
      tip,
      tax,
      roomRate,
      roomNumber,
      checkIn,
      checkOut,
      clerkNumber,
      orderNumber,
    });
  }, [
    typeOfTransaction,
    amount,
    tip,
    tax,
    roomRate,
    roomNumber,
    checkIn,
    checkOut,
    clerkNumber,
    orderNumber,
  ]);

  useEffect(() => {
    if (depositAccountSelected) {
      const depositAccountFiltered =
        locationContextState?.locationSelected?.product_transactions.find(
          item => item.id === depositAccountSelected,
        );
      setDepositAccount(depositAccountFiltered);

      // Reset values
      setAmount('');
      setTip('');
      setTax('');
      setDescription('');

      /*
        Check Deposit Account's payment method and user's resources
        to display the Types of Transaction options
      */
      let enabledTypesOfTransaction: {key: string; label: string}[] = [];
      if (depositAccountFiltered.payment_method === 'cc') {
        CCTypesOfTransaction.forEach(type => {
          if (
            userHasResource(
              userContextState,
              'transactions',
              `post.${type.key}`,
            )
          ) {
            enabledTypesOfTransaction.push(type);
          }
        });
      } else if (depositAccountFiltered.payment_method === 'ach') {
        ACHTypesOfTransaction.forEach(type => {
          if (
            (type.key === 'debit' && depositAccountFiltered.ach_allow_debit) ||
            (type.key === 'credit' && depositAccountFiltered.ach_allow_credit)
          ) {
            if (
              userHasResource(
                userContextState,
                'transactions',
                `post.${type.key}`,
              )
            ) {
              enabledTypesOfTransaction.push(type);
            }
          }
        });
      }
      setTypesOfTransaction(enabledTypesOfTransaction);

      /*
        Check if user has the Deposit Account's default transaction type
        resource. If he doesn't, select the first option available
      */
      if (
        userHasResource(
          userContextState,
          'transactions',
          `post.${depositAccountFiltered.default_transaction_type}`,
        )
      ) {
        setTypeOfTransaction(depositAccountFiltered.default_transaction_type);
      } else {
        setTypeOfTransaction(enabledTypesOfTransaction[0].key);
      }

      // Check if Deposit Account allows Currency, Tip and Tax
      setShowCurrency(depositAccountFiltered.vt_show_currency);
      setShowTip(depositAccountFiltered.vt_enable_tip);
      setShowTax(
        depositAccountFiltered.vt_enable_sales_tax &&
          depositAccountFiltered.vt_override_sales_tax_allowed,
      );

      // Change rules according to account props
      values.is_cc = depositAccountFiltered.payment_method === 'cc';
      values.is_cvv_enabled = depositAccountFiltered.vt_cvv;
      values.is_street_required = depositAccountFiltered.vt_require_street;
      values.is_zip_required = depositAccountFiltered.vt_require_zip;
    }
  }, [depositAccountSelected]);

  useEffect(() => {
    if (extraFlagSelected) {
      const extraFlagFiltered = extraFlagOptions.find(
        (item: {value: string; name: string}) =>
          item.value === extraFlagSelected,
      );
      setExtraFlag(extraFlagFiltered);
    }
  }, [extraFlagSelected]);

  const showDepositAccount = () => {
    const locationsWithVTEnabled =
      locationContextState?.locationSelected?.product_transactions.filter(
        item => item.vt_enable,
      );
    if (locationsWithVTEnabled) {
      return locationsWithVTEnabled?.length > 1;
    }
    return false;
  };

  return (
    <>
      <H2 tw={tw} style={tw`pb-5 font-inter text-gray-700`}>
        Transaction Information
      </H2>
      {showDepositAccount() && (
        <Dropdown
          tw={tw}
          label="Select a Deposit Account"
          labelStyle={tw`font-inter font-medium text-gray-700`}
          style={tw`mb-4`}
          placeholder="Account Identification Name - CC"
          onPress={onPressDepositAccount}
          value={depositAccount?.title}
          dropDownStyle={tw`h-11`}
        />
      )}
      <RadioGroup
        tw={tw}
        label="Types of Transaction"
        labelStyle={tw`font-inter font-medium text-gray-700`}
        data={typesOfTransaction}
        showRadio={false}
        onChangeOption={(value: any) => setTypeOfTransaction(value.key)}
        value={typeOfTransaction}
        style={tw`mb-4`}
      />
      {typeOfTransaction !== 'avsonly' ? (
        <>
          <InputNumber
            tw={tw}
            label="Amount"
            labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
            onChangeText={(value: string) => {
              setAmount(value);
              values.amount = value;
              handleChange('amount');
            }}
            value={amount}
            placeholder="$ 0.00"
            style={tw.style('h-11 mb-12', errors.amount && 'mb-14')}
            keyboardType={'decimal-pad'}
            icon={showCurrency ? Dollar : undefined}
            iconStyle={tw`mr-2`}
            mask={Masks.CURRENCY.US}
            required={true}
            error={errors.amount}
            inputStyle={tw.style('h-11', errors.amount && 'border-red-500')}
          />
          {showTip ? (
            <InputNumber
              tw={tw}
              label="Tip"
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              onChangeText={setTip}
              value={tip}
              placeholder="$ 0.00"
              style={tw`mb-12`}
              inputStyle={tw`h-11`}
              keyboardType={'decimal-pad'}
              icon={showCurrency ? Dollar : undefined}
              iconStyle={tw`mr-2`}
              mask={Masks.CURRENCY.US}
            />
          ) : null}
          {showTax ? (
            <InputNumber
              tw={tw}
              label="Tax"
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              onChangeText={setTax}
              value={tax}
              placeholder="$ 0.00"
              style={tw`mb-12`}
              inputStyle={tw`h-11`}
              keyboardType={'decimal-pad'}
              icon={showCurrency ? Dollar : undefined}
              iconStyle={tw`mr-2`}
              mask={Masks.CURRENCY.US}
            />
          ) : null}
        </>
      ) : null}
      <InputText
        tw={tw}
        label="Description"
        labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
        onChangeText={(value: string) => {
          setDescription(value);
          values.description = value;
          handleChange('description');
        }}
        value={description}
        placeholder="Enter a description"
        style={tw`h-11 mb-10`}
        required={true}
        error={errors.description}
        inputStyle={tw.style('h-11', errors.description && 'border-red-500')}
      />
      {depositAccount?.industry_type === 'lodging' ? (
        <>
          <InputText
            tw={tw}
            label="Room Rate"
            labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
            onChangeText={setRoomRate}
            value={roomRate}
            placeholder="Enter rate"
            style={tw`h-11 mb-10`}
            inputStyle={tw`h-11`}
          />
          <InputText
            tw={tw}
            label="Room Number"
            labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
            onChangeText={setRoomNumber}
            value={roomNumber}
            placeholder="Enter number"
            style={tw`h-11 mb-10`}
            inputStyle={tw`h-11`}
          />
          <DatePicker
            tw={tw}
            label="Check In"
            labelStyle={tw`font-inter mb-1`}
            placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
            style={tw`mb-4`}
            setDate={setCheckIn}
            value={new Date(checkIn)}
          />
          <DatePicker
            tw={tw}
            label="Check Out"
            labelStyle={tw`font-inter mb-1`}
            placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
            style={tw`mb-4`}
            setDate={setCheckOut}
            value={new Date(checkOut)}
          />
          <Dropdown
            tw={tw}
            label="Extra Flag"
            labelStyle={tw`font-inter font-medium text-gray-700`}
            style={tw`mb-4`}
            placeholder="Select an extra flag"
            onPress={onPressExtraFlag}
            value={extraFlag.name}
            dropDownStyle={tw`h-11`}
          />
        </>
      ) : null}
      {depositAccount?.payment_method === 'cc' ? (
        <>
          {depositAccount?.vt_clerk_number ? (
            <InputNumber
              tw={tw}
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              label="Clerk Number"
              onChangeText={setClerkNumber}
              value={clerkNumber}
              placeholder="Enter Clerk Number"
              style={tw`mt-2 mb-10`}
              inputStyle={tw`h-11`}
            />
          ) : null}
          {depositAccount?.vt_order_num ? (
            <InputNumber
              tw={tw}
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              label={
                depositAccount?.industry_type === 'lodging'
                  ? 'Folio Number'
                  : 'Order Number'
              }
              onChangeText={setOrderNumber}
              value={orderNumber}
              placeholder={
                depositAccount?.industry_type === 'lodging'
                  ? 'Enter Folio Number'
                  : 'Enter Order Number'
              }
              style={tw`mt-2 mb-10`}
              inputStyle={tw`h-11`}
            />
          ) : null}
        </>
      ) : null}
      {depositAccount?.vt_show_custom_fields ? (
        <>
          <InputText
            tw={tw}
            label="Custom Field 1"
            labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
            onChangeText={setCustom1}
            value={custom1}
            style={tw`h-11 mt-2 mb-10`}
            inputStyle={tw`h-11`}
          />
          <InputText
            tw={tw}
            label="Custom Field 2"
            labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
            onChangeText={setCustom2}
            value={custom2}
            style={tw`h-11 mt-2 mb-10`}
            inputStyle={tw`h-11`}
          />
          <InputText
            tw={tw}
            label={
              depositAccount?.partner === 'vericle' ||
              depositAccount?.partner === 'vericle-statement'
                ? 'Service Date'
                : 'Custom Field 3'
            }
            labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
            onChangeText={setCustom3}
            value={custom3}
            style={tw`h-11 mt-2 mb-10`}
            inputStyle={tw`h-11`}
          />
          <InputText
            tw={tw}
            label="Custom Field 4"
            labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
            onChangeText={setCustom4}
            value={custom4}
            style={tw`h-11 mt-2 mb-10`}
            inputStyle={tw`h-11`}
          />
        </>
      ) : null}
    </>
  );
};

export default TransactionInformation;
