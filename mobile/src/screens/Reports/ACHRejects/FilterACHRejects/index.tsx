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
import Dropdown from '../../../../components/amplifi-ui/Dropdown';
import DropdownPickerModal from '../../../../components/amplifi-ui/Dropdown/DropdownPickerModal';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const listMerchant = [
  {
    value: '1',
    name: 'Merchant Account',
  },

  {
    value: '2',
    name: 'Merchant Account',
  },

  {
    value: '3',
    name: 'Merchant Account',
  },
];

const FilterACHRejects = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();
  const [reportedDateFrom, setReportedDateFrom] = useState<Date>(new Date());
  const [reportedDateTo, setReportedDateTo] = useState<Date>(new Date());
  const [transactionDateFrom, setTransactionDateFrom] = useState<Date>(
    new Date(),
  );
  const [transactionDateTo, setTransactionDateTo] = useState<Date>(new Date());
  const [amount, setAmount] = useState('');
  const [reasonDescription, setReasonDescription] = useState('');
  const [reason, setReason] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [traceNumber, setTraceNumber] = useState('');
  const [showMerchantModal, setShowMerchantModal] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState('');

  const clearFilters = () => {
    setReportedDateFrom(new Date());
    setReportedDateTo(new Date());
    setTransactionDateFrom(new Date());
    setTransactionDateTo(new Date());
    setReason('');
    setAmount('');
    setAccountNumber('');
    setTraceNumber('');
    setSelectedMerchant('');
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
                label="Reject amount"
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

              <InputNumber
                style={tw`mt-4`}
                inputStyle={tw`flex-1 rounded-b-none justify-center h-11`}
                labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                label="Reason Code"
                tw={tw}
                value={reason}
                onChangeText={setReason}
                placeholder="Enter reason code"
                keyboardType={'number-pad'}
              />

              <InputText
                tw={tw}
                style={tw`mt-4`}
                inputStyle={tw`h-11`}
                label="Reason Description"
                labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                placeholder={'Search deposit'}
                onChangeText={setReasonDescription}
                value={reasonDescription}
              />

              <InputNumber
                style={tw`mt-4`}
                inputStyle={tw`flex-1 rounded-b-none justify-center h-11`}
                labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                label="Account Number"
                tw={tw}
                value={accountNumber}
                onChangeText={setAccountNumber}
                placeholder="Enter reason code"
                keyboardType={'number-pad'}
              />

              <InputNumber
                style={tw`mt-4`}
                inputStyle={tw`flex-1 rounded-b-none justify-center h-11`}
                labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                label="Trace Number"
                tw={tw}
                value={traceNumber}
                onChangeText={setTraceNumber}
                placeholder="Enter reason code"
                keyboardType={'number-pad'}
              />

              <Dropdown
                tw={tw}
                label="Merchant Account"
                labelStyle={tw`font-inter mb-1`}
                placeholder="Select merchant account"
                placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                style={tw`mb-4 mt-4`}
                onPress={() => setShowMerchantModal(!showMerchantModal)}
                value={selectedMerchant}
                dropDownStyle={tw`h-11`}
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
      <DropdownPickerModal
        tw={tw}
        maxHeight={500}
        show={showMerchantModal}
        setShow={setShowMerchantModal}
        content={listMerchant}
        selectedValue={selectedMerchant}
        onValueChange={setSelectedMerchant}
        title="Select merchant account"
      />
    </>
  );
};

export default FilterACHRejects;
