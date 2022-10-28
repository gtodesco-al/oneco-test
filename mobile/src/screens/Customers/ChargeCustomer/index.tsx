import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {
  AppStatusBar,
  Button,
  H2,
  HR,
  InputNumber,
  InputText,
  Masks,
} from '@amplifiui/mobile';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Formik} from 'formik';
import * as Yup from 'yup';

import tw from '../../../../services/tw';

import FadedScrollView from '../../../components/amplifi-ui/FadedScrollView';

import ArrowLeftBlack from '../../../icons/arrow-left-black';

import {api} from '../../../api';
import RootStackParamList from '../../RootStackParamList';
import LocationContext from '../../../context/LocationContext';
import {getCustomer} from '../../../../services/api';

import arrowDownBlack from '../../../icons/chevron-down';
import arrowRightWhite from '../../../icons/arrow-right-white';
import CloseInput from '../../../icons/close-input';
import Dollar from '../../../icons/dollar';
import SelectCustomersWallet from '../../../components/local/modal/SelectCustomersWallet';
import RadioGroup from '../../../components/amplifi-ui/RadioGroup';
import Dropdown from '../../../components/amplifi-ui/Dropdown';
import DropdownPickerModal from '../../../components/amplifi-ui/Dropdown/DropdownPickerModal';
import {getPostObject} from '../../Payments/VirtualTerminal/services/getPostObject';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';

const typesOfTransaction = [
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
    key: 'refund',
    label: 'Refund',
  },
];

type Nav = {
  navigate: (value: string, params?: any) => void;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ChargeCustomer'>;

const ChargeCustomer = ({navigation, route}: Props) => {
  api.reAuthenticate(true);

  const {navigate} = useNavigation<Nav>();

  const insets = useSafeAreaInsets();
  const {customerId, tokenId} = route.params;
  const {locationContextState} = useContext(LocationContext);

  const [depositAccountFiltered, setDepositAccountFiltered] = useState(Object);
  const [depositAccount, setDepositAccount] = useState('');
  const [depositAccounts, setDepositAccounts] = useState<
    {value: string; name: string}[]
  >([]);
  const [showDepositAccountModal, setShowDepositAccountModal] = useState(false);
  const [customerFullName, setCustomerFullName] = useState('');
  const [showCustomersWalletModal, setShowCustomersWalletModal] =
    useState(false);
  const [labelWallet, setLabelWallet] = useState('');

  const FormSchema = Yup.object().shape({
    token_id: Yup.string().required('Required field.'),
    amount: Yup.string().required('Required field.'),
    description: Yup.string().required('Required field.'),
  });

  useEffect(() => {
    (async () => {
      const customer_ = (await getCustomer(customerId, navigation))[0];
      setCustomerFullName(`${customer_.first_name} ${customer_.last_name}`);
    })();
  }, []);

  useEffect(() => {
    // Format deposit/merchant accounts to show within DropdownPicker
    const depositAccountsObjectFormatted =
      locationContextState?.locationSelected?.product_transactions.map(item => {
        return {value: item.id, name: item.title};
      });
    if (depositAccountsObjectFormatted) {
      setDepositAccounts(depositAccountsObjectFormatted);
    }

    // Default Deposit Account value -> default_cc takes preference
    const defaultCC = locationContextState?.locationSelected?.default_cc;
    const defaultACH = locationContextState?.locationSelected?.default_ach;
    if (defaultCC && defaultCC !== undefined) {
      setDepositAccount(defaultCC);
    } else if (defaultACH && defaultACH !== undefined) {
      setDepositAccount(defaultACH);
    }
  }, []);

  useEffect(() => {
    if (depositAccount) {
      const depositAccountFound =
        locationContextState?.locationSelected?.product_transactions.find(
          item => item.id === depositAccount,
        );
      setDepositAccountFiltered(depositAccountFound);
    }
  }, [depositAccount]);

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
    <Formik
      initialValues={{
        typeOfTransaction: 'sale',
        token_id: '',
        amount: '',
        tip: '',
        description: '',
      }}
      onSubmit={values => {
        const postObj = getPostObject(depositAccountFiltered, {
          amount: values.amount,
          description: values.description,
          tip: values.tip,
          totalAmount:
            parseInt(values.amount || '0', 10) +
            parseInt(values.tip || '0', 10),
          token_id: values.token_id,
          locationId: locationContextState?.locationSelected?.id,
          depositAccount: depositAccount,
        });

        navigate('ConfirmationLoading', {
          postObj,
          typeOfTransaction: values.typeOfTransaction,
        });
      }}
      validationSchema={FormSchema}>
      {({values, handleChange, errors, setFieldTouched, handleSubmit}) => (
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
              <KeyboardAwareScrollView>
                <View style={tw`flex-1 mt-4`}>
                  <View style={tw`shadow-xl pl-5 flex-row items-center`}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={tw`py-3`}>
                      <SvgXml xml={ArrowLeftBlack} />
                    </TouchableOpacity>
                    <H2
                      tw={tw}
                      style={tw`py-1.5 pl-5 font-inter text-gray-900`}>
                      Run Transaction
                    </H2>
                  </View>
                  <FadedScrollView style={tw`flex-1 z-0 bg-white m-5`} tw={tw}>
                    {showDepositAccount() && (
                      <Dropdown
                        tw={tw}
                        label="Select a Deposit Account"
                        labelStyle={tw`font-inter font-medium text-gray-700`}
                        style={tw`mb-4`}
                        placeholder="Account Identification Name - CC"
                        onPress={() => setShowDepositAccountModal(true)}
                        value={depositAccountFiltered.title}
                        dropDownStyle={tw`h-11`}
                      />
                    )}
                    <InputText
                      tw={tw}
                      label="Customer"
                      labelStyle={tw`font-inter font-bold pb-1`}
                      style={tw`py-2`}
                      inputStyle={tw`h-11`}
                      value={customerFullName}
                      onChangeText={() => {}}
                    />
                    <View style={tw`pt-4`}>
                      <Text
                        style={tw`font-inter font-medium text-gray-700 pb-1`}>
                        Select Customers Wallet
                      </Text>
                      <TouchableOpacity
                        style={tw.style(
                          'bg-white border p-3 h-12 rounded-md border-gray-300 flex-row',
                          errors.token_id && 'border-red-500',
                        )}
                        onPress={() => setShowCustomersWalletModal(true)}>
                        {labelWallet !== '' && (
                          <View
                            style={tw`flex-row flex-1 bg-blue-50 justify-between rounded h-6 mr-4`}>
                            <Text
                              style={tw`text-sm text-light-blue-800 font-medium pl-2`}>
                              {labelWallet}
                            </Text>
                            <TouchableOpacity
                              style={tw`justify-center pr-2`}
                              onPress={() => {
                                values.token_id = '';
                                handleChange('token_id');
                                setLabelWallet('');
                              }}>
                              <SvgXml xml={CloseInput} />
                            </TouchableOpacity>
                          </View>
                        )}
                        <View style={tw`justify-center`}>
                          <SvgXml xml={arrowDownBlack} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    {errors.token_id ? (
                      <Text style={tw`text-xs font-normal text-red-500 pt-1`}>
                        {errors.token_id}
                      </Text>
                    ) : null}
                    <RadioGroup
                      tw={tw}
                      label="Type of Transaction"
                      labelStyle={tw`font-inter font-medium text-gray-700`}
                      data={typesOfTransaction}
                      showRadio={false}
                      onChangeOption={(value: any) => {
                        values.typeOfTransaction = value.key;
                      }}
                      value={values.typeOfTransaction}
                      style={tw`mb-4 mt-4`}
                    />
                    <InputNumber
                      tw={tw}
                      label="Amount"
                      labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                      onChangeText={handleChange('amount')}
                      value={values.amount}
                      placeholder="$ 0.00"
                      style={tw.style('mb-4', errors.amount)}
                      keyboardType={'decimal-pad'}
                      icon={Dollar}
                      iconStyle={tw`mr-2`}
                      mask={Masks.CURRENCY.US}
                      required={true}
                      onBlur={() => setFieldTouched('amount', true)}
                      error={errors.amount}
                      inputStyle={tw.style(
                        'h-11',
                        errors.amount && 'border-red-500',
                      )}
                    />
                    <InputNumber
                      tw={tw}
                      label="Tip"
                      labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                      onChangeText={handleChange('tip')}
                      value={values.tip}
                      placeholder="$ 0.00"
                      style={tw.style('mb-4', errors.tip)}
                      keyboardType={'decimal-pad'}
                      icon={Dollar}
                      iconStyle={tw`mr-2`}
                      mask={Masks.CURRENCY.US}
                      onBlur={() => setFieldTouched('tip', true)}
                      error={errors.tip}
                      inputStyle={tw.style(
                        'h-11',
                        errors.tip && 'border-red-500',
                      )}
                    />
                    <InputText
                      tw={tw}
                      label="Description"
                      labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
                      onChangeText={handleChange('description')}
                      value={values.description}
                      placeholder="Enter a description"
                      style={tw.style(
                        'h-11 mb-10',
                        errors.description && 'mb-13',
                      )}
                      required={true}
                      onBlur={() => setFieldTouched('description', true)}
                      error={errors.description}
                      inputStyle={tw.style(
                        'h-11',
                        errors.description && 'border-red-500',
                      )}
                    />
                  </FadedScrollView>
                </View>
                <HR tw={tw} style={tw`h-[2px] bg-gray-200`} />
                <View style={tw`my-4 mx-5`}>
                  <Button
                    tw={tw}
                    onPress={handleSubmit}
                    type="primary"
                    style={tw`mb-3`}
                    iconRight={arrowRightWhite}>
                    Process Transaction
                  </Button>
                  <Button
                    tw={tw}
                    onPress={() => navigation.goBack()}
                    type="primary"
                    style={tw`bg-gray-50 shadow-sm border-gray-200`}
                    textStyle={tw`text-gray-900 text-[4]`}>
                    Cancel
                  </Button>
                </View>
              </KeyboardAwareScrollView>
            </SafeAreaView>
          </View>

          <DropdownPickerModal
            tw={tw}
            maxHeight={500}
            show={showDepositAccountModal}
            setShow={setShowDepositAccountModal}
            content={depositAccounts}
            selectedValue={depositAccount}
            onValueChange={setDepositAccount}
            numberOfLines={1}
            title="Select deposit account"
            showValue={false}
          />
          <SelectCustomersWallet
            isVisible={showCustomersWalletModal}
            setShow={setShowCustomersWalletModal}
            customerId={customerId}
            tokenId={tokenId}
            onChange={setLabelWallet}
            customerWalletSelected={(value: any) => {
              values.token_id = value.id;
              handleChange('token_id');
            }}
          />
        </>
      )}
    </Formik>
  );
};

export default ChargeCustomer;
