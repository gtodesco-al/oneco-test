import * as React from 'react';
import {Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';

import PlaceholderIcon from '../../../icons/placeholder';
import tw from '../../../../services/tw';

const Placeholder = (): JSX.Element => {
  return (
    <View style={tw`bg-gray-50 mt-5`}>
      <View style={tw`py-8 justify-center items-center`}>
        <SvgXml xml={PlaceholderIcon} />
        <Text
          style={tw`text-[3.5] text-center font-inter text-gray-600 w-55 pt-5 font-medium`}>
          You currently do not have any data to display.
        </Text>
      </View>
    </View>
  );
};

export default Placeholder;
