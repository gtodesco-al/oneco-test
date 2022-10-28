import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {
  AppStatusBar,
  Button,
  Checkbox,
  H2,
  HR,
  InputNumber,
  InputText,
} from '@amplifiui/mobile';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Formik} from 'formik';
import * as Yup from 'yup';

import tw from '../../../../services/tw';

import FadedScrollView from '../../../components/amplifi-ui/FadedScrollView';

import ArrowLeftBlack from '../../../icons/arrow-left-black';

import {creditCardMask, dateMask, zipCodeMask} from '../../../masks';
import Dropdown from '../../../components/amplifi-ui/Dropdown';
import countries, {CountryType} from '../../../../services/lists/countries';
import states, {
  StatesListType,
  StateType,
} from '../../../../services/lists/states';
import DropdownPickerModal from '../../../components/amplifi-ui/Dropdown/DropdownPickerModal';
import {api} from '../../../api';
import RootStackParamList from '../../RootStackParamList';
import LocationContext from '../../../context/LocationContext';
import {createCreditCard} from '../../../../services/api';
import {Token} from '@fortis/api/src/services/tokens.service';

type Props = NativeStackScreenProps<RootStackParamList, 'AddNewCreditCard'>;

const defaultErrorStyle = tw.style('text-xs font-normal text-red-500 pt-1');

const AddNewCreditCard = ({navigation, route}: Props) => {
  api.reAuthenticate(true);

  const {customerId} = route.params;

  const {locationContextState} = useContext(LocationContext);

  const FormSchema = Yup.object().shape({
    title: Yup.string().required('Required field.'),
    account_holder_name: Yup.string().required('Required field.'),
    account_number: Yup.string().required('Required fields.'),
    exp_date: Yup.string().required('Required fields.'),
  });

  const insets = useSafeAreaInsets();

  const [showCountriesModal, setShowCountriesModal] = useState(false);
  const [showStatesModal, setShowStatesModal] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedCountryObject, setSelectedCountryObject] = useState<
    CountryType | undefined
  >();

  const [selectedState, setSelectedState] = useState('US');

  const [statesList, setStatesList] = useState<StatesListType>([]);
  const [selectedStateObject, setSelectedStateObject] = useState<
    StateType | undefined
  >();

  const [runAVSTransaction, setRunAVSTransaction] = useState(false);

  useEffect(() => {
    const selectedCountryObject_ = countries.find(
      country => country.value === selectedCountry,
    );
    setSelectedCountryObject(selectedCountryObject_);

    const newList = states.find(country => country.country === selectedCountry);

    if (newList) {
      setStatesList(newList.states);
    }
  }, [selectedCountry]);

  useEffect(() => {
    const countryObj = states.find(
      country => country.country === selectedCountry,
    );

    if (countryObj) {
      const selectedStateObj = countryObj.states.find(
        state => state.value === selectedState,
      );

      if (selectedStateObj) {
        setSelectedStateObject(selectedStateObj);
      }
    }
  }, [selectedState]);

  return (
    <Formik
      initialValues={{
        title: '',
        account_holder_name: '',
        account_number: '',
        exp_date: '',
        contact_id: '',
        ach_sec_code: '',
        billing_address: '',
        billing_city: '',
        billing_zip: '',
        account_vault_api_id: '',
      }}
      onSubmit={(values, {resetForm}) => {
        const location_id = locationContextState?.locationSelected?.id;

        if (location_id) {
          const processedObj: Token = {
            location_id,
            title: values.title || undefined,
            account_holder_name: values.account_holder_name || undefined,
            account_number: values.account_number || undefined,
            exp_date: values.exp_date || undefined,
            billing_address: {
              street: values.billing_address || undefined,
              city: values.billing_city || undefined,
              state: selectedStateObject?.value || undefined,
              postal_code: values.billing_zip || undefined,
              // phone: null,
            },
            contact_id: customerId || undefined,
            run_avs: runAVSTransaction || undefined,
          };
          // console.log('processedObj:', processedObj);

          if (values.account_vault_api_id !== '') {
            processedObj.account_vault_api_id = values.account_vault_api_id;
          }

          (async () => {
            try {
              await createCreditCard(processedObj, navigation as any);

              resetForm();

              navigation.goBack();
            } catch (e) {
              console.error(
                '[AddNewCreditCard] error while adding new credit card:',
                e,
              );
            }
          })();
        }
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
              <View style={tw`flex-1 mt-4`}>
                <View style={tw`shadow-xl pl-5 flex-row`}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tw`py-3`}>
                    <SvgXml xml={ArrowLeftBlack} />
                  </TouchableOpacity>
                  <H2 tw={tw} style={tw`py-1.5 pl-5 font-inter text-gray-900`}>
                    Add New Credit Card
                  </H2>
                </View>
                <FadedScrollView style={tw`flex-1 z-0 bg-white m-5`} tw={tw}>
                  <Text
                    style={tw`my-5 text-gray-700 font-inter font-medium text-xl mb-4`}>
                    Card Details
                  </Text>
                  <InputText
                    tw={tw}
                    label="Title"
                    labelStyle={tw`font-inter font-bold pb-1`}
                    onChangeText={handleChange('title')}
                    value={values.title}
                    placeholder="Enter wallet title"
                    inputStyle={tw`h-11`}
                    style={tw`py-2`}
                    onBlur={() => setFieldTouched('title', true)}
                    error={errors.title}
                    required={true}
                  />
                  <InputText
                    tw={tw}
                    label="Card Holder Name"
                    labelStyle={tw`font-inter font-bold pb-1`}
                    onChangeText={handleChange('account_holder_name')}
                    value={values.account_holder_name}
                    placeholder="Enter card holder name"
                    inputStyle={tw`h-11`}
                    style={tw`py-2`}
                    onBlur={() => setFieldTouched('account_holder_name', true)}
                    error={errors.account_holder_name}
                    required={true}
                  />
                  <View style={tw`py-2`}>
                    <InputNumber
                      inputStyle={tw`rounded-b-none h-11 justify-center`}
                      labelStyle={tw`font-inter font-bold pb-1`}
                      label="Card Details"
                      tw={tw}
                      value={values.account_number}
                      onChangeText={handleChange('account_number')}
                      placeholder="Card Number"
                      mask={creditCardMask}
                      keyboardType={'number-pad'}
                      onBlur={() => setFieldTouched('account_number', true)}
                      required={true}
                    />
                    <InputNumber
                      inputStyle={tw`border-t-0 rounded-t-none rounded-br-0 h-11`}
                      tw={tw}
                      onChangeText={handleChange('exp_date')}
                      value={values.exp_date}
                      placeholder="MM / YY"
                      mask={dateMask}
                      onBlur={() => setFieldTouched('exp_date', true)}
                    />
                  </View>
                  {(errors.exp_date || errors.account_number) && (
                    <Text style={{...defaultErrorStyle}}>
                      {errors.exp_date || errors.account_number}
                    </Text>
                  )}
                  <Checkbox
                    tw={tw}
                    value={runAVSTransaction}
                    onPress={() => setRunAVSTransaction(!runAVSTransaction)}
                    label="Run AVS Transaction"
                    labelStyle={tw`font-bold font-inter`}
                  />
                  <Text
                    style={tw`font-inter text-gray-500 text-sm ml-10 -mt-2`}>
                    Select this setting to verify the customer wallet if a
                    transaction has not been ran within the last 12 months to
                    avoid potential fees from card brands.
                  </Text>
                  <HR style={tw`my-4 h-[0.25]`} tw={tw} color="gray-200" />
                  <Text
                    style={tw`my-5 text-gray-700 font-inter font-medium text-xl mb-4`}>
                    Billing Information
                  </Text>
                  <InputText
                    tw={tw}
                    label="Street"
                    labelStyle={tw`font-inter font-bold pb-1`}
                    onChangeText={handleChange('billing_address')}
                    value={values.billing_address}
                    placeholder="Enter street address"
                    inputStyle={tw`h-11`}
                    style={tw`py-2`}
                    onBlur={() => setFieldTouched('billing_address', true)}
                    error={errors.billing_address}
                  />
                  <InputText
                    tw={tw}
                    label="City"
                    labelStyle={tw`font-inter font-bold pb-1`}
                    onChangeText={handleChange('billing_city')}
                    value={values.billing_city}
                    placeholder="Enter city name"
                    inputStyle={tw`h-11`}
                    style={tw`py-2`}
                    onBlur={() => setFieldTouched('billing_city', true)}
                    error={errors.billing_city}
                  />
                  <Dropdown
                    tw={tw}
                    label="Country"
                    labelStyle={tw`font-inter font-bold pb-1 mt-2`}
                    placeholder="Select Country"
                    placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                    onPress={() => setShowCountriesModal(!showStatesModal)}
                    value={selectedCountryObject?.name || ''}
                    dropDownStyle={tw`h-11`}
                  />
                  <Dropdown
                    tw={tw}
                    label="State"
                    labelStyle={tw`font-inter font-bold pb-1 mt-2`}
                    placeholder="Select State"
                    placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                    onPress={() => setShowStatesModal(!showStatesModal)}
                    value={selectedStateObject?.name || ''}
                    requiredStyle={tw`pt-2`}
                    dropDownStyle={tw`h-11`}
                  />
                  <InputNumber
                    tw={tw}
                    label="Zip Code"
                    labelStyle={tw`font-inter font-bold pb-1`}
                    inputStyle={tw`h-11`}
                    onChangeText={handleChange('billing_zip')}
                    value={values.billing_zip}
                    placeholder="Enter zip code"
                    style={tw`py-2`}
                    onBlur={() => setFieldTouched('billing_zip', true)}
                    error={errors.billing_zip}
                    mask={zipCodeMask}
                  />
                  <HR style={tw`my-4 h-[0.25]`} tw={tw} color="gray-200" />
                  <Text
                    style={tw`my-5 text-gray-700 font-inter font-medium text-xl`}>
                    Advanced Settings
                  </Text>
                  <InputText
                    tw={tw}
                    label="Customer API ID"
                    labelStyle={tw`font-inter font-bold pb-1`}
                    onChangeText={handleChange('account_vault_api_id')}
                    value={values.account_vault_api_id}
                    placeholder="Enter API ID"
                    inputStyle={tw`h-11`}
                    style={tw`py-2`}
                    onBlur={() => setFieldTouched('account_vault_api_id', true)}
                    error={errors.account_vault_api_id}
                    helper="Leave this field blank if you are unsure of what to do"
                  />
                </FadedScrollView>
              </View>
              {/* Buttons group */}
              <View style={tw`my-4 mx-5`}>
                <Button
                  tw={tw}
                  onPress={handleSubmit}
                  type="primary"
                  style={tw`mb-3`}>
                  Save Card
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
            </SafeAreaView>
          </View>
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

export default AddNewCreditCard;
