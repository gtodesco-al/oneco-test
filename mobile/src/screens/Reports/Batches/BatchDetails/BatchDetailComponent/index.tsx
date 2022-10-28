import React from 'react';
import {Image, Text, View} from 'react-native';
import {HR} from '@amplifiui/mobile';
import tw from '../../../../../../services/tw';
import {format} from 'date-fns';
import {codeToTransactionType} from '@fortis/api/src/utils/transaction-type';
import * as CardValidator from 'card-validator';
import cardFlag from '../../../../../../services/cardFlag';

type Props = {
  index: number;
  item: any;
};

const BatchDetailComponent = ({index, item}: Props) => {
  const flag = CardValidator.number(item.first_six).card?.type;
  return (
    <View
      style={tw`shadow-none bg-white px-4 ${
        index === 0 ? 'border-white rounded-t-md mt-2' : ''
      }  overflow-visible`}>
      <View style={tw`${index % 2 ? 'bg-gray-50' : ''}`}>
        <View style={tw`my-4 mx-2`}>
          <View style={tw`flex-row`}>
            <Text
              style={tw`flex-1 font-inter text-gray-900 text-sm font-medium`}>
              $ {item.transaction_amount.toFixed(2) || '-'}
            </Text>
          </View>
          <View style={tw`flex-row pt-2`}>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Transaction Date
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                {item?.created_ts
                  ? format(item.created_ts * 1000, 'MM/dd/yyyy')
                  : '' || '-'}
              </Text>
            </View>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Batch Number
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                {item.batch || '-'}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row pt-2`}>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Transaction Type
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                {codeToTransactionType(item.type_id) || '-'}
              </Text>
            </View>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Account Type
              </Text>
              <View style={tw`flex-row`}>
                <Image
                  source={{
                    uri: cardFlag(flag),
                  }}
                  style={tw`w-7`}
                />
                <Text
                  style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                  {item.payment_method === 'cc' ? 'Credit Card' : 'ACH' || '-'}
                </Text>
              </View>
            </View>
          </View>
          <View style={tw`flex-row pt-2`}>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Last 4
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                {item.last_four || '-'}
              </Text>
            </View>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Auth Code
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                {item.auth_code || '-'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <HR style={tw`h-[0.25]`} tw={tw} color="gray-200" />
    </View>
  );
};

export default BatchDetailComponent;
