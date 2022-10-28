import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Button, Card, H1, H3} from '@amplifiui/mobile';

import arrowRightWhite from '../../icons/arrow-right-white';
import arrowRightBlue from '../../icons/arrow-right-blue';
import arrowRightBlack from '../../icons/arrow-right-black';

import tw from '../../../services/tw';
import {SvgXml} from 'react-native-svg';
import LocationContext from '../../context/LocationContext';
import MerchantsContext from '../../context/MerchantsContext';
import LoadingDataComponent from '../../components/local/LoadingDataComponent';
import {getACHRejects} from '../../../services/api';
import RootStackParamList from '../RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Placeholder from '../../components/local/Placeholder';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const ACHRejects = ({navigation}: Props) => {
  const dateFrom_ = new Date();
  const dateTo_ = new Date();
  const [dataLoaded, setDataLoaded] = useState(false);
  const {locationContextState} = useContext(LocationContext);
  const {merchantsContextState} = useContext(MerchantsContext);
  const [todayAmount, setTodayAmount] = useState(0);
  const [todayTransactions, setTodayTransactions] = useState(0);
  const [last7DaysAmount, setLast7DaysAmount] = useState(0);
  const [last7DaysTransactions, setLast7DaysTransactions] = useState(0);

  useEffect(() => {
    (async () => {
      if (
        locationContextState?.locationSelected &&
        merchantsContextState?.merchants
      ) {
        if (merchantsContextState?.merchants.length !== 0) {
          try {
            setDataLoaded(false);
            const $in = merchantsContextState?.merchants
              ?.filter(merchant => merchant.checked === true)
              .map(merchant => merchant.id);

            const achRejects_ = await getACHRejects(
              locationContextState?.locationSelected?.id,
              $in,
              navigation,
            );

            const today = achRejects_.find((e: any) => e.id === 'today');
            if (today) {
              setTodayTransactions(today.values[0]);
              setTodayAmount(today.values[1]);
            }

            const last7days = achRejects_.find(
              (e: any) => e.id === 'last7days',
            );
            if (last7days) {
              setLast7DaysTransactions(last7days.values[0]);
              setLast7DaysAmount(last7days.values[1]);
            }

            setDataLoaded(true);
          } catch (error) {
            console.error('[get ach-rejects] error: ', error);
          }
        }
      }
    })();
  }, [
    locationContextState?.locationSelected,
    merchantsContextState?.merchants,
  ]);

  const selectedToday = () => {
    const newDateFrom = dateFrom_.setHours(-0, 0, 0, 0);
    const dateFrom = Math.round(newDateFrom / 1000);

    const dateTo = Math.round(dateTo_.getTime() / 1000);
    const created_ts = {$gte: dateFrom, $lte: dateTo};

    navigation.navigate('RecurringBillingsDeclines', {created_ts});
  };

  const selectedLastSevenDays = () => {
    const newDateFrom = dateFrom_.setHours(-168, 0, 0, 0);
    const dateFrom = Math.round(newDateFrom / 1000);

    const dateTo = Math.round(dateTo_.getTime() / 1000);
    const created_ts = {$gte: dateFrom, $lte: dateTo};

    navigation.navigate('RecurringBillingsDeclines', {created_ts});
  };

  return (
    <Card tw={tw} style={tw`shadow-none my-4 mx-5 overflow-visible bg-white`}>
      <H1 tw={tw} style={tw`py-2 font-inter pb-0 text-lg`}>
        ACH Rejects
      </H1>
      <H3 tw={tw} style={tw`font-inter text-sm text-gray-600 mb-4`}>
        Displays the number of ACH Rejects received.
      </H3>
      {merchantsContextState?.merchants?.length ? (
        <>
          {dataLoaded ? (
            <>
              <TouchableOpacity
                style={tw`border p-4 rounded-md border-gray-200  bg-light-blue-600 mb-4`}
                onPress={selectedToday}>
                <View style={tw`flex-row justify-between mb-3`}>
                  <Text
                    style={tw`font-inter text-sm text-white font-bold underline`}>
                    Today
                  </Text>
                  <SvgXml xml={arrowRightWhite} />
                </View>
                <View style={tw`flex-row justify-between`}>
                  <View style={tw`flex-col flex-1`}>
                    <Text
                      style={tw`font-inter font-normal text-white mb-1 text-lg`}>
                      ${todayAmount}
                    </Text>
                    <Text style={tw`font-inter text-xs text-white`}>
                      {todayTransactions} Declines
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={tw`border p-4 rounded-md border-light-blue-100 bg-light-blue-50 mb-4`}>
                <View style={tw`flex-row justify-between mb-3`}>
                  <Text
                    style={tw`font-inter text-sm font-bold text-gray-900 underline`}>
                    Last 7 Days
                  </Text>
                  <TouchableOpacity onPress={selectedLastSevenDays}>
                    <View>
                      <SvgXml xml={arrowRightBlack} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={tw`flex-row justify-between`}>
                  <View style={tw`flex-col flex-1`}>
                    <Text
                      style={tw`font-inter font-normal mb-1 text-gray-900 text-lg`}>
                      ${last7DaysAmount}
                    </Text>
                    <Text style={tw`font-inter text-xs text-gray-900`}>
                      {last7DaysTransactions} Disputes
                    </Text>
                  </View>
                </View>
              </View>
              <Button
                tw={tw}
                style={tw`my-2 bg-white border-gray-300 border`}
                textStyle={tw`text-gray-700`}
                onPress={() => navigation.navigate('ACHRejects', {})}
                iconLeft={undefined}
                iconRight={arrowRightBlue}>
                View Report
              </Button>
            </>
          ) : (
            <LoadingDataComponent />
          )}
        </>
      ) : (
        <Placeholder />
      )}
    </Card>
  );
};

export default ACHRejects;
