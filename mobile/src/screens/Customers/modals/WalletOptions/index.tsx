import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button, CollapsibleModal, HR} from '@amplifiui/mobile';
import {t} from 'i18next';
import {SvgXml} from 'react-native-svg';

import tw from '../../../../../services/tw';

import RootStackParamList from '../../../RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import arrowRightBlue from '../../../../icons/right-blue';
import {Token} from '@fortis/api/src/services/tokens.service';
import {Contact} from '@fortis/api';

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeactivateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReactivateModal: React.Dispatch<React.SetStateAction<boolean>>;
  tokenId: string;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'ViewCustomer',
    undefined
  >;
  token: Token;
  customer: Contact;
  isActive: boolean;
};

const WalletOptions = ({
  isVisible,
  setShow,
  setShowDeactivateModal,
  setShowReactivateModal,
  tokenId,
  navigation,
  token,
  customer,
  isActive,
}: Props): JSX.Element => {
  const {navigate} = navigation;

  const textOptionStyle = tw`text-gray-700 text-[4] font-inter pl-5 font-medium`;
  const buttonOptionStyle = tw`flex-row items-center justify-between`;
  const lineOptionStyle = tw`my-4 h-[1px]`;
  const colorOption = 'gray-200';
  const marginRightIconStyle = tw`mr-5`;

  return (
    <CollapsibleModal
      tw={tw}
      maxHeight={tw.prefixMatch('ios') ? 410 : 400}
      show={isVisible}
      setShow={() => setShow(!isVisible)}>
      <View>
        <TouchableOpacity
          style={buttonOptionStyle}
          onPress={() => {
            setShow(false);

            if (token.payment_method === 'cc') {
              navigate('ViewCreditCard', {
                tokenId,
                customer,
              });
            }

            if (token.payment_method === 'ach') {
              navigate('ViewACH', {
                tokenId,
                customer,
              });
            }
          }}>
          <Text style={textOptionStyle}>View</Text>
          <View style={marginRightIconStyle}>
            <SvgXml xml={arrowRightBlue} />
          </View>
        </TouchableOpacity>
        {isActive && (
          <>
            <HR style={lineOptionStyle} tw={tw} color={colorOption} />
            <TouchableOpacity
              style={buttonOptionStyle}
              onPress={() => {
                setShow(false);

                if (token.payment_method === 'cc') {
                  navigate('EditCreditCard', {tokenId});
                }

                if (token.payment_method === 'ach') {
                  navigate('EditACH', {tokenId});
                }
              }}>
              <Text style={textOptionStyle}>Edit</Text>
              <View style={marginRightIconStyle}>
                <SvgXml xml={arrowRightBlue} />
              </View>
            </TouchableOpacity>
          </>
        )}
        <HR style={lineOptionStyle} tw={tw} color={colorOption} />
        {token.active ? (
          <>
            <TouchableOpacity
              style={buttonOptionStyle}
              onPress={() =>
                navigate('ChargeCustomer', {customerId: customer.id, tokenId})
              }>
              <Text style={textOptionStyle}>Charge</Text>
              <View style={marginRightIconStyle}>
                <SvgXml xml={arrowRightBlue} />
              </View>
            </TouchableOpacity>
            <HR style={lineOptionStyle} tw={tw} color={colorOption} />
          </>
        ) : null}
        <TouchableOpacity
          style={buttonOptionStyle}
          onPress={() => {
            console.log('onPress show wallet');
            setShow(false);
            // eslint-disable-next-line no-lone-blocks
            {
              token.active
                ? setShowDeactivateModal(true)
                : setShowReactivateModal(true);
            }
          }}>
          <Text style={textOptionStyle}>
            {token.active ? 'Deactivate' : 'Reactivate'}
          </Text>
          <View style={marginRightIconStyle}>
            <SvgXml xml={arrowRightBlue} />
          </View>
        </TouchableOpacity>
        <HR style={lineOptionStyle} tw={tw} color={colorOption} />
        <View style={tw`mx-5`}>
          <Button
            tw={tw}
            style={tw`my-2 bg-gray-50 shadow-sm border-gray-200`}
            textStyle={tw`text-gray-900 text-[4]`}
            type="primary"
            onPress={() => setShow(!isVisible)}>
            {t('Cancel')}
          </Button>
        </View>
      </View>
    </CollapsibleModal>
  );
};

export default WalletOptions;
