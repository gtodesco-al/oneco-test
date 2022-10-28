import * as React from 'react';
import {Text, View} from 'react-native';
import {Card} from '@amplifiui/mobile';
import {SvgXml} from 'react-native-svg';
import Wallet from '../../../icons/wallet';
import tw from '../../../../services/tw';
import {Style} from 'twrnc/dist/esm/types';

type Props = {
  message?: string;
  style?: Style;
};

const DataEmpty = ({message, style}: Props) => {
  const defaultStyle = tw`h-55`;

  return (
    <Card tw={tw} style={{...defaultStyle, ...style}}>
      <View style={tw`bg-gray-50`}>
        <View style={tw`py-8 justify-center items-center`}>
          <SvgXml xml={Wallet} />
          <Text
            style={tw`text-[3.5] text-center font-inter text-gray-600 w-55 pt-5 font-medium`}>
            {message || 'You currently do not have any data to display.'}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default DataEmpty;
