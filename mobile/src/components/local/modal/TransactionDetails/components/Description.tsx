import React from 'react';
import {Text, View} from 'react-native';

import {HR} from '@amplifiui/mobile';

import tw from '../../../../../../services/tw';

type Props = {
  description: string;
};

const Description = ({description}: Props) => {
  return (
    <>
      <View style={tw`my-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600 mb-2`}>
          Description
        </Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          {description}
        </Text>
      </View>
      <HR tw={tw} style={tw`bg-gray-200`} />
    </>
  );
};

export default Description;
