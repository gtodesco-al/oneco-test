import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@amplifiui/mobile';
import {SvgXml} from 'react-native-svg';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import * as Keychain from 'react-native-keychain';

import tw from '../../../services/tw';

import FaceIdIcon from '../../icons/face-id';
import {storeData} from '../../storage';
import RootStackParamList from '../RootStackParamList';

type Nav = {
  navigate: (value: string) => void;
};

type Props = NativeStackScreenProps<RootStackParamList, 'EnableBiometrics'>;

const EnableBiometrics = ({route}: Props) => {
  const {email, password} = route.params;

  const {navigate} = useNavigation<Nav>();

  return (
    <View style={tw`flex-1 bg-white p-5`}>
      <SafeAreaView style={tw`flex-1`}>
        <ScrollView>
          <View
            style={tw`bg-secondary-100 rounded-full h-16 w-16 justify-center mt-10`}>
            <View style={tw`flex-row justify-center`}>
              <SvgXml xml={FaceIdIcon} />
            </View>
          </View>
          <Text
            style={tw`text-2xl text-gray-900 font-inter font-semibold mt-8`}>
            Want to log in faster? Enable Face ID/Biometrics
          </Text>
          <Text style={tw`font-inter text-gray-600 font-normal mt-4`}>
            You can use face ID/Biometrics to access your account, so you won't
            need to type your password each time.
          </Text>
          <Button
            tw={tw}
            style={tw`mt-20`}
            textStyle={tw`font-inter`}
            type="primary"
            onPress={async () => {
              // Save the choice on the async storage
              await storeData('@biometrics-enabled', 'true');

              // Save the credentials on the app keychain
              await Keychain.setGenericPassword(email.toLowerCase(), password);

              navigate('Dashboard');
            }}>
            Enable FaceId/Biometrics
          </Button>
          <Button
            tw={tw}
            style={tw`mt-4 bg-gray-200`}
            textStyle={tw`text-gray-900 font-inter`}
            type="primary"
            onPress={() => navigate('Dashboard')}>
            No thanks
          </Button>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default EnableBiometrics;
