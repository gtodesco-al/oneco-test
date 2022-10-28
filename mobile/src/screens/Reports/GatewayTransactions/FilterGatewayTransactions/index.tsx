import React, {useContext, useEffect, useState} from 'react';
import {
  AppStatusBar,
  H2,
  Button,
  HR,
  InputNumber,
  InputText,
  Checkbox,
} from '@amplifiui/mobile';

import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import FadedScrollView from '../../../../components/amplifi-ui/FadedScrollView';
import DatePicker from '../../../../components/amplifi-ui/DatePicker';
import Dropdown from '../../../../components/amplifi-ui/Dropdown';
import DropdownPickerModal from '../../../../components/amplifi-ui/Dropdown/DropdownPickerModal';

import tw from '../../../../../services/tw';

import {SvgXml} from 'react-native-svg';
import CloseScreen from '../../../../icons/close-screen';
import Dollar from '../../../../icons/dollar';
import LocationContext from '../../../../context/LocationContext';
import GatewayTransactionsFilterContext from '../../../../context/GatewayTransactionsFilterContext';
import RootStackParamList from '../../../RootStackParamList';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'ReportGatewayTransactions'
>;

const FilterGatewayTransactions = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();
  const {locationContextState} = useContext(LocationContext);

  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  const [amount, setAmount] = useState<number | undefined>();
  const [batch, setBatch] = useState<number | undefined>();
  const [accountHolderName, setAccountHolderName] = useState<
    string | undefined
  >();
  const [reasonDescription, setReasonDescription] = useState<
    string | undefined
  >();
  const [lastFour, setLastFour] = useState<string | undefined>();
  const [createdByName, setCreatedByName] = useState<string | undefined>();
  const [depositAccountSelected, setDepositAccountSelected] = useState<
    string | undefined
  >();

  const [sale, setSale] = useState(false);
  const [refund, setRefund] = useState(false);
  const [credit, setCredit] = useState(false);
  const [approved, setApproved] = useState(false);
  const [authOnly, setAuthOnly] = useState(false);
  const [pendingOrigination, setPendingOrigination] = useState(false);
  const [isRecurringBilling, setIsRecurringBilling] = useState(false);
  const [isNotRecurringBilling, setIsNotRecurringBilling] = useState(false);
  const [isWallet, setIsWallet] = useState(false);
  const [isNotWallet, setIsNotWallet] = useState(false);
  const [showMerchantAccountModal, setShowMerchantAccountModal] =
    useState(false);

  const {
    gatewayTransactionsFilterContextState,
    setGatewayTransactionsFilterContextState,
  } = useContext(GatewayTransactionsFilterContext);
  const [depositAccount, setDepositAccount] = useState(Object);
  const [depositAccounts, setDepositAccounts] = useState<
    {value: string; name: string}[]
  >([]);

  useEffect(() => {
    if (gatewayTransactionsFilterContextState?.created_ts?.$gte) {
      const date_from = new Date(
        gatewayTransactionsFilterContextState?.created_ts?.$gte * 1000,
      );
      setDateFrom(date_from);
    } else {
      setDateFrom(undefined);
    }
    if (gatewayTransactionsFilterContextState?.created_ts?.$lte) {
      const date_to = new Date(
        gatewayTransactionsFilterContextState?.created_ts?.$lte * 1000,
      );
      setDateTo(date_to);
    } else {
      setDateTo(undefined);
    }

    if (gatewayTransactionsFilterContextState?.account_holder_name) {
      setAccountHolderName(
        gatewayTransactionsFilterContextState?.account_holder_name,
      );
    }

    if (gatewayTransactionsFilterContextState?.is_wallet !== undefined) {
      if (gatewayTransactionsFilterContextState?.is_wallet) {
        setIsWallet(gatewayTransactionsFilterContextState?.is_wallet);
      } else if (!gatewayTransactionsFilterContextState?.is_wallet === false) {
        setIsNotWallet(gatewayTransactionsFilterContextState?.is_wallet);
      }
    }

    if (gatewayTransactionsFilterContextState?.transaction_amount) {
      setAmount(gatewayTransactionsFilterContextState?.transaction_amount);
    }

    if (gatewayTransactionsFilterContextState?.batch) {
      setBatch(gatewayTransactionsFilterContextState?.batch);
    }

    if (gatewayTransactionsFilterContextState?.account_holder_name) {
      setAccountHolderName(
        gatewayTransactionsFilterContextState?.account_holder_name,
      );
    }

    if (gatewayTransactionsFilterContextState?.type_id) {
      if (gatewayTransactionsFilterContextState.type_id === '20,30') {
        setSale(true);
        setRefund(true);
      } else if (gatewayTransactionsFilterContextState.type_id === '20,40') {
        setSale(true);
        setCredit(true);
      } else if (gatewayTransactionsFilterContextState.type_id === '30,40') {
        setRefund(true);
        setCredit(true);
      } else if (gatewayTransactionsFilterContextState.type_id === '20,30,40') {
        setSale(true);
        setRefund(true);
        setCredit(true);
      } else if (gatewayTransactionsFilterContextState.type_id === '20') {
        setSale(true);
      } else if (gatewayTransactionsFilterContextState.type_id === '30') {
        setRefund(true);
      } else if (gatewayTransactionsFilterContextState.type_id === '40') {
        setCredit(true);
      }
    }

    if (gatewayTransactionsFilterContextState?.status_code) {
      if (gatewayTransactionsFilterContextState.status_code === '101,102') {
        setApproved(true);
        setAuthOnly(true);
      } else if (
        gatewayTransactionsFilterContextState.status_code === '101,131'
      ) {
        setApproved(true);
        setPendingOrigination(true);
      } else if (
        gatewayTransactionsFilterContextState.status_code === '102,131'
      ) {
        setAuthOnly(true);
        setPendingOrigination(true);
      } else if (
        gatewayTransactionsFilterContextState.status_code === '101,102,131'
      ) {
        setApproved(true);
        setAuthOnly(true);
        setPendingOrigination(true);
      } else if (gatewayTransactionsFilterContextState.status_code === '101') {
        setApproved(true);
      } else if (gatewayTransactionsFilterContextState.status_code === '102') {
        setAuthOnly(true);
      } else if (gatewayTransactionsFilterContextState.status_code === '131') {
        setPendingOrigination(true);
      }
    }

    if (gatewayTransactionsFilterContextState?.last_four) {
      setLastFour(gatewayTransactionsFilterContextState?.last_four);
    }

    if (gatewayTransactionsFilterContextState?.product_transaction?.title) {
      setDepositAccountSelected(
        gatewayTransactionsFilterContextState?.product_transaction.title,
      );
    }

    if (gatewayTransactionsFilterContextState?.is_recurring !== undefined) {
      if (gatewayTransactionsFilterContextState?.is_recurring) {
        setIsRecurringBilling(true);
      }
      if (!gatewayTransactionsFilterContextState?.is_recurring) {
        setIsNotRecurringBilling(true);
      }
    }
  }, [gatewayTransactionsFilterContextState]);

  useEffect(() => {
    const depositAccountsObjectFormatted =
      locationContextState?.locationSelected?.product_transactions.map(item => {
        return {value: item.id, name: item.title};
      });
    if (depositAccountsObjectFormatted) {
      setDepositAccounts(depositAccountsObjectFormatted);
    }
  }, []);

  useEffect(() => {
    if (depositAccountSelected) {
      const depositAccountFiltered =
        locationContextState?.locationSelected?.product_transactions.find(
          item => item.id === depositAccountSelected,
        );
      setDepositAccount(depositAccountFiltered);
    }
  }, [depositAccountSelected]);

  const transactionsTypeSelected = () => {
    let type_id;

    if (sale && refund && credit) {
      type_id = '20,30,40';
    } else if (sale && refund) {
      type_id = '20,30';
    } else if (sale && credit) {
      type_id = '20,40';
    } else if (refund && credit) {
      type_id = '30,40';
    } else if (sale) {
      type_id = '20';
    } else if (refund) {
      type_id = '30';
    } else if (credit) {
      type_id = '40';
    } else {
      type_id = undefined;
    }

    return type_id;
  };

  const statusSelected = () => {
    let status_code;

    if (approved && authOnly && pendingOrigination) {
      status_code = '101,102,103';
    } else if (approved && authOnly) {
      status_code = '101,102';
    } else if (approved && pendingOrigination) {
      status_code = '101,131';
    } else if (authOnly && pendingOrigination) {
      status_code = '102,131';
    } else if (approved) {
      status_code = '101';
    } else if (authOnly) {
      status_code = '102';
    } else if (pendingOrigination) {
      status_code = '131';
    } else {
      status_code = undefined;
    }

    return status_code;
  };

  const clearFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);

    setDepositAccountSelected('');
    setAmount(undefined);
    setBatch(undefined);
    setAccountHolderName('');
    setLastFour('');
    setReasonDescription('');
    setCreatedByName('');

    setSale(false);
    setRefund(false);
    setApproved(false);
    setAuthOnly(false);
    setPendingOrigination(false);
    setCredit(false);
    setIsRecurringBilling(false);
    setIsNotRecurringBilling(false);
    setIsWallet(false);
    setIsNotWallet(false);

    setGatewayTransactionsFilterContextState({
      created_ts: undefined,
      account_holder_name: undefined,
      transaction_amount: undefined,
      batch: undefined,
      is_recurring: undefined,
      is_wallet: undefined,
      last_four: undefined,
      product_transaction: undefined,
      reason_code_id: undefined,
      type_id: undefined,
    });
  };

  const processAndUpdateContext = () => {
    let date_transaction_from;
    let date_transaction_to;

    if (dateFrom) {
      const newDate = dateFrom.setHours(0, 0, 0, 0);
      date_transaction_from = Math.round(newDate / 1000);
    }

    if (dateTo) {
      const newDate = dateTo.setHours(dateTo.getHours() + 24);
      date_transaction_to = Math.round(newDate / 1000);
    }

    let is_recurring = isRecurringBilling
      ? true
      : isNotRecurringBilling
      ? false
      : undefined;

    let type_id = transactionsTypeSelected();
    let status_code = statusSelected();

    return setGatewayTransactionsFilterContextState({
      ...gatewayTransactionsFilterContextState,
      created_ts: {$gte: date_transaction_from, $lte: date_transaction_to},
      account_holder_name: accountHolderName,
      transaction_amount: amount,
      batch: batch,
      type_id: type_id,
      status_code: status_code,
      is_recurring: is_recurring,
      last_four: lastFour,
      product_transaction: {title: depositAccountSelected},
    });
  };

  const checkRecurringBilling = (type: string) => {
    setIsRecurringBilling(false);
    setIsNotRecurringBilling(false);

    switch (type) {
      case 'isRecurringBilling':
        setIsRecurringBilling(!isRecurringBilling);
        break;
      case 'isNotRecurringBilling':
        setIsNotRecurringBilling(!isNotRecurringBilling);
        break;
    }
  };

  const checkIsWallet = (type: string) => {
    setIsWallet(false);
    setIsNotWallet(false);

    switch (type) {
      case 'IsWallet':
        setIsWallet(!isWallet);
        break;
      case 'IsNotWallet':
        setIsNotWallet(!isNotWallet);
        break;
    }
  };

  return (
    <>
      <View style={tw`flex-1`}>
        <View style={tw`ios:h-${Math.floor(insets.top / 4)}`}>
          <SafeAreaView style={{...tw`bg-[#00334D]`}} />
        </View>
        <SafeAreaView style={{...tw`bg-white flex-1`}}>
          <AppStatusBar
            tw={tw}
            backgroundColor="#00334D"
            barStyle="light-content"
            top={insets.top}
          />
          <View style={tw`flex-1 mt-4`}>
            <View style={tw`shadow-xl pl-5 flex-row`}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={tw`py-3`}>
                <SvgXml xml={CloseScreen} />
              </TouchableOpacity>
              <H2 tw={tw} style={tw`py-1.5 pl-5 font-inter text-gray-900`}>
                Filters
              </H2>
            </View>
            <FadedScrollView tw={tw} style={tw`flex-1 bg-white px-5 pt-5 pb-2`}>
              <DatePicker
                tw={tw}
                label="Transaction Date From"
                labelStyle={tw`font-inter mb-1`}
                value={dateFrom}
                placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                style={tw`mt-2 mb-4`}
                setDate={setDateFrom}
              />
              <DatePicker
                tw={tw}
                label="Transaction Date To"
                labelStyle={tw`font-inter mb-1`}
                value={dateTo}
                placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                style={tw`mb-4`}
                setDate={setDateTo}
              />
              <InputNumber
                tw={tw}
                style={tw`mb-4`}
                inputStyle={tw`h-11`}
                label="Amount"
                labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                onChangeText={setAmount}
                value={amount}
                placeholder="$ 0.00"
                keyboardType={'decimal-pad'}
                icon={Dollar}
                iconStyle={tw`mr-2`}
              />
              <InputNumber
                tw={tw}
                style={tw`mb-4`}
                inputStyle={tw`h-11`}
                label="Batch"
                labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                onChangeText={setBatch}
                value={batch}
                placeholder="Enter batch number"
                keyboardType={'decimal-pad'}
                iconStyle={tw`mr-2`}
              />
              <InputText
                tw={tw}
                label="Account Holder Name"
                labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                onChangeText={setAccountHolderName}
                value={accountHolderName}
                placeholder="Enter name"
                style={tw`mb-4`}
                inputStyle={tw`h-11`}
              />
              <Text style={tw`font-inter font-medium text-gray-700`}>
                Transactions Type
              </Text>
              <Checkbox
                tw={tw}
                value={sale}
                style={tw`ml-[-1rem]`}
                onPress={() => setSale(!sale)}
                label="Sale"
                labelStyle={tw`font-inter`}
              />
              <Checkbox
                tw={tw}
                value={refund}
                style={tw`ml-[-1rem]`}
                onPress={() => setRefund(!refund)}
                label="Refund"
                labelStyle={tw`font-inter`}
              />
              <Checkbox
                tw={tw}
                value={credit}
                style={tw`ml-[-1rem]`}
                onPress={() => setCredit(!credit)}
                label="Credit"
                labelStyle={tw`font-inter`}
              />
              <Text style={tw`font-inter font-medium text-gray-700`}>
                Status
              </Text>
              <Checkbox
                tw={tw}
                value={approved}
                style={tw`ml-[-1rem]`}
                onPress={() => setApproved(!approved)}
                label="Approved"
                labelStyle={tw`font-inter`}
              />
              <Checkbox
                tw={tw}
                value={authOnly}
                style={tw`ml-[-1rem]`}
                onPress={() => setAuthOnly(!authOnly)}
                label="Auth Only"
                labelStyle={tw`font-inter`}
              />
              <Checkbox
                tw={tw}
                value={pendingOrigination}
                style={tw`ml-[-1rem]`}
                onPress={() => setPendingOrigination(!pendingOrigination)}
                label="Pending Origination"
                labelStyle={tw`font-inter`}
              />
              <InputNumber
                tw={tw}
                style={tw`mb-4`}
                inputStyle={tw`h-11`}
                label="Enter last 4"
                labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                onChangeText={setLastFour}
                value={lastFour}
                placeholder="Enter last for digits"
                keyboardType={'decimal-pad'}
              />
              <Dropdown
                tw={tw}
                label="Merchant Account"
                labelStyle={tw`font-inter font-medium text-gray-700`}
                style={tw`mb-4`}
                placeholder="Select Account"
                placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                onPress={() =>
                  setShowMerchantAccountModal(!showMerchantAccountModal)
                }
                value={depositAccount?.title || ''}
                dropDownStyle={tw`h-11`}
              />
              <InputText
                tw={tw}
                style={tw`mb-4`}
                inputStyle={tw`h-11`}
                label="Reason Description"
                labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                onChangeText={setReasonDescription}
                value={reasonDescription}
                placeholder="Enter description"
              />
              <Text style={tw`font-inter font-medium text-gray-700`}>
                Is Recurring Billing
              </Text>
              <Checkbox
                tw={tw}
                value={isRecurringBilling}
                style={tw`ml-[-1rem]`}
                onPress={() => checkRecurringBilling('isRecurringBilling')}
                label="Yes"
                labelStyle={tw`font-inter`}
              />
              <Checkbox
                tw={tw}
                value={isNotRecurringBilling}
                style={tw`ml-[-1rem]`}
                onPress={() => checkRecurringBilling('isNotRecurringBilling')}
                label="No"
                labelStyle={tw`font-inter`}
              />
              <Text style={tw`font-inter font-medium text-gray-700`}>
                Is Wallet
              </Text>
              <Checkbox
                tw={tw}
                value={isWallet}
                style={tw`ml-[-1rem]`}
                onPress={() => checkIsWallet('isWallet')}
                label="Yes"
                labelStyle={tw`font-inter`}
              />
              <Checkbox
                tw={tw}
                value={isNotWallet}
                style={tw`ml-[-1rem]`}
                onPress={() => checkIsWallet('isNotWallet')}
                label="No"
                labelStyle={tw`font-inter`}
              />
              <InputText
                tw={tw}
                label="Created by"
                labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                onChangeText={setCreatedByName}
                value={createdByName}
                placeholder="Enter name"
                style={tw`mb-4`}
                inputStyle={tw`h-11`}
              />
            </FadedScrollView>
          </View>
          <HR tw={tw} style={tw`bg-gray-200 h-[2px]`} />
          <View style={tw`my-4 mx-5`}>
            <Button
              tw={tw}
              onPress={() => {
                processAndUpdateContext();
                navigation.navigate('ReportGatewayTransactions', {});
              }}
              type="primary"
              style={tw`mb-3`}>
              Apply Filters
            </Button>
            <Button
              tw={tw}
              onPress={clearFilters}
              type="primary"
              style={tw`bg-gray-50 shadow-sm border-gray-200`}
              textStyle={tw`text-gray-900 text-[4]`}>
              Clear Filters
            </Button>
          </View>
        </SafeAreaView>
      </View>
      <DropdownPickerModal
        tw={tw}
        maxHeight={500}
        show={showMerchantAccountModal}
        setShow={setShowMerchantAccountModal}
        content={depositAccounts}
        selectedValue={depositAccountSelected}
        onValueChange={setDepositAccountSelected}
        numberOfLines={1}
        title="Select deposit account"
        showValue={false}
      />
    </>
  );
};

export default FilterGatewayTransactions;
