import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {t} from 'i18next';

import tw from '../../../../../services/tw';

import {Button, CollapsibleModal, HR, InputText} from '@amplifiui/mobile';
import {updateVoidTransaction} from '../../../../../services/api';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import CloseIcon from '../../../../icons/close';

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMessageToast: React.Dispatch<React.SetStateAction<boolean>>;
  setVoided: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: {
    is_voidable: boolean | null;
    terminal_id: string | null;
    transaction_amount: number | null;
    last_four: string | null;
    account_type: string | null;
  } | null;
  transactionId: string;
  navigation?: NativeStackNavigationProp<any>;
};

const VoidTransaction = ({
  isVisible,
  setShow,
  setShowMessageToast,
  setVoided,
  transaction,
  transactionId,
  navigation,
}: Props): JSX.Element => {
  const [description, setDescription] = useState<string | undefined>();

  const updateTransactionVoid = async () => {
    try {
      await updateVoidTransaction(transactionId, navigation as any);
      setShowMessageToast(true);
      setVoided(true);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CollapsibleModal
      tw={tw}
      maxHeight={tw.prefixMatch('ios') ? 730 : 700}
      show={isVisible}
      setShow={setShow}>
      <View style={tw`flex-row justify-between mb-6 px-5`}>
        <Text style={tw`font-inter font-medium text-xl text-gray-900`}>
          {t('Void Transaction')}
        </Text>
        <TouchableOpacity
          style={tw`justify-center`}
          onPress={() => setShow(false)}>
          <SvgXml xml={CloseIcon} />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row justify-between items-center pt-4 px-5`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>
          Account Type / Last 4
        </Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          {transaction?.account_type?.toUpperCase()} - {transaction?.last_four}
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center pt-5 px-5`}>
        <Text style={tw`text-[3.5] font-inter text-gray-600`}>
          Transaction Amount
        </Text>
        <Text style={tw`text-[3.5] font-inter font-medium text-gray-900`}>
          $ {transaction?.transaction_amount?.toFixed(2)}
        </Text>
      </View>
      <View style={tw`px-5 pt-5`}>
        <InputText
          tw={tw}
          label="Description"
          labelStyle={tw`font-inter font-medium text-gray-700 pb-1`}
          onChangeText={setDescription}
          value={description}
          placeholder="Enter Description"
          style={tw`mb-4`}
          inputStyle={tw`h-11`}
        />
      </View>
      <HR style={tw`my-4 h-[0.25]`} tw={tw} color="gray-200" />
      <View style={tw`px-5 top-[60]%`}>
        <Button
          tw={tw}
          style={tw`my-2`}
          type="primary"
          onPress={updateTransactionVoid}>
          {t('Void Transaction')}
        </Button>
        <Button
          tw={tw}
          style={tw`bg-gray-50 border-gray-200`}
          textStyle={tw`text-gray-900 text-[4]`}
          type="primary"
          onPress={() => setShow(false)}>
          {t('Cancel')}
        </Button>
      </View>
    </CollapsibleModal>
  );
};

export default VoidTransaction;
