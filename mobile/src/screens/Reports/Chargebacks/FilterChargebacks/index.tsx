import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import FadedScrollView from '../../../../components/amplifi-ui/FadedScrollView';
import DatePicker from '../../../../components/amplifi-ui/DatePicker';

import {
  AppStatusBar,
  H2,
  Button,
  HR,
  InputNumber,
  Checkbox,
} from '@amplifiui/mobile';

import tw from '../../../../../services/tw';
import CloseScreen from '../../../../icons/close-screen';
import Dollar from '../../../../icons/dollar';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ChargebacksFilterContext from '../../../../context/ChargebacksFilterContext';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const FilterChargebacks = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();
  const [dateFromReceive, setDateFromReceive] = useState<Date | undefined>();
  const [dateToReceive, setDateToReceive] = useState<Date | undefined>();
  const [dateFromTransaction, setDateFromTransaction] = useState<
    Date | undefined
  >();
  const [dateToTransaction, setDateToTransaction] = useState<
    Date | undefined
  >();
  const [creditCardNumber, setCreditCardNumber] = useState<
    string | undefined
  >();
  const [amount, setAmount] = useState(undefined);
  const [creditCard, setCreditCard] = useState(false);
  const [bankAccount, setBankAccount] = useState(false);
  const [accountType, setAccountType] = useState('');

  const {chargebacksFilterContextState, setChargebacksFilterContextState} =
    useContext(ChargebacksFilterContext);

  useEffect(() => {
    if (chargebacksFilterContextState?.receive_dt_ts?.$gte) {
      const date_from = new Date(
        chargebacksFilterContextState?.receive_dt_ts?.$gte * 1000,
      );
      setDateFromReceive(date_from);
    } else {
      setDateFromReceive(undefined);
    }

    if (chargebacksFilterContextState?.receive_dt_ts?.$lte) {
      const date_to = new Date(
        chargebacksFilterContextState?.receive_dt_ts?.$lte * 1000,
      );
      setDateToReceive(date_to);
    } else {
      setDateToReceive(undefined);
    }

    if (chargebacksFilterContextState?.pos_trxn_dt_ts?.$gte) {
      const date_from = new Date(
        chargebacksFilterContextState?.pos_trxn_dt_ts?.$gte * 1000,
      );
      setDateFromTransaction(date_from);
    } else {
      setDateFromTransaction(undefined);
    }

    if (chargebacksFilterContextState?.pos_trxn_dt_ts?.$lte) {
      const date_to = new Date(
        chargebacksFilterContextState?.pos_trxn_dt_ts?.$lte * 1000,
      );
      setDateToTransaction(date_to);
    } else {
      setDateToTransaction(undefined);
    }

    if (chargebacksFilterContextState?.card_type) {
      setAccountType(chargebacksFilterContextState?.card_type);
    }

    if (chargebacksFilterContextState?.card_last_4_nbr) {
      setCreditCardNumber(chargebacksFilterContextState?.card_last_4_nbr);
    }

    if (chargebacksFilterContextState?.card_type) {
      setAccountType(chargebacksFilterContextState?.card_type);
    }
  }, [chargebacksFilterContextState]);

  const clearFilters = () => {
    setDateFromReceive(undefined);
    setDateToReceive(undefined);
    setDateFromTransaction(undefined);
    setDateToTransaction(undefined);
    setAmount(undefined);
    setCreditCardNumber(undefined);
    setCreditCard(false);
    setBankAccount(false);

    setChargebacksFilterContextState({
      receive_dt_ts: undefined,
      pos_trxn_dt_ts: undefined,
      amount: undefined,
      card_last_4_nbr: undefined,
      card_type: undefined,
      reason_desc: undefined,
    });
  };

  const processAndUpdateContext = () => {
    let date_receive_from;
    let date_receive_to;
    let date_transaction_from;
    let date_transaction_to;

    if (dateFromReceive) {
      const newDate = dateFromReceive?.setHours(0, 0, 0, 0);
      date_receive_from = Math.round(newDate / 1000);
    }

    if (dateToReceive) {
      const newDate = dateToReceive.setHours(dateToReceive.getHours() + 24);
      date_receive_to = Math.round(newDate / 1000);
    }

    if (dateFromTransaction) {
      const newDate = dateFromTransaction?.setHours(0, 0, 0, 0);
      date_transaction_from = Math.round(newDate / 1000);
    }

    if (dateToTransaction) {
      const newDate = dateToTransaction.setHours(
        dateToTransaction.getHours() + 24,
      );
      date_transaction_to = Math.round(newDate / 1000);
    }

    setChargebacksFilterContextState({
      ...chargebacksFilterContextState,
      receive_dt_ts: {$gte: date_receive_from, $lte: date_receive_to},
      pos_trxn_dt_ts: {$gte: date_transaction_from, $lte: date_transaction_to},
      amount: amount || undefined,
      card_last_4_nbr: creditCardNumber || undefined,
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
              label=" Dispute Date From"
              labelStyle={tw`font-inter mb-1`}
              value={dateFromReceive}
              placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
              style={tw`mt-2 mb-4`}
              setDate={setDateFromReceive}
            />

            <DatePicker
              tw={tw}
              label="Dispute Date To"
              labelStyle={tw`font-inter mb-1`}
              value={dateToReceive}
              placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
              style={tw`mt-2 mb-4`}
              setDate={setDateToReceive}
            />

            <DatePicker
              tw={tw}
              label="Transaction Date From"
              labelStyle={tw`font-inter mb-1`}
              value={dateFromTransaction}
              placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
              style={tw`mt-2 mb-4`}
              setDate={setDateFromTransaction}
            />

            <DatePicker
              tw={tw}
              label="Transaction Date To"
              labelStyle={tw`font-inter mb-1`}
              value={dateToTransaction}
              placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
              style={tw`mt-2 mb-4`}
              setDate={setDateToTransaction}
            />

            <InputNumber
              tw={tw}
              label="Amount"
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              onChangeText={setAmount}
              value={amount}
              placeholder="$ 0.00"
              keyboardType={'decimal-pad'}
              icon={Dollar}
              iconStyle={tw`mr-2`}
              inputStyle={tw`h-11`}
            />

            <InputNumber
              style={tw`flex flex-1 pt-5`}
              inputStyle={tw`h-11`}
              inputStyle={tw`flex-1 rounded-b-none justify-center`}
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              label="Card Number"
              tw={tw}
              value={creditCardNumber}
              onChangeText={setCreditCardNumber}
              placeholder="Enter card number"
              keyboardType={'number-pad'}
            />
            <Text style={tw`font-inter font-medium text-sm text-gray-700 mt-4`}>
              Account Type
            </Text>
            <Checkbox
              tw={tw}
              value={creditCard}
              style={tw`ml-[-1rem]`}
              onPress={() => setCreditCard(!creditCard)}
              label="Credit Cartd"
              labelStyle={tw`font-inter font-medium text-sm text-gray-900`}
            />
            <Checkbox
              tw={tw}
              value={bankAccount}
              style={tw`ml-[-1rem]`}
              onPress={() => setBankAccount(!bankAccount)}
              label="Bank Account"
              labelStyle={tw`font-inter font-medium text-sm text-gray-900`}
            />
          </FadedScrollView>
        </View>

        <HR tw={tw} style={tw`bg-gray-200 h-[2px]`} />

        <View style={tw`my-3 mx-5`}>
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
            onPress={clearFilters}
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

export default FilterChargebacks;
