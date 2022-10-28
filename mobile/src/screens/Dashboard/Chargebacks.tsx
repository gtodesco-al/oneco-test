import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Button, Card, H1, H3} from '@amplifiui/mobile';

import arrowRightWhite from '../../icons/arrow-right-white';
import arrowRightBlue from '../../icons/arrow-right-blue';
import arrowRightBlack from '../../icons/arrow-right-black';

import tw from '../../../services/tw';
import {SvgXml} from 'react-native-svg';
import LoadingDataComponent from '../../components/local/LoadingDataComponent';

import LocationContext from '../../context/LocationContext';
import MerchantsContext from '../../context/MerchantsContext';

import {getChargebacks} from '../../../services/api';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RootStackParamList from '../RootStackParamList';
import Placeholder from '../../components/local/Placeholder';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Chargebacks = ({navigation}: Props) => {
  const dateFrom_ = new Date();
  const dateTo_ = new Date();
  const [dataLoaded, setDataLoaded] = useState(false);
  const {locationContextState} = useContext(LocationContext);
  const {merchantsContextState} = useContext(MerchantsContext);
  const [openChargeBacksAmount, setOpenChargeBacksAmount] = useState(0);
  const [openChargeBacksTransactions, setOpenChargeBacksTransactions] =
    useState(0);
  const [received7LastDaysAmount, setReceived7LastDaysAmount] = useState(0);
  const [received7LastDaysTransactions, setReceived7LastDaysTransactions] =
    useState(0);

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

            const chargebacks_ = await getChargebacks(
              locationContextState?.locationSelected?.id,
              $in,
              navigation,
            );

            const openChargeBacks = chargebacks_.find(
              (e: any) => e.id === 'open',
            );

            if (openChargeBacks) {
              setOpenChargeBacksTransactions(openChargeBacks.values[0]);
              setOpenChargeBacksAmount(openChargeBacks.values[1]);
            }

            const received7LastDays = chargebacks_.find(
              (e: any) => e.id === 'received_last7days',
            );

            if (received7LastDays) {
              setReceived7LastDaysTransactions(received7LastDays.values[0]);
              setReceived7LastDaysAmount(received7LastDays.values[1]);
            }

            setDataLoaded(true);
          } catch (error) {
            console.error('[get chargebacks] error: ', error);
          }
        }
      }
    })();
  }, [
    locationContextState?.locationSelected,
    merchantsContextState?.merchants,
  ]);

  const selectedOpenChargebacks = () => {
    navigation.navigate('Chargebacks', {});
  };

  const selectedSevenDaysAgo = () => {
    const newDateFrom = dateFrom_.setHours(-168, 0, 0, 0);
    const dateFrom = Math.round(newDateFrom / 1000);

    const dateTo = Math.round(dateTo_.getTime() / 1000);
    const receive_dt_ts = {$gte: dateFrom, $lte: dateTo};

    navigation.navigate('Chargebacks', {receive_dt_ts});
  };
  return (
    <Card tw={tw} style={tw`shadow-none my-4 mx-5 overflow-visible bg-white`}>
      <H1 tw={tw} style={tw`py-2 font-inter pb-0 text-lg`}>
        Chargebacks
      </H1>
      <H3 tw={tw} style={tw`font-inter text-sm text-gray-600 mb-4`}>
        Displays unresolved chargebacks.
      </H3>
      {merchantsContextState?.merchants?.length ? (
        <>
          {dataLoaded ? (
            <>
              <TouchableOpacity
                style={tw`border p-4 rounded-md border-gray-200  bg-light-blue-600 mb-4`} 
                onPress={selectedOpenChargebacks}> 
                <View style={tw`flex-row justify-between mb-3`}>
                  <Text
                    style={tw`font-inter text-sm text-white font-bold underline`}>
                    Open Chargebacks
                  </Text>
                  <SvgXml xml={arrowRightWhite} />
                </View>
                <View style={tw`flex-row justify-between`}>
                  <View style={tw`flex-col flex-1`}>
                    <Text
                      style={tw`font-inter font-normal text-white mb-1 text-lg`}>
                      ${openChargeBacksAmount}
                    </Text>
                    <Text style={tw`font-inter text-xs text-white`}>
                      {openChargeBacksTransactions} Declines
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`border p-4 rounded-md border-light-blue-100 bg-light-blue-50 mb-4`}
                onPress={selectedSevenDaysAgo}>
                <View style={tw`flex-row justify-between mb-3`}>
                  <Text
                    style={tw`font-inter text-sm font-bold text-gray-900 underline`}>
                    Received in Last 7 Days
                  </Text>
                  <SvgXml xml={arrowRightBlack} />
                </View>
                <View style={tw`flex-row justify-between`}>
                  <View style={tw`flex-col flex-1`}>
                    <Text
                      style={tw`font-inter font-normal mb-1 text-gray-900 text-lg`}>
                      ${received7LastDaysAmount}
                    </Text>
                    <Text style={tw`font-inter text-gray-900 text-xs`}>
                      {received7LastDaysTransactions} Disputes
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <Button
                tw={tw}
                style={tw`my-2 bg-white border-gray-300 border`}
                textStyle={tw`text-gray-700`}
                onPress={selectedOpenChargebacks}
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

export default Chargebacks;
