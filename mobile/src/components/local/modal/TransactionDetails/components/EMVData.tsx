import React from 'react';
import {Text, View} from 'react-native';

import {HR} from '@amplifiui/mobile';

import tw from '../../../../../../services/tw';

/* type Props = {
  amount: number;
}; */

const Tax = (/* {amount}: Props */) => {
  return (
    <>
      <View style={tw`mt-2`}>
        <Text style={tw`font-inter text-gray-700 font-semibold text-base`}>
          EMV Data
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mt-4 mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>TVR</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          56789123456789
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>AID</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          a123456789123456789
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>TSI</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          e800
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>CVM</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          Signature Verified
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>PAN</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          ••••••••••••••••••••••6789
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>IAD</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          123456789123456789
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>CUR</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          USD$
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>MODE</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          Issuer
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>AC</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          123456789123456789
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>AIDNAME</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          Discover, Pulse D Pass
        </Text>
      </View>
      <HR tw={tw} style={tw`bg-gray-200`} />
    </>
  );
};

export default Tax;
