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
import arrowRightBlue from '../../icons/arrow-right-blue';

import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import LoadingDataComponent from '../../components/local/LoadingDataComponent';

import LocationContext from '../../context/LocationContext';
import MerchantsContext from '../../context/MerchantsContext';
import {
  calculateTransactionsTotals,
  convertRecurringTransactionsForecast,
} from '../../../services/data-conversion';

import VerticalBars from '../../components/amplifi-ui/Charts/VerticalBars';
import {BalloonData} from '../../components/amplifi-ui/Charts/VerticalBars/Balloon';
import {Data as VerticalBarsData} from '../../components/amplifi-ui/Charts/VerticalBars';
import {getRecurringTransactionsForecast} from '../../../services/api';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RootStackParamList from '../RootStackParamList';
import Placeholder from '../../components/local/Placeholder';

const windowWidth = Dimensions.get('window').width;

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const RecurringTransactionsForecast = ({navigation}: Props) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [balloonData30Days, setBalloonData30Days] = useState<BalloonData>([]);
  const [balloonData12Months, setBalloonData12Months] = useState<BalloonData>(
    [],
  );
  const [next30DaysData, setNext30DaysData] = useState<
    VerticalBarsData | undefined
  >();
  const [next12MonthsData, seNext12MonthsData] = useState<
    VerticalBarsData | undefined
  >();
  const [next30DaysTotals, setNext30DaysTotals] = useState<
    {amount: number; transactions: number} | undefined
  >();
  const [next12MonthsTotals, setNext12MonthsTotals] = useState<
    {amount: number; transactions: number} | undefined
  >();
  const [scale30Days, setScale30Days] = useState(1000);
  const [scale12Months, setScale12Months] = useState(1000);
  const {locationContextState} = useContext(LocationContext);
  const {merchantsContextState} = useContext(MerchantsContext);

  type Nav = {
    navigate: (value: string) => void;
  };

  const {navigate} = useNavigation<Nav>();

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

            const recurringTransactionsForecast =
              await getRecurringTransactionsForecast(
                locationContextState?.locationSelected?.id,
                $in,
                navigation,
              );

            setDataLoaded(true);

            setNext30DaysData(
              convertRecurringTransactionsForecast(
                'next30days',
                recurringTransactionsForecast,
              ),
            );

            seNext12MonthsData(
              convertRecurringTransactionsForecast(
                'next12months',
                recurringTransactionsForecast,
              ),
            );

            setNext30DaysTotals(
              calculateTransactionsTotals(
                'next30days',
                recurringTransactionsForecast,
              ),
            );

            setNext12MonthsTotals(
              calculateTransactionsTotals(
                'next12months',
                recurringTransactionsForecast,
              ),
            );
          } catch (error) {
            console.error(
              '[get recurring-transactions-forecast] error: ',
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

  useEffect(() => {
    if (next30DaysData) {
      setScale30Days(processMaximumScale(next30DaysData));
    }
  }, [next30DaysData]);

  useEffect(() => {
    if (next12MonthsData) {
      setScale12Months(processMaximumScale(next12MonthsData));
    }
  }, [next12MonthsData]);

  const setBalloonData = (
    chartData: VerticalBarsData,
    setData: (value: React.SetStateAction<BalloonData>) => void,
    valueId: number,
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

  const processMaximumScale = (data: any) => {
    let max = 0;
    Object.keys(data.values).forEach(key => {
      if (data.values[key].Sales.amount > max) {
        max = data.values[key].Sales.amount;
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
    <Card tw={tw} style={tw` shadow-none my-4 mx-5 overflow-visible bg-white`}>
      <H1 tw={tw} style={tw`py-2 font-inter pb-0 text-lg`}>
        Recurring Transactions Forecast
      </H1>
      <H3 tw={tw} style={tw`font-inter text-sm`}>
        Forecast is calculated based on the Recurring billing set up in the
        system.
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
                  {carouselPosition === 0 ? 'Next 30 Days' : 'Next 12 Months'}
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
                        next30DaysTotals?.transactions || 0
                      }`}</H3>
                    </View>
                    <View style={tw`w-4`} />
                    <View style={tw`flex-1`}>
                      <H3 tw={tw}>Total Amount</H3>
                      <H3 tw={tw}>{`$${
                        next30DaysTotals?.amount.toFixed(2) || 0
                      }`}</H3>
                    </View>
                  </View>
                  <View style={tw`h-62`}>
                    {next30DaysData && (
                      <VerticalBars
                        tw={tw}
                        style={tw`bg-white flex-1`}
                        data={next30DaysData}
                        width={windowWidth - 84}
                        height={210}
                        scaleSize={scale30Days}
                        fontColor="#6B7280"
                        balloonData={balloonData30Days}
                        setBalloonData={(valueId?: number) => {
                          if (typeof valueId !== 'undefined') {
                            setBalloonData(
                              next30DaysData,
                              setBalloonData30Days,
                              valueId,
                            );
                          }
                        }}
                        showLabels={false}
                        colorsArray={['#0369A1']}
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
                    iconRight={arrowRightBlue}>
                    {t('View Report')}
                  </Button>
                </View>
                <View style={tw`w-full`}>
                  <View style={tw`flex-row justify-between py-2`}>
                    <View style={tw`flex-1`}>
                      <H3 tw={tw}>Total Transactions</H3>
                      <H3 tw={tw}>{`${
                        next12MonthsTotals?.transactions || 0
                      }`}</H3>
                    </View>
                    <View style={tw`w-4`} />
                    <View style={tw`flex-1`}>
                      <H3 tw={tw}>Total Amount</H3>
                      <H3 tw={tw}>{`$${
                        next12MonthsTotals?.amount.toFixed(2) || 0
                      }`}</H3>
                    </View>
                  </View>
                  <View style={tw`h-62`}>
                    {next12MonthsData && (
                      <VerticalBars
                        tw={tw}
                        style={tw`bg-white flex-1`}
                        data={next12MonthsData}
                        width={windowWidth - 84}
                        height={210}
                        scaleSize={scale12Months}
                        fontColor="#6B7280"
                        balloonData={balloonData12Months}
                        setBalloonData={(valueId?: number) => {
                          if (typeof valueId !== 'undefined') {
                            setBalloonData(
                              next12MonthsData,
                              setBalloonData12Months,
                              valueId,
                            );
                          }
                        }}
                        showLabels={false}
                        colorsArray={['#0369A1']}
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
                    iconRight={arrowRightBlue}>
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

export default RecurringTransactionsForecast;
