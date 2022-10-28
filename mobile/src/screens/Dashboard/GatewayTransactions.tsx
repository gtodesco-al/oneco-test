import {Button, Card, H1, H3, SwipeCarousel} from '@amplifiui/mobile';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import tw from '../../../services/tw';

import CarouselArrowLeft from '../../icons/carousel-arrow-left';
import CarouselArrowRight from '../../icons/carousel-arrow-right';
import arrowRightBlue from '../../icons/arrow-right-blue';

import {t} from 'i18next';

import {
  calculateTransactionsGatewaysTotals,
  convertTransactionsGatewaysCollection,
} from '../../../services/data-conversion';
import LoadingDataComponent from '../../components/local/LoadingDataComponent';
import LocationContext from '../../context/LocationContext';
import MerchantsContext from '../../context/MerchantsContext';

import VerticalBars from '../../components/amplifi-ui/Charts/VerticalBars';
import {Data as VerticalBarsData} from '../../components/amplifi-ui/Charts/VerticalBars';
import {BalloonData} from '../../components/amplifi-ui/Charts/VerticalBars/Balloon';

import {format} from 'date-fns';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RootStackParamList from '../RootStackParamList';
import {getGatewayTransactions} from '../../../services/api';
import Placeholder from '../../components/local/Placeholder';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const windowWidth = Dimensions.get('window').width;

const GatewayTransactions = ({navigation}: Props) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [balloonData24, setBalloonData24] = useState<BalloonData>([]);
  const [balloonData48, setBalloonData48] = useState<BalloonData>([]);
  const [balloonData72, setBalloonData72] = useState<BalloonData>([]);
  const [last24hoursData, setLast24HoursData] = useState<
    VerticalBarsData | undefined
  >();
  const [last48hoursData, setLast48HoursData] = useState<
    VerticalBarsData | undefined
  >();
  const [last72hoursData, setLast72HoursData] = useState<
    VerticalBarsData | undefined
  >();
  const [last24hoursTotals, setLast24hoursTotals] = useState<
    {amount: number; transactions: number} | undefined
  >();
  const [last48hoursTotals, setLast48hoursTotals] = useState<
    {amount: number; transactions: number} | undefined
  >();
  const [last72hoursTotals, setLast72hoursTotals] = useState<
    {amount: number; transactions: number} | undefined
  >();
  const [scale24, setScale24] = useState(1000);
  const [scale48, setScale48] = useState(1000);
  const [scale72, setScale72] = useState(1000);
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
            const gatewayTransactions_ = await getGatewayTransactions(
              locationContextState?.locationSelected?.id,
              $in,
              navigation,
            );
            if (gatewayTransactions_.length) {
              setDataLoaded(true);

              setLast24HoursData(
                convertTransactionsGatewaysCollection(
                  'last24hours',
                  gatewayTransactions_,
                ),
              );

              setLast48HoursData(
                convertTransactionsGatewaysCollection(
                  'last48hours',
                  gatewayTransactions_,
                ),
              );

              setLast72HoursData(
                convertTransactionsGatewaysCollection(
                  'last72hours',
                  gatewayTransactions_,
                ),
              );

              setLast24hoursTotals(
                calculateTransactionsGatewaysTotals(
                  'last24hours',
                  gatewayTransactions_,
                ),
              );

              setLast48hoursTotals(
                calculateTransactionsGatewaysTotals(
                  'last48hours',
                  gatewayTransactions_,
                ),
              );

              setLast72hoursTotals(
                calculateTransactionsGatewaysTotals(
                  'last72hours',
                  gatewayTransactions_,
                ),
              );
            }
          } catch (error) {
            console.error('[get gateway-transactions] error: ', error);
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
      const sum =
        data.values[key].Sales.amount +
        data.values[key].Auths.amount +
        data.values[key]['Returns / Refunds'].amount;

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
    if (last24hoursData) {
      setScale24(processMaximumScale(last24hoursData));
    }
  }, [last24hoursData]);

  useEffect(() => {
    if (last48hoursData) {
      setScale48(processMaximumScale(last48hoursData));
    }
  }, [last48hoursData]);

  useEffect(() => {
    if (last72hoursData) {
      setScale72(processMaximumScale(last72hoursData));
    }
  }, [last72hoursData]);

  const setBalloonData = (
    chartData: VerticalBarsData,
    setData: (value: React.SetStateAction<BalloonData>) => void,
    valueId: number,
    period: 'last24hours' | 'last48hours' | 'last72hours',
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

      let multiplier = 0;
      if (period === 'last24hours') {
        multiplier = 6;
      } else if (period === 'last48hours') {
        multiplier = 12;
      } else if (period === 'last72hours') {
        multiplier = 18;
      }

      const initialDate = new Date();
      const initialHour = initialDate.getHours() - multiplier * valueId;

      initialDate.setHours(initialHour);
      initialDate.setMinutes(0);
      initialDate.setSeconds(0);
      initialDate.setMilliseconds(0);

      const finalDate = new Date(initialDate);
      finalDate.setHours(finalDate.getHours() - multiplier);

      data_.push(
        `From: ${format(finalDate, 'haaa')} - ${format(finalDate, 'LL/dd')}`,
      );

      data_.push(
        `To: ${format(initialDate, 'haaa')} - ${format(initialDate, 'LL/dd')}`,
      );

      data_.push(`Transactions: ${Math.round(sumTransactions * 100) / 100}`);
      data_.push(`Amount: $${(Math.round(sumAmount * 100) / 100).toFixed(2)}`);

      setData(data_);
    }
  };

  const {navigate} = navigation;

  const selectedCallback = (newSelected: number) => {
    setCarouselPosition(newSelected);
  };

  const selectedGraph = () => {
    const dateFrom_ = new Date();
    const dateTo_ = new Date();

    const lastHours =
      carouselPosition === 0 ? 24 : carouselPosition === 1 ? 48 : 72;

    const newDateFrom = dateFrom_.setHours(-lastHours, 0, 0, 0);
    const dateFrom = Math.round(newDateFrom / 1000);

    const dateTo = Math.round(dateTo_.getTime() / 1000);

    const created_ts = {$gte: dateFrom, $lte: dateTo};

    navigate('ReportGatewayTransactions', {created_ts});
  };

  return (
    <Card tw={tw} style={tw`shadow-none my-4 mx-5 overflow-visible`}>
      <H1 tw={tw} style={tw`py-2 font-inter pb-0 text-lg`}>
        Gateway Transactions
      </H1>
      <H3 tw={tw} style={tw`font-inter text-sm text-gray-600`}>
        Hourly summary of all gateway transactions, settled or not.
      </H3>
      {merchantsContextState?.merchants?.length ? (
        <>
          {dataLoaded ? (
            <View style={tw`flex-col`}>
              <View style={tw`flex-row justify-between w-full my-5`}>
                <TouchableOpacity
                  onPress={() =>
                    setCarouselPosition(
                      carouselPosition - 1 < 0 ? 2 : carouselPosition - 1,
                    )
                  }>
                  <View
                    style={tw`bg-gray-100 w-10 h-10 rounded-full items-center justify-center border-2 border-gray-200`}>
                    <SvgXml xml={CarouselArrowLeft} />
                  </View>
                </TouchableOpacity>
                <H3 tw={tw} style={tw`py-2`}>
                  {carouselPosition === 0
                    ? 'Last 24 hours'
                    : carouselPosition === 1
                    ? 'Last 48 hours'
                    : 'Last 72 hours'}
                </H3>
                <TouchableOpacity
                  onPress={() =>
                    setCarouselPosition(
                      carouselPosition + 1 > 2 ? 0 : carouselPosition + 1,
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
                        last24hoursTotals?.transactions || 0
                      }`}</H3>
                    </View>
                    <View style={tw`w-4`} />
                    <View style={tw`flex-1`}>
                      <H3 tw={tw}>Total Amount</H3>
                      <H3 tw={tw}>{`$${
                        last24hoursTotals?.amount.toFixed(2) || 0
                      }`}</H3>
                    </View>
                  </View>
                  <View style={tw`h-[320px]`}>
                    {last24hoursData && (
                      <VerticalBars
                        tw={tw}
                        style={tw`bg-white flex-1`}
                        data={last24hoursData}
                        width={windowWidth - 84}
                        height={220}
                        scaleSize={scale24}
                        fontColor="#6B7280"
                        balloonData={balloonData24}
                        setBalloonData={(valueId?: number) => {
                          if (typeof valueId !== 'undefined') {
                            setBalloonData(
                              last24hoursData,
                              setBalloonData24,
                              valueId,
                              'last24hours',
                            );
                          }
                        }}
                      />
                    )}
                  </View>
                </View>
                <View style={tw`w-full`}>
                  <View style={tw`flex-row justify-between py-2`}>
                    <View style={tw`flex-1`}>
                      <H3 tw={tw}>Total Transactions</H3>
                      <H3 tw={tw}>{`${
                        last48hoursTotals?.transactions || 0
                      }`}</H3>
                    </View>
                    <View style={tw`w-4`} />
                    <View style={tw`flex-1`}>
                      <H3 tw={tw}>Total Amount</H3>
                      <H3 tw={tw}>{`$${
                        last48hoursTotals?.amount.toFixed(2) || 0
                      }`}</H3>
                    </View>
                  </View>
                  <View style={tw`h-[320px]`}>
                    {last48hoursData && (
                      <VerticalBars
                        tw={tw}
                        style={tw`bg-white flex-1`}
                        data={last48hoursData}
                        width={windowWidth - 84}
                        height={210}
                        scaleSize={scale48}
                        fontColor="#6B7280"
                        balloonData={balloonData48}
                        setBalloonData={(valueId?: number) => {
                          if (typeof valueId !== 'undefined') {
                            setBalloonData(
                              last48hoursData,
                              setBalloonData48,
                              valueId,
                              'last48hours',
                            );
                          }
                        }}
                      />
                    )}
                  </View>
                </View>
                <View style={tw`w-full`}>
                  <View style={tw`flex-row justify-between py-2`}>
                    <View style={tw`flex-1`}>
                      <H3 tw={tw}>Total Transactions</H3>
                      <H3 tw={tw}>{`${
                        last72hoursTotals?.transactions || 0
                      }`}</H3>
                    </View>
                    <View style={tw`w-4`} />
                    <View style={tw`flex-1`}>
                      <H3 tw={tw}>Total Amount</H3>
                      <H3 tw={tw}>{`$${
                        last72hoursTotals?.amount.toFixed(2) || 0
                      }`}</H3>
                    </View>
                  </View>
                  <View style={tw`h-[320px]`}>
                    {last72hoursData && (
                      <VerticalBars
                        tw={tw}
                        style={tw`bg-white flex-1`}
                        data={last72hoursData}
                        width={windowWidth - 84}
                        height={210}
                        scaleSize={scale72}
                        fontColor="#6B7280"
                        balloonData={balloonData72}
                        setBalloonData={(valueId?: number) => {
                          if (typeof valueId !== 'undefined') {
                            setBalloonData(
                              last72hoursData,
                              setBalloonData72,
                              valueId,
                              'last72hours',
                            );
                          }
                        }}
                      />
                    )}
                  </View>
                </View>
              </SwipeCarousel>
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

export default GatewayTransactions;
