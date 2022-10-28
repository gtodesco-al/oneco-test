import React from 'react';
import {View, Text} from 'react-native';
import tw from '../../../../services/tw';
import {t} from 'i18next';

type Props = {
  label: string;
  type:
    | 'success'
    | 'warning'
    | 'disabled'
    | 'processing'
    | 'settled'
    | 're-process'
    | 'open'
    | 'closed'
    | 'error'
    | 'unknown'
    | 'force-closed';
};

const StatusTag = ({label, type}: Props): JSX.Element => {
  return (
    <View
      style={tw.style(
        'px-2.5 py-0.5',
        type === 'success' && 'bg-teal-50 ',
        type === 'warning' && 'bg-yellow-50 ',
        type === 'disabled' && 'bg-gray-200',
        type === 'processing' && 'bg-yellow-50',
        type === 'settled' && 'bg-teal-100',
        type === 're-process' && 'bg-sky-100',
        type === 'open' && 'bg-teal-50',
        type === 'closed' && 'bg-red-50',
        type === 'error' && 'bg-red-50',
        type === 'unknown' && 'bg-gray-200',
        type === 'force-closed' && 'bg-red-50',
      )}>
      <Text
        style={tw.style(
          'text-xs font-inter font-medium',
          type === 'success' && 'text-teal-800',
          type === 'warning' && 'text-yellow-800',
          type === 'disabled' && 'text-gray-800',
          type === 'processing' && 'text-yellow-800',
          type === 'settled' && 'text-teal-800',
          type === 're-process' && 'text-sky-800',
          type === 'open' && 'text-teal-800',
          type === 'closed' && 'text-red-800',
          type === 'error' && 'text-red-800',
          type === 'unknown' && 'text-gray-800',
          type === 'force-closed' && 'text-red-800',
        )}>
        {t(label)}
      </Text>
    </View>
  );
};

export default StatusTag;
