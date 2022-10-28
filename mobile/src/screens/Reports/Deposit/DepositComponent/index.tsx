import React from 'react';
import {Text, View} from 'react-native';
import {HR} from '@amplifiui/mobile';
import tw from '../../../../../services/tw';
import {format} from 'date-fns';
type Props = {
  item: any;
};

const DepositComponent = ({item}: Props) => {
  return (
    <View style={tw`shadow-none mx-5 overflow-visible bg-white rounded`}>
      <View style={tw`flex-row justify-between mx-6 my-4`}>
        <View style={tw`flex-col flex-1`}>
          <Text style={tw`font-inter text-gray-900 font-medium text-sm mb-1`}>
            {item.amount ? `$${item.amount.toFixed(2)}` : '-'}
          </Text>
          <Text style={tw`font-inter font-normal text-gray-500 text-xs mb-1`}>
            Effective Date
          </Text>
          <Text style={tw`font-inter text-gray-900 text-sm`}>
            {item.date_effective_ts
              ? format(new Date(item.date_effective_ts * 1000), 'MM/dd/y')
              : '-'}
          </Text>
          <View style={tw`pt-2`}>
            <Text style={tw`font-inter font-normal text-gray-500 text-xs mb-1`}>
              Merchant Account
            </Text>
            <View style={tw`w-65`}>
              <Text style={tw`font-inter text-gray-900 text-sm mb-1`}>
                {`${item.merchant_name}` || '-'}
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-col flex-1 pt-[23]`}>
          <Text style={tw`font-inter font-normal text-gray-500 text-xs mb-1`}>
            Account Number
          </Text>
          <Text style={tw`font-inter text-gray-900 text-sm`}>
            {`${item.bank_account_number}` || '-'}
          </Text>
        </View>
      </View>
      <HR style={tw` h-[0.25] mx-4 w-[90%]`} tw={tw} color="gray-200" />
    </View>
  );
};

export default DepositComponent;
