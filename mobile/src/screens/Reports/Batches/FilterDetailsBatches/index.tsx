import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';

import {
  AppStatusBar,
  H2,
  Button,
  Checkbox,
  HR,
  InputNumber,
} from '@amplifiui/mobile';

import DatePicker from '../../../../components/amplifi-ui/DatePicker';
import RootStackParamList from '../../../RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FadedScrollView from '../../../../components/amplifi-ui/FadedScrollView';
import tw from '../../../../../services/tw';

import CloseScreen from '../../../../icons/close-screen';
import Dollar from '../../../../icons/dollar';
import BatchesFilterContext from '../../../../context/BatchesDetailsFilterContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Customers'>;
  setObjFilters: React.Dispatch<React.SetStateAction<object>>;
};

const FiltersBatchesDetails = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();

  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  const [amount, setAmount] = useState<string | undefined>();
  const [batch, setBatch] = useState<number | undefined>();
  const [lastFour, setLastFour] = useState<string | undefined>();
  const [authCode, setAuthCode] = useState<string | undefined>();

  const [sale, setSale] = useState(false);
  const [refund, setRefund] = useState(false);
  const [credit, setCredit] = useState(false);

  const [creditCard, setCreditCard] = useState(false);
  const [bankAccount, setBankAccount] = useState(false);
  const {
    batchesDetailsFilterContextState,
    setBatchesDetailsFilterContextState,
  } = useContext(BatchesFilterContext);

  useEffect(() => {
    if (batchesDetailsFilterContextState?.created_ts?.$gte) {
      const date_from = new Date(
        batchesDetailsFilterContextState?.created_ts?.$gte * 1000,
      );
      setDateFrom(date_from);
    } else {
      setDateFrom(undefined);
    }

    if (batchesDetailsFilterContextState?.created_ts?.$lte) {
      const date_to = new Date(
        batchesDetailsFilterContextState?.created_ts?.$lte * 1000,
      );
      setDateTo(date_to);
    } else {
      setDateTo(undefined);
    }

    if (batchesDetailsFilterContextState?.transaction_amount) {
      setAmount(batchesDetailsFilterContextState?.transaction_amount);
    }

    if (batchesDetailsFilterContextState?.batch) {
      setBatch(batchesDetailsFilterContextState?.batch);
    }

    if (batchesDetailsFilterContextState?.type_id) {
      if (batchesDetailsFilterContextState.type_id === 20) {
        setSale(true);
      } else if (batchesDetailsFilterContextState.type_id === 30) {
        setRefund(true);
      } else {
        setCredit(true);
      }
    }

    if (batchesDetailsFilterContextState?.account_type) {
      if (
        batchesDetailsFilterContextState?.account_type === 'mc' ||
        'visa' ||
        'mc' ||
        'disc' ||
        'amex' ||
        'jcb' ||
        'diners' ||
        'debit'
      ) {
        setCreditCard(true);
      } else if (
        batchesDetailsFilterContextState?.account_type === 'checking' ||
        'savings'
      ) {
        setBankAccount(true);
      }
    }

    if (batchesDetailsFilterContextState?.last_four) {
      setLastFour(batchesDetailsFilterContextState?.last_four);
    }

    if (batchesDetailsFilterContextState?.auth_code) {
      setAuthCode(batchesDetailsFilterContextState?.auth_code);
    }
  }, [batchesDetailsFilterContextState]);

  const setClearFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setAmount(undefined);
    setBatch(undefined);
    setLastFour(undefined);
    setAuthCode(undefined);
    setSale(false);
    setRefund(false);
    setCredit(false);
    setCreditCard(false);
    setBankAccount(false);

    setBatchesDetailsFilterContextState({
      created_ts: undefined,
      transaction_amount: undefined,
      batch: undefined,
      last_four: undefined,
      account_type: undefined,
      type_id: undefined,
      auth_code: undefined,
    });
  };

  const processAndUpdateContext = () => {
    let date_transaction_from;
    let date_transaction_to;
    let account_type;

    if (dateFrom) {
      const newDate = dateFrom.setHours(0, 0, 0, 0);
      date_transaction_from = Math.round(newDate / 1000);
    }

    if (dateTo) {
      const newDate = dateTo.setHours(dateTo.getHours() + 24);
      date_transaction_to = Math.round(newDate / 1000);
    }

    let type_id = sale ? 20 : refund ? 30 : credit ? 40 : undefined;

    if (creditCard) {
      account_type = 'visa, mc, disc, amex, jcb, diners, debit';
    } else if (bankAccount) {
      account_type = 'checking, savings';
    }

    return setBatchesDetailsFilterContextState({
      ...batchesDetailsFilterContextState,
      created_ts: {$gte: date_transaction_from, $lte: date_transaction_to},
      transaction_amount: amount,
      batch: batch,
      last_four: lastFour,
      type_id: type_id,
      account_type: account_type,
    });
  };

  return (
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
              label="Transaction Amount"
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
            />
            <Text style={tw`font-inter font-medium text-gray-700`}>
              Transaction Type
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
              onPress={() => setCredit(!sale)}
              label="Credit"
              labelStyle={tw`font-inter`}
            />
            <Text style={tw`font-inter font-medium text-gray-700`}>
              Account Type
            </Text>
            <Checkbox
              tw={tw}
              value={creditCard}
              style={tw`ml-[-1rem]`}
              onPress={() => setCreditCard(!creditCard)}
              label="Credit Card"
              labelStyle={tw`font-inter`}
            />
            <Checkbox
              tw={tw}
              value={bankAccount}
              style={tw`ml-[-1rem]`}
              onPress={() => setBankAccount(!bankAccount)}
              label="Bank Account"
              labelStyle={tw`font-inter`}
            />
            <InputNumber
              tw={tw}
              style={tw`mb-4`}
              inputStyle={tw`h-11`}
              label="Last 4"
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              onChangeText={setLastFour}
              value={lastFour}
              placeholder="Enter last 4 digits"
              keyboardType={'decimal-pad'}
            />

            <InputNumber
              tw={tw}
              style={tw`mb-4`}
              inputStyle={tw`h-11`}
              label="Auth Code"
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              onChangeText={setAuthCode}
              value={authCode}
              placeholder="Enter Code"
              keyboardType={'decimal-pad'}
            />
          </FadedScrollView>
        </View>
        <HR tw={tw} style={tw`bg-gray-200 h-[2px]`} />
        <View style={tw`my-4 mx-5`}>
          <Button
            tw={tw}
            onPress={() => {
              processAndUpdateContext();
              navigation.goBack();
            }}
            type="primary"
            style={tw`mb-3`}>
            Apply Filters
          </Button>
          <Button
            tw={tw}
            onPress={setClearFilters}
            type="primary"
            style={tw`bg-gray-50 shadow-sm border-gray-200`}
            textStyle={tw`text-gray-900 text-[4]`}>
            Clear Filters
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FiltersBatchesDetails;
