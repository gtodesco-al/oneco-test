import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {HR} from '@amplifiui/mobile';
import {SvgXml} from 'react-native-svg';
import * as CardValidator from 'card-validator';

import {codeToTransactionStatus} from '@fortis/api/src/utils/status-codes';
import {codeToTransactionType} from '@fortis/api/src/utils/transaction-type';
import {codeToReason} from '@fortis/api/src/utils/reason-codes';

import tw from '../../../../../services/tw';

import Options from '../../../../icons/options-vertical';

import {StatusTag} from '../../../../components';

import cardFlag from '../../../../../services/cardFlag';
import capitalize from '../../../../../services/capitalize';
import {format} from 'date-fns';

type Props = {
  index: number;
  item: any;
  setShowOptions: (v: boolean) => void;
  setSelectedTransactionId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

const TransactionComponent = ({
  index,
  item,
  setShowOptions,
  setSelectedTransactionId,
}: Props) => {
  const flag =
    item.account_type !== 'checking' && item.account_type !== 'savings'
      ? CardValidator.number(item.first_six).card?.type
      : 'ach';
  return (
    <View
      style={tw`shadow-none bg-white px-4 ${
        index === 0 ? 'border-white rounded-t-md pt-2' : ''
      }  overflow-visible`}>
      <View style={tw`${index % 2 ? 'bg-gray-50' : ''}`}>
        <View style={tw`my-4 mx-3`}>
          <View style={tw`flex-row`}>
            <Text
              style={tw`flex-1 font-inter text-gray-900 text-sm font-medium`}>
              {item.transaction_amount
                ? `$${item.transaction_amount.toFixed(2)}`
                : '-'}
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
                {item.created_ts
                  ? format(new Date(item.created_ts * 1000), 'MM/dd/y')
                  : '-'}
              </Text>
            </View>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Status
              </Text>
              <StatusTag
                label={codeToTransactionStatus(item.status_code)}
                type="success"
              />
            </View>
          </View>
          <View style={tw`flex-row pt-2`}>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Account Holder Name
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                {item.account_holder_name || '-'}
              </Text>
            </View>
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
          </View>
          <View style={tw`flex-row pt-2`}>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Account Type
              </Text>
              <View style={tw`flex-row`}>
                <Image source={{uri: cardFlag(flag)}} style={tw`w-7`} />
                <Text
                  style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                  {' '}
                  {item.account_type !== 'checking' &&
                  item.account_type !== 'savings'
                    ? 'Credit Card'
                    : capitalize(item.account_type) || '-'}
                </Text>
              </View>
            </View>
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
          </View>
          <View style={tw`flex-row pt-2`}>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Batch
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                {item.batch || '-'}
              </Text>
            </View>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Reason Description
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                {codeToReason(item.reason_code_id) || '-'}
              </Text>
            </View>
          </View>
          <View style={tw`flex-col`}>
            <Text
              style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
              Merchant Account
            </Text>
            <Text
              style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
              {item.product_transaction.title || '-'}
            </Text>
          </View>
        </View>
        <View style={tw`absolute right-5 pt-5`}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTransactionId(item.id);
              setShowOptions(true);
            }}
            style={tw`w-12 h-12 -mt-5 -mr-5 flex-row justify-center`}>
            <View style={tw`flex-col justify-center`}>
              <SvgXml xml={Options} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <HR style={tw`h-[0.25]`} tw={tw} color="gray-200" />
    </View>
  );
};

export default TransactionComponent;
