import React from 'react';
import {Text, View} from 'react-native';

import {HR} from '@amplifiui/mobile';

import tw from '../../../../../../services/tw';

import {Transaction} from '@fortis/api';
import StatusTag from '../../../StatusTag';

import {codeToTransactionStatus} from '@fortis/api/src/utils/status-codes';
import {codeToTransactionType} from '@fortis/api/src/utils/transaction-type';
import {codeToReason} from '@fortis/api/src/utils/reason-codes';

type Props = {
  transaction: Transaction;
};

const TransactionInfo = ({transaction}: Props) => {
  return (
    <>
      <View style={tw`flex-row justify-between items-center mt-4 mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>
          Transaction Type
        </Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          {transaction?.type_id
            ? codeToTransactionType(transaction.type_id.toString())
            : '-'}
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>
          Transaction Status
        </Text>
        <StatusTag
          label={
            transaction?.status_code
              ? codeToTransactionStatus(transaction.status_code)
              : '-'
          }
          type="success"
        />
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>
          Transaction Verbiage
        </Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          {transaction.verbiage}
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>Reason</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          {/*CC - Approved*/}
          {transaction.reason_code_id && transaction.payment_method
            ? `${transaction.payment_method.toUpperCase()} - ${codeToReason(
                transaction.reason_code_id?.toString(),
              )}`
            : '-'}
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>Auth Code</Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          {transaction.auth_code}
        </Text>
      </View>
      <HR tw={tw} style={tw`bg-gray-200`} />
    </>
  );
};

export default TransactionInfo;
