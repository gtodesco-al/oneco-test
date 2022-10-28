import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';

import {
  AppStatusBar,
  H2,
  Button,
  InputText,
  Checkbox,
  ToggleButton,
  HR,
} from '@amplifiui/mobile';

import tw from '../../../../services/tw';
import CloseScreen from '../../../icons/close-screen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FadedScrollView from '../../../components/amplifi-ui/FadedScrollView';
import countries, {CountryType} from '../../../../services/lists/countries';
import states, {
  StatesListType,
  StateType,
} from '../../../../services/lists/states';
import Dropdown from '../../../components/amplifi-ui/Dropdown';
import DropdownPickerModal from '../../../components/amplifi-ui/Dropdown/DropdownPickerModal';
import DatePicker from '../../../components/amplifi-ui/DatePicker';

import RootStackParamList from '../../RootStackParamList';
import CustomerFilterContext from '../../../context/CustomerFilterContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Customers'>;
  setObjFilters: React.Dispatch<React.SetStateAction<object>>;
};

const FilterCustomer = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();
  const {navigate} = navigation;

  const [showCountriesModal, setShowCountriesModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [selectedCountryObject, setSelectedCountryObject] = useState<
    CountryType | ''
  >();

  const [showStatesModal, setShowStatesModal] = useState(false);
  const [selectedState, setSelectedState] = useState(undefined);
  const [statesList, setStatesList] = useState<StatesListType>([]);
  const [selectedStateObject, setSelectedStateObject] = useState<
    StateType | ''
  >();

  const [activeCb, setActiveCb] = useState(false);
  const [inactiveCb, setInactiveCb] = useState(false);
  const [showOnlyActives, setShowOnlyActives] = useState(false);
  const [dateBirthday, setDateBirthday] = useState<Date | undefined>();
  const [city, setCity] = useState(undefined);

  const {customerFilterContextState, setCustomerFilterContextState} =
    useContext(CustomerFilterContext);

  useEffect(() => {
    if (customerFilterContextState?.date_of_birth) {
      const sp = customerFilterContextState?.date_of_birth.split('-');

      const birthdayDate = new Date();
      birthdayDate.setFullYear(parseInt(sp[0], 10));
      birthdayDate.setMonth(parseInt(sp[1], 10) - 1);
      birthdayDate.setDate(parseInt(sp[2], 10));
      birthdayDate.setHours(0);
      birthdayDate.setMinutes(0);
      birthdayDate.setSeconds(0);
      birthdayDate.setMilliseconds(0);

      setDateBirthday(birthdayDate);
    } else {
      setDateBirthday(undefined);
    }

    if (customerFilterContextState?.address.city) {
      setCity(customerFilterContextState?.address.city);
    }
    if (customerFilterContextState?.address.country) {
      setSelectedCountry(customerFilterContextState?.address.country);
    }

    if (
      customerFilterContextState?.address.country &&
      customerFilterContextState?.address.state
    ) {
      const processedCountry = states.find(
        s => s.country === customerFilterContextState?.address.country,
      );

      const processedState = processedCountry.states.find(
        c => c.name === customerFilterContextState?.address.state,
      );

      setSelectedState(processedState?.value);
    }

    if (customerFilterContextState?.active === '') {
      setActiveCb(false);
      setInactiveCb(false);
    }

    if (customerFilterContextState?.active === '1') {
      setActiveCb(true);
      setInactiveCb(false);
    }

    if (customerFilterContextState?.active === '0,1') {
      setActiveCb(true);
      setInactiveCb(true);
    }

    if (customerFilterContextState?.active === '0') {
      setActiveCb(false);
      setInactiveCb(true);
    }
  }, [customerFilterContextState]);

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

  const processAndUpdateContext = () => {
    let date_of_birth;

    if (dateBirthday) {
      date_of_birth = dateBirthday.toISOString().split('T')[0];
    }

    let active: string;

    if (!showOnlyActives) {
      active =
        activeCb && inactiveCb
          ? '0,1'
          : activeCb && !inactiveCb
          ? '1'
          : !activeCb && inactiveCb
          ? '0'
          : !activeCb && !inactiveCb
          ? ''
          : '';
    } else {
      active = '1';
    }

    return setCustomerFilterContextState({
      ...customerFilterContextState,
      address: {
        city: city,
        country: selectedCountryObject?.value,
        state: selectedStateObject?.name,
      },
      date_of_birth,
      active,
    });
  };

  const setInactiveChecked = () => {
    setInactiveCb(!inactiveCb);
    setShowOnlyActives(false);
  };

  const setActiveChecked = () => {
    setActiveCb(!activeCb);
    setShowOnlyActives(false);
  };

  const setClearFilters = () => {
    setCity('');
    setSelectedState('');
    setSelectedCountry('');
    setActiveCb(false);
    setInactiveCb(false);
    setCustomerFilterContextState({
      date_of_birth: undefined,
      address: {
        city: undefined,
        country: undefined,
        state: undefined,
      },
      active: '0,1',
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
                onPress={() => navigate('Customers')}
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
                label="Date of Birth"
                labelStyle={tw`font-inter mb-1`}
                placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                style={tw`mt-2 mb-4`}
                datePickerStyle={tw`h-11`}
                setDate={setDateBirthday}
                value={dateBirthday}
              />
              <InputText
                tw={tw}
                label="City"
                labelStyle={tw`font-inter mb-1`}
                onChangeText={setCity}
                value={city}
                placeholder="Enter city name"
                style={tw`mb-4`}
                inputStyle={tw`h-11`}
              />
              <Dropdown
                tw={tw}
                label="Country"
                labelStyle={tw`font-inter mb-1`}
                placeholder="Select Country"
                placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                style={tw`mb-4`}
                dropDownStyle={tw`h-11`}
                onPress={() => setShowCountriesModal(!showCountriesModal)}
                value={selectedCountryObject?.name}
              />
              <Dropdown
                tw={tw}
                label="State"
                labelStyle={tw`font-inter mb-1`}
                placeholder="Select State"
                placeholderStyle={tw`font-inter text-sm h-6 pt-1`}
                style={tw`mb-4`}
                dropDownStyle={tw`h-11`}
                onPress={() => setShowStatesModal(!showStatesModal)}
                value={
                  customerFilterContextState?.address.state ||
                  selectedStateObject?.name ||
                  ''
                }
              />
              <Text style={tw`font-inter font-medium text-sm text-gray-700`}>
                Status
              </Text>
              <Checkbox
                tw={tw}
                value={activeCb}
                style={tw`ml-[-1rem]`}
                onPress={setActiveChecked}
                label="Active"
                labelStyle={tw`font-inter`}
              />
              <Checkbox
                tw={tw}
                value={inactiveCb}
                style={tw`ml-[-1rem]`}
                onPress={setInactiveChecked}
                label="Inactive"
                labelStyle={tw`font-inter`}
              />
              <View style={tw`flex-row justify-between items-center mt-1`}>
                <View>
                  <Text style={tw`font-inter text-sm text-gray-900`}>
                    Active
                  </Text>
                  <Text style={tw`font-inter text-xs text-gray-500`}>
                    Show only active customer
                  </Text>
                </View>
                <ToggleButton
                  tw={tw}
                  isOn={showOnlyActives}
                  onToggle={() => {
                    if (!showOnlyActives) {
                      setActiveCb(!showOnlyActives);
                      setInactiveCb(showOnlyActives);
                    } else {
                      setActiveCb(!showOnlyActives);
                      setInactiveCb(!showOnlyActives);
                    }

                    setShowOnlyActives(!showOnlyActives);
                  }}
                  offColor={'#E0E0E0'}
                  style={tw`h-5 w-9 rounded-full`}
                  innerStyle={tw`h-4.5 w-4.5 rounded-full`}
                />
              </View>
            </FadedScrollView>
          </View>
          <HR tw={tw} style={tw`bg-gray-200 h-[2px]`} />
          <View style={tw`my-4 mx-5`}>
            <Button
              tw={tw}
              onPress={() => {
                processAndUpdateContext();
                setTimeout(() => {
                  navigation.navigate('Customers', {
                    forceReload: new Date().getTime(),
                  });
                }, 500);
              }}
              type="primary"
              style={tw`mb-3`}>
              Apply Filters
            </Button>
            <Button
              tw={tw}
              onPress={() => {
                setClearFilters();
                navigation.navigate('Customers');
              }}
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
        show={showCountriesModal}
        setShow={setShowCountriesModal}
        content={countries}
        selectedValue={selectedCountry}
        onValueChange={setSelectedCountry}
        title="Select country"
      />
    </>
  );
};

export default FilterCustomer;
