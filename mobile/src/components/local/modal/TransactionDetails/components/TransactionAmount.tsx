import React from 'react';
import {Text, View} from 'react-native';

import {HR} from '@amplifiui/mobile';

import tw from '../../../../../../services/tw';

type Props = {
  amount: string;
};

const TransactionAmount = ({amount}: Props) => {
  return (
    <>
      <View style={tw`flex-row justify-between items-center mb-9`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>
          Transaction Amount
        </Text>
        <Text style={tw`text-2xl font-inter font-semibold text-gray-900`}>
          ${amount}
        </Text>
      </View>
      <HR tw={tw} style={tw`bg-gray-200`} />
    </>
  );
};

export default TransactionAmount;
