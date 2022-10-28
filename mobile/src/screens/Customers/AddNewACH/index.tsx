import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {
  AppStatusBar,
  Button,
  H2,
  HR,
  InputNumber,
  InputText,
  // ToastMessage,
  // RadioGroup,
} from '@amplifiui/mobile';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Formik} from 'formik';
import * as Yup from 'yup';

import tw from '../../../../services/tw';

import FadedScrollView from '../../../components/amplifi-ui/FadedScrollView';

import ArrowLeftBlack from '../../../icons/arrow-left-black';

import {zipCodeMask} from '../../../masks';
import Dropdown from '../../../components/amplifi-ui/Dropdown';
import countries, {CountryType} from '../../../../services/lists/countries';
import states, {
  StatesListType,
  StateType,
} from '../../../../services/lists/states';
import secCodes from '../../../../services/lists/secCodes';
import DropdownPickerModal from '../../../components/amplifi-ui/Dropdown/DropdownPickerModal';
import {api} from '../../../api';
import RootStackParamList from '../../RootStackParamList';
import LocationContext from '../../../context/LocationContext';
import {createACH} from '../../../../services/api';
import {Token} from '@fortis/api/src/services/tokens.service';
import RadioGroup from '../../../components/amplifi-ui/RadioGroup';
import ToastMessage from '../../../components/amplifi-ui/ToastMessage';

type Props = NativeStackScreenProps<RootStackParamList, 'AddNewACH'>;

const accountTypes = [
  {
    key: 1,
    label: 'Personal',
  },
  {
    key: 2,
    label: 'Business',
  },
];

type accountOptionsTypes = 'checking' | 'savings' | null;
const accountOptions = [
  {
    key: 1,
    label: 'Checking',
  },
  {
    key: 2,
    label: 'Savings',
  },
];

type SECCode = 'WEB' | 'CCD' | 'PPD' | 'POP' | 'TEL' | null;

const AddNewACH = ({navigation, route}: Props) => {
  api.reAuthenticate(true);

  const {customerId} = route.params;

  const {locationContextState} = useContext(LocationContext);

  const FormSchema = Yup.object().shape({
    title: Yup.string().required('Required field.'),
    account_holder_name: Yup.string().required('Required field.'),
    routing_number: Yup.string().required('Required field.'),
    account_number: Yup.string().required('Required field.'),
  });

  const insets = useSafeAreaInsets();

  const [showError, setShowError] = useState(false);

  const [APIError, setAPIError] = useState('');

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

  const [selectedSECCode, setSelectedSECCode] = useState<SECCode>('PPD');
  const [showSECCodeModal, setShowSECCodeModal] = useState(false);

  const [selectedAccountOption, setSelectedAccountOption] = useState(1);
  const changeAccountOptions = (value: {
    key: number;
    label: 'Checking' | 'Savings';
  }) => {
    setSelectedAccountOption(value.key);
  };

  const [selectedAccountType, setSelectedAccountType] = useState(1);

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

  useEffect(() => {
    setSelectedAccountType(selectedSECCode === 'CCD' ? 2 : 1);
  }, [selectedSECCode]);

  return (
    <Formik
      initialValues={{
        title: '',
        account_holder_name: '',
        routing_number: '',
        account_number: '',
        billing_address: '',
        billing_city: '',
        billing_zip: '',
        account_vault_api_id: '',
      }}
      onSubmit={(values, {resetForm}) => {
        const location_id = locationContextState?.locationSelected?.id;
        console.log('location_id:', location_id);

        if (location_id) {
          const ao = accountOptions.find(a => a.key === selectedAccountOption);
          const at = accountTypes.find(t => t.key === selectedAccountType);

          const processedObj: Token = {
            location_id,
            title: values.title || undefined,
            account_holder_name: values.account_holder_name || undefined,
            account_number: values.account_number || undefined,
            billing_address: {
              street: values.billing_address || undefined,
              city: values.billing_city || undefined,
              state: selectedStateObject?.value || undefined,
              postal_code: values.billing_zip || undefined,
              phone: undefined,
            },
            contact_id: customerId,
            is_company: at?.label === 'Business' ? true : false,
            account_type:
              ao?.label && ao?.label !== ''
                ? (ao?.label.toLowerCase() as accountOptionsTypes)
                : null,
            routing_number: values.routing_number || undefined,
            ach_sec_code: selectedSECCode || undefined,
            account_vault_api_id: values.account_vault_api_id || undefined,
          };

          (async () => {
            try {
              await createACH(processedObj, navigation as any);

              resetForm();

              navigation.goBack();
            } catch (e: any) {
              console.error(
                '[AddNewACH] error while adding new ach:',
                e.toJSON(),
              );
              setAPIError(
                'Unprocessable. Please, check if have a valid Routing Number.',
              );
              setShowError(true);
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
                    Add New Bank Account
                  </H2>
                </View>
                <ToastMessage
                  tw={tw}
                  style={tw`mx-4`}
                  textStyle={tw`font-inter`}
                  show={showError}
                  showCallback={show => setShowError(show)}
                  type="error">
                  {APIError}
                </ToastMessage>
                <FadedScrollView style={tw`flex-1 z-0 bg-white m-5`} tw={tw}>
                  <Text
                    style={tw`my-5 text-gray-700 font-inter font-medium text-xl mb-4`}>
                    Account Details
                  </Text>
                  <InputText
                    tw={tw}
                    label="Title"
                    labelStyle={tw`font-inter font-bold pb-1`}
                    onChangeText={handleChange('title')}
                    value={values.title}
                    placeholder="Enter wallet title"
                    style={tw`py-2`}
                    inputStyle={tw`h-11`}
                    onBlur={() => setFieldTouched('title', true)}
                    error={errors.title}
                    required={true}
                  />
                  <InputText
                    tw={tw}
                    label="Account Holder Name"
                    labelStyle={tw`font-inter font-bold pb-1`}
                    onChangeText={handleChange('account_holder_name')}
                    value={values.account_holder_name}
                    placeholder="Enter account holder name"
                    inputStyle={tw`h-11`}
                    style={tw`py-2`}
                    onBlur={() => setFieldTouched('account_holder_name', true)}
                    error={errors.account_holder_name}
                    required={true}
                  />
                  <Dropdown
                    tw={tw}
                    label="SEC Code"
                    labelStyle={tw`font-inter font-bold pb-1 mt-2`}
                    placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                    onPress={() => setShowSECCodeModal(!showSECCodeModal)}
                    value={selectedSECCode || ''}
                    required={true}
                    requiredStyle={tw`pt-2`}
                    dropDownStyle={tw`h-11`}
                  />
                  <RadioGroup
                    tw={tw}
                    style={tw`mt-4`}
                    label="Account Options"
                    labelStyle={tw`font-inter font-bold`}
                    data={accountOptions}
                    showRadio={false}
                    onChangeOption={(v: any) => changeAccountOptions(v)}
                    value={selectedAccountOption}
                  />
                  <RadioGroup
                    tw={tw}
                    style={tw`mt-4`}
                    label="Account Type (not editable)"
                    labelStyle={tw`font-inter font-bold`}
                    data={accountTypes}
                    showRadio={false}
                    onChangeOption={() => null}
                    value={selectedAccountType}
                    dataStyle={tw`border-gray-200`}
                    textStyle={tw`text-gray-400`}
                    disabled={true}
                  />
                  <InputText
                    tw={tw}
                    label="Routing Number"
                    labelStyle={tw`font-inter font-bold pb-1`}
                    onChangeText={handleChange('routing_number')}
                    value={values.routing_number}
                    placeholder="Enter routing number"
                    inputStyle={tw`h-11`}
                    style={tw`py-2`}
                    required={true}
                    onBlur={() => setFieldTouched('routing_number', true)}
                    error={errors.routing_number}
                  />
                  <InputText
                    tw={tw}
                    label="Account Number"
                    labelStyle={tw`font-inter font-bold pb-1`}
                    onChangeText={handleChange('account_number')}
                    value={values.account_number}
                    placeholder="Enter account number"
                    inputStyle={tw`h-11`}
                    style={tw`py-2`}
                    required={true}
                    onBlur={() => setFieldTouched('account_number', true)}
                    error={errors.account_number}
                  />
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
                    onChangeText={handleChange('billing_zip')}
                    value={values.billing_zip}
                    placeholder="Enter zip code"
                    style={tw`py-2`}
                    inputStyle={tw`h-11`}
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
                  Save Account
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
          <DropdownPickerModal
            tw={tw}
            maxHeight={500}
            show={showSECCodeModal}
            setShow={setShowSECCodeModal}
            content={secCodes}
            selectedValue={selectedSECCode || ''}
            onValueChange={setSelectedSECCode}
            numberOfLines={1}
            title="Select SEC Code"
            showValue={false}
          />
        </>
      )}
    </Formik>
  );
};

export default AddNewACH;
