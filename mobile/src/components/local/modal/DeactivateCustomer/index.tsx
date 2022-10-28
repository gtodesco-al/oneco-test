import React from 'react';
import {Text, View} from 'react-native';
import {Button, CollapsibleModal, H1} from '@amplifiui/mobile';
import {t} from 'i18next';

import tw from '../../../../../services/tw';
import {api} from '../../../../api';

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onDeactivate: React.Dispatch<void>;
  customerId: string;
  customerName: string;
};

const DeactivateCustomer = ({
  isVisible,
  setShow,
  onDeactivate,
  customerId,
  customerName,
}: Props): JSX.Element => {
  const Customer = (
    <Text style={tw`font-inter text-gray-700 text-base font-bold`}>
      {customerName}
    </Text>
  );

  return (
    <>
      <CollapsibleModal
        tw={tw}
        maxHeight={tw.prefixMatch('ios') ? 410 : 400}
        show={isVisible}
        setShow={() => setShow(!isVisible)}>
        <View style={tw`w-full px-5`}>
          <H1 tw={tw} style={tw`font-inter text-xl`}>
            Deactivate Customer
          </H1>
          <Text style={tw`font-inter font-normal text-gray-700 text-base my-9`}>
            Are you sure you would like to deactivate customer {Customer}?
          </Text>
          <Button
            tw={tw}
            style={tw`my-2 shadow-sm border-gray-200`}
            textStyle={tw`font-inter font-medium text-base`}
            type="primary"
            onPress={async () => {
              try {
                const ans = await api.service('contacts').remove(customerId);
                console.log('[ViewCustomer] While deactivating customer:', ans);
                setShow(!isVisible);
                onDeactivate();
              } catch (e) {
                console.error(
                  '[ViewCustomer] error while deactivating customer:',
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
    </>
  );
};

export default DeactivateCustomer;
