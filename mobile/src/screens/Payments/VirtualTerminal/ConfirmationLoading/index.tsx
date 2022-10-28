import {Card, H2, AppStatusBar, LoadingRound, Button} from '@amplifiui/mobile';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tw from '../../../../../services/tw';
import CloseScreen from '../../../../icons/close-screen';
import Spinner from '../../../../icons/spinner';
import {SvgXml} from 'react-native-svg';
import {t} from 'i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../../../RootStackParamList';
import {
  getTransactionPostService,
  getTransactionPostTerminalService,
  getTransactionPostWalletService,
} from '../services/getTransactionPostService';
import ErrorModal from '../../../../components/local/modal/Error';
import {api} from '../../../../api';
import {AsyncStatus} from '@fortis/api/src/services/asyncStatus.service';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmationLoading'>;

const ConfirmationLogin = ({navigation, route}: Props) => {
  const insets = useSafeAreaInsets();
  const {navigate} = navigation;
  const {postObj, typeOfTransaction} = route.params;

  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    (async () => {
      await sendData();
    })();
  }, []);

  const sendData = async () => {
    try {
      if (postObj.terminal_id) {
        const submission = await getTransactionPostTerminalService(
          typeOfTransaction,
        ).create(postObj);

        let status: AsyncStatus | undefined;

        do {
          await new Promise(resolve => setTimeout(resolve, 5000));
          status = await api.service('async-status').get(submission.async.code);
          if (status.error) {
            throw new Error(status.error);
          }
        } while (status?.progress < 100);

        navigate('PaymentConfirmation', {
          paymentDetails: null,
          terminal_id: postObj.terminal_id,
        });
      } else if (postObj.token_id) {
        const submission = await getTransactionPostWalletService(
          typeOfTransaction,
        ).create(postObj);

        if (submission.status_code !== 301) {
          navigate('PaymentConfirmation', {paymentDetails: submission});
        } else {
          navigate('PaymentError', {data: submission});
        }
      } else {
        const submission = await getTransactionPostService(
          typeOfTransaction,
        ).create(postObj);

        if (submission.status_code !== 301) {
          navigate('PaymentConfirmation', {paymentDetails: submission});
        } else {
          navigate('PaymentError', {data: submission});
        }
      }
    } catch (e) {
      console.error(
        '[ConfirmationLoading] error while processing transaction:',
        JSON.stringify(e),
      );
      setTimeout(() => {
        setShowErrorModal(true);
      }, 1000);
    }
  };

  return (
    <>
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
            <Card tw={tw} style={tw`pl-5 flex-row ios:mt-[${insets.top}]`}>
              <TouchableOpacity
                onPress={() => navigate('Payments')}
                style={tw`py-3`}>
                <SvgXml xml={CloseScreen} />
              </TouchableOpacity>
              <H2 tw={tw} style={tw`py-1.5 pl-5 font-inter text-gray-900`}>
                Virtual Terminal
              </H2>
            </Card>
          </View>

          <View style={tw`px-5 flex-1 justify-between mt-12`}>
            <View style={tw`items-center px-4`}>
              <LoadingRound tw={tw}>
                <SvgXml xml={Spinner} />
              </LoadingRound>
              <View style={tw`mt-8`}>
                <Text style={tw`text-[6] text-center text-gray-900`}>
                  Customer is completing the transaction on terminal
                </Text>
                <Text style={tw`text-[3.5] text-center mt-2.5 text-gray-600`}>
                  Prompting terminal, to cancel this transaction press the{' '}
                  <Text style={tw`font-bold`}>cancel button</Text> on the
                  terminal device.
                </Text>
              </View>
            </View>

            <View>
              <Button
                tw={tw}
                style={tw`my-5 bg-gray-50 shadow-sm border-gray-200`}
                textStyle={tw`text-gray-900 text-[4]`}
                type="primary"
                onPress={() => navigate('Payments')}>
                {t('Close')}
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <ErrorModal
        isVisible={showErrorModal}
        setShow={setShowErrorModal}
        onRetry={async () => await sendData()}
        onCancel={() => navigate('Payments')}
      />
    </>
  );
};

export default ConfirmationLogin;
