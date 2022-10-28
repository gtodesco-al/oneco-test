import React from 'react';
import {Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {Spinner} from '@amplifiui/mobile';

import SpinnerIcon from '../../../icons/spinner';

import tw from '../../../../services/tw';

const LoadingDataComponent = (): JSX.Element => {
  return (
    <View style={tw`flex-col mt-5 h-44 bg-gray-50 rounded-md justify-center`}>
      <View style={tw`flex-row justify-center`}>
        <View
          style={tw`bg-light-blue-100 rounded-full h-16 w-16 flex-row justify-center`}>
          <View style={tw`justify-center`}>
            <Spinner time={1000}>
              <SvgXml xml={SpinnerIcon} />
            </Spinner>
          </View>
        </View>
      </View>
      <Text style={tw`mt-6 text-center font-inter text-gray-600`}>
        Loading data...
      </Text>
    </View>
  );
};

export default LoadingDataComponent;
