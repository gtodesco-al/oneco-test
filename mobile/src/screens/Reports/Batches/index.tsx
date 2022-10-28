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

import BatchComponent from './BatchComponent';
import BatchOptionsModal from './BatchOptionsModal';
import LocationContext from '../../../context/LocationContext';
import {Page} from '@fortis/api/src/declarations';
import LoadingDataComponent from '../../../components/local/LoadingDataComponent';
import Spinner from '../../../icons/spinner';

import Filter from '../../../icons/filter';
import BatchesFilterContext from '../../../context/BatchesFilterContext';
import DataEmpty from '../../../components/local/DataEmpty';

type Props = NativeStackScreenProps<RootStackParamList, 'ReportBatches'>;

const PAGE_SIZE = 5;

const ReportBatches = ({navigation}: Props) => {
  api.reAuthenticate(true);

  const insets = useSafeAreaInsets();
  const {navigate} = navigation;
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const {locationContextState} = useContext(LocationContext);
  const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState<Page<any>[]>([]);
  const [batchId, setBatchId] = useState<string>('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [badge, setBadge] = useState(0);
  const [isOpen, setIsOpen] = useState(null);
  const [batchClosed, setBatchClosed] = useState(false);

  const location_id = locationContextState?.locationSelected?.id;
  const {batchesFilterContextState} = useContext(BatchesFilterContext);

  const batchesFilters = batchesFilterContextState;

  const getDataBatches = async (page?: number, reset = false) => {
    const refPage = page || currentPage;
    if ((location_id && refPage <= lastPage) || lastPage === 0) {
      try {
        if (currentPage === 1) {
          setLoading(true);
        }
        const processedFilters = batchesFilters ? batchesFilters : {};
        const batches_ = await api.service('batches-reports').find({
          paginate: true,
          query: {
            filter: {
              ...processedFilters,
            },
            page: {number: currentPage, size: 5},
          },
        });
        setLastPage(Math.ceil(batches_.pagination.total_count / PAGE_SIZE));
        setCurrentPage(refPage + 1);

        if (reset) {
          setBatches(batches_.list);
        } else {
          setBatches([...batches, ...batches_.list]);
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
  }, [location_id, batchesFilters, batchClosed]);

  const loadMoreItem = () => {
    if (currentPage > 1 && currentPage < lastPage) {
      setLoadingMore(true);
      getDataBatches();
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
    getDataBatches(1, true);
  };

  useEffect(() => {
    let badge_ = 0;
    if (batchesFilters?.created_ts?.$gte) {
      badge_ += 1;
    }

    if (batchesFilters?.created_ts?.$lte) {
      badge_ += 1;
    }

    if (batchesFilters?.batch_num) {
      badge_ += 1;
    }

    if (batchesFilters?.processing_status_id) {
      badge_ += 1;
    }

    if (batchesFilters?.total_refund_amount) {
      badge_ += 1;
    }

    if (batchesFilters?.total_refund_count) {
      badge_ += 1;
    }

    if (batchesFilters?.total_sale_amount) {
      badge_ += 1;
    }

    if (batchesFilters?.total_sale_count) {
      badge_ += 1;
    }

    if (batchesFilters?.is_open) {
      badge_ += 1;
    }
    setBadge(badge_);
  }, [batchesFilters]);

  const batchesView = () => {
    return (
      <View style={tw`pt-5 mx-5`}>
        {batches.length > 0 ? (
          <FlatList
            data={batches}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item, index}) => {
              return (
                <BatchComponent
                  item={item}
                  index={index}
                  setShowOptions={setShowOptionsModal}
                  batchId={setBatchId}
                  isOpen={setIsOpen}
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
                  Batches
                </H2>
              </View>
              <TouchableOpacity
                style={tw`mr-5 mt-1 items-center justify-center`}
                onPress={() => navigate('FiltersBatches')}>
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
              batchesView()
            ) : (
              <View style={tw`mx-5 -mt-1`}>
                <LoadingDataComponent />
              </View>
            )}
          </SafeAreaView>
        </SafeAreaView>
        <BatchOptionsModal
          isVisible={showOptionsModal}
          isOpen={isOpen}
          setShow={(s: boolean) => {
            setShowOptionsModal(s);
          }}
          setBatchClosed={setBatchClosed}
          navigation={navigation}
          batchId={batchId}
        />
      </View>
    </>
  );
};

export default ReportBatches;
