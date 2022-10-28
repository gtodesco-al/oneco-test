import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {t} from 'i18next';

import tw from '../../../../../services/tw';
import {userHasResource} from '../../../../../services/permissions';

import UserContext from '../../../../context/UserContext';

import {H2, AppStatusBar, Button, Card, ToastMessage} from '@amplifiui/mobile';
import {
  PaymentConfirmationOptions,
  TransactionDetailsModal,
} from '../../../../components';

import CloseScreen from '../../../../icons/close-screen';
import optionsVtPayment from '../../../../icons/options-vt-payment';
import sucessfullyIcon from '../../../../icons/successfully';

import RootStackParamList from '../../../RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentConfirmation'>;

const PaymentConfirmation = ({navigation, route}: Props) => {
  const insets = useSafeAreaInsets();
  const {navigate} = navigation;
  const {paymentDetails, terminal_id} = route.params;
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState('');

  const {userContextState} = useContext(UserContext);

  useEffect(() => {
    if (paymentDetails) {
      setSelectedTransactionId(paymentDetails.id);
    }
  }, []);

  const transactionDetails = (
    <Text
      style={tw`underline w-5  text-primary-700`}
      onPress={() => setShowDetailsModal(true)}>
      transactions details
    </Text>
  );

  return (
    <View style={tw`flex-1`}>
      <View style={tw`ios:h-${Math.floor(insets.top / 4)}`}>
        <SafeAreaView style={{...tw`bg-[#00334D]`}} />
      </View>
      <SafeAreaView style={{...tw`bg-white flex-1`}}>
        <AppStatusBar
          tw={tw}
          backgroundColor="#00334D"
          barStyle="light-content"
          top={insets.top}
        />
        <View style={tw`ios:-mt-[${insets.top}]`}>
          <Card
            tw={tw}
            style={tw`pl-5 flex-row  items-center justify-between ios:mt-[${insets.top}]`}>
            <TouchableOpacity
              onPress={() => navigate('Payments')}
              style={tw`py-3`}>
              <SvgXml xml={CloseScreen} />
            </TouchableOpacity>
            <H2 tw={tw} style={tw`pr-30 py-1.5 font-inter text-gray-900`}>
              Virtual Terminal
            </H2>
            <TouchableOpacity
              onPress={() => setShowOptionsModal(true)}
              style={tw`py-3`}>
              <SvgXml xml={optionsVtPayment} />
            </TouchableOpacity>
          </Card>
        </View>
        <View style={tw`mx-5 bottom-10 items-center`}>
          <ToastMessage
            tw={tw}
            style={tw`mx-4`}
            textStyle={tw`font-inter`}
            show={showToast}
            showCallback={show => setShowToast(show)}
            type="success">
            Transaction was successfully voided.
          </ToastMessage>
        </View>
        <View style={tw`m-5 flex-1 justify-between`}>
          <View style={tw`items-center mt-12`}>
            <SvgXml xml={sucessfullyIcon} />
            <View style={tw`mt-8`}>
              <Text style={tw`text-[6] text-center text-gray-900`}>
                Payment successfully processed.
              </Text>
              {paymentDetails?.auth_code ? (
                <Text style={tw`text-[3.5] text-center mt-2 text-gray-600`}>
                  Auth Code {paymentDetails.auth_code}
                </Text>
              ) : null}
              <Text style={tw`text-[3.5] text-center mt-8 text-gray-600`}>
                You can view {transactionDetails} or see this transaction on
                your transactions report for more actions.
              </Text>
            </View>
          </View>
          <View>
            {userHasResource(userContextState, 'notifications', 'post') ? (
              <Button
                tw={tw}
                style={tw`my-2 bg-gray-50 shadow-sm border-gray-200`}
                textStyle={tw`text-gray-900 text-[4]`}
                type="primary"
                onPress={() => navigate('')}>
                {t('Email Receipt')}
              </Button>
            ) : null}
            <Button
              tw={tw}
              style={tw`my-2`}
              type="primary"
              onPress={() => navigate('Payments')}>
              {t('Create New Payment')}
            </Button>
          </View>
        </View>
      </SafeAreaView>
      <TransactionDetailsModal
        isVisible={showDetailsModal}
        setShow={setShowDetailsModal}
        transactionId={selectedTransactionId}
      />
      <PaymentConfirmationOptions
        isVisible={showOptionsModal}
        setShow={setShowOptionsModal}
        transaction={paymentDetails}
        setShowMessageToast={setShowToast}
        terminal_id={terminal_id}
        selectedTransactionId={selectedTransactionId}
      />
    </View>
  );
};

export default PaymentConfirmation;
