import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import tw from '../../../../../services/tw';
import {t} from 'i18next';
import {Button, CollapsibleModal} from '@amplifiui/mobile';

import {Transaction} from '@fortis/api';

import IconRight from '../../../../icons/arrow-right-white';
import CloseIcon from '../../../../icons/close';
import FadedScrollView from '../../../amplifi-ui/FadedScrollView';

import TransactionAmount from './components/TransactionAmount';
import Tax from './components/Tax';
import TransactionInfo from './components/TransactionInfo';
import AccountInfo from './components/AccountInfo';
import Description from './components/Description';
import DateAndTransactionId from './components/DateAndTransactionId';
import EMVData from './components/EMVData';
import TransactionHistory from './components/TransactionHistory';
import Agreement from './components/Agreement';
import {api} from '../../../../api';

const WINDOW_HEIGHT = Dimensions.get('window').height;

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  transactionId: string | undefined;
};

const formatAmount = (amount: number) => {
  return (amount / 100).toFixed(2);
};

const TransactionDetailsModal = ({
  isVisible,
  setShow,
  transactionId,
}: Props): JSX.Element => {
  const [transaction, setTransaction] = useState<any>({});

  const fetchData = async () => {
    try {
      if (transactionId) {
        const transaction_: Transaction = await api
          .service('transactions')
          .get(transactionId);
        setTransaction(transaction_);
      }
    } catch (error) {
      console.error(
        '[Transaction Details]: error while retrieving transaction',
        error,
      );
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchData();
    }
  }, [transactionId, isVisible]);

  return (
    <CollapsibleModal
      tw={tw}
      maxHeight={WINDOW_HEIGHT * 0.95}
      show={isVisible}
      setShow={setShow}>
      <View style={tw`flex-row justify-between mb-6 px-5`}>
        <Text style={tw`font-inter font-medium text-xl text-gray-900`}>
          {t('Transaction Details')}
        </Text>
        <TouchableOpacity
          style={tw`justify-center`}
          onPress={() => setShow(false)}>
          <SvgXml xml={CloseIcon} />
        </TouchableOpacity>
      </View>
      <SafeAreaView>
        <FadedScrollView
          tw={tw}
          fadeSize={20}
          style={tw`px-5 pt-5 h-${WINDOW_HEIGHT * 0.62}px`}>
          <TransactionAmount amount={formatAmount(transaction.auth_amount)} />
          <Tax amount={formatAmount(transaction.tax)} />
          <TransactionInfo transaction={transaction} />
          <AccountInfo transaction={transaction} />
          <Description description={transaction.description || ''} />
          <DateAndTransactionId transaction={transaction} />
          <EMVData />
          <TransactionHistory />
          <Agreement />
        </FadedScrollView>
        <View style={tw`border-t border-gray-200 p-5`}>
          <Button
            tw={tw}
            style={tw`my-2`}
            type="primary"
            onPress={() => console.log('Print')}
            iconRight={IconRight}>
            {t('Print Authorization')}
          </Button>
        </View>
      </SafeAreaView>
    </CollapsibleModal>
  );
};

export default TransactionDetailsModal;
