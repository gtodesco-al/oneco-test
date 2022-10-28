import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppStatusBar, Card, H2, LoadingRound} from '@amplifiui/mobile';
import {Page} from '@fortis/api/src/declarations';

import LoadingDataComponent from '../../../components/local/LoadingDataComponent';
import TransactionComponent from './TransactionComponent';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../../RootStackParamList';

import {SvgXml} from 'react-native-svg';
import Spinner from '../../../icons/spinner';
import CloseScreen from '../../../icons/close-screen';
import Filter from '../../../icons/filter';

import tw from '../../../../services/tw';
import {api} from '../../../api';

import GatewayTransactionsOptionsModal from './GatewayTransactionsOptionsModal';
import TransactionDetailsModal from '../../../components/local/modal/TransactionDetails';
import LocationContext from '../../../context/LocationContext';

import GatewayTransactionsFilterContext from '../../../context/GatewayTransactionsFilterContext';
import DataEmpty from '../../../components/local/DataEmpty';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'ReportGatewayTransactions'
>;

const PAGE_SIZE = 5;

const ReportGatewayTransactions = ({navigation, route}: Props) => {
  api.reAuthenticate(true);
  const insets = useSafeAreaInsets();
  const {navigate} = navigation;

  const {locationContextState} = useContext(LocationContext);
  const location_id = locationContextState?.locationSelected?.id;
  const {gatewayTransactionsFilterContextState} = useContext(
    GatewayTransactionsFilterContext,
  );
  const gatewayFilters = gatewayTransactionsFilterContextState;

  const [loadingMore, setLoadingMore] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTransactionDetailsModal, setShowTransactionDetailsModal] =
    useState(false);

  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [badge, setBadge] = useState(0);

  const [transactions, setTransactions] = useState<Page<any>[]>([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | undefined
  >();

  const getDataTransactions = async (page?: number, reset = false) => {
    const refPage = page || currentPage;
    let processedFilters;
    if ((location_id && refPage <= lastPage) || lastPage === 0) {
      try {
        if (currentPage === 1) {
          setLoading(true);
        }

        if (route.params.created_ts !== undefined) {
          processedFilters = route.params;
        } else {
          processedFilters = gatewayFilters ? gatewayFilters : {};
        }

        const transactions_ = await api
          .service('gateway-transactions-reports')
          .find({
            paginate: true,
            query: {
              page: {number: currentPage, size: PAGE_SIZE},
              filter: {
                location_id,
                ...processedFilters,
              },
            },
          });

        setLastPage(
          Math.ceil(transactions_.pagination.total_count / PAGE_SIZE),
        );
        setCurrentPage(refPage + 1);

        if (reset) {
          setTransactions(transactions_.list);
        } else {
          setTransactions([...transactions, ...transactions_.list]);
        }

        setLoading(false);
        setLoadingMore(false);
      } catch (e) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    onRefresh();
  }, [location_id, gatewayFilters]);

  useEffect(() => {
    let badge_ = 0;
    if (gatewayFilters?.created_ts?.$gte) {
      badge_ += 1;
    }

    if (gatewayFilters?.created_ts?.$lte) {
      badge_ += 1;
    }

    if (gatewayFilters?.account_holder_name) {
      badge_ += 1;
    }

    if (gatewayFilters?.is_wallet) {
      badge_ += 1;
    }

    if (gatewayFilters?.status_code) {
      badge_ += 1;
    }

    if (gatewayFilters?.reason_code_id) {
      badge_ += 1;
    }

    if (gatewayFilters?.transaction_amount) {
      badge_ += 1;
    }

    if (gatewayFilters?.batch) {
      badge_ += 1;
    }

    if (gatewayFilters?.product_transaction?.title) {
      badge_ += 1;
    }

    if (gatewayFilters?.is_recurring) {
      badge_ += 1;
    }

    if (gatewayFilters?.last_four) {
      badge_ += 1;
    }

    setBadge(badge_);
  }, [gatewayFilters]);

  const loadMoreItem = () => {
    if (currentPage > 1 && currentPage < lastPage) {
      setLoadingMore(true);
      getDataTransactions();
    }
  };

  const onRefresh = () => {
    setLastPage(0);
    getDataTransactions(1, true);
  };

  const ListFooterComponent = () => (
    <Card tw={tw} style={tw`shadow-none items-center`}>
      <LoadingRound tw={tw} style={tw`w-9 h-9`}>
        <SvgXml xml={Spinner} />
      </LoadingRound>
      <Text>Loading More...</Text>
    </Card>
  );

  const transactionsView = () => {
    return (
      <View style={tw`mx-5`}>
        {transactions.length > 0 ? (
          <FlatList
            data={transactions}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item, index}) => {
              return (
                <TransactionComponent
                  item={item}
                  index={index}
                  setShowOptions={setShowOptionsModal}
                  setSelectedTransactionId={setSelectedTransactionId}
                />
              );
            }}
            refreshing={loading}
            onRefresh={onRefresh}
            onEndReachedThreshold={0.1}
            onEndReached={loadMoreItem}
            ListFooterComponent={() => loadingMore && <ListFooterComponent />}
          />
        ) : (
          <DataEmpty style={tw`mt-2`} />
        )}
      </View>
    );
  };

  return (
    <View style={tw`flex-1`}>
      <View style={tw`ios:h-${Math.floor(insets.top / 4)}`}>
        <SafeAreaView style={{...tw`bg-[#00334D]`}} />
      </View>
      <SafeAreaView style={{...tw`flex-1 bg-gray-100`}}>
        <AppStatusBar
          tw={tw}
          backgroundColor="#00334D"
          barStyle="light-content"
          top={insets.top}
        />
        <View style={tw`ios:-mt-[${insets.top}]`}>
          <Card
            tw={tw}
            style={tw`pl-5 flex-row items-center ios:mt-[${insets.top}] justify-between z-50`}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={tw`py-3`}>
              <SvgXml xml={CloseScreen} />
            </TouchableOpacity>
            <View style={tw`w-60`}>
              <H2 tw={tw} style={tw`py-1.5 font-inter text-gray-900`}>
                {'Gateway Transactions'}
              </H2>
            </View>
            <TouchableOpacity
              style={tw`mr-5 mt-1 items-center justify-center`}
              onPress={() => navigate('FilterGatewayTransactions')}>
              <SvgXml xml={Filter} />
              {badge > 0 && (
                <View
                  style={tw`rounded-full bg-[#B91C1C] w-4 h-4 absolute left-3 bottom-4`}>
                  <Text style={tw`text-white text-center font-inter text-xs`}>
                    {badge}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </Card>
        </View>
        <SafeAreaView style={tw`flex-1 pt-5`}>
          {!loading ? (
            transactionsView()
          ) : (
            <View style={tw`mx-5 -mt-1`}>
              <LoadingDataComponent />
            </View>
          )}
        </SafeAreaView>
      </SafeAreaView>
      <GatewayTransactionsOptionsModal
        isVisible={showOptionsModal}
        setShow={(s: boolean) => {
          setShowOptionsModal(s);
        }}
        setShowTransactionDetailsModal={setShowTransactionDetailsModal}
      />
      <TransactionDetailsModal
        isVisible={showTransactionDetailsModal}
        setShow={setShowTransactionDetailsModal}
        transactionId={selectedTransactionId}
      />
    </View>
  );
};

export default ReportGatewayTransactions;
