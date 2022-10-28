import {Token} from '@fortis/api/src/services/tokens.service';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getTokens} from '../../../../../services/api';
import tw from '../../../../../services/tw';
import {userHasResource} from '../../../../../services/permissions';

import UserContext from '../../../../context/UserContext';

import CollapsibleModal from '../../../amplifi-ui/CollapsibleModal';

import CloseIcon from '../../../../icons/close';
import NoLocationsIcon from '../../../../icons/icon-no-locations';
import arrowRightBlue from '../../../../icons/right-blue';
import FadedScrollView from '../../../amplifi-ui/FadedScrollView';

import RootStackParamList from '../../RootStackParamList';
import {Button, InputText, Radio} from '@amplifiui/mobile';
import {useNavigation} from '@react-navigation/native';

type Nav = {
  navigate: (value: string) => void;
};

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  customerId: string;
  tokenId?: string;
  customerWalletSelected: React.Dispatch<React.SetStateAction<Object>>;
  navigation?: NativeStackScreenProps<RootStackParamList, ''>;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

const WINDOW_HEIGHT = Dimensions.get('window').height;

const SelectCustomersWallet = ({
  isVisible,
  setShow,
  customerId,
  tokenId,
  customerWalletSelected,
  navigation,
  onChange,
}: Props): JSX.Element => {
  const maxHeight = WINDOW_HEIGHT * 0.95;
  const [searchItems, setSearchItems] = useState('');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [items, setItems] = useState<Token[]>([]);
  const [idSelected, setIdSelected] = useState('');

  const {navigate} = useNavigation<Nav>();

  const {userContextState} = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const tokens_ = await getTokens(customerId);
        setTokens(tokens_);
      } catch (e) {
        console.error('error:', e);
      }
    })();
  }, [customerId]);

  useEffect(() => {
    if (tokenId) {
      const token = tokens.find(item => tokenId === item.id);
      if (token) {
        enableWallet(token);
      }
    }
  }, [tokens]);

  useEffect(() => {
    setItems(
      tokens.filter(item => {
        return (
          item.account_holder_name
            .toLowerCase()
            .indexOf(searchItems.toLowerCase()) !== -1 ||
          item.account_number
            .toLowerCase()
            .indexOf(searchItems.toLowerCase()) !== -1
        );
      }),
    );
  }, [searchItems, tokens]);

  const enableWallet = (item: Token) => {
    setIdSelected(item.id || '');
    const detailsWallet = {
      id: item.id,
      walletFormatted:
        item.account_holder_name +
        ' • ' +
        item.account_type +
        ' • ' +
        item.last_four +
        ' • ' +
        item.payment_method,
    };
    onChange(detailsWallet.walletFormatted);
    customerWalletSelected(detailsWallet);
  };

  return (
    <>
      <CollapsibleModal
        tw={tw}
        maxHeight={maxHeight}
        show={isVisible}
        setShow={() => setShow(!isVisible)}
        style={tw`flex-1`}>
        <View style={tw`flex-1`}>
          <View style={tw`flex-row justify-between mb-6 px-5`}>
            <Text style={tw`font-inter font-medium text-xl text-gray-900`}>
              Select Customers Wallet
            </Text>
            <TouchableOpacity
              style={tw`justify-center`}
              onPress={() => setShow(!isVisible)}>
              <SvgXml xml={CloseIcon} />
            </TouchableOpacity>
          </View>
          <View style={tw`m-5`}>
            <InputText
              tw={tw}
              placeholder="Search"
              style={tw`pb-4`}
              inputStyle={tw`h-11`}
              onChangeText={setSearchItems}
              value={searchItems}
            />
          </View>
          <FadedScrollView tw={tw} fadeSize={20} style={tw`flex-1`}>
            {items.length === 0 && (
              <View style={tw`items-center`}>
                <SvgXml xml={NoLocationsIcon} />
                <Text style={tw`font-inter text-sm text-gray-600 mt-5`}>
                  Sorry, we couldn't find any matches for that
                </Text>
              </View>
            )}
            {items.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={1}
                onPress={() => {
                  enableWallet(item);
                  setShow(!isVisible);
                }}
                style={tw`flex-row justify-between h-16 border-b px-5 border-gray-200`}>
                <View style={tw`flex-col justify-center`}>
                  <Text style={tw`font-inter text-base text-gray-700`}>
                    {item.account_holder_name} • Visa • {item.last_four} •{' '}
                    {item.account_type}
                  </Text>
                </View>
                <Radio
                  tw={tw}
                  key={item.id}
                  value={item.id === idSelected}
                  onPress={() => {
                    enableWallet(item);
                    setShow(!isVisible);
                  }}
                />
              </TouchableOpacity>
            ))}
          </FadedScrollView>
          {userHasResource(userContextState, 'accountvaults', 'post') ? (
            <View style={tw`mb-18 mx-5`}>
              <Button
                tw={tw}
                style={tw`bg-white border-gray-300 border mb-2`}
                textStyle={tw`text-gray-700`}
                onPress={() => navigate('AddNewCreditCard', {customerId})}
                iconRight={arrowRightBlue}>
                Add New Credit Card
              </Button>
              <Button
                tw={tw}
                style={tw`bg-white border-gray-300 border`}
                textStyle={tw`text-gray-700`}
                onPress={() => navigate('AddNewACH', {customerId})}
                iconRight={arrowRightBlue}>
                Add New Bank Account
              </Button>
            </View>
          ) : null}
        </View>
      </CollapsibleModal>
    </>
  );
};

export default SelectCustomersWallet;
