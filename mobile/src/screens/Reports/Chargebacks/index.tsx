import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppStatusBar, Card, H2, LoadingRound} from '@amplifiui/mobile';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import RootStackParamList from '../../RootStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import tw from '../../../../services/tw';
import {api} from '../../../api';
import {SvgXml} from 'react-native-svg';

import CloseScreen from '../../../icons/close-screen';
import LocationContext from '../../../context/LocationContext';
import {Page} from '@fortis/api/src/declarations';
import LoadingDataComponent from '../../../components/local/LoadingDataComponent';
import Spinner from '../../../icons/spinner';

import Filter from '../../../icons/filter';
import DataEmpty from '../../../components/local/DataEmpty';
import ChargebackComponent from './ChargebackComponent';

import ChargebacksFilterContext from '../../../context/ChargebacksFilterContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Chargebacks'>;

const PAGE_SIZE = 5;

const ReportChargebacks = ({navigation, route}: Props) => {
  api.reAuthenticate(true);

  const insets = useSafeAreaInsets();
  const {navigate} = navigation;
  const {locationContextState} = useContext(LocationContext);
  const [loading, setLoading] = useState(true);
  const [chargebacks, setChargebacks] = useState<Page<any>[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [badge, setBadge] = useState(0);

  const location_id = locationContextState?.locationSelected?.id;
  const {chargebacksFilterContextState} = useContext(ChargebacksFilterContext);

  const chargebackFilters = chargebacksFilterContextState;

  const getDataBatches = async (page?: number, reset = false) => {
    const refPage = page || currentPage;
    let processedFilters;
    if ((location_id && refPage <= lastPage) || lastPage === 0) {
      try {
        if (currentPage === 1) {
          setLoading(true);
        }

        if (route.params.receive_dt_ts !== undefined) {
          processedFilters = route.params;
        } else {
          processedFilters = chargebackFilters ? chargebackFilters : {};
        }

        const chargebacks_ = await api.service('chargebacks-reports').find({
          paginate: true,
          query: {
            filter: {
              ...processedFilters,
            },
            page: {number: currentPage, size: 5},
          },
        });
        setLastPage(Math.ceil(chargebacks_.pagination.total_count / PAGE_SIZE));
        setCurrentPage(refPage + 1);

        if (reset) {
          setChargebacks(chargebacks_.list);
        } else {
          setChargebacks([...chargebacks, ...chargebacks_.list]);
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
  }, [location_id, chargebackFilters]);

  const loadMoreItem = () => {
    if (currentPage > 1 && currentPage < lastPage) {
      setLoadingMore(true);
      getDataBatches();
    }
  };

  useEffect(() => {
    let badge_ = 0;
    if (chargebackFilters?.receive_dt_ts?.$gte) {
      badge_ += 1;
    }

    if (chargebackFilters?.receive_dt_ts?.$lte) {
      badge_ += 1;
    }

    if (chargebackFilters?.amount) {
      badge_ += 1;
    }

    if (chargebackFilters?.card_last_4_nbr) {
      badge_ += 1;
    }

    if (chargebackFilters?.card_type) {
      badge_ += 1;
    }
    setBadge(badge_);
  }, [chargebackFilters]);

  const ListFooterComponent = () => (
    <Card tw={tw} style={tw`shadow-none mx-5 items-center`}>
      <LoadingRound tw={tw} style={tw`w-9 h-9`}>
        <SvgXml xml={Spinner} />
      </LoadingRound>
      <Text>Loading More...</Text>
    </Card>
  );

  const onRefresh = async () => {
    setLastPage(0);
    getDataBatches(1, true);
  };

  const chargebacksView = () => {
    return (
      <View style={tw`pt-5 mx-5`}>
        {chargebacks.length > 0 ? (
          <FlatList
            data={chargebacks}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => {
              return <ChargebackComponent item={item} />;
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
                Chargebacks
              </H2>
            </View>
            <TouchableOpacity
              style={tw`mr-5 mt-1 items-center justify-center`}
              onPress={() => navigate('FilterChargebacks')}>
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
            chargebacksView()
          ) : (
            <View style={tw`mx-5 -mt-1`}>
              <LoadingDataComponent />
            </View>
          )}
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
};

export default ReportChargebacks;
