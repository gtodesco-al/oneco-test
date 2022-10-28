import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Button, H1, Paragraph} from '@amplifiui/mobile';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../RootStackParamList';

import tw from '../../../services/tw';

import Logo from '../../icons/logo-simple';
import ArrowRight from '../../icons/arrow-right-white';

type Props = NativeStackScreenProps<RootStackParamList, 'PasswordSuccessfully'>;

const PasswordSuccessfully = ({navigation}: Props) => {
  const {navigate} = navigation;
  return (
    <View style={tw`flex-1 bg-white p-5`}>
      <SafeAreaView style={tw`flex-1`}>
        <ScrollView>
          <View style={tw`w-full px-2 py-6`}>
            <SvgXml xml={Logo} width={20} height={30} />
          </View>
          <View style={tw`w-full p-2`}>
            <H1 tw={tw} style={tw`font-inter text-2xl font-semibold pb-4`}>
              New Password Successfully Created
            </H1>
            <Paragraph
              tw={tw}
              style={tw`font-inter text-gray-600 text-base font-normal pb-6`}>
              Click the button below to Sign In to your account.
            </Paragraph>
            <Button
              tw={tw}
              type="primary"
              onPress={() => navigate('SignIn')}
              style={tw`mb-6`}
              iconRight={ArrowRight}
              textStyle={tw`font-inter font-medium`}>
              Sign In
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PasswordSuccessfully;
