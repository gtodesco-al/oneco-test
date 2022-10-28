import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tw from '../../../services/tw';
import {AppStatusBar, Button, Card, H2, LoadingRound} from '@amplifiui/mobile';
import {SvgXml} from 'react-native-svg';

import Menu from '../../components/local/Menu';
import AccountModal from '../../components/local/modal/Account';
import AddModal from '../../components/local/modal/Add';

import Filter from '../../icons/filter';
import {t} from 'i18next';
import {api} from '../../api';
import {Contact} from '@fortis/api';
import LoadingDataComponent from '../../components/local/LoadingDataComponent';
import CustomerOptions from './modals/CustomerOptions';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../RootStackParamList';
import {getCustomers} from '../../../services/api';
import DeactivateCustomer from '../../components/local/modal/DeactivateCustomer';
import ReactivateCustomer from '../../components/local/modal/ReactivateCustomer';
import LocationContext from '../../context/LocationContext';
import DataEmpty from '../../components/local/DataEmpty';
import CustomersComponent from './CustomersComponent';
import Spinner from '../../icons/spinner';
import CloseScreen from '../../icons/close-screen';
import CustomerFilterContext from '../../context/CustomerFilterContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Customers'>;

const PAGE_SIZE = 5;

const Customers = ({navigation, route}: Props) => {
  const forceReload = route.params?.forceReload;

  api.reAuthenticate(true);

  const {locationContextState} = useContext(LocationContext);
  const {customerFilterContextState} = useContext(CustomerFilterContext);

  const {navigate} = navigation;

  const insets = useSafeAreaInsets();

  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showDeactivateCustomerModal, setShowDeactivateCustomerModal] =
    useState(false);
  const [showReactivateCustomerModal, setShowReactivateCustomerModal] =
    useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [customers, setCustomers] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCustomerOptionsModal, setShowCustomerOptionsModal] =
    useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Contact>();

  const [isActive, setIsActive] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastPage, setLastPage] = useState(0);
  const [badge, setBadge] = useState(0);

  const location_id = locationContextState?.locationSelected?.id;
  const customerFilters = customerFilterContextState;

  const getDataCustomers = async (page?: number, reset = false) => {
    const refPage = page || currentPage;
    if ((location_id && refPage <= lastPage) || lastPage === 0) {
      try {
        if (refPage === 1) {
          setLoading(true);
        }
        const customers_ = await getCustomers(
          navigation as any,
          location_id,
          true,
          refPage,
          PAGE_SIZE,
          customerFilters,
        );
        setLastPage(Math.ceil(customers_.pagination.total_count / PAGE_SIZE));
        setCurrentPage(refPage + 1);

        if (reset) {
          setCustomers(customers_.list);
        } else {
          setCustomers([...customers, ...customers_.list]);
        }

        setLoading(false);
        setLoadingMore(false);
      } catch (e) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  /* useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      // setTimeout(onRefresh, 1000);
      onRefresh();
    });

    return willFocusSubscription;
  }, []); */

  useEffect(() => {
    onRefresh();
  }, [location_id, customerFilters, forceReload]);

  useEffect(() => {
    let badge_ = 0;
    if (customerFilters?.date_of_birth) {
      badge_ += 1;
    }

    if (customerFilters?.active === '0' || customerFilters?.active) {
      badge_ += 1;
    }

    if (customerFilters?.address.city) {
      badge_ += 1;
    }

    if (customerFilters?.address.state) {
      badge_ += 1;
    }

    if (customerFilters?.address.country) {
      badge_ += 1;
    }
    setBadge(badge_);
  }, [customerFilters]);

  const onRefresh = () => {
    setLastPage(0);
    getDataCustomers(1, true);
  };

  const loadMoreItem = () => {
    if (currentPage > 1 && currentPage <= lastPage) {
      setLoadingMore(true);
      getDataCustomers();
    }
  };

  const ListFooterComponent = () => (
    <Card tw={tw} style={tw`shadow-none items-center`}>
      <LoadingRound tw={tw} style={tw`w-9 h-9`}>
        <SvgXml xml={Spinner} />
      </LoadingRound>
      <Text>Loading More...</Text>
    </Card>
  );

  const customerView = () => {
    return (
      <View style={tw`pt-5 mx-5`}>
        {customers.length > 0 ? (
          <FlatList
            data={customers}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item, index}) => {
              return (
                <CustomersComponent
                  item={item}
                  index={index}
                  setIsActive={setIsActive}
                  setSelectedCustomer={setSelectedCustomer}
                  setShowCustomerOptionsModal={setShowCustomerOptionsModal}
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
        <SafeAreaView style={{...tw`bg-gray-50 flex-1`}}>
          <AppStatusBar
            tw={tw}
            backgroundColor="#00334D"
            barStyle="light-content"
            top={insets.top}
          />
          <View style={tw`flex-1 ios:-mt-[${insets.top}]`}>
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
                    Customers
                  </H2>
                </View>
                <TouchableOpacity
                  style={tw`mr-5 mt-1 items-center justify-center`}
                  onPress={() => navigate('FilterCustomer')}>
                  <SvgXml xml={Filter} />
                  {badge > 0 && (
                    <View
                      style={tw`rounded-full bg-[#B91C1C] w-4 h-4 absolute left-3 bottom-4`}>
                      <Text
                        style={tw`text-white text-center font-inter text-xs`}>
                        {badge}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </Card>
            </View>
            <View style={tw`flex-1`}>
              {!loading ? (
                customerView()
              ) : (
                <View style={tw`-mt-1`}>
                  <LoadingDataComponent />
                </View>
              )}
            </View>
            <View style={tw`border border-gray-200`}>
              <View style={tw`flex-row items-center justify-center mx-4 mb-4`}>
                <Button
                  tw={tw}
                  style={tw`m-3 w-full`}
                  type="primary"
                  onPress={() => navigate('AddNewCustomer')}>
                  {t('Add New Customer')}
                </Button>
              </View>
            </View>
            <Menu setShowAddModal={setShowAddModal} />
          </View>
        </SafeAreaView>
      </View>
      <AccountModal
        isVisible={showAccountModal}
        setShow={setShowAccountModal}
      />
      <AddModal isVisible={showAddModal} setShow={setShowAddModal} />
      {selectedCustomer && (
        <>
          <CustomerOptions
            isVisible={showCustomerOptionsModal}
            setShow={setShowCustomerOptionsModal}
            setShowDeactivateModal={setShowDeactivateCustomerModal}
            setShowReactivateModal={setShowReactivateCustomerModal}
            customerId={selectedCustomer.id}
            navigate={navigate}
            active={isActive}
          />
          <DeactivateCustomer
            customerId={selectedCustomer.id}
            customerName={
              selectedCustomer.first_name + ' ' + selectedCustomer.last_name
            }
            isVisible={showDeactivateCustomerModal}
            setShow={setShowDeactivateCustomerModal}
            onDeactivate={onRefresh}
          />
          <ReactivateCustomer
            customerId={selectedCustomer.id}
            customerName={
              selectedCustomer.first_name + ' ' + selectedCustomer.last_name
            }
            isVisible={showReactivateCustomerModal}
            setShow={setShowReactivateCustomerModal}
            onReactivate={onRefresh}
          />
        </>
      )}
    </>
  );
};

export default Customers;
