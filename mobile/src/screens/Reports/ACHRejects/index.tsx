import {AppStatusBar, Card, H2, HR, LoadingRound} from '@amplifiui/mobile';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import tw from '../../../../services/tw';
import {fakeServer} from './fakeServer';
import {useNavigation} from '@react-navigation/native';
import CloseScreenIcon from '../../../icons/close-screen';
import Filter from '../../../icons/filter';
import Spinner from '../../../icons/spinner';
import LoadingDataComponent from '../../../components/local/LoadingDataComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../../RootStackParamList';

type Nav = {
  navigate: (value: string) => void;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  'RecurringBillingsDeclines'
>;

const renderItem = ({item}) => {
  return (
    <View style={tw`shadow-none mx-5 overflow-visible bg-white rounded`}>
      <View style={tw`flex-row justify-between mx-6 my-4`}>
        <View style={tw`flex-col flex-1`}>
          <Text style={tw`font-inter text-gray-900 font-medium text-sm mb-1`}>
            {'$ ' + `${item.value}` || '-'}
          </Text>

          <Text style={tw`font-inter font-normal text-gray-500 text-xs `}>
            Reported Date
          </Text>

          <Text style={tw`font-inter text-gray-900 text-sm mb-1`}>
            {`${item.reported_date}` || '-'}
          </Text>

          <View style={tw`pt-1`}>
            <Text style={tw`font-inter font-normal text-gray-500 text-xs`}>
              Reason Code
            </Text>

            <Text style={tw`font-inter text-gray-900 text-sm mb-1`}>
              {`${item.reason_code}` || '-'}
            </Text>
          </View>

          <Text style={tw`font-inter font-normal text-gray-500 text-xs`}>
            Merchant Account Name
          </Text>

          <Text style={tw`font-inter text-gray-900 text-sm mb-1`}>
            {`${item.merchant_account_name}` || '-'}
          </Text>
        </View>

        <View style={tw`flex-col flex-1 pt-[23]`}>
          <Text style={tw`font-inter font-normal text-gray-500 text-xs`}>
            Transaction Date
          </Text>

          <Text style={tw`font-inter text-gray-900 text-sm mb-1`}>
            {`${item.transaction_date}` || '-'}
          </Text>

          <View style={tw`pt-[5]`}>
            <Text style={tw`font-inter font-normal text-gray-500 text-xs`}>
              Reason Description
            </Text>

            <Text style={tw`font-inter text-gray-900 text-sm mb-1`}>
              {`${item.reason_description}` || '-'}
            </Text>
          </View>
        </View>
      </View>

      <HR style={tw` h-[0.25] mx-4 w-[90%]`} tw={tw} color="gray-200" />
    </View>
  );
};

let stopFetchMore = true;

const ListFooterComponent = () => (
  <Card tw={tw} style={tw`shadow-none mx-5 items-center`}>
    <LoadingRound tw={tw} style={tw`w-9 h-9`}>
      <SvgXml xml={Spinner} />
    </LoadingRound>
    <Text>Loading More...</Text>
  </Card>
);

export default function ACHRejects({navigation}: Props) {
  const [data, setData] = useState([
    {
      key: '',
      value: '',
      effective_data: '',
      merchant_account: '',
      account_number: '',
    },
  ]);
  const [loadingMore, setLoadingMore] = useState(false);
  const insets = useSafeAreaInsets();
  const {navigate} = useNavigation<Nav>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fakeServer(20);
      setData([...response]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnEndReached = async () => {
    setLoadingMore(true);
    if (!stopFetchMore) {
      const response = await fakeServer(20);
      if (response === 'done') {
        return setLoadingMore(false);
      }
      setData([...data, ...response]);
      stopFetchMore = true;
    }
    setLoadingMore(false);
  };

  return (
    <View style={tw`flex-1`}>
      <View style={tw`ios:h-${Math.floor(insets.top / 4)}`}>
        <SafeAreaView style={{...tw`bg-[#00334D]`}} />
      </View>
      <SafeAreaView style={{...tw`flex-1`}}>
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
              <SvgXml xml={CloseScreenIcon} />
            </TouchableOpacity>
            <View style={tw`w-60`}>
              <H2 tw={tw} style={tw`py-1.5 font-inter text-gray-900`}>
                ACH Rejects
              </H2>
            </View>
            <TouchableOpacity
              style={tw`mr-5 mt-1 items-center justify-center`}
              onPress={() => navigate('FilterACHRejects')}>
              <SvgXml xml={Filter} />
            </TouchableOpacity>
          </Card>
        </View>
        <View style={tw`flex-1 pt-5`}>
          {!loading ? (
            <FlatList
              data={data}
              keyExtractor={item => item.key}
              renderItem={renderItem}
              onEndReached={handleOnEndReached}
              onEndReachedThreshold={0.5}
              onScrollBeginDrag={() => {
                stopFetchMore = false;
              }}
              ListFooterComponent={() => loadingMore && <ListFooterComponent />}
            />
          ) : (
            <View style={tw`mx-5 -mt-1`}>
              <LoadingDataComponent />
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
