import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {t} from 'i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

import LocationContext from '../../../context/LocationContext';
import UserContext from '../../../context/UserContext';

import tw from '../../../../services/tw';
import {userHasResource} from '../../../../services/permissions';
import {getPostObject} from './services/getPostObject';

import CloseScreen from '../../../icons/close-screen';
import IconRight from '../../../icons/arrow-right-white';
import AlertRed from '../../../icons/alert-red';

import {Formik} from 'formik';
import * as Yup from 'yup';

import {Button, Card, H2, HR, AppStatusBar} from '@amplifiui/mobile';
import DropdownPickerModal from '../../../components/amplifi-ui/Dropdown/DropdownPickerModal';
import SelectCustomer from '../../../components/local/modal/SelectCustomer';
import SelectCustomerWallet from '../../../components/local/modal/SelectCustomersWallet';
import SelectTerminal from '../../../components/local/modal/SelectTerminal';
import TransactionInformation from './components/TransactionInformation';
import CustomerDetails from './components/CustomerDetails';
import PaymentAccountDetails from './components/PaymentAccountDetails';

import countries, {CountryType} from '../../../../services/lists/countries';
import states, {
  StatesListType,
  StateType,
} from '../../../../services/lists/states';

const extraFlagOptions = [
  {value: 'none', name: 'None'},
  {value: 'noshow', name: 'No Show'},
  {value: 'advancedeposit', name: 'Advance Deposit'},
];

type Nav = {
  navigate: (value: string, params?: any) => void;
};

const VirtualTerminal = () => {
  const insets = useSafeAreaInsets();
  const {navigate} = useNavigation<Nav>();
  const {locationContextState} = useContext(LocationContext);
  const {userContextState} = useContext(UserContext);

  const FormSchema = Yup.object().shape({
    payment_method: Yup.string(),
    is_cc: Yup.boolean(),
    is_cvv_enabled: Yup.boolean(),
    is_street_required: Yup.boolean(),
    is_zip_required: Yup.boolean(),
    is_avs_only: Yup.boolean(),
    amount: Yup.string().when('is_avs_only', {
      is: false,
      then: Yup.string().required('Required field.'),
    }),
    description: Yup.string().required('Required field.'),
    card_hold_name: Yup.string().when('payment_method', {
      is: 'manual',
      then: Yup.string().required('Required field.'),
    }),
    credit_card_number: Yup.string().when('payment_method', {
      is: 'manual',
      then: Yup.string().required('Required field.'),
    }),
    credit_card_date: Yup.string().when(['is_cc', 'payment_method'], {
      is: (is_cc: boolean, payment_method: string) =>
        is_cc === true && payment_method === 'manual',
      then: Yup.string().required('Required field.'),
    }),
    credit_card_CVC: Yup.string().when(
      ['is_cc', 'is_cvv_enabled', 'payment_method'],
      {
        is: (is_cc: boolean, is_cvv_enabled: boolean, payment_method: string) =>
          is_cc === true &&
          is_cvv_enabled === true &&
          payment_method === 'manual',
        then: Yup.string().required('Required field.'),
      },
    ),
    routing_number: Yup.string().when(['is_cc', 'payment_method'], {
      is: (is_cc: boolean, payment_method: string) =>
        is_cc === false && payment_method === 'manual',
      then: Yup.string().required('Required field.'),
    }),
    terminal: Yup.string().when('payment_method', {
      is: 'terminal',
      then: Yup.string().required('Required field.'),
    }),
    street: Yup.string().when('is_street_required', {
      is: true,
      then: Yup.string().required('Required field.'),
    }),
    zip_code: Yup.string().when('is_zip_required', {
      is: true,
      then: Yup.string().required('Required field.'),
    }),
  });

  const [showDepositAccountModal, setShowDepositAccountModal] = useState(false);
  const [depositAccounts, setDepositAccounts] = useState<
    {value: string; name: string}[]
  >([]);
  const [objDepositAccount, setObjDepositAccount] = useState(Object);
  const [showExtraFlagModal, setShowExtraFlagModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [labelCustomer, setLabelCustomer] = useState('');
  const [labelWallet, setLabelWallet] = useState('');
  const [showCustomersWalletModal, setShowCustomersWalletModal] =
    useState(false);
  const [labelCustomersWallet] = useState('');

  const [showSECModal, setShowSECModal] = useState(false);
  const [secs, setSecs] = useState([
    {name: 'WEB', value: 'WEB'},
    {name: 'PPD', value: 'PPD'},
  ]);
  const [showTerminalModal, setShowTerminalModal] = useState(false);
  const [showCountriesModal, setShowCountriesModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [showStatesModal, setShowStatesModal] = useState(false);
  const [statesList, setStatesList] = useState<StatesListType>([]);
  const [selectedState, setSelectedState] = useState('US');

  const [depositAccount, setDepositAccount] = useState('');
  const [typeOfTransaction, setTypeOfTransaction] = useState('');
  const [amount, setAmount] = useState(''); // Used in useEffect
  const [tip, setTip] = useState('');
  const [tax, setTax] = useState('');
  const [roomRate, setRoomRate] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [clerkNumber, setClerkNumber] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [extraFlag, setExtraFlag] = useState('none');
  const [custom1, setCustom1] = useState('');
  const [custom2, setCustom2] = useState('');
  const [custom3, setCustom3] = useState('');
  const [custom4, setCustom4] = useState('');
  const [customer, setCustomer] = useState(Object);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [customerWallet, setCustomerWallet] = useState(Object);
  const [sec, setSec] = useState('PPD');
  const [terminal, setTerminal] = useState(Object);
  const [accountOption, setAccountOption] = useState('');
  const [accountType, setAccountType] = useState('');
  const [country, setCountry] = useState<CountryType | undefined>();
  const [state, setState] = useState<StateType | undefined>();
  const [city, setCity] = useState('');
  const [billingPhone, setBillingPhone] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const formatCurrency = (value: String) => {
    if (!value || value === '0') {
      return '0.00';
    }
    let newValue = value.replace(/(\D)/g, '').replace(/^0+/, '');

    if (newValue.length <= 2) {
      newValue = newValue + '00';
    }

    newValue = newValue
      .replace(/(\d{2}$)/g, '.$&')
      .replace(/(\d{1})(\d{3})([.])/, '$1,$2$3')
      .replace(/(\d{1})(\d{3})([,])/, '$1,$2$3')
      .replace(/(\d{1})(\d{3})([,])/, '$1,$2$3');
    return newValue;
  };

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
    const depositAccountSelected =
      locationContextState?.locationSelected?.product_transactions.find(
        item => item.id === depositAccount,
      );
    setObjDepositAccount(depositAccountSelected);
  }, [depositAccount]);

  // Set SEC data
  useEffect(() => {
    const depositAccountSelected =
      locationContextState?.locationSelected?.product_transactions.find(
        item => item.id === depositAccount,
      );

    if (depositAccountSelected?.processor_data?.ach_sec_codes) {
      let arrSecsFormatted =
        depositAccountSelected?.processor_data?.ach_sec_codes.map(
          (item: string) => {
            return {value: item, name: item};
          },
        );

      arrSecsFormatted = arrSecsFormatted.filter(
        (item: {value: string; label: string}) => {
          if (accountType === 'business') {
            return item.value === 'CCD';
          } else if (accountType === 'personal') {
            return item.value !== 'CCD';
          }
        },
      );

      // Use reverse to display PPD first
      setSecs(arrSecsFormatted.reverse());
      setSec(arrSecsFormatted[0]?.value);
    }
  }, [accountType]);

  useEffect(() => {
    const country_ = countries.find(item => item.value === selectedCountry);
    setCountry(country_);

    const newList = states.find(item => item.country === selectedCountry);

    if (newList) {
      setStatesList(newList.states);
    }
  }, [selectedCountry]);

  useEffect(() => {
    const countryObj = states.find(item => item.country === selectedCountry);

    if (countryObj) {
      const selectedStateObj = countryObj.states.find(
        item => item.value === selectedState,
      );

      if (selectedStateObj) {
        setState(selectedStateObj);
      }
    }
  }, [selectedState]);

  useEffect(() => {
    setTotalAmount(
      parseInt(amount || '0', 10) +
        parseInt(tip || '0', 10) +
        parseInt(tax || '0', 10),
    );
  }, [amount, tip, tax]);

  let totalAmountFormatted = '$ ' + formatCurrency(totalAmount.toString());

  const showSurcharge = () => {
    if (objDepositAccount) {
      return (
        objDepositAccount.surcharge !== null &&
        (objDepositAccount.surcharge?.apply_to_user_type_id === null ||
          objDepositAccount.surcharge?.apply_to_user_type_id ===
            userContextState?.user_type_id) &&
        (typeOfTransaction !== 'refund' ||
          objDepositAccount.surcharge?.refund_surcharges)
      );
    }
    return false;
  };

  const toggleOff = () => {
    setLabelCustomer('');
    setCustomer({});
  };

  const onPressCloseButton = () => {
    setLabelWallet('');
    setCustomerWallet({});
  };

  return (
    <Formik
      initialValues={{
        payment_method: '',
        is_cc: false,
        is_cvv_enabled: false,
        is_street_required: false,
        is_zip_required: false,
        is_avs_only: false,
        amount: '',
        description: '',
        card_hold_name: '',
        credit_card_number: '',
        credit_card_date: '',
        credit_card_CVC: '',
        routing_number: '',
        terminal: '',
        street: '',
        zip_code: '',
      }}
      onSubmit={values => {
        const postObj = getPostObject(objDepositAccount, {
          locationId: locationContextState?.locationSelected?.id,
          depositAccount,
          amount,
          tip,
          tax,
          description: values.description,
          roomRate,
          roomNumber,
          checkIn,
          checkOut,
          extraFlag,
          clerkNumber,
          orderNumber,
          custom1,
          custom2,
          custom3,
          custom4,
          customer,
          paymentMethod,
          token_id: customerWallet?.id,
          sec,
          accountOption,
          accountType,
          cardHoldName: values.card_hold_name,
          creditCardNumber: values.credit_card_number,
          creditCardDate: values.credit_card_date,
          creditCardCVC: values.credit_card_CVC,
          routingNumber: values.routing_number,
          street: values.street,
          city,
          country,
          state,
          zipCode: values.zip_code,
          billingPhone,
          totalAmount,
          terminal: values.terminal,
        });

        /* Commented values should be adjusted or validate because they have default values
        that made them not be undefined, even if not displayed */
        navigate('ConfirmationLoading', {
          postObj,
          typeOfTransaction,
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
              <View style={tw`flex-1 ios:-mt-[${insets.top}]`}>
                <Card
                  tw={tw}
                  style={tw`shadow-xl pl-5 flex-row ios:mt-[${insets.top}]`}>
                  <TouchableOpacity
                    onPress={() => navigate('Payments')}
                    style={tw`py-3`}>
                    <SvgXml xml={CloseScreen} />
                  </TouchableOpacity>
                  <H2 tw={tw} style={tw`py-1.5 pl-5 font-inter text-gray-900`}>
                    Virtual Terminal
                  </H2>
                </Card>
                <ScrollView style={tw`flex-1 z-0 bg-gray-100`}>
                  <Card tw={tw} style={tw`shadow-xl p-5`}>
                    <>
                      {errors.amount ||
                      errors.card_hold_name ||
                      errors.credit_card_CVC ||
                      errors.credit_card_date ||
                      errors.credit_card_number ||
                      errors.description ||
                      errors.routing_number ||
                      errors.terminal ||
                      errors.street ||
                      errors.zip_code ? (
                        <View style={tw`bg-red-100 rounded flex-row p-3 mb-8`}>
                          <View>
                            <SvgXml style={tw`mr-2`} xml={AlertRed} />
                          </View>
                          <View>
                            <Text
                              style={tw`font-inter text-gray-900 font-medium mb-1`}>
                              Required field is missing.
                            </Text>
                            <Text style={tw`font-inter text-gray-900 text-sm`}>
                              Review your transaction details and enter the
                              information required.
                            </Text>
                          </View>
                        </View>
                      ) : null}

                      <TransactionInformation
                        depositAccountSelected={depositAccount}
                        extraFlagSelected={extraFlag}
                        extraFlagOptions={extraFlagOptions}
                        onChangeValues={(transaction: any) => {
                          setTypeOfTransaction(transaction.typeOfTransaction);
                          setAmount(transaction.amount);
                          setTip(transaction.tip);
                          setTax(transaction.tax);
                          setRoomRate(transaction.roomRate);
                          setRoomNumber(transaction.roomNumber);
                          setCheckIn(transaction.checkIn);
                          setCheckOut(transaction.checkOut);
                          setClerkNumber(transaction.clerkNumber);
                          setOrderNumber(transaction.orderNumber);
                          setCustom1(transaction.custom1);
                          setCustom2(transaction.custom2);
                          setCustom3(transaction.custom3);
                          setCustom4(transaction.custom4);
                        }}
                        onPressDepositAccount={() =>
                          setShowDepositAccountModal(true)
                        }
                        onPressExtraFlag={() => setShowExtraFlagModal(true)}
                        values={values}
                        handleChange={handleChange}
                        errors={errors}
                        setFieldTouched={setFieldTouched}
                      />
                      <HR style={tw`my-8 h-[0.25]`} tw={tw} color="gray-200" />
                      {userHasResource(userContextState, 'contacts', 'get') ? (
                        <>
                          <CustomerDetails
                            labelCustomer={labelCustomer}
                            customerSelected={customer}
                            onPressSelectCustomer={() =>
                              setShowCustomerModal(true)
                            }
                            onToggleOff={toggleOff}
                          />

                          <HR
                            style={tw`my-8 h-[0.25]`}
                            tw={tw}
                            color="gray-200"
                          />
                        </>
                      ) : null}
                      <PaymentAccountDetails
                        objDepositAccount={objDepositAccount}
                        labelWallet={labelWallet}
                        depositAccount={objDepositAccount}
                        labelCustomersWallet={labelCustomersWallet}
                        secSelected={sec}
                        terminalSelected={terminal?.title}
                        countrySelected={country?.name}
                        stateSelected={state?.name}
                        isCustomerSelected={customer.id ? true : false}
                        onChangeValues={(accountDetails: any) => {
                          setPaymentMethod(accountDetails.radioMethodType);
                          setAccountOption(accountDetails.radioAccountOption);
                          setAccountType(accountDetails.radioAccountType);
                          setCity(accountDetails.city);
                          setBillingPhone(accountDetails.billingPhone);
                        }}
                        onChange={setLabelWallet}
                        onPressCloseButton={onPressCloseButton}
                        onPressSelectCustomersWallet={() =>
                          setShowCustomersWalletModal(true)
                        }
                        onPressSelectSEC={() => setShowSECModal(true)}
                        onPressSelectTerminal={() => setShowTerminalModal(true)}
                        onPressSelectCountry={() => setShowCountriesModal(true)}
                        onPressSelectState={() => setShowStatesModal(true)}
                        values={values}
                        handleChange={handleChange}
                        errors={errors}
                        setFieldTouched={setFieldTouched}
                      />
                      {typeOfTransaction !== 'avsonly' ? (
                        <View
                          style={tw`shadow-none bg-gray-100 h-70 border rounded-md border-gray-200 p-4`}>
                          <H2 tw={tw} style={tw`py-2`}>
                            Transaction Summary
                          </H2>
                          <View style={tw`flex-row justify-between pb-2`}>
                            <Text
                              style={tw`py-2 font-inter font-medium text-gray-700 text-sm`}>
                              Subtotal amount
                            </Text>
                            <Text
                              style={tw`py-2 font-inter font-normal text-gray-600 text-sm`}>
                              $ {formatCurrency(amount)}
                            </Text>
                          </View>
                          <HR tw={tw} style={tw`bg-gray-200 h-[1px]`} />
                          <View style={tw`flex-row justify-between pb-2`}>
                            <Text
                              style={tw`py-2 font-inter font-medium text-gray-700 text-sm`}>
                              Tip
                            </Text>
                            <Text
                              style={tw`py-2 font-inter font-normal text-gray-600 text-sm`}>
                              $ {formatCurrency(tip)}
                            </Text>
                          </View>
                          <View style={tw`flex-row justify-between pb-2`}>
                            <Text
                              style={tw`py-2 font-inter font-medium text-gray-700 text-sm`}>
                              Tax
                            </Text>
                            <Text
                              style={tw`py-2 font-inter font-normal text-gray-600 text-sm`}>
                              $ {formatCurrency(tax)}
                            </Text>
                          </View>
                          {showSurcharge() ? (
                            <View style={tw`flex-row justify-between pb-2`}>
                              <Text
                                style={tw`py-2 font-inter font-medium text-gray-700 text-sm`}>
                                {objDepositAccount?.surcharge
                                  ?.surcharge_label ?? 'Surcharge'}
                              </Text>
                              <Text
                                style={tw`py-2 font-inter font-normal text-gray-600 text-sm`}>
                                $ {formatCurrency('0')}
                              </Text>
                            </View>
                          ) : null}
                          <HR tw={tw} style={tw`bg-gray-200 h-[1px]`} />
                          <View style={tw`flex-row justify-between pb-2`}>
                            <Text
                              style={tw`py-2 font-inter font-medium text-gray-700 text-sm`}>
                              Total Amount
                            </Text>
                            <H2
                              tw={tw}
                              style={tw`py-2 font-inter font-bold text-gray-900`}>
                              {totalAmountFormatted}
                            </H2>
                          </View>
                        </View>
                      ) : null}
                    </>
                  </Card>
                </ScrollView>
                <Card tw={tw} style={tw`shadow-xl p-5`}>
                  <Button
                    tw={tw}
                    style={tw`my-2`}
                    type="primary"
                    onPress={handleSubmit}
                    iconLeft={undefined}
                    iconRight={IconRight}>
                    {t('Process Transaction')}
                  </Button>
                </Card>
              </View>
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
          <DropdownPickerModal
            tw={tw}
            maxHeight={500}
            show={showExtraFlagModal}
            setShow={setShowExtraFlagModal}
            content={extraFlagOptions}
            selectedValue={extraFlag}
            onValueChange={setExtraFlag}
            numberOfLines={1}
            title="Select extra flag"
            showValue={false}
          />
          <SelectCustomer
            isVisible={showCustomerModal}
            setShow={setShowCustomerModal}
            onChange={setLabelCustomer}
            selectedCustomer={setCustomer}
          />
          <SelectCustomerWallet
            isVisible={showCustomersWalletModal}
            setShow={setShowCustomersWalletModal}
            customerId={customer.id}
            onChange={setLabelWallet}
            customerWalletSelected={setCustomerWallet}
          />
          <DropdownPickerModal
            tw={tw}
            maxHeight={500}
            show={showSECModal}
            setShow={setShowSECModal}
            content={secs}
            selectedValue={sec}
            onValueChange={setSec}
            title="Select SEC"
            showValue={false}
            key={sec}
          />
          <SelectTerminal
            isVisible={showTerminalModal}
            setShow={setShowTerminalModal}
            onChange={(value: any) => {
              setTerminal(value);
              values.terminal = value.id;
            }}
          />
          <DropdownPickerModal
            tw={tw}
            maxHeight={500}
            show={showCountriesModal}
            setShow={setShowCountriesModal}
            content={countries}
            selectedValue={selectedCountry}
            onValueChange={setSelectedCountry}
            title="Select country"
          />
          <DropdownPickerModal
            tw={tw}
            maxHeight={500}
            show={showStatesModal}
            setShow={setShowStatesModal}
            content={statesList}
            selectedValue={selectedState}
            onValueChange={setSelectedState}
            numberOfLines={1}
            title="Select state"
          />
        </>
      )}
    </Formik>
  );
};

export default VirtualTerminal;
