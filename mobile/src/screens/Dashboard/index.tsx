import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';

import {
  DashboardWidgetsSettingsModal,
  Menu,
  MerchantFilterModal,
} from '../../components';

import tw from '../../../services/tw';
import {AppStatusBar, Button, Card} from '@amplifiui/mobile';

import Header from '../../components/local/DashboardHeader';
import GatewayTransactions from './GatewayTransactions';
import SettledTransactions from './SettledTransactions';
import RecurringTransactionsForecast from './RecurringTransactionsForecast';
import RecurringTransactionsHistory from './RecurringTransactionsHistory';
import RecurringBillingDeclines from './RecurringBillingDeclines';
import Chargebacks from './Chargebacks';
import ACHRejects from './ACHRejects';

import ChevronDownIcon from '../../icons/chevron-down';
import OptionsIcon from '../../icons/options';
import AccountModal from '../../components/local/modal/Account';
import AddModal from '../../components/local/modal/Add';
import DashboardWidgetsContext from '../../context/DashboardWidgetsContext';
import MerchantsContext from '../../context/MerchantsContext';
import LocationContext from '../../context/LocationContext';
import UserContext from '../../context/UserContext';
import {
  DashboardWidgetsContextState,
  MerchantsContextState,
  UserContextState,
} from '../../models';

import {Location} from '../../models/Location';

import {api} from '../../api';

import {getStorageDataObject} from '../../storage';
import FadedScrollView from '../../components/amplifi-ui/FadedScrollView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../RootStackParamList';
import {getLocations} from '../../../services/api';
import {t} from 'i18next';
import Warning from '../../icons/warning-red';

type Props = NativeStackScreenProps<RootStackParamList, 'AddNewCreditCard'>;

const Dashboard = ({navigation}: Props) => {
  api.reAuthenticate(true);

  const insets = useSafeAreaInsets();

  const [showFilterByModal, setShowFilterByModal] = useState(false);
  const [showWidgetSettingsModal, setShowWidgetSettingsModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [widgets, setWidgets] = useState<JSX.Element>();

  const [filterByLabel, setFilterByLabel] = useState<JSX.Element>();

  const {dashboardWidgetsContextState} = useContext(DashboardWidgetsContext);
  const {merchantsContextState, setMerchantsContextState} =
    useContext(MerchantsContext);
  const {locationContextState, setLocationContextState} =
    useContext(LocationContext);
  const {setUserContextState} = useContext(UserContext);

  const onRefresh = () => {
    setIsRefreshing(true);
    if (dashboardWidgetsContextState) {
      setLocationContextState({...locationContextState});
    }
    setIsRefreshing(false);
  };

  const processContent = (
    dashboardWidgetsState: DashboardWidgetsContextState,
  ) => {
    const hasWidgets = dashboardWidgetsContextState?.dashboardWidgets?.filter(
      x => x.enabled === true,
    );
    if (hasWidgets?.length !== 0) {
      setWidgets(
        <>
          {dashboardWidgetsState?.dashboardWidgets &&
            dashboardWidgetsState.dashboardWidgets.map((widget, idx) => {
              if (widget.key === 'live_transactions' && widget.enabled) {
                return (
                  <GatewayTransactions key={idx} navigation={navigation} />
                );
              }

              if (widget.key === 'settled_transactions' && widget.enabled) {
                return (
                  <SettledTransactions key={idx} navigation={navigation} />
                );
              }

              if (
                widget.key === 'recurring_transaction_forecast' &&
                widget.enabled
              ) {
                return (
                  <RecurringTransactionsForecast
                    key={idx}
                    navigation={navigation}
                  />
                );
              }

              if (
                widget.key === 'recurring_transaction_history' &&
                widget.enabled
              ) {
                return (
                  <RecurringTransactionsHistory
                    key={idx}
                    navigation={navigation}
                  />
                );
              }

              if (
                widget.key === 'recurring_billing_declines' &&
                widget.enabled
              ) {
                return (
                  <RecurringBillingDeclines key={idx} navigation={navigation} />
                );
              }

              if (widget.key === 'chargebacks' && widget.enabled) {
                return <Chargebacks key={idx} navigation={navigation} />;
              }

              if (widget.key === 'ach_rejects' && widget.enabled) {
                return <ACHRejects key={idx} navigation={navigation} />;
              }
            })}
        </>,
      );
    } else {
      setWidgets(
        <Card tw={tw} style={tw`flex-1 m-5 justify-center items-center h-73`}>
          <View style={tw`pb-4`}>
            <SvgXml xml={Warning} />
          </View>
          <View style={tw`w-45`}>
            <Text
              style={tw`font-inter font-medium text-sm text-gray-600 text-center`}>
              You don't have any widgets selected.
            </Text>
          </View>
          <View style={tw`pt-4`}>
            <Button
              tw={tw}
              style={tw`my-2 h-10 justify-center w-60 h-13 border rounded-md border-gray-50`}
              textStyle={tw`font-inter font-medium text-base`}
              type="primary"
              onPress={() => setShowWidgetSettingsModal(true)}>
              {t('Add Widgets')}
            </Button>
          </View>
        </Card>,
      );
    }
  };

  const buildFilterByLabel = async (merchantsState: MerchantsContextState) => {
    let label = 'Filter by merchant account';
    let labelStyle = tw`font-inter text-gray-300`;

    if (merchantsState.merchants !== undefined) {
      const firstCheckedMerchant = merchantsContextState?.merchants?.find(
        merchant => merchant.checked,
      );

      if (firstCheckedMerchant) {
        label = firstCheckedMerchant.title;
        labelStyle = tw`font-inter text-gray-900`;

        const checkedMerchants = merchantsContextState?.merchants?.filter(
          merchant => merchant.checked,
        );
        if (checkedMerchants && checkedMerchants.length > 1) {
          label = `${label}, +${checkedMerchants.length - 1}`;
        }
      }
    }

    return <Text style={labelStyle}>{label}</Text>;
  };

  // Gets user data and stores it
  useEffect(() => {
    (async () => {
      try {
        const userData = (await api
          .service('users')
          .get('me')) as unknown as UserContextState;
        setUserContextState(userData);
      } catch (e) {
        console.error(
          `Error while retrieving user data => ${JSON.stringify(e)}`,
        );
      }
    })();

    (async () => {
      try {
        const locations = (await getLocations(
          navigation,
        )) as unknown as Location[];

        const selectedLocation = await getStorageDataObject('@location');

        if (selectedLocation) {
          setLocationContextState({
            locations,
            locationSelected: selectedLocation,
          });
        } else {
          setLocationContextState({
            locations,
            locationSelected: locations[0],
          });
        }
      } catch (e) {
        console.error(
          `Error while retrieving user locations data => ${JSON.stringify(e)}`,
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (dashboardWidgetsContextState) {
      processContent(dashboardWidgetsContextState);
    }
  }, [dashboardWidgetsContextState]);

  useEffect(() => {
    (async () => {
      const checkedMerchantsIds = await getStorageDataObject(
        `@${locationContextState?.locationSelected?.id}_selected_merchants`,
      );

      let merchantsAccounts =
        locationContextState?.locationSelected?.product_transactions.map(
          product => ({
            id: product.id,
            paymentMethod: product.payment_method,
            title: product.title,
            checked: checkedMerchantsIds
              ? checkedMerchantsIds.find((id: string) => product.id === id)
              : false,
          }),
        );

      setMerchantsContextState({merchants: merchantsAccounts});
    })();
  }, [locationContextState]);

  useEffect(() => {
    (async () => {
      if (merchantsContextState) {
        setFilterByLabel(await buildFilterByLabel(merchantsContextState));
      }
    })();
  }, [merchantsContextState]);
  return (
    <>
      <View style={tw`flex-1`}>
        <View style={tw`ios:h-${Math.floor(insets.top / 4)}`}>
          <SafeAreaView style={{...tw`bg-[#00334D]`}} />
        </View>
        <SafeAreaView style={{...tw`bg-white flex-1`}}>
          <AppStatusBar
            tw={tw}
            backgroundColor="#00334D"
            barStyle="light-content"
            top={insets.top}
          />
          <View style={tw`flex-1 ios:-mt-[${insets.top}]`}>
            <Header
              title="Dashboard"
              setShowAccountModal={setShowAccountModal}
            />
            <FadedScrollView
              tw={tw}
              style={tw`flex-1 z-0 bg-gray-100`}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                />
              }>
              <View style={tw`flex-row mx-4 mt-4 `}>
                <TouchableOpacity
                  style={tw`bg-white border p-4 rounded-md border-gray-300 flex-1 flex-row justify-between`}
                  onPress={() => setShowFilterByModal(true)}>
                  {filterByLabel}
                  <View style={tw` justify-center`}>
                    <SvgXml xml={ChevronDownIcon} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`bg-white rounded-full h-12 w-12 ml-4 border border-gray-50 items-center justify-center`}
                  onPress={() => setShowWidgetSettingsModal(true)}>
                  <SvgXml xml={OptionsIcon} />
                </TouchableOpacity>
              </View>
              {widgets}
            </FadedScrollView>
            <Menu setShowAddModal={setShowAddModal} />
          </View>
        </SafeAreaView>
      </View>
      <MerchantFilterModal
        isVisible={showFilterByModal}
        setShow={setShowFilterByModal}
      />
      <DashboardWidgetsSettingsModal
        isVisible={showWidgetSettingsModal}
        setShow={setShowWidgetSettingsModal}
      />
      <AccountModal
        isVisible={showAccountModal}
        setShow={setShowAccountModal}
      />
      <AddModal isVisible={showAddModal} setShow={setShowAddModal} />
    </>
  );
};

export default Dashboard;
