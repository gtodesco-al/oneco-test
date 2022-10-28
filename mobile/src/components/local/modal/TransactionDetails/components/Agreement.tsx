import React from 'react';
import {Text, View} from 'react-native';

import {HR} from '@amplifiui/mobile';

import tw from '../../../../../../services/tw';

const Agreement = () => {
  return (
    <>
      <Text style={tw`text-xs font-inter text-gray-900 mb-14 mt-3`}>
        I agree to pay the above total according to my card issuer agreement.
      </Text>
      <HR tw={tw} />
      <View style={tw`flex-row mt-4 mb-5 items-center`}>
        <Text style={tw`text-sm font-inter text-gray-900`}>Signature: </Text>
        <Text style={tw`text-sm font-inter font-semibold text-gray-900`}>
          Martha Andrez
        </Text>
      </View>
    </>
  );
};

export default Agreement;
