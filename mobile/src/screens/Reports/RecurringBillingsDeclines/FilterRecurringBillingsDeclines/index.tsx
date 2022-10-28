import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import FadedScrollView from '../../../../components/amplifi-ui/FadedScrollView';
import DatePicker from '../../../../components/amplifi-ui/DatePicker';
import {
  AppStatusBar,
  H2,
  Button,
  HR,
  Masks,
  InputNumber,
  InputText,
} from '@amplifiui/mobile';

import tw from '../../../../../services/tw';
import CloseScreen from '../../../../icons/close-screen';
import Dollar from '../../../../icons/dollar';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const FilterRecurringBillingsDeclines = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();
  const [reportedDateFrom, setReportedDateFrom] = useState<Date>(new Date());
  const [reportedDateTo, setReportedDateTo] = useState<Date>(new Date());
  const [transactionDateFrom, setTransactionDateFrom] = useState<Date>(
    new Date(),
  );
  const [transactionDateTo, setTransactionDateTo] = useState<Date>(new Date());
  const [amount, setAmount] = useState('');
  const [recurringTitle, setRecurringTitle] = useState('');
  const [reason, setReason] = useState('');

  const clearFilters = () => {
    setReportedDateFrom(new Date());
    setReportedDateTo(new Date());
    setTransactionDateFrom(new Date());
    setTransactionDateTo(new Date());
    setReason('');
    setAmount('');
    setRecurringTitle('');
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
              label="Reported Date From"
              labelStyle={tw`font-inter mb-1`}
              value={reportedDateFrom}
              placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
              setDate={setReportedDateFrom}
            />

            <DatePicker
              tw={tw}
              label="Reported Date To"
              labelStyle={tw`font-inter mb-1`}
              value={reportedDateTo}
              placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
              style={tw`mt-4`}
              setDate={setReportedDateTo}
            />

            <DatePicker
              tw={tw}
              label="Transaction Date To"
              labelStyle={tw`font-inter mb-1`}
              value={transactionDateFrom}
              placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
              style={tw`mt-4`}
              setDate={setTransactionDateFrom}
            />

            <DatePicker
              tw={tw}
              label="Transaction Date From"
              labelStyle={tw`font-inter mb-1`}
              value={transactionDateTo}
              placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
              style={tw`mt-4`}
              setDate={setTransactionDateTo}
            />

            <InputNumber
              tw={tw}
              label="Transaction amount"
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              onChangeText={setAmount}
              value={amount}
              placeholder="$ 0.00"
              keyboardType={'decimal-pad'}
              style={tw`mt-4`}
              inputStyle={tw`h-11`}
              icon={Dollar}
              iconStyle={tw`mr-4`}
              mask={Masks.CURRENCY.US}
            />

            <InputText
              tw={tw}
              style={tw`mt-4`}
              inputStyle={tw`h-11`}
              label="Recurring Title"
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              placeholder={'Search deposit'}
              onChangeText={setRecurringTitle}
              value={recurringTitle}
            />

            <InputNumber
              style={tw`mt-4`}
              inputStyle={tw`flex-1 rounded-b-none justify-center h-11`}
              labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
              label="Reason"
              tw={tw}
              value={reason}
              onChangeText={setReason}
              placeholder="Enter reason code"
              keyboardType={'number-pad'}
            />
          </FadedScrollView>
        </View>

        <HR tw={tw} style={tw`bg-gray-200 h-[2px]`} />

        <View style={tw`my-3 mx-5`}>
          <Button
            tw={tw}
            onPress={() => console.log('Apply')}
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

export default FilterRecurringBillingsDeclines;
