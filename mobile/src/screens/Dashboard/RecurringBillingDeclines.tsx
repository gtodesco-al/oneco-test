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
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RootStackParamList from '../RootStackParamList';
import {getRecurringBillingDeclines} from '../../../services/api';
import Placeholder from '../../components/local/Placeholder';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const RecurringBillingDeclines = ({navigation}: Props) => {
  const dateFrom_ = new Date();
  const dateTo_ = new Date();
  const [dataLoaded, setDataLoaded] = useState(false);
  const {locationContextState} = useContext(LocationContext);
  const {merchantsContextState} = useContext(MerchantsContext);
  const [todayAmount, setTodayAmount] = useState(0);
  const [todayTransactions, setTodayTransactions] = useState(0);
  const [yesterdayAmount, setYesterdayAmount] = useState(0);
  const [yesterdayTransactions, setYesterdayTransactions] = useState(0);
  const [last30DaysAmount, setLast30DaysAmount] = useState(0);
  const [last30DaysTransactions, setLast30DaysTransactions] = useState(0);

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
            const recurringBillingDeclines_ = await getRecurringBillingDeclines(
              locationContextState?.locationSelected?.id,
              $in,
              navigation,
            );

            /* const recurringBillingDeclines_: any = await api
            .service('recurring-billing-declines')
            .find({
              query: {
                filter: {
                  location_id: locationContextState?.locationSelected?.id,
                  product_transaction_id: {$in},
                },
              },
            }); */

            const today = recurringBillingDeclines_.find(
              (e: any) => e.id === 'today',
            );

            if (today) {
              setTodayTransactions(today.values[0]);
              setTodayAmount(today.values[1]);
            }

            const yesterday = recurringBillingDeclines_.find(
              (e: any) => e.id === 'yesterday',
            );

            if (yesterday) {
              setYesterdayTransactions(yesterday.values[0]);
              setYesterdayAmount(yesterday.values[1]);
            }

            const last30days = recurringBillingDeclines_.find(
              (e: any) => e.id === 'last30days',
            );

            if (last30days) {
              setLast30DaysTransactions(last30days.values[0]);
              setLast30DaysAmount(last30days.values[1]);
            }

            setDataLoaded(true);
          } catch (error) {
            console.error('[get recurring-billing-declines] error: ', error);
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

  const selectedYesterday = () => {
    const newDateFrom = dateFrom_.setHours(-24, 0, 0, 0);
    const dateFrom = Math.round(newDateFrom / 1000);

    const dateTo = Math.round(dateTo_.getTime() / 1000);
    const created_ts = {$gte: dateFrom, $lte: dateTo};

    navigation.navigate('RecurringBillingsDeclines', {created_ts});
  };

  const selectedThirtyDaysAgo = () => {
    const newDateFrom =
      dateFrom_.setMonth(dateFrom_.getMonth() - 30) &&
      dateFrom_.setHours(0) &&
      dateFrom_.setMinutes(0) &&
      dateFrom_.setSeconds(0) &&
      dateFrom_.setMilliseconds(0);

    const dateFrom = Math.round(newDateFrom / 1000);

    const dateTo = Math.round(dateTo_.getTime() / 1000);
    const created_ts = {$gte: dateFrom, $lte: dateTo};

    navigation.navigate('RecurringBillingsDeclines', {created_ts});
  };

  return (
    <Card tw={tw} style={tw`shadow-none my-4 mx-5 overflow-visible bg-white`}>
      <H1 tw={tw} style={tw`py-2 font-inter pb-0 text-lg`}>
        Recurring Billing Declines
      </H1>
      <H3 tw={tw} style={tw`font-inter text-sm text-gray-600 mb-4 pr-2`}>
        Displays the outstanding Recurring Billing Declines
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
                  <View>
                    <SvgXml xml={arrowRightWhite} />
                  </View>
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
              <TouchableOpacity
                style={tw`border p-4 rounded-md border-light-blue-100 bg-light-blue-50 mb-4`}
                onPress={selectedYesterday}>
                <View style={tw`flex-row justify-between mb-3`}>
                  <Text
                    style={tw`font-inter text-sm font-bold text-gray-900  underline`}>
                    Yesterday
                  </Text>
                  <SvgXml xml={arrowRightBlack} />
                </View>
                <View style={tw`flex-row justify-between`}>
                  <View style={tw`flex-col flex-1`}>
                    <Text
                      style={tw`font-inter font-normal text-gray-900 mb-1 text-lg`}>
                      ${yesterdayAmount}
                    </Text>
                    <Text style={tw`font-inter text-gray-900 text-xs`}>
                      {yesterdayTransactions} Disputes
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`border p-4 rounded-md border-light-blue-100 bg-light-blue-50 mb-4`}
                onPress={selectedThirtyDaysAgo}>
                <View style={tw`flex-row justify-between mb-3`}>
                  <Text
                    style={tw`font-inter text-sm font-bold text-gray-900 underline`}>
                    Last 30 Days
                  </Text>
                  <SvgXml xml={arrowRightBlack} />
                </View>
                <View style={tw`flex-row justify-between`}>
                  <View style={tw`flex-col flex-1`}>
                    <Text
                      style={tw`font-inter font-normal mb-1 text-lg text-gray-900`}>
                      ${last30DaysAmount}
                    </Text>
                    <Text style={tw`font-inter text-xs text-gray-900`}>
                      {last30DaysTransactions} Disputes
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <Button
                tw={tw}
                style={tw`my-2 bg-white border-gray-300 border`}
                textStyle={tw`text-gray-700`}
                onPress={() =>
                  navigation.navigate('RecurringBillingsDeclines', {})
                }
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

export default RecurringBillingDeclines;
