import React from 'react';
import {Text, View} from 'react-native';
import {HR} from '@amplifiui/mobile';
import {Transaction} from '@fortis/api';

import {codeToEntryMode} from '@fortis/api/src/utils/entry-modes';

import tw from '../../../../../../services/tw';

type Props = {
  transaction: Transaction;
};

const AccountInfo = ({transaction}: Props) => {
  return (
    <>
      <View style={tw`flex-row justify-between items-center mt-4 mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>
          Account Holder
        </Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          {transaction.account_holder_name || 'Manually / Entered'}
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>
          Account Type / Last 4
        </Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          {transaction.payment_method
            ? `${transaction.account_type?.toUpperCase()} - ${
                transaction.last_four
              }`
            : transaction.last_four}
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>Entry Mode</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          {transaction.entry_mode_id
            ? codeToEntryMode(transaction.entry_mode_id)
            : ''}
        </Text>
      </View>
      <HR tw={tw} style={tw`bg-gray-200`} />
    </>
  );
};

export default AccountInfo;
