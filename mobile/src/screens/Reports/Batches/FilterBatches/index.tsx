/* eslint-disable prettier/prettier */
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
  InputText,
} from '@amplifiui/mobile';

import DatePicker from '../../../../components/amplifi-ui/DatePicker';
import RootStackParamList from '../../../RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FadedScrollView from '../../../../components/amplifi-ui/FadedScrollView';
import tw from '../../../../../services/tw';

import CloseScreen from '../../../../icons/close-screen';
import Dollar from '../../../../icons/dollar';
import BatchesFilterContext from '../../../../context/BatchesFilterContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Customers'>;
  setObjFilters: React.Dispatch<React.SetStateAction<object>>;
};

const FiltersBatches = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();

  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  const [batch, setBatch] = useState('');
  const [saleAmount, setSaleAmount] = useState('');
  const [saleCount, setSaleCount] = useState('');
  const [returnAmount, setReturnAmount] = useState('');
  const [returnCount, setReturnCount] = useState('');

  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(false);
  const [error, setError] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [unknown, setUnknown] = useState(false);
  const [forcedClosed, setForcedClosed] = useState(false);
  const [codeStatus, setCodeStatus] = useState<number | undefined>();

  const {batchesFilterContextState, setBatchesFilterContextState} =
    useContext(BatchesFilterContext);

  useEffect(() => {
    if (batchesFilterContextState?.created_ts?.$gte) {
      const date_from = new Date(batchesFilterContextState?.created_ts?.$gte * 1000);
      setDateFrom(date_from);
    } else {
      setDateFrom(undefined);
    }

    if (batchesFilterContextState?.created_ts?.$lte) {
     const date_to = new Date(batchesFilterContextState?.created_ts?.$lte * 1000);
      setDateTo(date_to);
    } else {
      setDateTo(undefined);
    }

    if (batchesFilterContextState?.batch_num) {
      setBatch(batchesFilterContextState?.batch_num);
    }

    if (batchesFilterContextState?.total_sale_amount) {
      setSaleAmount(batchesFilterContextState?.total_sale_amount);
    }

    if (batchesFilterContextState?.total_sale_count) {
      setSaleCount(batchesFilterContextState?.total_sale_count);
    }

    if (batchesFilterContextState?.total_refund_amount) {
      setReturnAmount(batchesFilterContextState?.total_refund_amount);
    }

    if (batchesFilterContextState?.total_refund_count) {
      setReturnCount(batchesFilterContextState?.total_refund_count);
    }

    if (batchesFilterContextState?.is_open === 1) {
      setOpen(true);
    } else if (batchesFilterContextState?.is_open === 0){
      setClosed(true);
    }
  }, [batchesFilterContextState]);

  const setClearFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setBatch('');
    setSaleAmount('');
    setSaleCount('');
    setReturnAmount('');
    setReturnCount('');
    setOpen(false);
    setClosed(false);
    setError(false);
    setProcessing(false);
    setUnknown(false);
    setForcedClosed(false);

    setBatchesFilterContextState({
      batch_num: undefined,
      total_sale_amount: undefined,
      total_sale_count: undefined,
      total_refund_amount: undefined,
      total_refund_count: undefined,
      is_open: undefined,
      created_ts: undefined,
    });
  };

  const setStatus = (num_status: number) => {
    setOpen(false);
    setClosed(false);
    setError(false);
    setProcessing(false);
    setUnknown(false);
    setForcedClosed(false);

    switch (num_status) {
      case 1:
        setOpen(!open);
        setCodeStatus(1);
        break;
      case 2:
        setClosed(!closed);
        setCodeStatus(2);
        break;
      case 3:
        setError(!error);
        setCodeStatus(3);
        break;
      case 4:
        setProcessing(!processing);
        setCodeStatus(4);
        break;
      case 5:
        setUnknown(!unknown);
        setCodeStatus(5);
        break;
      case 6:
        setForcedClosed(!forcedClosed);
        setCodeStatus(6);
        break;
    }
  };

  const processAndUpdateContext = () => {
    let date_transaction_from;
    let date_transaction_to;

    if (dateFrom) {
      const newDate = dateFrom.setHours(0,0,0,0);
      date_transaction_from = Math.round(newDate / 1000);
    }

    if (dateTo) {
      const newDate = dateTo.setHours(dateTo.getHours() + 24);
      date_transaction_to = Math.round(newDate / 1000);
    }

    setBatchesFilterContextState({
      ...batchesFilterContextState,
      batch_num: batch || undefined,
      total_sale_amount: saleAmount || undefined,
      total_sale_count: saleCount || undefined,
      total_refund_amount: returnAmount || undefined,
      total_refund_count: returnCount || undefined,
      processing_status_id: codeStatus || undefined,
      created_ts: {$gte: date_transaction_from, $lte: date_transaction_to},
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
              label="Batch Number"
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              onChangeText={setBatch}
              value={batch}
              placeholder="Enter batch number"
              keyboardType={'decimal-pad'}
            />
            <InputNumber
              tw={tw}
              style={tw`mb-4`}
              inputStyle={tw`h-11`}
              label="Sale Amount"
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              onChangeText={setSaleAmount}
              value={saleAmount}
              placeholder="$ 0.00"
              keyboardType={'decimal-pad'}
              icon={Dollar}
              iconStyle={tw`mr-2`}
            />

            <InputText
              tw={tw}
              style={tw`mb-4`}
              inputStyle={tw`h-11`}
              label="Sale Count"
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              onChangeText={setSaleCount}
              value={saleCount}
              placeholder="Enter name"
            />

            <InputNumber
              tw={tw}
              style={tw`mb-4`}
              inputStyle={tw`h-11`}
              label="Return Amount"
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              onChangeText={setReturnAmount}
              value={returnAmount}
              placeholder="$ 0.00"
              keyboardType={'decimal-pad'}
              icon={Dollar}
              iconStyle={tw`mr-2`}
            />

            <InputText
              tw={tw}
              style={tw`mb-4`}
              inputStyle={tw`h-11`}
              label="Return Count"
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              onChangeText={setReturnCount}
              value={returnCount}
              placeholder="Enter name"
            />

            <Text style={tw`font-inter font-medium text-gray-700`}>Status</Text>
            <Checkbox
              tw={tw}
              value={open}
              style={tw`ml-[-1rem]`}
              onPress={() => setStatus(1)}
              label="Open"
              labelStyle={tw`font-inter`}
            />
            <Checkbox
              tw={tw}
              value={closed}
              style={tw`ml-[-1rem]`}
              onPress={() => setStatus(2)}
              label="Closed"
              labelStyle={tw`font-inter`}
            />
            <Checkbox
              tw={tw}
              value={error}
              style={tw`ml-[-1rem]`}
              onPress={() => setStatus(3)}
              label="Error"
              labelStyle={tw`font-inter`}
            />
            <Checkbox
              tw={tw}
              value={processing}
              style={tw`ml-[-1rem]`}
              onPress={() => setStatus(4)}
              label="Processing"
              labelStyle={tw`font-inter`}
            />
            <Checkbox
              tw={tw}
              value={unknown}
              style={tw`ml-[-1rem]`}
              onPress={() => setStatus(5)}
              label="Unknown"
              labelStyle={tw`font-inter`}
            />
            <Checkbox
              tw={tw}
              value={forcedClosed}
              style={tw`ml-[-1rem]`}
              onPress={() => setStatus(6)}
              label="Forced Closed"
              labelStyle={tw`font-inter`}
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

export default FiltersBatches;
