import {H2, AppStatusBar, Button, Card, H1, HR} from '@amplifiui/mobile';
import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tw from '../../../..//services/tw';
import CloseScreen from '../../../icons/close-screen';
import {SvgXml} from 'react-native-svg';
import FadedScrollView from '../../../components/amplifi-ui/FadedScrollView';
import {t} from 'i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../../RootStackParamList';
import {api} from '../../../api';
import {Contact, Token} from '@fortis/api';
import convertPhoneNumber from '../../../../services/data-conversion/phoneNumbers';
import countries from '../../../../services/lists/countries';
import WalletCard from '../../../components/local/WalletCard';
import LoadingDataComponent from '../../../components/local/LoadingDataComponent';
import WalletOptions from '../modals/WalletOptions';
import {getTokens} from '../../../../services/api';
import DeactivateWallet from '../../../components/local/modal/DeactivateWallet';
import ReactivateWallet from '../../../components/local/modal/ReactivateWallet';

import RedAlertIcon from '../../../icons/alert-red';
import ReactivateCustomer from '../../../components/local/modal/ReactivateCustomer';
import DeactivateCustomer from '../../../components/local/modal/DeactivateCustomer';

type Props = NativeStackScreenProps<RootStackParamList, 'ViewCustomer'>;

const ViewCustomer = ({route, navigation}: Props) => {
  api.reAuthenticate(true);

  const insets = useSafeAreaInsets();
  const {navigate} = navigation;

  const {customerId} = route.params;

  // TO-DO, add loading indicator
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<Contact | undefined>();
  const [processedBirthDate, setProcessedBirthDate] = useState('');
  const [processedHomePhoneNumber, setProcessedHomePhoneNumber] = useState('');
  const [processedCellPhoneNumber, setProcessedCellPhoneNumber] = useState('');
  const [countryLongName, setCountryLongName] = useState('');
  const [stateLongName, setStateLongName] = useState('');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [showDeactivateWalletModal, setShowDeactivateWalletModal] =
    useState(false);
  const [showReactivateWalletModal, setShowReactivateWalletModal] =
    useState(false);
  const [token, setToken] = useState<Token>();
  const [flagCard, setFlagCard] = useState<string>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reloadStamp, setReloadStamp] = useState(new Date().getTime());
  const [showDeactivateCustomerModal, setShowDeactivateCustomerModal] =
    useState(false);
  const [showReactivateCustomerModal, setShowReactivateCustomerModal] =
    useState(false);
  const [reloadCustomer, setReloadCustomer] = useState(false);

  const onRefresh = () => {
    setReloadCustomer(true);
    setIsRefreshing(true);
    setReloadStamp(new Date().getTime());
    setIsRefreshing(false);
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const customer_ = (await api
        .service('contacts')
        .get(customerId)) as Contact;
      setCustomer(customer_);
      // console.log('customer_:', customer_);

      // Process birth date
      const dateParts = customer_.date_of_birth?.split('-');
      if (dateParts) {
        setProcessedBirthDate(
          `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`,
        );
      }

      // Process Home Phone Number
      const processedHomePhoneNumber_ =
        convertPhoneNumber(customer_.home_phone) || '-';
      setProcessedHomePhoneNumber(processedHomePhoneNumber_);

      // Process Cell Phone Number
      const processedCellPhoneNumber_ =
        convertPhoneNumber(customer_.cell_phone) || '-';
      setProcessedCellPhoneNumber(processedCellPhoneNumber_);

      // Process Country Long Name
      const tempCountry1 = countries.find(
        country => country.value === customer_.address?.country,
      );
      if (tempCountry1) {
        setCountryLongName(tempCountry1.name);
      }

      setStateLongName(customer_.address?.state);

      // ----------------------
      const tokens_ = await getTokens(customerId, navigation);
      // console.log('tokens_:', tokens_);
      setTokens(tokens_);

      setLoading(false);
    } catch (e) {
      console.error('error:', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchData();
    });

    return willFocusSubscription;
  }, []);

  useEffect(() => {
    fetchData();
  }, [customerId, reloadStamp]);

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
          <View style={tw`ios:-mt-[${insets.top}]`}>
            <Card
              tw={tw}
              style={tw`pl-5 flex-row  items-center justify-between ios:mt-[${insets.top}]`}>
              <TouchableOpacity
                onPress={() => {
                  if (reloadCustomer) {
                    navigate('Customers', {forceReload: new Date().getTime()});
                  } else {
                    navigate('Customers');
                  }
                }}
                style={tw`py-3 mr-2`}>
                <SvgXml xml={CloseScreen} />
              </TouchableOpacity>
              <H2 tw={tw} style={tw`pr-45 py-1.5 font-inter text-gray-900`}>
                View Customer
              </H2>
            </Card>
          </View>
          <FadedScrollView
            tw={tw}
            style={tw`flex-1 m-5 justify-between`}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }>
            {!loading && customer && (
              <>
                {customer.active === '0' && (
                  <View style={tw`bg-red-100 p-3 flex-row rounded mb-8`}>
                    <View style={tw`my-1 pr-1`}>
                      <SvgXml xml={RedAlertIcon} width={13} />
                    </View>
                    <View style={tw`flex-auto`}>
                      <Text
                        style={tw`font-inter text-sm font-medium text-gray-900 pb-1`}>
                        This customer is inactive. To reactivate use the
                        Reactivate button.
                      </Text>
                      <Text
                        style={tw`font-inter text-sm font-normal text-gray-900`}>
                        If this customer had a previous value for Customer API
                        ID, you will have to re-enter the value.
                      </Text>
                    </View>
                  </View>
                )}
                <H1 tw={tw} style={tw`text-xl font-inter text-gray-700`}>
                  Customer Details
                </H1>
                <View style={tw`flex-row justify-between mt-5`}>
                  <Text
                    style={tw`text-gray-600 font-normal text-sm font-inter`}>
                    First Name
                  </Text>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    {customer.first_name}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between mt-5`}>
                  <Text
                    style={tw`text-gray-600 font-normal text-sm font-inter`}>
                    Last Name
                  </Text>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    {customer.last_name}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between mt-5`}>
                  <Text
                    style={tw`text-gray-600 font-normal text-sm font-inter`}>
                    Date of Birth
                  </Text>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    {processedBirthDate || '-'}
                  </Text>
                </View>
                <HR tw={tw} style={tw`bg-gray-200 h-[2px] my-8`} />
                <H1 tw={tw} style={tw`text-xl font-inter text-gray-700`}>
                  Contact Information
                </H1>
                <View style={tw`flex-row justify-between mt-5`}>
                  <Text
                    style={tw`text-gray-600 font-normal text-sm font-inter`}>
                    Email
                  </Text>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    {customer.email || '-'}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between mt-5`}>
                  <Text
                    style={tw`text-gray-600 font-normal text-sm font-inter`}>
                    Home Phone
                  </Text>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    {processedHomePhoneNumber}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between mt-5`}>
                  <Text
                    style={tw`text-gray-600 font-normal text-sm font-inter`}>
                    Cell Phone
                  </Text>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    {processedCellPhoneNumber}
                  </Text>
                </View>
                <HR tw={tw} style={tw`bg-gray-200 h-[1px] my-8`} />
                <H1 tw={tw} style={tw`text-xl font-inter text-gray-700`}>
                  Address Information
                </H1>
                <View style={tw`flex-row justify-between mt-5`}>
                  <Text
                    style={tw`text-gray-600 font-normal text-sm font-inter`}>
                    Street
                  </Text>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    {customer.address?.street || '-'}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between mt-5`}>
                  <Text
                    style={tw`text-gray-600 font-normal text-sm font-inter`}>
                    City
                  </Text>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    {customer.address?.city || '-'}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between mt-5`}>
                  <Text
                    style={tw`text-gray-600 font-normal text-sm font-inter`}>
                    Country
                  </Text>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    {countryLongName}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between mt-5`}>
                  <Text
                    style={tw`text-gray-600 font-normal text-sm font-inter`}>
                    State
                  </Text>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    {stateLongName}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between mt-5`}>
                  <Text
                    style={tw`text-gray-600 font-normal text-sm font-inter`}>
                    Zip Code
                  </Text>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    {customer.address?.postal_code || '-'}
                  </Text>
                </View>
                <HR tw={tw} style={tw`bg-gray-200 h-[1px] my-8`} />
                <H1 tw={tw} style={tw`text-xl font-inter text-gray-700`}>
                  Advanced Settings
                </H1>
                <View style={tw`flex-row justify-between mt-5`}>
                  <Text
                    style={tw`text-gray-600 font-normal text-sm font-inter`}>
                    Customer API ID
                  </Text>
                  <Text
                    style={tw`text-gray-900 font-medium text-sm font-inter`}>
                    -
                  </Text>
                </View>
                <HR tw={tw} style={tw`bg-gray-200 h-[1px] my-8`} />
                <WalletCard
                  tokens={tokens}
                  showButtons={true}
                  navigation={navigation}
                  customerId={customerId}
                  setShowOptions={setShowWalletOptions}
                  setToken={setToken}
                  setFlagCard={setFlagCard}
                  isActive={customer?.active}
                />
                <View style={tw`my-8`}>
                  {customer.active && (
                    <>
                      <Button
                        tw={tw}
                        style={tw`my-2`}
                        type="primary"
                        onPress={() => navigate('EditCustomer', {customerId})}>
                        {t('Edit')}
                      </Button>
                      <Button
                        tw={tw}
                        style={tw`my-2 bg-gray-50 shadow-sm border-gray-200`}
                        textStyle={tw`text-gray-900`}
                        type="primary"
                        onPress={() => setShowDeactivateCustomerModal(true)}>
                        {t('Deactivate')}
                      </Button>
                    </>
                  )}
                  {customer.active === '0' && (
                    <Button
                      tw={tw}
                      style={tw`my-2 shadow-sm`}
                      type="primary"
                      onPress={() => setShowReactivateCustomerModal(true)}>
                      Reactivate
                    </Button>
                  )}
                </View>
              </>
            )}
            {loading && <LoadingDataComponent />}
          </FadedScrollView>
        </SafeAreaView>
      </View>
      {token && token.payment_method && (
        <WalletOptions
          isVisible={showWalletOptions}
          setShow={setShowWalletOptions}
          setShowDeactivateModal={setShowDeactivateWalletModal}
          setShowReactivateModal={setShowReactivateWalletModal}
          navigation={navigation}
          tokenId={token.id || ''}
          token={token}
          customer={customer as Contact}
          isActive={token.active}
        />
      )}
      {token && flagCard && (
        <DeactivateWallet
          token={token}
          customerName={
            customer?.first_name && customer?.last_name
              ? customer.first_name + ' ' + customer.last_name
              : ''
          }
          isVisible={showDeactivateWalletModal}
          setShow={setShowDeactivateWalletModal}
          onDeactivate={onRefresh}
        />
      )}
      {token && (
        <ReactivateWallet
          token={token}
          customerName={
            customer?.first_name && customer?.last_name
              ? customer.first_name + ' ' + customer.last_name
              : ''
          }
          isVisible={showReactivateWalletModal}
          setShow={setShowReactivateWalletModal}
          onReactivate={onRefresh}
        />
      )}
      {customer && (
        <>
          <DeactivateCustomer
            customerId={customer?.id}
            customerName={customer?.first_name + ' ' + customer?.last_name}
            isVisible={showDeactivateCustomerModal}
            setShow={setShowDeactivateCustomerModal}
            onDeactivate={onRefresh}
          />
          <ReactivateCustomer
            customerId={customer?.id}
            customerName={customer?.first_name + ' ' + customer?.last_name}
            isVisible={showReactivateCustomerModal}
            setShow={setShowReactivateCustomerModal}
            onReactivate={onRefresh}
          />
        </>
      )}
    </>
  );
};

export default ViewCustomer;
