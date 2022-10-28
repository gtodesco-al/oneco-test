import {CollapsibleModal, InputText, Radio} from '@amplifiui/mobile';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import tw from '../../../../../services/tw';

import CloseIcon from '../../../../icons/close';
import NoLocationsIcon from '../../../../icons/icon-no-locations';

import LocationContext from '../../../../context/LocationContext';
import {Location} from '../../../../models/Location';

import {storeDataObject} from '../../../../storage';

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const WINDOW_HEIGHT = Dimensions.get('window').height;

const LocationFilterModal = ({isVisible, setShow}: Props): JSX.Element => {
  const maxHeight = WINDOW_HEIGHT * 0.95;
  const [searchLocations, setSearchLocations] = useState('');
  const [locationsFilter, setLocationsFilter] = useState<
    Location[] | undefined
  >([]);
  const {locationContextState, setLocationContextState} =
    useContext(LocationContext);

  useEffect(() => {
    if (locationContextState?.locations !== undefined) {
      setLocationsFilter(locationContextState.locations);
    }
  }, [locationContextState?.locations]);

  useEffect(() => {
    setLocationsFilter(
      locationContextState?.locations?.filter((location: Location) => {
        return (
          location.name.toLowerCase().indexOf(searchLocations.toLowerCase()) !==
          -1
        );
      }),
    );
  }, [searchLocations]);

  const changeValueOption = (selectedValue: Location) => {
    storeDataObject('@location', selectedValue);
    setLocationContextState({
      ...locationContextState,
      locationSelected: selectedValue,
    });
  };

  return (
    <>
      <CollapsibleModal
        tw={tw}
        maxHeight={maxHeight}
        show={isVisible}
        setShow={() => setShow(!isVisible)}>
        <View style={tw`justify-center`}>
          <View style={tw`flex-row justify-between mb-6 px-5`}>
            <Text style={tw`font-inter font-medium text-xl text-gray-900`}>
              Locations
            </Text>
            <TouchableOpacity
              style={tw`justify-center`}
              onPress={() => setShow(!isVisible)}>
              <SvgXml xml={CloseIcon} />
            </TouchableOpacity>
          </View>
          <ScrollView style={tw`h-[${maxHeight - 180}px]`}>
            <View style={tw`m-5`}>
              <InputText
                tw={tw}
                placeholder={"Which location you're looking for?"}
                style={tw`pb-4`}
                inputStyle={tw`h-11`}
                onChangeText={setSearchLocations}
                value={searchLocations}
              />
            </View>
            {locationsFilter?.length === 0 && (
              <View style={tw`items-center`}>
                <SvgXml xml={NoLocationsIcon} />
                <Text style={tw`font-inter text-sm text-gray-600 mt-5`}>
                  Sorry, we couldn't find any matches for that
                </Text>
              </View>
            )}
            {locationsFilter?.map(location => (
              <View
                key={location.id}
                style={tw`flex-row justify-between h-18 border-b px-5 border-gray-200`}>
                <View style={tw`flex-col justify-center`}>
                  <Text style={tw`font-inter text-gray-700`}>
                    {location.name}
                  </Text>
                </View>
                <Radio
                  tw={tw}
                  key={location.id}
                  value={
                    location.id === locationContextState?.locationSelected?.id
                  }
                  onPress={() => changeValueOption(location)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </CollapsibleModal>
    </>
  );
};

export default LocationFilterModal;
