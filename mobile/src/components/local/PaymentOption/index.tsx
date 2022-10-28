import * as React from 'react';

import {Text, TouchableOpacity, View} from 'react-native';

import {Card, Image} from '@amplifiui/mobile';
import IconArrowRight from '../../../icons/arrow-right-blue';

import {TailwindFn} from 'twrnc';
import {Style} from 'twrnc/dist/esm/types';
import {SvgXml} from 'react-native-svg';

type Props = {
  tw: TailwindFn;
  iconLeft: string;
  title: string;
  description: string;
  style?: Style;
  onPress: () => void;
};

const PaymentOption = ({
  tw,
  iconLeft,
  title,
  description,
  style,
  onPress,
}: Props): JSX.Element => {
  const defaultStyle = tw`flex-row shadow-xl justify-between`;

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Card style={{...defaultStyle, ...style}} tw={tw}>
        <View style={tw`flex-row`}>
          <Image tw={tw} svg={iconLeft} width={26} />
          <View style={tw`ml-4`}>
            <Text style={tw`font-semibold text-gray-900`}>{title}</Text>
            <Text style={tw`mt-1 text-gray-700`}>{description}</Text>
          </View>
        </View>
        <View style={tw`justify-center`}>
          <SvgXml xml={IconArrowRight} width={18} height={18} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default PaymentOption;
