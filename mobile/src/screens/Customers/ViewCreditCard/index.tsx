import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import {H2, AppStatusBar, Button, Card, H1, HR} from '@amplifiui/mobile';
import {Token} from '@fortis/api/src/services/tokens.service';

import RootStackParamList from '../../RootStackParamList';

import {getToken} from '../../../../services/api';
import tw from '../../../..//services/tw';

import FadedScrollView from '../../../components/amplifi-ui/FadedScrollView';
import LoadingDataComponent from '../../../components/local/LoadingDataComponent';
import ReactivateWallet from '../../../components/local/modal/ReactivateWallet';
import DeactivateWallet from '../../../components/local/modal/DeactivateWallet';

import ArrowLeftBlack from '../../../icons/arrow-left-black';
import RedAlertIcon from '../../../icons/alert-red';

type Nav = {
  navigate: (value: string, params: any) => void;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ViewCreditCard'>;

const ViewCreditCard = ({route, navigation}: Props) => {
  const {tokenId, customer} = route.params;
  const insets = useSafeAreaInsets();
  const {navigate} = useNavigation<Nav>();

  const [token, setToken] = useState<Token>();
  const [loading, setLoading] = useState(true);

  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showReactivateModal, setShowReactivateModal] = useState(false);

  useEffect(() => {
    getTokenData();
  }, []);

  const getTokenData = async () => {
    try {
      setLoading(true);

      const tokens_ = await getToken(tokenId, navigation);
      setToken(tokens_[0]);

      setLoading(false);
    } catch (e) {
      console.error('error:', e);
      setLoading(false);
    }
  };

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
            style={tw`pl-5 flex-row  items-center ios:mt-[${insets.top}] flex-row`}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={tw`py-3`}>
              <SvgXml xml={ArrowLeftBlack} />
            </TouchableOpacity>
            <H2 tw={tw} style={tw`pl-3 font-inter text-gray-900`}>
              View Credit Card
            </H2>
          </Card>
        </View>
        <FadedScrollView tw={tw} style={tw`flex-1 m-5 justify-between`}>
          {!loading ? (
            <>
              {!token.active && (
                <View style={tw`bg-red-100 p-3 flex-row rounded mb-8`}>
                  <View style={tw`my-1 pr-1`}>
                    <SvgXml xml={RedAlertIcon} width={13} />
                  </View>
                  <View style={tw`flex-auto`}>
                    <Text
                      style={tw`font-inter text-sm font-medium text-gray-900 pb-1`}>
                      This token is inactive. To reactivate use the Reactivate
                      button.
                    </Text>
                    <Text
                      style={tw`font-inter text-sm font-normal text-gray-900`}>
                      If this token had a previous value for Token API ID, you
                      will have to re-enter the value.
                    </Text>
                  </View>
                </View>
              )}
              <H1 tw={tw} style={tw`text-xl font-inter text-gray-700`}>
                Account Details
              </H1>
              <View style={tw`flex-row justify-between mt-5`}>
                <Text style={tw`text-gray-600 font-normal text-sm font-inter`}>
                  Title
                </Text>
                <Text style={tw`text-gray-900 font-medium text-sm font-inter`}>
                  {token.title || '-'}
                </Text>
              </View>
              <View style={tw`flex-row justify-between mt-5`}>
                <Text style={tw`text-gray-600 font-normal text-sm font-inter`}>
                  Card Holder Name
                </Text>
                <Text style={tw`text-gray-900 font-medium text-sm font-inter`}>
                  {token.account_holder_name || '-'}
                </Text>
              </View>
              <View style={tw`flex-row justify-between mt-5`}>
                <Text style={tw`text-gray-600 font-normal text-sm font-inter`}>
                  Card Details
                </Text>
                <View style={tw`flex-row`}>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    {token ? '•••• •••• ••••' : ''}
                  </Text>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    {token ? ` ${token.last_four}` : '-'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row justify-between mt-5`}>
                <Text style={tw`text-gray-600 font-normal text-sm font-inter`}>
                  Expire Date{' '}
                </Text>
                <Text style={tw`text-gray-900 font-medium text-sm font-inter`}>
                  {`${token.exp_date.substring(
                    0,
                    2,
                  )}/${token.exp_date.substring(2, 4)}` || '-'}
                </Text>
              </View>
              <HR tw={tw} style={tw`bg-gray-200 h-[1px] my-8`} />
              <H1 tw={tw} style={tw`text-xl font-inter text-gray-700`}>
                Billing Information
              </H1>
              <View style={tw`flex-row justify-between mt-5`}>
                <Text style={tw`text-gray-600 font-normal text-sm font-inter`}>
                  Street
                </Text>
                <Text style={tw`text-gray-900 font-medium text-sm font-inter`}>
                  {token.billing_address.street || '-'}
                </Text>
              </View>
              <View style={tw`flex-row justify-between mt-5`}>
                <Text style={tw`text-gray-600 font-normal text-sm font-inter`}>
                  City
                </Text>
                <Text style={tw`text-gray-900 font-medium text-sm font-inter`}>
                  {token.billing_address.city || '-'}
                </Text>
              </View>
              <View style={tw`flex-row justify-between mt-5`}>
                <Text style={tw`text-gray-600 font-normal text-sm font-inter`}>
                  Country
                </Text>
                <Text style={tw`text-gray-900 font-medium text-sm font-inter`}>
                  United States Of America
                </Text>
              </View>
              <View style={tw`flex-row justify-between mt-5`}>
                <Text style={tw`text-gray-600 font-normal text-sm font-inter`}>
                  State
                </Text>
                <Text style={tw`text-gray-900 font-medium text-sm font-inter`}>
                  {token.billing_address.state || '-'}
                </Text>
              </View>
              <View style={tw`flex-row justify-between mt-5`}>
                <Text style={tw`text-gray-600 font-normal text-sm font-inter`}>
                  Zip Code
                </Text>
                <Text style={tw`text-gray-900 font-medium text-sm font-inter`}>
                  {token.billing_address.postal_code || '-'}
                </Text>
              </View>
              <HR tw={tw} style={tw`bg-gray-200 h-[1px] my-8`} />
              <View style={tw`my-8`}>
                <Button
                  tw={tw}
                  style={tw.style('my-2', !token.active && 'bg-gray-400')}
                  type="primary"
                  onPress={() => {
                    if (token.active) {
                      navigate('ChargeCustomer', {
                        customerId: customer.id,
                        tokenId: token.id,
                      });
                    }
                  }}>
                  {t('Charge')}
                </Button>
                <Button
                  tw={tw}
                  style={tw`my-2 bg-gray-50 shadow-sm border-gray-200`}
                  textStyle={tw`text-gray-900`}
                  type="primary"
                  onPress={() =>
                    token.active
                      ? setShowDeactivateModal(true)
                      : setShowReactivateModal(true)
                  }>
                  {token.active ? t('Deactivate') : t('Reactivate')}
                </Button>
              </View>
            </>
          ) : (
            <View style={tw`mx-5 -mt-1`}>
              <LoadingDataComponent />
            </View>
          )}
        </FadedScrollView>
      </SafeAreaView>
      {token ? (
        <>
          <DeactivateWallet
            token={token}
            customerName={customer.first_name + ' ' + customer.last_name}
            isVisible={showDeactivateModal}
            setShow={setShowDeactivateModal}
            onDeactivate={getTokenData}
          />
          <ReactivateWallet
            token={token}
            customerName={customer.first_name + ' ' + customer.last_name}
            isVisible={showReactivateModal}
            setShow={setShowReactivateModal}
            onReactivate={getTokenData}
          />
        </>
      ) : null}
    </View>
  );
};

export default ViewCreditCard;
