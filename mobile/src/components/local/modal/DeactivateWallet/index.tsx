import React from 'react';
import {Text, View} from 'react-native';
import {Button, CollapsibleModal, H1} from '@amplifiui/mobile';
import {t} from 'i18next';
import * as CardValidator from 'card-validator';

import tw from '../../../../../services/tw';
import {api} from '../../../../api';
import {Token} from '@fortis/api/src/services/tokens.service';

type Props = {
  token: Token;
  customerName: string;
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onDeactivate: React.Dispatch<void>;
};

const DeactivateWallet = ({
  token,
  customerName,
  isVisible,
  setShow,
  onDeactivate,
}: Props): JSX.Element => {
  const WalletInfo = (
    <Text style={tw`font-inter text-gray-700 text-base font-bold`}>
      {token.payment_method === 'cc'
        ? `${CardValidator.number(token.first_six).card?.type} • `
        : ''}
      {token.last_four}
    </Text>
  );

  const Customer = (
    <Text style={tw`font-inter text-gray-700 text-base font-bold`}>
      {customerName}
    </Text>
  );

  return (
    <CollapsibleModal
      tw={tw}
      maxHeight={tw.prefixMatch('ios') ? 410 : 370}
      show={isVisible}
      setShow={() => setShow(!isVisible)}>
      <View style={tw`w-full px-5`}>
        <H1 tw={tw} style={tw`font-inter text-xl`}>
          Deactivate Wallet
        </H1>
        <Text style={tw`font-inter font-normal text-gray-700 text-base my-9`}>
          Are you sure you would like to deactivate the Wallet {WalletInfo} from{' '}
          customer {Customer}?
        </Text>
        <Button
          tw={tw}
          style={tw`my-2 shadow-sm border-gray-200`}
          textStyle={tw`font-inter font-medium text-base`}
          type="primary"
          onPress={async () => {
            try {
              const ans = await api.service('tokens').remove(token.id);
              console.log('[DeactivateWallet] While deactivating wallet:', ans);
              onDeactivate();
              setShow(false);
            } catch (e) {
              console.error(
                '[DeactivateWallet] error while deactivating customer:',
                e,
              );
            }
          }}>
          {t('Yes, Deactivate')}
        </Button>
        <Button
          tw={tw}
          style={tw`my-2 bg-gray-50 shadow-sm border-gray-200`}
          textStyle={tw`font-inter font-medium text-gray-900 text-base`}
          type="primary"
          onPress={() => setShow(!isVisible)}>
          {t('Cancel')}
        </Button>
      </View>
    </CollapsibleModal>
  );
};

export default DeactivateWallet;
