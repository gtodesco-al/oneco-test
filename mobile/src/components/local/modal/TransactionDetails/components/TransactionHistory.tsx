import React from 'react';
import {Text, View} from 'react-native';

import {HR} from '@amplifiui/mobile';

import tw from '../../../../../../services/tw';
import StatusTag from '../../../StatusTag';

/* type Props = {
  amount: number;
}; */

const TransactionHistory = (/* {amount}: Props */) => {
  return (
    <>
      <View style={tw`mt-3`}>
        <Text style={tw`font-inter text-gray-700 font-semibold text-base`}>
          Transaction History
        </Text>
      </View>
      <View style={tw`flex-row justify-between`}>
        <View style={tw`flex-col`}>
          <Text style={tw`mt-2 font-normal font-inter text-gray-600 text-sm`}>
            Date
          </Text>
          <Text style={tw`mt-2 font-inter font-medium`}>
            00/00/0000 - 00:00 am
          </Text>
        </View>
        <View style={tw`flex-col mb-3`}>
          <Text style={tw`mt-2 font-normal font-inter text-gray-600 text-sm`}>
            Status
          </Text>
          <View style={tw`mt-2`}>
            <StatusTag label="Approved" type="success" />
          </View>
        </View>
      </View>
      <HR tw={tw} style={tw`bg-gray-200`} />
    </>
  );
};

export default TransactionHistory;
