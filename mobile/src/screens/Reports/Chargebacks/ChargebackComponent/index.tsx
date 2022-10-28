import React from 'react';
import {Image, Text, View} from 'react-native';
import {HR} from '@amplifiui/mobile';
import tw from '../../../../../services/tw';
import cardFlag from '../../../../../services/cardFlag';
import {format} from 'date-fns';
import capitalize from '../../../../../services/capitalize';

type Props = {
  item: any;
};

const ChargebackComponent = ({item}: Props) => {
  return (
    <View style={tw`shadow-none overflow-visible bg-white rounded`}>
      <View style={tw`flex-row justify-between mx-6 my-4`}>
        <View style={tw`flex-col flex-1`}>
          <Text style={tw`font-inter text-gray-900 font-medium text-sm mb-1`}>
            ${parseInt(item.prcs_trxn_amt, 10).toFixed(2) || '-'}
          </Text>
          <Text style={tw`font-inter font-normal text-gray-500 text-xs mb-1`}>
            Dispute Date
          </Text>
          <Text style={tw`font-inter text-gray-900 text-sm`}>
            {item.receive_dt_ts
              ? format(new Date(item.receive_dt_ts * 1000), 'MM/dd/y')
              : '-'}
          </Text>
          <View style={tw`pt-2`}>
            <Text style={tw`font-inter font-normal text-gray-500 text-xs mb-1`}>
              Card Number
            </Text>
            <Text style={tw`font-inter text-gray-900 text-sm mb-1`}>
              {item.card_last_4_nbr || '-'}
            </Text>
          </View>
        </View>
        <View style={tw`flex-col flex-1 pt-[23]`}>
          <Text style={tw`font-inter font-normal text-gray-500 text-xs mb-1`}>
            Transaction Date
          </Text>
          <Text style={tw`font-inter text-gray-900 text-sm`}>
            {item.pos_trxn_dt_ts
              ? format(new Date(item.pos_trxn_dt_ts * 1000), 'MM/dd/y')
              : '-'}
          </Text>
          <View style={tw`pt-2`}>
            <Text style={tw`font-inter font-normal text-gray-500 text-xs mb-1`}>
              Account Type
            </Text>
            <View style={tw`flex-row`}>
              <Image
                source={{
                  uri: cardFlag(item.card_type.toLowerCase()),
                }}
                style={tw`w-7`}
              />
              <Text style={tw`font-inter text-gray-900 text-sm pl-1`}>
                {item.card_type !== 'Checking' && item.card_type !== 'Savings'
                  ? 'Credit Card'
                  : capitalize(item.card_type)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <HR style={tw` h-[0.25] mx-4 w-[90%]`} tw={tw} color="gray-200" />
    </View>
  );
};

export default ChargebackComponent;
