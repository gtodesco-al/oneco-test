import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {t} from 'i18next';

import tw from '../../../../../services/tw';
import {userHasResource} from '../../../../../services/permissions';

import UserContext from '../../../../context/UserContext';
import LocationContext from '../../../../context/LocationContext';

import {Button, CollapsibleModal} from '@amplifiui/mobile';
import ChevronRight from '../../../../icons/right-blue';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import VoidTransaction from '../VoidTransaction';

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: {
    is_voidable: boolean | null;
    terminal_id: string | null;
    transaction_amount: number | null;
    last_four: string | null;
    account_type: string | null;
  } | null;
  terminal_id: string | undefined;
  selectedTransactionId: string;
  setShowMessageToast: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NativeStackNavigationProp<any>;
};

const PaymentConfirmationOptions = ({
  isVisible,
  setShow,
  transaction,
  terminal_id,
  selectedTransactionId,
  setShowMessageToast,
  navigation,
}: Props): JSX.Element => {
  const {userContextState} = useContext(UserContext);
  const {locationContextState} = useContext(LocationContext);

  const [showVoidModal, setShowVoidModal] = useState(false);
  const [voided, setVoided] = useState(false);

  const [terminal, setTerminal] = useState<{
    print_enable: number;
    terminal_manufacturer_id: number;
  } | null>(null);

  useEffect(() => {
    const terminalSelected =
      locationContextState?.locationSelected?.terminals.find(
        item => item.id === terminal_id,
      );

    setTerminal(terminalSelected);
  }, []);

  const openVoidModal = () => {
    setShow(false);
    setShowVoidModal(true);
  };
  return (
    <>
      <CollapsibleModal
        tw={tw}
        maxHeight={tw.prefixMatch('ios') ? 430 : 400}
        show={isVisible}
        setShow={setShow}>
        <SafeAreaView style={tw``}>
          {userHasResource(userContextState, 'notifications', 'post') ? (
            <TouchableOpacity
              style={tw`border-b border-gray-200 px-5 py-4 flex-row justify-between items-center`}
              onPress={() => console.log('pressed')}
              activeOpacity={1}>
              <Text style={tw`font-inter text-base font-medium`}>
                {t('Email Receipt')}
              </Text>
              <SvgXml xml={ChevronRight} />
            </TouchableOpacity>
          ) : null}

          {terminal_id &&
          terminal?.print_enable &&
          terminal?.terminal_manufacturer_id > 1 ? (
            <TouchableOpacity
              style={tw`border-b border-gray-200 px-5 py-4 flex-row justify-between items-center`}
              onPress={() => console.log('pressed')}
              activeOpacity={1}>
              <Text style={tw`font-inter text-base font-medium`}>
                {t('Paper Receipt')}
              </Text>
              <SvgXml xml={ChevronRight} />
            </TouchableOpacity>
          ) : null}

          {userHasResource(userContextState, 'transactions', 'put-void') ||
          (transaction?.is_voidable && !voided) ? (
            <TouchableOpacity
              style={tw`border-b border-gray-200 px-5 py-4 flex-row justify-between items-center`}
              onPress={() => openVoidModal()}
              activeOpacity={1}>
              <Text style={tw`font-inter text-base font-medium`}>
                {t('Void Transaction')}
              </Text>
              <SvgXml xml={ChevronRight} />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={tw`border-b border-gray-200 px-5 py-4 flex-row justify-between items-center`}
            onPress={() => console.log('pressed')}
            activeOpacity={1}>
            <Text style={tw`font-inter text-base font-medium`}>
              {t('Print Authorization')}
            </Text>
            <SvgXml xml={ChevronRight} />
          </TouchableOpacity>

          <View style={tw`p-5`}>
            <Button
              tw={tw}
              style={tw`bg-gray-50 border-gray-200`}
              textStyle={tw`text-gray-900 text-[4]`}
              type="primary"
              onPress={() => setShow(false)}>
              {t('Cancel')}
            </Button>
          </View>
        </SafeAreaView>
      </CollapsibleModal>
      <VoidTransaction
        isVisible={showVoidModal}
        setShow={setShowVoidModal}
        transaction={transaction}
        setShowMessageToast={setShowMessageToast}
        setVoided={setVoided}
        transactionId={selectedTransactionId}
      />
    </>
  );
};

export default PaymentConfirmationOptions;
