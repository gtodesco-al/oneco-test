import {
  Button,
  Card,
  H1,
  H3,
  SwipeCarousel,
  // VerticalBars,
} from '@amplifiui/mobile';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import tw from '../../../services/tw';

import CarouselArrowLeft from '../../icons/carousel-arrow-left';
import CarouselArrowRight from '../../icons/carousel-arrow-right';
import IconRight from '../../icons/arrow-right-white';

import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';

import {
  calculateTransactionsHistoryTotals,
  convertRecurringTransactionsHistory,
} from '../../../services/data-conversion';

import LocationContext from '../../context/LocationContext';
import MerchantsContext from '../../context/MerchantsContext';
import LoadingDataComponent from '../../components/local/LoadingDataComponent';

import VerticalBars from '../../components/amplifi-ui/Charts/VerticalBars';
import {Data as VerticalBarsData} from '../../components/amplifi-ui/Charts/VerticalBars';
import {BalloonData} from '../../components/amplifi-ui/Charts/VerticalBars/Balloon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RootStackParamList from '../RootStackParamList';
import {getRecurringTransactionsHistory} from '../../../services/api';
import Placeholder from '../../components/local/Placeholder';

const windowWidth = Dimensions.get('window').width;

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const RecurringTransactionsHistory = ({navigation}: Props) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [balloonData30Days, setBalloonData30Days] = useState<BalloonData>([]);
  const [balloonData12Months, setBalloonData12Months] = useState<BalloonData>(
    [],
  );
  const [last30DaysData, setLast30DaysData] = useState<
    VerticalBarsData | undefined
  >();
  const [last12MonthsData, setLast12MonthsData] = useState<
    VerticalBarsData | undefined
  >();
  const [last30DaysTotals, setLast30DaysTotals] = useState<
    {amount: number; transactions: number} | undefined
  >();
  const [last12MonthsTotals, setLast12MonthsTotals] = useState<
    {amount: number; transactions: number} | undefined
  >();
  const [scale30Days, setScale30Days] = useState(1000);
  const [scale12Months, setScale12Months] = useState(1000);
  const {locationContextState} = useContext(LocationContext);
  const {merchantsContextState} = useContext(MerchantsContext);

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

            const recurringTransactionsHistory =
              await getRecurringTransactionsHistory(
                locationContextState?.locationSelected?.id,
                $in,
                navigation,
              );

            setDataLoaded(true);

            setLast30DaysData(
              convertRecurringTransactionsHistory(
                'last30days',
                recurringTransactionsHistory,
              ),
            );

            setLast12MonthsData(
              convertRecurringTransactionsHistory(
                'last12months',
                recurringTransactionsHistory,
              ),
            );

            setLast30DaysTotals(
              calculateTransactionsHistoryTotals(
                'last30days',
                recurringTransactionsHistory,
              ),
            );

            setLast12MonthsTotals(
              calculateTransactionsHistoryTotals(
                'last12months',
                recurringTransactionsHistory,
              ),
            );
          } catch (error) {
            console.error(
              '[get recurring-transactions-history] error: ',
              error,
            );
          }
        }
      }
    })();
  }, [
    locationContextState?.locationSelected,
    merchantsContextState?.merchants,
  ]);

  const processMaximumScale = (data: any) => {
    let max = 0;
    Object.keys(data.values).forEach(key => {
      const sum = data.values[key].Paid.amount + data.values[key].Unpaid.amount;

      if (sum > max) {
        max = sum;
      }
    });

    const strMax = Math.round(max).toString();
    const firstChar = `${parseInt(strMax.charAt(0), 10) + 2}`;
    let secondPart = '';
    for (let i = 0; i < strMax.length - 1; i += 1) {
      secondPart += '0';
    }

    return parseInt(`${firstChar}${secondPart}`, 10);
  };

  useEffect(() => {
    if (last30DaysData) {
      setScale30Days(processMaximumScale(last30DaysData));
    }
  }, [last30DaysData]);

  useEffect(() => {
    if (last12MonthsData) {
      setScale12Months(processMaximumScale(last12MonthsData));
    }
  }, [last12MonthsData]);

  const setBalloonData = (
    chartData: VerticalBarsData,
    setData: (value: React.SetStateAction<BalloonData>) => void,
    valueId?: number,
  ) => {
    if (typeof valueId === 'undefined') {
      setData([]);
    } else {
      const data_ = [];

      let sumTransactions = 0;
      let sumAmount = 0;

      const obj = chartData.values[valueId];
      const objKeys = Object.keys(obj);
      for (let i = 0; i < objKeys.length; i += 1) {
        sumAmount += obj[objKeys[i]].amount;
        sumTransactions += obj[objKeys[i]].transactions;
      }

      data_.push(`Transactions: ${Math.round(sumTransactions * 100) / 100}`);
      data_.push(`Amount: $${(Math.round(sumAmount * 100) / 100).toFixed(2)}`);

      setData(data_);
    }
  };

  type Nav = {
    navigate: (value: string) => void;
  };

  const {navigate} = useNavigation<Nav>();

  const selectedCallback = (newSelected: number) => {
    setCarouselPosition(newSelected);
  };

  const selectedGraph = () => {
    const dateFrom_ = new Date();
    const dateTo_ = new Date();

    const diff = carouselPosition === 0 ? 1 : 12;

    const newDateFrom =
      dateFrom_.setMonth(dateFrom_.getMonth() - diff) &&
      dateFrom_.setHours(0) &&
      dateFrom_.setMinutes(0) &&
      dateFrom_.setSeconds(0) &&
      dateFrom_.setMilliseconds(0);

    const dateFrom = Math.round(newDateFrom / 1000);

    const dateTo = Math.round(dateTo_.getTime() / 1000);
    const created_ts = {$gte: dateFrom, $lte: dateTo};

    navigate('RecurringBillingsDeclines', {created_ts});
  };

  return (
    <Card
      tw={tw}
      style={tw`font-inter shadow-none my-4 mx-5 overflow-visible bg-white`}>
      <H1 tw={tw} style={tw`py-2 font-inter pb-0 text-lg`}>
        Recurring Transaction History
      </H1>
      <H3 tw={tw} style={tw`font-inter text-sm text-gray-600 pr-4`}>
        Displays past Recurring Billings, paid and unpaid.
      </H3>
      {merchantsContextState?.merchants?.length ? (
        <>
          {dataLoaded ? (
            <View style={tw`flex-col`}>
              <View style={tw`flex-row justify-between w-full my-5`}>
                <TouchableOpacity
                  onPress={() =>
                    setCarouselPosition(
                      carouselPosition - 1 < 0 ? 1 : carouselPosition - 1,
                    )
                  }>
                  <View
                    style={tw`bg-gray-100 w-10 h-10 rounded-full items-center justify-center border-2 border-gray-200`}>
                    <SvgXml xml={CarouselArrowLeft} />
                  </View>
                </TouchableOpacity>
                <H3 tw={tw} style={tw`py-2`}>
                  {carouselPosition === 0 ? 'Last 30 days' : 'Last 12 months'}
                </H3>
                <TouchableOpacity
                  onPress={() =>
                    setCarouselPosition(
                      carouselPosition + 1 > 1 ? 0 : carouselPosition + 1,
                    )
                  }>
                  <View
                    style={tw`bg-gray-100 w-10 h-10 rounded-full items-center justify-center border-2 border-gray-200`}>
                    <SvgXml xml={CarouselArrowRight} />
                  </View>
                </TouchableOpacity>
              </View>
              <SwipeCarousel
                tw={tw}
                selected={carouselPosition}
                selectedCallback={selectedCallback}>
                <View style={tw`w-full`}>
                  <View style={tw`flex-row justify-between py-2`}>
                    <View style={tw`flex-1`}>
                      <H3 tw={tw}>Total Transactions</H3>
                      <H3 tw={tw}>{`${
                        last30DaysTotals?.transactions || 0
                      }`}</H3>
                    </View>
                    <View style={tw`w-4`} />
                    <View style={tw`flex-1`}>
                      <H3 tw={tw}>Total Amount</H3>
                      <H3 tw={tw}>{`$${
                        last30DaysTotals?.amount.toFixed(2) || 0
                      }`}</H3>
                    </View>
                  </View>
                  <View style={tw`h-[300px]`}>
                    {last30DaysData && (
                      <VerticalBars
                        tw={tw}
                        style={tw`bg-white flex-1`}
                        data={last30DaysData}
                        width={windowWidth - 84}
                        height={210}
                        scaleSize={scale30Days}
                        fontColor="#6B7280"
                        balloonData={balloonData30Days}
                        setBalloonData={(valueId?: number) => {
                          if (typeof valueId !== 'undefined') {
                            setBalloonData(
                              last30DaysData,
                              setBalloonData30Days,
                              valueId,
                            );
                          }
                        }}
                        showLabels={true}
                        colorsArray={['#34D399', '#A78BFA']}
                      />
                    )}
                  </View>
                  <Button
                    tw={tw}
                    style={tw`my-2 bg-white border-gray-300 border`}
                    textStyle={tw`text-gray-700`}
                    type="primary"
                    onPress={selectedGraph}
                    iconLeft={undefined}
                    iconRight={IconRight}>
                    {t('View Report')}
                  </Button>
                </View>
                <View style={tw`w-full`}>
                  <View style={tw`flex-row justify-between py-2`}>
                    <View style={tw`flex-1`}>
                      <H3 tw={tw}>Total Transactions</H3>
                      <H3 tw={tw}>{`${
                        last12MonthsTotals?.transactions || 0
                      }`}</H3>
                    </View>
                    <View style={tw`w-4`} />
                    <View style={tw`flex-1`}>
                      <H3 tw={tw}>Total Amount</H3>
                      <H3 tw={tw}>{`$${
                        last12MonthsTotals?.amount.toFixed(2) || 0
                      }`}</H3>
                    </View>
                  </View>
                  <View style={tw`h-[300px]`}>
                    {last12MonthsData && (
                      <VerticalBars
                        tw={tw}
                        style={tw`bg-white flex-1`}
                        data={last12MonthsData}
                        width={windowWidth - 84}
                        height={210}
                        scaleSize={scale12Months}
                        fontColor="#6B7280"
                        balloonData={balloonData12Months}
                        setBalloonData={(valueId?: number) => {
                          if (typeof valueId !== 'undefined') {
                            setBalloonData(
                              last12MonthsData,
                              setBalloonData12Months,
                              valueId,
                            );
                          }
                        }}
                        showLabels={true}
                        colorsArray={['#34D399', '#A78BFA']}
                      />
                    )}
                  </View>
                  <Button
                    tw={tw}
                    style={tw`my-2 bg-white border-gray-300 border`}
                    textStyle={tw`text-gray-700`}
                    type="primary"
                    onPress={selectedGraph}
                    iconLeft={undefined}
                    iconRight={IconRight}>
                    {t('View Report')}
                  </Button>
                </View>
              </SwipeCarousel>
            </View>
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

export default RecurringTransactionsHistory;
