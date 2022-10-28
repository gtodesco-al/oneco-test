import React, {useEffect} from 'react';

import './services/i18n';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from 'react-native-splash-screen';

import SignIn from './src/screens/Authentication/SignIn';
import ResetPassword from './src/screens/Authentication/ResetPassword';
import PasswordInstructions from './src/screens/Authentication/PasswordInstructions';
import CreateNewPassword from './src/screens/Authentication/CreateNewPassword';
import Dashboard from './src/screens/Dashboard';
import Payments from './src/screens/Payments';
import Reports from './src/screens/Reports';
import VirtualTerminal from './src/screens/Payments/VirtualTerminal';
import MenuScreen from './src/screens/Menu';
import ConfirmationLogin from './src/screens/Payments/VirtualTerminal/ConfirmationLoading';
import PaymentConfirmation from './src/screens/Payments/VirtualTerminal/PaymentConfirmation';
import PaymentError from './src/screens/Payments/VirtualTerminal/PaymentError';

import {UserProvider} from './src/context/UserContext';
import {DashboardWidgetsProvider} from './src/context/DashboardWidgetsContext';
import {LocationProvider} from './src/context/LocationContext';
import {MerchantsProvider} from './src/context/MerchantsContext';
import {GatewayTransactionsFilterProvider} from './src/context/GatewayTransactionsFilterContext';

import PasswordSuccessfully from './src/screens/Authentication/PasswordSuccessfully';
import EnableBiometrics from './src/screens/Authentication/EnableBiometrics';

import Customers from './src/screens/Customers';
import AddNewCustomer from './src/screens/Customers/AddNewCustomer';
import ViewCustomer from './src/screens/Customers/ViewCustomer';
import AddNewCreditCard from './src/screens/Customers/AddNewCreditCard';
import FilterCustomer from './src/screens/Customers/FilterCustomer';
import ChargeCustomer from './src/screens/Customers/ChargeCustomer';

import RootStackParamList from './src/screens/RootStackParamList';

import {
  NavigationContainer,
  NavigationState,
  PartialState,
} from '@react-navigation/native';

import ViewCreditCard from './src/screens/Customers/ViewCreditCard';
import AddNewACH from './src/screens/Customers/AddNewACH';
import ViewACH from './src/screens/Customers/ViewACH';
import EditACH from './src/screens/Customers/EditACH';
import EditCreditCard from './src/screens/Customers/EditCreditCard';
import EditCustomer from './src/screens/Customers/EditCustomer';
import ReportGatewayTransactions from './src/screens/Reports/GatewayTransactions';
import ReportBatches from './src/screens/Reports/Batches';
import BatchDetails from './src/screens/Reports/Batches/BatchDetails';
import Deposit from './src/screens/Reports/Deposit';
import FilterDeposit from './src/screens/Reports/Deposit/FilterDeposit';
import Chargebacks from './src/screens/Reports/Chargebacks';
import FilterChargebacks from './src/screens/Reports/Chargebacks/FilterChargebacks';
import RecurringBillingsDeclines from './src/screens/Reports/RecurringBillingsDeclines';
import FilterRecurringBillingsDeclines from './src/screens/Reports/RecurringBillingsDeclines/FilterRecurringBillingsDeclines';
import ACHRejects from './src/screens/Reports/ACHRejects';
import FilterACHRejects from './src/screens/Reports/ACHRejects/FilterACHRejects';
import {CustomerFilterProvider} from './src/context/CustomerFilterContext';
import FilterGatewayTransactions from './src/screens/Reports/GatewayTransactions/FilterGatewayTransactions';
import FiltersDetailsBatches from './src/screens/Reports/Batches/FilterDetailsBatches';
import FiltersBatches from './src/screens/Reports/Batches/FilterBatches';
import {BatchesDetailsFilterProvider} from './src/context/BatchesDetailsFilterContext';
import {BatchesFilterProvider} from './src/context/BatchesFilterContext';
import {DepositsFilterProvider} from './src/context/DepositsFilterContext';
import {ChargebacksFilterProvider} from './src/context/ChargebacksFilterContext';

import analytics from '@react-native-firebase/analytics';

const RootStack = createStackNavigator<RootStackParamList>();

const getActiveRouteName = (
  state: NavigationState | PartialState<NavigationState> | undefined,
): string => {
  if (!state || typeof state.index !== 'number') {
    return 'Unknown';
  }

  const route = state.routes[state.index];

  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer
      onStateChange={(state: any) => {
        const newRouteName = getActiveRouteName(state);

        if (newRouteName) {
          console.log('newRouteName:', newRouteName);

          try {
            analytics().logScreenView({
              screen_name: newRouteName,
              screen_class: newRouteName,
            });
          } catch (error) {
            console.log('[2] error while registering:', error);
          }
        }
      }}>
      <UserProvider>
        <DashboardWidgetsProvider>
          <LocationProvider>
            <MerchantsProvider>
              <CustomerFilterProvider>
                <GatewayTransactionsFilterProvider>
                  <BatchesFilterProvider>
                    <BatchesDetailsFilterProvider>
                      <DepositsFilterProvider>
                        <ChargebacksFilterProvider>
                          <RootStack.Navigator initialRouteName="SignIn">
                            <RootStack.Screen
                              name="SignIn"
                              component={SignIn}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="EnableBiometrics"
                              component={EnableBiometrics}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="ResetPassword"
                              component={ResetPassword}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="PasswordInstructions"
                              component={PasswordInstructions}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="CreateNewPassword"
                              component={CreateNewPassword}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="Dashboard"
                              component={Dashboard}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="Payments"
                              component={Payments}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="VirtualTerminal"
                              component={VirtualTerminal}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="Reports"
                              component={Reports}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="MenuScreen"
                              component={MenuScreen}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="PaymentConfirmation"
                              component={PaymentConfirmation}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="ConfirmationLoading"
                              component={ConfirmationLogin}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="PaymentError"
                              component={PaymentError}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="PasswordSuccessfully"
                              component={PasswordSuccessfully}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="Customers"
                              component={Customers}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="AddNewCustomer"
                              component={AddNewCustomer}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="EditCustomer"
                              component={EditCustomer}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="ViewCustomer"
                              component={ViewCustomer}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="ChargeCustomer"
                              component={ChargeCustomer}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="AddNewCreditCard"
                              component={AddNewCreditCard}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="FilterCustomer"
                              component={FilterCustomer}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="ViewCreditCard"
                              component={ViewCreditCard}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="ViewACH"
                              component={ViewACH}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="AddNewACH"
                              component={AddNewACH}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="EditACH"
                              component={EditACH}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="EditCreditCard"
                              component={EditCreditCard}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="ReportGatewayTransactions"
                              component={ReportGatewayTransactions}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="ReportBatches"
                              component={ReportBatches}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="BatchDetails"
                              component={BatchDetails}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="Deposit"
                              component={Deposit}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="FilterDeposit"
                              component={FilterDeposit}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="Chargebacks"
                              component={Chargebacks}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="FilterChargebacks"
                              component={FilterChargebacks}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="RecurringBillingsDeclines"
                              component={RecurringBillingsDeclines}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="FilterRecurringBillingsDeclines"
                              component={FilterRecurringBillingsDeclines}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="ACHRejects"
                              component={ACHRejects}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="FilterACHRejects"
                              component={FilterACHRejects}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="FilterGatewayTransactions"
                              component={FilterGatewayTransactions}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="FiltersDetailsBatches"
                              component={FiltersDetailsBatches}
                              options={{headerShown: false}}
                            />
                            <RootStack.Screen
                              name="FiltersBatches"
                              component={FiltersBatches}
                              options={{headerShown: false}}
                            />
                          </RootStack.Navigator>
                        </ChargebacksFilterProvider>
                      </DepositsFilterProvider>
                    </BatchesDetailsFilterProvider>
                  </BatchesFilterProvider>
                </GatewayTransactionsFilterProvider>
              </CustomerFilterProvider>
            </MerchantsProvider>
          </LocationProvider>
        </DashboardWidgetsProvider>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
