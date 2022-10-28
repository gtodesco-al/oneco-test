import {Card, H2, AppStatusBar, Button} from '@amplifiui/mobile';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tw from '../../../../../services/tw';
import CloseScreen from '../../../../icons/close-screen';
import Warning from '../../../../icons/warning-red-filled';
import optionsVtPayment from '../../../../icons/options-vt-payment';
import Round from '../../../../components/amplifi-ui/Round';
import {SvgXml} from 'react-native-svg';
import {t} from 'i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../../../RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmationLoading'>;

const PaymentError = ({navigation, route}: Props) => {
  const insets = useSafeAreaInsets();
  const {navigate} = navigation;
  const {data} = route.params;

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
            style={tw`pl-5 flex-row ios:mt-[${insets.top}] justify-between items-center`}>
            <TouchableOpacity
              onPress={() => navigate('Payments')}
              style={tw`py-3`}>
              <SvgXml xml={CloseScreen} />
            </TouchableOpacity>
            <H2 tw={tw} style={tw`py-1.5 pr-30 font-inter text-gray-900`}>
              Virtual Terminal
            </H2>
            <TouchableOpacity onPress={() => null} style={tw`py-3`}>
              <SvgXml xml={optionsVtPayment} />
            </TouchableOpacity>
          </Card>
        </View>
        <View style={tw`px-5 flex-1 justify-between mt-12`}>
          <View style={tw`items-center px-4`}>
            <Round tw={tw} style={tw`bg-red-100`}>
              <SvgXml xml={Warning} />
            </Round>
            <View style={tw`mt-8`}>
              <Text style={tw`text-[6] text-center text-gray-900`}>
                Transaction declined
              </Text>
              <Text style={tw`text-[3.5] text-center mt-2 text-gray-600`}>
                Auth Code {data.auth_code}
              </Text>
              <Text style={tw`text-[3.5] text-center mt-8 text-gray-600`}>
                {data.verbiage}
              </Text>
            </View>
          </View>
          <View>
            <Button
              tw={tw}
              style={tw`my-5 shadow-sm border-gray-200 h-[52px]`}
              textStyle={tw`font-inter font-medium text-base`}
              type="primary"
              onPress={() => navigate('Payments')}>
              {t('Create New Payment')}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PaymentError;
