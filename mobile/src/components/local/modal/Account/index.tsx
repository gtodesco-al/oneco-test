import {
  CollapsibleModal,
  HR,
  RoundAvatar,
  ToggleButton,
} from '@amplifiui/mobile';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';

import * as Keychain from 'react-native-keychain';

import tw from '../../../../../services/tw';

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

import AvatarSample from '../../../../images/image-company.jpeg';
import arrowRightBlack from '../../../../icons/arrow-right-black';
import logoProfileSettings from '../../../../icons/logo-profile-settings';
import ChangePasswordIcon from '../../../../icons/change-password';
import logoLogout from '../../../../icons/logo-logout';
import LocationModal from '../LocationsFilter';
import LocationContext from '../../../../context/LocationContext';
import UserContext from '../../../../context/UserContext';

import {api} from '../../../../api';
import {useNavigation} from '@react-navigation/native';
import {getStorageData, storeData} from '../../../../storage';

const WINDOW_HEIGHT = Dimensions.get('window').height;

type Nav = {
  navigate: (value: string) => void;
};

const AccountModal = ({isVisible, setShow}: Props): JSX.Element => {
  const {navigate} = useNavigation<Nav>();

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isFaceIdEnabled, setFaceIdEnabled] = useState(false);

  const {locationContextState} = useContext(LocationContext);
  const {userContextState} = useContext(UserContext);
  const maxHeight = WINDOW_HEIGHT * 0.95;

  const openLocations = () => {
    if (
      locationContextState?.locations &&
      locationContextState?.locations?.length > 1
    ) {
      setShowLocationModal(true);
      setShow(!isVisible);
    }
  };

  useEffect(() => {
    (async () => {
      const biometricsStorage = await getStorageData('@biometrics-enabled');
      setFaceIdEnabled(biometricsStorage === 'true');
    })();
  }, []);

  return (
    <>
      <CollapsibleModal
        tw={tw}
        maxHeight={maxHeight}
        show={isVisible}
        setShow={() => setShow(!isVisible)}>
        <View style={tw`mx-5`}>
          <TouchableOpacity
            style={tw`flex-row bg-gray-100 h-14 items-center justify-between rounded-sm`}
            onPress={openLocations}>
            <View style={tw`flex-row items-center`}>
              <RoundAvatar
                tw={tw}
                src={AvatarSample}
                style={tw`ml-1 rounded-none`}
                accessibilityLabel="Avatar Icon"
              />
              <View style={tw`ml-2`}>
                <Text style={tw`text-gray-500 text-xs font-inter`}>
                  Location
                </Text>
                <Text style={tw`text-gray-900 text-sm font-inter`}>
                  {locationContextState?.locationSelected?.name}
                </Text>
              </View>
            </View>
            {locationContextState?.locations &&
              locationContextState?.locations.length > 1 && (
                <View style={tw`mr-4`}>
                  <SvgXml xml={arrowRightBlack} />
                </View>
              )}
          </TouchableOpacity>
          <View>
            <View style={tw`mt-5`}>
              <Text style={tw`text-gray-900 text-sm font-inter`}>
                {userContextState
                  ? `${userContextState.first_name} ${userContextState.last_name}`
                  : ''}
              </Text>
              <Text style={tw`text-gray-500 text-xs font-inter pt-1`}>
                {userContextState ? `${userContextState.email}` : ''}
              </Text>
            </View>
          </View>
          <HR style={tw`my-4 h-[0.25]`} tw={tw} color="gray-200" />
          <TouchableOpacity style={tw`mx-2 my-4 flex-row items-center`}>
            <View>
              <SvgXml xml={logoProfileSettings} />
            </View>
            <Text style={tw`text-gray-500 text-sm font-inter pl-2`}>
              Profile Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`mx-2 my-4 flex-row items-center`}>
            <View>
              <SvgXml xml={ChangePasswordIcon} />
            </View>
            <Text style={tw`text-gray-500 text-sm font-inter pl-2`}>
              Change Password
            </Text>
          </TouchableOpacity>
          <HR style={tw`my-4 h-[0.25]`} tw={tw} color="gray-200" />
          <View style={tw`mx-2 my-4 flex-row justify-between`}>
            <View style={tw`flex-1`}>
              <Text style={tw`text-gray-500 text-sm font-inter pl-2`}>
                Enable Face ID for Log In
              </Text>
            </View>
            <ToggleButton
              tw={tw}
              isOn={isFaceIdEnabled}
              onToggle={async () => {
                const newState = !isFaceIdEnabled;
                await storeData('@biometrics-enabled', `${newState}`);
                setFaceIdEnabled(newState);
              }}
              style={tw`h-5 w-9 rounded-full`}
              innerStyle={tw`h-4.5 w-4.5 rounded-full`}
            />
          </View>
          <HR style={tw`my-4 h-[0.25]`} tw={tw} color="gray-200" />
          <TouchableOpacity
            style={tw`m-2 flex-row items-center`}
            onPress={async () => {
              await storeData('@biometrics-enabled', 'false');
              await api.logout();
              Keychain.resetGenericPassword();
              navigate('SignIn');
            }}>
            <View>
              <SvgXml xml={logoLogout} />
            </View>
            <Text style={tw`text-gray-500 text-sm font-inter pl-2`}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </CollapsibleModal>

      <LocationModal
        isVisible={showLocationModal}
        setShow={setShowLocationModal}
      />
    </>
  );
};

export default AccountModal;
