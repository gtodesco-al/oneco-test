import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {
  AppStatusBar,
  Button,
  H2,
  HR,
  InputNumber,
  InputText,
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
import DropdownPickerModal from '../../../components/amplifi-ui/Dropdown/DropdownPickerModal';
import {api} from '../../../api';
import RootStackParamList from '../../RootStackParamList';
import LocationContext from '../../../context/LocationContext';
import {getToken, updateACH} from '../../../../services/api';
import {Token} from '@fortis/api/src/services/tokens.service';
import capitalize from '../../../../services/capitalize';

type Props = NativeStackScreenProps<RootStackParamList, 'EditACH'>;

const EditACH = ({navigation, route}: Props) => {
  api.reAuthenticate(true);

  const {tokenId} = route.params;

  const {locationContextState} = useContext(LocationContext);

  const FormSchema = Yup.object().shape({
    title: Yup.string().required('Required field.'),
    account_holder_name: Yup.string().required('Required field.'),
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

  const [originalToken, setOriginalToken] = useState<Token>();

  useEffect(() => {
    (async () => {
      const token_ = (await getToken(tokenId, navigation))[0];
      setOriginalToken(token_);

      if (token_.billing_address.state) {
        setSelectedState(token_.billing_address.state);
      }
    })();
  }, []);

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
      enableReinitialize={true}
      initialValues={{
        title: originalToken?.title,
        account_holder_name: originalToken?.account_holder_name,
        routing_number: originalToken?.routing_number,
        account_number: originalToken?.account_number,
        billing_address: originalToken?.billing_address.street,
        billing_city: originalToken?.billing_address.city,
        billing_zip: originalToken?.billing_address.postal_code,
        account_vault_api_id: originalToken?.token_api_id,
      }}
      onSubmit={(values, {resetForm}) => {
        const location_id = locationContextState?.locationSelected?.id;

        if (location_id && values) {
          const processedObj: Token = {
            billing_address: {
              street: values.billing_address,
              city: values.billing_city,
              state: selectedStateObject?.value,
              postal_code: values.billing_zip,
            },
            account_vault_api_id: values.account_vault_api_id,
          };

          if (values.title) {
            processedObj.title = values.title;
          }
          if (values.account_holder_name) {
            processedObj.account_holder_name = values.account_holder_name;
          }
          // console.log('processedObj:', processedObj);

          (async () => {
            try {
              await updateACH(
                originalToken?.id,
                processedObj,
                navigation as any,
              );

              resetForm();

              navigation.goBack();
            } catch (e: any) {
              console.error(
                '[AddNewACH] error while updating ach:',
                JSON.stringify(e),
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
                    Edit Bank Account
                  </H2>
                </View>
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
                    value={values.title || ''}
                    placeholder="Enter wallet title"
                    style={tw`py-2`}
                    inputStyle={tw`h-11`}
                    required={true}
                    onBlur={() => setFieldTouched('title', true)}
                    error={errors.title}
                  />
                  <InputText
                    tw={tw}
                    label="Account Holder Name"
                    labelStyle={tw`font-inter font-bold pb-1`}
                    onChangeText={handleChange('account_holder_name')}
                    value={values.account_holder_name || ''}
                    placeholder="Enter account holder name"
                    style={tw`py-2`}
                    inputStyle={tw`h-11`}
                    required={true}
                    onBlur={() => setFieldTouched('account_holder_name', true)}
                    error={errors.account_holder_name}
                  />
                  <View style={tw`flex-row justify-between mt-5`}>
                    <Text
                      style={tw`text-gray-600 font-normal text-sm font-inter`}>
                      SEC Code
                    </Text>
                    <Text
                      style={tw`text-gray-900 font-medium text-sm font-inter`}>
                      {originalToken?.ach_sec_code || '-'}
                    </Text>
                  </View>
                  <View style={tw`flex-row justify-between mt-5`}>
                    <Text
                      style={tw`text-gray-600 font-normal text-sm font-inter`}>
                      Account Option
                    </Text>
                    <Text
                      style={tw`text-gray-900 font-medium text-sm font-inter`}>
                      {capitalize(originalToken?.account_type) || '-'}
                    </Text>
                  </View>
                  <View style={tw`flex-row justify-between mt-5`}>
                    <Text
                      style={tw`text-gray-600 font-normal text-sm font-inter`}>
                      Account Type
                    </Text>
                    <Text
                      style={tw`text-gray-900 font-medium text-sm font-inter`}>
                      {originalToken?.ach_sec_code === 'CCD'
                        ? 'Business'
                        : 'Personal'}
                    </Text>
                  </View>
                  <View style={tw`flex-row justify-between mt-5`}>
                    <Text
                      style={tw`text-gray-600 font-normal text-sm font-inter`}>
                      Routing Number
                    </Text>
                    <Text
                      style={tw`text-gray-900 font-medium text-sm font-inter`}>
                      {originalToken?.routing_number || '-'}
                    </Text>
                  </View>
                  <View style={tw`flex-row justify-between mt-5`}>
                    <Text
                      style={tw`text-gray-600 font-normal text-sm font-inter`}>
                      Account Number
                    </Text>
                    <Text
                      style={tw`text-gray-900 font-medium text-sm font-inter`}>
                      {originalToken?.last_four || '-'}
                    </Text>
                  </View>
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
                    value={values.billing_address || ''}
                    placeholder="Enter street address"
                    style={tw`py-2`}
                    inputStyle={tw`h-11`}
                    onBlur={() => setFieldTouched('billing_address', true)}
                    error={errors.billing_address}
                  />
                  <InputText
                    tw={tw}
                    label="City"
                    labelStyle={tw`font-inter font-bold pb-1`}
                    onChangeText={handleChange('billing_city')}
                    value={values.billing_city || ''}
                    placeholder="Enter city name"
                    style={tw`py-2`}
                    inputStyle={tw`h-11`}
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
                    value={values.billing_zip || ''}
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
                    value={values.account_vault_api_id || ''}
                    placeholder="Enter API ID"
                    style={tw`py-2`}
                    inputStyle={tw`h-11`}
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
        </>
      )}
    </Formik>
  );
};

export default EditACH;
