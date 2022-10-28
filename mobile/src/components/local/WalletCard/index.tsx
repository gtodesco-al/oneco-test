import {Button, H1, HR, ToggleButton} from '@amplifiui/mobile';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import * as CardValidator from 'card-validator';
import tw from '../../../../services/tw';
import Wallet from '../../../icons/wallet';
import {SvgXml} from 'react-native-svg';
import {t} from 'i18next';
import {StatusTag} from '../../../components';
import Options from '../../../icons/options-vertical';

import {Token} from '@fortis/api/src/services/tokens.service';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RootStackParamList from '../../../screens/RootStackParamList';
import cardFlag from '../../../../services/cardFlag';

type Props = {
  tokens: Token[];
  showButtons: boolean;
  customerId: string;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'ViewCustomer',
    undefined
  >;
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<Token | undefined>>;
  setFlagCard: React.Dispatch<React.SetStateAction<string | undefined>>;
  isActive: boolean;
};

const WalletCard = ({
  navigation,
  tokens,
  showButtons,
  customerId,
  setToken,
  setFlagCard,
  setShowOptions,
  isActive,
}: Props): JSX.Element => {
  const {navigate} = navigation;
  const [toggleStatus, setToggleStatus] = useState(false);
  const onToggle = () => {
    setToggleStatus(!toggleStatus);
  };

  return (
    <>
      {!isActive && (
        <View
          style={tw`flex-1 justify-between border border-gray-200 bg-gray-100 rounded p-5`}>
          <H1 tw={tw} style={tw`text-xl font-inter text-gray-900`}>
            Wallet
          </H1>
          <View style={tw`items-center mt-6`}>
            <SvgXml xml={Wallet} />
            <View style={tw`mt-6`}>
              <Text
                style={tw`font-inter text-sm text-center mb-6 text-gray-600 font-medium`}>
                To view, add or edit wallet, you need to reactivate the customer
                first.
              </Text>
            </View>
          </View>
        </View>
      )}
      {isActive && tokens.length === 0 && (
        <View
          style={tw`flex-1 justify-between border border-gray-200 bg-gray-100 rounded p-5`}>
          <H1 tw={tw} style={tw`text-xl font-inter text-gray-900`}>
            Wallet
          </H1>
          <View style={tw`items-center mt-6`}>
            <SvgXml xml={Wallet} />
            <View style={tw`mt-6`}>
              <Text
                style={tw`font-inter text-sm text-center mb-6 text-gray-600 font-medium`}>
                Customer currently don't have any wallets added.
              </Text>
            </View>
          </View>
          <View>
            <Button
              tw={tw}
              style={tw` bg-gray-50 shadow-sm border-gray-200 h-10 justify-center`}
              textStyle={tw`font-inter font-medium text-gray-900 text-sm h-5`}
              type="primary"
              onPress={() => navigate('AddNewCreditCard', {customerId})}>
              {t('Add Credit Card')}
            </Button>
            <Button
              tw={tw}
              style={tw`my-2 bg-gray-50 shadow-sm border-gray-200 h-10 justify-center`}
              textStyle={tw`font-inter font-medium text-gray-900 text-sm h-5`}
              type="primary"
              onPress={() => navigate('AddNewACH', {customerId})}>
              {t('Add Bank Account')}
            </Button>
          </View>
        </View>
      )}
      {isActive && tokens.length !== 0 && (
        <View
          style={tw`flex-1 justify-between border border-gray-200 bg-gray-100 rounded p-5`}>
          <View style={tw`flex-row justify-between`}>
            <H1 tw={tw} style={tw`text-xl font-inter text-gray-900`}>
              Wallet
            </H1>
            <View style={tw`flex-row`}>
              <Text
                style={tw`font-inter text-sm text-center text-gray-900 font-medium pr-2`}>
                Active
              </Text>
              <ToggleButton
                tw={tw}
                isOn={toggleStatus}
                onToggle={onToggle}
                offColor={'#E0E0E0'}
                style={tw`h-5 w-9 rounded-full`}
                innerStyle={tw`h-4.5 w-4.5 rounded-full`}
              />
            </View>
          </View>
          <HR tw={tw} style={tw`bg-gray-200 h-[1px] top-6`} />
          {tokens
            .filter(item => (toggleStatus ? item.active : true))
            .map((item, idx) => {
              const flag =
                CardValidator.number(item.first_six).card?.type || 'ach';
              return (
                <View key={idx} style={tw`pt-10`}>
                  <View style={tw`flex-row justify-between`}>
                    <View style={tw`flex-row`}>
                      <Image
                        source={{
                          uri: cardFlag(flag),
                        }}
                        style={tw`w-7`}
                      />
                      <Text
                        style={tw`font-inter text-gray-700 font-medium pl-2 text-sm`}>
                        {item.payment_method === 'cc'
                          ? flag
                            ? `${flag.charAt(0).toUpperCase()}${flag.slice(1)}`
                            : ''
                          : `${item.account_type
                              .charAt(0)
                              .toUpperCase()}${item.account_type.slice(1)}`}{' '}
                        • {item.last_four}
                      </Text>
                    </View>
                    <View style={tw`flex-row items-center`}>
                      <StatusTag
                        label={`${item.active ? 'Active' : 'Inactive'}`}
                        type={`${item.active ? 'success' : 'disabled'}`}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setToken(item);
                          setFlagCard(flag);
                          setShowOptions(true);
                        }}
                        style={tw`w-12 -mr-5 flex-row justify-center`}>
                        <View style={tw`flex-col justify-center`}>
                          <SvgXml xml={Options} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {item.payment_method === 'cc' && (
                    <View style={tw`flex-row`}>
                      <Text
                        style={tw`pt-3 font-inter text-gray-600 font-normal text-sm`}>
                        Expires{' '}
                        {item.exp_date
                          ? `${item.exp_date.substring(
                              0,
                              2,
                            )}/${item.exp_date.substring(2, 4)}`
                          : ''}
                      </Text>
                      {item.expiring_in_months && item.expiring_in_months <= 3 && (
                        <View style={tw`pt-3 pl-2`}>
                          <StatusTag
                            label={
                              item.expiring_in_months < 0
                                ? 'Expired'
                                : 'Expiring Soon'
                            }
                            type={
                              item.expiring_in_months < 0
                                ? 'disabled'
                                : 'warning'
                            }
                          />
                        </View>
                      )}
                    </View>
                  )}
                  <HR tw={tw} style={tw`bg-gray-200 h-[1px] top-3`} />
                </View>
              );
            })}
          {showButtons && (
            <View style={tw`mt-8`}>
              <Button
                tw={tw}
                style={tw` bg-gray-50 shadow-sm border-gray-200 h-10 justify-center`}
                textStyle={tw`font-inter font-medium text-gray-900 text-sm h-5`}
                type="primary"
                onPress={() => navigate('AddNewCreditCard', {customerId})}>
                {t('Add Credit Card')}
              </Button>
              <Button
                tw={tw}
                style={tw`my-2 bg-gray-50 shadow-sm border-gray-200 h-10 justify-center`}
                textStyle={tw`font-inter font-medium text-gray-900 text-sm h-5`}
                type="primary"
                onPress={() => navigate('AddNewACH', {customerId})}>
                {t('Add Bank Account')}
              </Button>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default WalletCard;
