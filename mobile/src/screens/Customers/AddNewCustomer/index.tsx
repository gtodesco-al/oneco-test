import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';

import {
  AppStatusBar,
  H2,
  HR,
  InputNumber,
  InputText,
  InputPhone,
  Button,
} from '@amplifiui/mobile';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {parse} from 'date-fns';

import tw from '../../../../services/tw';

import CloseScreen from '../../../icons/close-screen';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Dropdown from '../../../components/amplifi-ui/Dropdown';
import states, {
  StatesListType,
  StateType,
} from '../../../../services/lists/states';
import countries, {CountryType} from '../../../../services/lists/countries';
import DropdownPickerModal from '../../../components/amplifi-ui/Dropdown/DropdownPickerModal';

import CreditCardLightBlue from '../../../icons/credit-card-light-blue';
import ArrowRightWhite from '../../../icons/arrow-right-white';
import {zipCodeMask} from '../../../masks';
import FadedScrollView from '../../../components/amplifi-ui/FadedScrollView';
import LocationContext from '../../../context/LocationContext';
import {api} from '../../../api';
import {createContact} from '../../../../services/api';
import DatePicker from '../../../components/amplifi-ui/DatePicker';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const AddNewCustomer = ({navigation}: Props) => {
  api.reAuthenticate(true);

  const {locationContextState} = useContext(LocationContext);

  const today = new Date();

  Yup.addMethod(Yup.string, 'dateType', function (errorMessage) {
    return this.test('test-date-type', errorMessage, function (value) {
      const {path, createError} = this;

      if (value) {
        value = value.replace(/\//g, '');

        const newDate = parse(value, 'MMddyyyy', new Date());

        return (
          today.getTime() > newDate.getTime() ||
          createError({path, message: errorMessage})
        );
      } else {
        return true;
      }
    });
  });

  const FormSchema = Yup.object().shape({
    first_name: Yup.string().required('Required field.'),
    last_name: Yup.string().required('Required field.'),
    email: Yup.string().email().required('Required field.'),
    home_phone: Yup.string().required('Required field.'),
  });

  const insets = useSafeAreaInsets();

  const [showCountriesModal, setShowCountriesModal] = useState(false);
  const [showStatesModal, setShowStatesModal] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<'US' | 'CA'>('US');
  const [selectedCountryObject, setSelectedCountryObject] = useState<
    CountryType | undefined
  >();

  const [selectedState, setSelectedState] = useState('US');

  const [statesList, setStatesList] = useState<StatesListType>([]);
  const [selectedStateObject, setSelectedStateObject] = useState<
    StateType | undefined
  >();

  const [dateBirth, setDateBirth] = useState<Date | undefined>();
  const [dateBirthFormatted, setDateBirthFormatted] = useState<string>();

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
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        home_phone: '',
        cell_phone: '',
        address: '',
        city: '',
        zip: '',
        contact_api_id: '',
      }}
      onSubmit={(values, {resetForm}) => {
        const location_id = locationContextState?.locationSelected?.id;

        if (location_id && locationContextState?.locationSelected?.id) {
          const completeValues: any = {
            first_name: values.first_name,
            last_name: values.last_name,
            location_id: locationContextState?.locationSelected?.id,
            date_of_birth: dateBirthFormatted || undefined,
            email: values.email?.toLowerCase() || undefined,
            home_phone: values.home_phone || undefined,
            cell_phone: values.cell_phone || undefined,
            address: {
              city: values.city || undefined,
              country: selectedCountry || undefined,
              postal_code: values.zip || undefined,
              state: selectedStateObject?.name || undefined,
              street: values.address || undefined,
            },
            contact_api_id: values.contact_api_id || undefined,
          };

          if (dateBirth) {
            let dateFormatted = new Date(dateBirth).toISOString().split('T')[0];
            setDateBirthFormatted(dateFormatted);
          }

          (async () => {
            try {
              console.log('completeValues:', completeValues);
              await createContact(completeValues, navigation as any);

              resetForm();

              // navigation.goBack();
              navigation.navigate('Customers', {
                forceReload: new Date().getTime(),
              });
            } catch (e) {
              console.error(
                '[AddNewCustomer] error while adding new customer:',
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
                    <SvgXml xml={CloseScreen} />
                  </TouchableOpacity>
                  <H2 tw={tw} style={tw`py-1.5 pl-5 font-inter text-gray-900`}>
                    Add New Customer
                  </H2>
                </View>
                <FadedScrollView tw={tw} style={tw`flex-1 z-0 bg-white`}>
                  <View style={tw`m-5`}>
                    <Text
                      style={tw`my-5 text-gray-700 font-inter font-medium text-xl mb-4`}>
                      Customer Details
                    </Text>
                    <InputText
                      tw={tw}
                      label="First Name"
                      labelStyle={tw`font-inter font-bold pb-1`}
                      onChangeText={handleChange('first_name')}
                      value={values.first_name}
                      placeholder="Enter first name"
                      inputStyle={tw`h-11`}
                      style={tw`py-2`}
                      onBlur={() => setFieldTouched('first_name', true)}
                      error={errors.first_name}
                      required={true}
                    />
                    <InputText
                      tw={tw}
                      label="Last Name"
                      labelStyle={tw`font-inter font-bold pb-1`}
                      onChangeText={handleChange('last_name')}
                      value={values.last_name}
                      placeholder="Enter last name"
                      inputStyle={tw`h-11`}
                      style={tw`py-2`}
                      required={true}
                      onBlur={() => setFieldTouched('last_name', true)}
                      error={errors.last_name}
                    />
                    <DatePicker
                      tw={tw}
                      label="Date of Birth"
                      labelStyle={tw`font-inter font-bold pb-1`}
                      value={values.date_of_birth || undefined}
                      placeholder="00/00/0000"
                      placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                      style={tw`mt-2 mb-4`}
                      setDate={setDateBirth}
                    />
                    <HR style={tw`my-4 h-[0.25]`} tw={tw} color="gray-200" />
                    <Text
                      style={tw`my-5 text-gray-700 font-inter font-medium text-xl`}>
                      Contact Information
                    </Text>
                    <InputText
                      tw={tw}
                      label="Email"
                      labelStyle={tw`font-inter font-bold pb-1`}
                      onChangeText={handleChange('email')}
                      value={values.email}
                      placeholder="Enter customer email"
                      style={tw`py-2`}
                      inputStyle={tw`h-11`}
                      keyboardType="email-address"
                      required={true}
                      onBlur={() => setFieldTouched('email', true)}
                      error={errors.email}
                    />
                    <InputPhone
                      tw={tw}
                      label="Home Phone"
                      labelStyle={tw`font-inter font-bold pb-1`}
                      onChangeText={handleChange('home_phone')}
                      value={values.home_phone}
                      style={tw`py-2`}
                      required={true}
                      onBlur={() => setFieldTouched('home_phone', true)}
                      error={errors.home_phone}
                    />
                    <InputPhone
                      tw={tw}
                      label="Cell Phone"
                      labelStyle={tw`font-inter font-bold pb-1`}
                      onChangeText={handleChange('cell_phone')}
                      value={values.cell_phone}
                      style={tw`py-2`}
                      onBlur={() => setFieldTouched('cell_phone', true)}
                      error={errors.cell_phone}
                    />
                    <HR style={tw`my-4 h-[0.25]`} tw={tw} color="gray-200" />
                    <Text
                      style={tw`my-5 text-gray-700 font-inter font-medium text-xl`}>
                      Address Information
                    </Text>
                    <InputText
                      tw={tw}
                      label="Street"
                      labelStyle={tw`font-inter font-bold pb-1`}
                      onChangeText={handleChange('address')}
                      value={values.address}
                      placeholder="Enter street address"
                      style={tw`py-2`}
                      inputStyle={tw`h-11`}
                      onBlur={() => setFieldTouched('address', true)}
                      error={errors.address}
                    />
                    <InputText
                      tw={tw}
                      label="City"
                      labelStyle={tw`font-inter font-bold pb-1`}
                      onChangeText={handleChange('city')}
                      value={values.city}
                      placeholder="Enter city name"
                      style={tw`py-2`}
                      inputStyle={tw`h-11`}
                      onBlur={() => setFieldTouched('city', true)}
                      error={errors.city}
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
                      dropDownStyle={tw`h-11`}
                    />
                    <InputNumber
                      tw={tw}
                      label="Zip Code"
                      labelStyle={tw`font-inter font-bold pb-1`}
                      onChangeText={handleChange('zip')}
                      value={values.zip}
                      placeholder="Enter zip code"
                      style={tw`py-2`}
                      inputStyle={tw`h-11`}
                      onBlur={() => setFieldTouched('zip', true)}
                      error={errors.zip}
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
                      onChangeText={handleChange('contact_api_id')}
                      value={values.contact_api_id}
                      placeholder="Enter API ID"
                      style={tw`py-2`}
                      inputStyle={tw`h-11`}
                      onBlur={() => setFieldTouched('contact_api_id', true)}
                      error={errors.contact_api_id}
                      helper="Leave this field blank if you are unsure of what to do"
                    />
                    <HR style={tw`my-4 h-[0.25]`} tw={tw} color="gray-200" />
                    <View style={tw`bg-gray-200 p-5 rounded-md`}>
                      <Text
                        style={tw`font-inter text-gray-900 font-medium text-xl`}>
                        Wallet
                      </Text>
                      <View style={tw`flex-row justify-center my-6`}>
                        <View
                          style={tw`w-16 h-16 rounded-full bg-light-blue-100 justify-center`}>
                          <View style={tw`flex-row justify-center`}>
                            <SvgXml xml={CreditCardLightBlue} />
                          </View>
                        </View>
                      </View>
                      <Text
                        style={tw`mx-5 text-center font-inter text-gray-600 text-sm`}>
                        Customer creation is required to add a wallet item.
                      </Text>
                    </View>
                    <HR style={tw`my-4 h-[0.25]`} tw={tw} color="gray-200" />
                  </View>
                  <View style={tw`mb-4 mx-5`}>
                    <Button
                      tw={tw}
                      onPress={handleSubmit}
                      type="primary"
                      style={tw`mb-3`}
                      iconRight={ArrowRightWhite}>
                      Save
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
                </FadedScrollView>
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

export default AddNewCustomer;
