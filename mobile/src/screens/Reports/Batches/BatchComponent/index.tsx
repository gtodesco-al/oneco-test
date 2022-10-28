import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {HR} from '@amplifiui/mobile';
import {SvgXml} from 'react-native-svg';

import tw from '../../../../../services/tw';

import Options from '../../../../icons/options-vertical';
import {StatusTag} from '../../../../components';
import format from 'date-fns/format';

type Props = {
  index: number;
  item: any;
  setShowOptions: (v: boolean) => void;
  batchId: React.Dispatch<React.SetStateAction<string>>;
  isOpen: React.Dispatch<React.SetStateAction<number>>;
};

const TransactionComponent = ({
  index,
  item,
  setShowOptions,
  batchId,
  isOpen,
}: Props) => {
  const calculateNetAmount = (
    total_sale_amount: string,
    total_refund_amount: string,
  ) => {
    return parseFloat(total_sale_amount) - parseFloat(total_refund_amount);
  };

  const statusToType = () => {
    return item.processing_status_id === 1
      ? 'open'
      : item.processing_status_id === 2
      ? 'closed'
      : item.processing_status_id === 3
      ? 'error'
      : item.processing_status_id === 4
      ? 'unknown'
      : item.processing_status_id === 5
      ? 'processing'
      : 'force-closed';
  };

  const processingStatusCodes = (key: number) => {
    return key === 1
      ? 'Open'
      : key === 2
      ? 'Closed'
      : key === 3
      ? 'Error'
      : key === 4
      ? 'Unknown'
      : key === 5
      ? 'Processing'
      : 'Force Closed';
  };

  return (
    <View
      style={tw`shadow-none bg-white px-5  ${
        index === 0 ? 'border-white rounded-t-md' : ''
      }  overflow-visible`}>
      <View style={tw`${index % 2 ? 'bg-gray-50' : ''}`}>
        <View style={tw`my-4 mx-2`}>
          <View style={tw`flex-row`}>
            <Text
              style={tw`flex-1 font-inter text-gray-900 text-sm font-medium`}>
              {item.batch_num}
            </Text>
          </View>
          <View style={tw`flex-row pt-2`}>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Close Date
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                {item.batch_close_ts
                  ? format(new Date(item.batch_close_ts * 1000), 'MM/dd/yyyy')
                  : '-'}
              </Text>
            </View>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Status
              </Text>
              <StatusTag
                label={processingStatusCodes(item.processing_status_id)}
                type={statusToType()}
              />
            </View>
          </View>
          <View style={tw`flex-row pt-2`}>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Sale Amount
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                ${item.total_sale_amount || '-'}
              </Text>
            </View>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Sale Count
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                {item.total_sale_count || '-'}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row pt-2`}>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Return Amount
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                ${parseInt(item.total_refund_amount, 10).toFixed(2) || '-'}
              </Text>
            </View>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Return Count
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                {item.total_refund_count || '-'}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row pt-2`}>
            <View style={tw`flex-1`}>
              <Text
                style={tw`flex-1 font-inter text-gray-500 text-xs font-medium`}>
                Net Amount
              </Text>
              <Text
                style={tw`flex-1 font-inter text-gray-900 text-sm font-normal`}>
                $
                {calculateNetAmount(
                  item.total_sale_amount,
                  item.total_refund_amount,
                ) || '-'}
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`absolute top-7 right-5`}>
          <TouchableOpacity
            onPress={() => {
              setShowOptions(true);
              batchId(item.id);
              isOpen(item.is_open);
            }}
            style={tw`w-12 h-12 -mt-5 -mr-5 flex-row justify-center`}>
            <View style={tw`flex-col justify-center`}>
              <SvgXml xml={Options} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <HR style={tw`my-0 h-[0.25]`} tw={tw} color="gray-200" />
    </View>
  );
};

export default TransactionComponent;
