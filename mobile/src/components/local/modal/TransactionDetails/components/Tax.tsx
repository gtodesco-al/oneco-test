import React from 'react';
import {Text, View} from 'react-native';

import {HR} from '@amplifiui/mobile';

import tw from '../../../../../../services/tw';

type Props = {
  amount: string;
};

const Tax = ({amount}: Props) => {
  return (
    <>
      <View style={tw`flex-row justify-between items-center py-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>Tax</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          ${amount}
        </Text>
      </View>
      <HR tw={tw} style={tw`bg-gray-200`} />
    </>
  );
};

export default Tax;
