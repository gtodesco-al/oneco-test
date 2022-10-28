import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import FadedScrollView from '../../../../components/amplifi-ui/FadedScrollView';
import Dropdown from '../../../../components/amplifi-ui/Dropdown';
import DropdownPickerModal from '../../../../components/amplifi-ui/Dropdown/DropdownPickerModal';
import DatePicker from '../../../../components/amplifi-ui/DatePicker';

import {
  AppStatusBar,
  H2,
  Button,
  HR,
  Masks,
  InputNumber,
} from '@amplifiui/mobile';

import tw from '../../../../../services/tw';

import CloseScreen from '../../../../icons/close-screen';
import Dollar from '../../../../icons/dollar';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LocationContext from '../../../../context/LocationContext';
import DepositsFilterContext from '../../../../context/DepositsFilterContext';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const FilterCDeposit = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();
  const {locationContextState} = useContext(LocationContext);

  const [showMerchantAccountModal, setShowMerchantAccountModal] =
    useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState('');
  const [amount, setAmount] = useState<number | undefined>();
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  const [depositAccountSelected, setDepositAccountSelected] = useState('');
  const [depositAccount, setDepositAccount] = useState(Object);
  const [depositAccounts, setDepositAccounts] = useState<
    {value: string; name: string}[]
  >([]);

  const {depositsFilterContextState, setDepositsFilterContextState} =
    useContext(DepositsFilterContext);

  useEffect(() => {
    if (depositsFilterContextState?.date_effective_ts?.$gte) {
      const date_from = new Date(
        depositsFilterContextState?.date_effective_ts?.$gte * 1000,
      );
      setDateFrom(date_from);
    } else {
      setDateFrom(undefined);
    }

    if (depositsFilterContextState?.date_effective_ts?.$lte) {
      const date_to = new Date(
        depositsFilterContextState?.date_effective_ts?.$lte * 1000,
      );
      setDateTo(date_to);
    } else {
      setDateTo(undefined);
    }

    if (depositsFilterContextState?.amount) {
      setAmount(depositsFilterContextState?.amount);
    }

    if (depositsFilterContextState?.merchant_name) {
      setSelectedMerchant(depositsFilterContextState?.merchant_name);
    }
  }, [depositsFilterContextState]);

  const clearFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setAmount(undefined);
    setSelectedMerchant('');

    setDepositsFilterContextState({
      amount: undefined,
      merchant_name: undefined,
      date_effective_ts: undefined,
    });
  };

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

    setDepositsFilterContextState({
      ...depositsFilterContextState,
      amount: amount || undefined,
      merchant_name: selectedMerchant || undefined,
      date_effective_ts: {
        $gte: date_transaction_from,
        $lte: date_transaction_to,
      },
    });
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
                label="Effective Date From"
                labelStyle={tw`font-inter mb-1`}
                value={dateFrom}
                placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                setDate={setDateFrom}
              />
              <DatePicker
                tw={tw}
                label="Effective Date To"
                labelStyle={tw`font-inter mb-1`}
                value={dateTo}
                placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                style={tw`mt-4`}
                setDate={setDateTo}
              />
              <InputNumber
                tw={tw}
                label="Amount"
                labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                onChangeText={setAmount}
                value={amount}
                placeholder="$ 0.00"
                style={tw`mt-4`}
                inputStyle={tw`h-11`}
                keyboardType={'decimal-pad'}
                icon={Dollar}
                iconStyle={tw`mr-2`}
                mask={Masks.CURRENCY.US}
              />
              <Dropdown
                tw={tw}
                label="Merchant Account"
                labelStyle={tw`font-inter font-medium text-gray-700`}
                style={tw`mt-4`}
                placeholder="Select Account"
                placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                onPress={() =>
                  setShowMerchantAccountModal(!showMerchantAccountModal)
                }
                value={depositAccount?.title || ''}
                dropDownStyle={tw`h-11`}
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

export default FilterCDeposit;
