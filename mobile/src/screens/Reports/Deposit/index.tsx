import {AppStatusBar, Card, H2, LoadingRound} from '@amplifiui/mobile';
import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LoadingDataComponent from '../../../components/local/LoadingDataComponent';
import DepositComponent from './DepositComponent';

import {Page} from '@fortis/api/src/declarations';
import {api} from '../../../api';
import tw from '../../../../services/tw';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';

import Filter from '../../../icons/filter';
import Spinner from '../../../icons/spinner';
import CloseScreen from '../../../icons/close-screen';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../../RootStackParamList';
import LocationContext from '../../../context/LocationContext';
import DepositsFilterContext from '../../../context/DepositsFilterContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Deposit'>;

const PAGE_SIZE = 5;

const Deposits = ({navigation}: Props) => {
  api.reAuthenticate(true);
  const {navigate} = navigation;

  const [loadingMore, setLoadingMore] = useState(false);
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [deposits, setDeposits] = useState<Page<any>[]>([]);
  const {locationContextState} = useContext(LocationContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [badge, setBadge] = useState(0);
  const {depositsFilterContextState} = useContext(DepositsFilterContext);

  const location_id = locationContextState?.locationSelected?.id;
  const depositsFilters = depositsFilterContextState;

  const getDataDeposits = async (page?: number, reset = false) => {
    const refPage = page || currentPage;
    if ((location_id && refPage <= lastPage) || lastPage === 0) {
      try {
        if (currentPage === 1) {
          setLoading(true);
        }
        const processedFilters = depositsFilters ? depositsFilters : {};
        const deposits_ = await api.service('deposits-reports').find({
          paginate: true,
          query: {
            filter: {
              location_id,
              ...processedFilters,
            },
            page: {number: currentPage, size: 5},
          },
        });

        setLastPage(Math.ceil(deposits_.pagination.total_count / PAGE_SIZE));
        setCurrentPage(refPage + 1);

        if (reset) {
          setDeposits(deposits_.list);
        } else {
          setDeposits([...deposits, ...deposits_.list]);
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
  }, [location_id, depositsFilters]);

  const loadMoreItem = () => {
    if (currentPage > 1 && currentPage < lastPage) {
      setLoadingMore(true);
      getDataDeposits();
    }
  };

  const onRefresh = async () => {
    setLastPage(0);
    getDataDeposits(1, true);
  };

  useEffect(() => {
    let badge_ = 0;
    if (depositsFilters?.date_effective_ts?.$gte) {
      badge_ += 1;
    }

    if (depositsFilters?.date_effective_ts?.$lte) {
      badge_ += 1;
    }

    if (depositsFilters?.amount) {
      badge_ += 1;
    }

    if (depositsFilters?.merchant_name) {
      badge_ += 1;
    }
    setBadge(badge_);
  }, [depositsFilters]);

  const ListFooterComponent = () => (
    <Card tw={tw} style={tw`shadow-none mx-5 items-center`}>
      <LoadingRound tw={tw} style={tw`w-9 h-9`}>
        <SvgXml xml={Spinner} />
      </LoadingRound>
      <Text>Loading More...</Text>
    </Card>
  );

  const depositsView = () => {
    return (
      <View style={tw`pt-5`}>
        {deposits.length > 0 ? (
          <FlatList
            data={deposits}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => {
              return <DepositComponent item={item} />;
            }}
            refreshing={loading}
            onRefresh={onRefresh}
            onEndReachedThreshold={0.1}
            onEndReached={loadMoreItem}
            ListFooterComponent={() => loadingMore && <ListFooterComponent />}
          />
        ) : null}
      </View>
    );
  };

  return (
    <>
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
                  Deposits
                </H2>
              </View>
              <TouchableOpacity
                style={tw`mr-5 mt-1 items-center justify-center`}
                onPress={() => navigate('FilterDeposit')}>
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
          <SafeAreaView style={tw`flex-1`}>
            {!loading ? (
              depositsView()
            ) : (
              <View style={tw`mx-5 -mt-1`}>
                <LoadingDataComponent />
              </View>
            )}
          </SafeAreaView>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Deposits;
