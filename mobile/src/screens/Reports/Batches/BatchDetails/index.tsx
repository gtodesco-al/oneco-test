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

import RootStackParamList from '../../../RootStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import tw from '../../../../../services/tw';
import {api} from '../../../../api';
import {SvgXml} from 'react-native-svg';

import CloseScreen from '../../../../icons/close-screen';

import LocationContext from '../../../../context/LocationContext';
import {Page} from '@fortis/api/src/declarations';
import LoadingDataComponent from '../../../../components/local/LoadingDataComponent';
import Spinner from '../../../../icons/spinner';

import Filter from '../../../../icons/filter';

import DataEmpty from '../../../../components/local/DataEmpty';
import BatchDetailComponent from './BatchDetailComponent';
import BatchesDetailsFilterContext from '../../../../context/BatchesDetailsFilterContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ReportBatches'>;

const PAGE_SIZE = 5;

const BatchDetails = ({navigation, route}: Props) => {
  api.reAuthenticate(true);

  const insets = useSafeAreaInsets();
  const {navigate} = navigation;
  const {locationContextState} = useContext(LocationContext);
  const [loading, setLoading] = useState(true);
  const [batchesDetails, setBatchesDetails] = useState<Page<any>[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [badge, setBadge] = useState(0);

  const location_id = locationContextState?.locationSelected?.id;
  const {batchesDetailsFilterContextState} = useContext(
    BatchesDetailsFilterContext,
  );

  const batchesDetailsFilters = batchesDetailsFilterContextState;

  const getDataBatchesDetails = async (page?: number, reset = false) => {
    const refPage = page || currentPage;
    if ((location_id && refPage <= lastPage) || lastPage === 0) {
      try {
        if (route.params) {
          if (currentPage === 1) {
            setLoading(true);
          }
          const processedFilters = batchesDetailsFilters
            ? batchesDetailsFilters
            : {};
          const batchesDetails_ = await api
            .service('gateway-transactions-reports')
            .find({
              paginate: true,
              query: {
                filter: {
                  location_id,
                  transaction_batch_id: route.params.transactionBatchId,
                  ...processedFilters,
                },
              },
            });
          setLastPage(
            Math.ceil(batchesDetails_.pagination.total_count / PAGE_SIZE),
          );
          setCurrentPage(refPage + 1);

          if (reset) {
            setBatchesDetails(batchesDetails_.list);
          } else {
            setBatchesDetails([...batchesDetails, ...batchesDetails_.list]);
          }

          setLoading(false);
          setLoadingMore(false);
        }
      } catch (e) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    onRefresh();
  }, [location_id, batchesDetailsFilters]);

  const loadMoreItem = () => {
    if (currentPage > 1 && currentPage < lastPage) {
      setLoadingMore(true);
      getDataBatchesDetails();
    }
  };

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
    getDataBatchesDetails(1, true);
  };

  useEffect(() => {
    let badge_ = 0;
    if (batchesDetailsFilters?.created_ts?.$gte) {
      badge_ += 1;
    }

    if (batchesDetailsFilters?.created_ts?.$lte) {
      badge_ += 1;
    }

    if (batchesDetailsFilters?.transaction_amount) {
      badge_ += 1;
    }

    if (batchesDetailsFilters?.batch) {
      badge_ += 1;
    }

    if (batchesDetailsFilters?.last_four) {
      badge_ += 1;
    }

    if (batchesDetailsFilters?.type_id) {
      badge_ += 1;
    }

    if (batchesDetailsFilters?.account_type) {
      badge_ += 1;
    }

    setBadge(badge_);
  }, [batchesDetailsFilters]);

  const batchesDetailsView = () => {
    return (
      <View style={tw`pt-5 mx-5`}>
        {batchesDetails.length > 0 ? (
          <FlatList
            data={batchesDetails}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item, index}) => {
              return <BatchDetailComponent item={item} index={index} />;
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
              <H2 tw={tw} style={tw`pl-2 py-1.5 font-inter text-gray-900`}>
                Batches Details
              </H2>
            </View>
            <TouchableOpacity
              style={tw`mr-5 mt-1 items-center justify-center`}
              onPress={() => navigate('FiltersDetailsBatches')}>
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
            batchesDetailsView()
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

export default BatchDetails;
