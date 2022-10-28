import React from 'react';
import {Text, View} from 'react-native';

import {HR} from '@amplifiui/mobile';

import tw from '../../../../../../services/tw';

import {Transaction} from '@fortis/api';
import {format} from 'date-fns';

type Props = {
  transaction: Transaction;
};

const DateAndTransactionId = ({transaction}: Props) => {
  return (
    <>
      <View style={tw`flex-row justify-between items-center mt-4 mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>Date / Time</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          {transaction?.created_ts
            ? format(transaction.created_ts * 1000, 'MM/dd/yyyy hh:mm:ss aaa')
            : ''}
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>
          Transaction ID
        </Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          {transaction?.id || ''}
        </Text>
      </View>
      <HR tw={tw} style={tw`bg-gray-200`} />
    </>
  );
};

export default DateAndTransactionId;
