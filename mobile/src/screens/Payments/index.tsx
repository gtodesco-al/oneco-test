import React, {useContext, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../services/tw';
import {userHasResource} from '../../../services/permissions';

import UserContext from '../../context/UserContext';

import {AppStatusBar} from '@amplifiui/mobile';
import Menu from '../../components/local/Menu';
import Header from '../../components/local/DashboardHeader';
import PaymentOption from '../../components/local/PaymentOption';
import AccountModal from '../../components/local/modal/Account';
import AddModal from '../../components/local/modal/Add';

import CreditCardBlue from '../../icons/credit-card-blue';
import RecurringPaymentsBlue from '../../icons/recurring-blue';
import QuickInvoiceBlue from '../../icons/quick-invoice-blue';

import {api} from '../../api';

type Nav = {
  navigate: (value: string) => void;
};

const Dashboard = () => {
  api.reAuthenticate(true);

  const insets = useSafeAreaInsets();

  const {userContextState} = useContext(UserContext);

  const {navigate} = useNavigation<Nav>();
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <View style={tw`flex-1`}>
        <View style={tw`h-${Math.floor(insets.top / 4)}`}>
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
            <ScrollView style={tw`flex-1 z-0 bg-gray-100 p-4`}>
              {userHasResource(userContextState, 'transactions', 'post') ? (
                <PaymentOption
                  tw={tw}
                  iconLeft={CreditCardBlue}
                  title="Virtual Terminal"
                  description="Take payments quick and easy"
                  style={tw`my-2`}
                  onPress={() => navigate('VirtualTerminal')}
                />
              ) : null}
              {userHasResource(userContextState, 'recurrings', 'get') ? (
                <PaymentOption
                  tw={tw}
                  iconLeft={RecurringPaymentsBlue}
                  title="Recurring Payments"
                  description="Create or edit recurring payments"
                  style={tw`my-2`}
                  onPress={() => navigate('Recurring')}
                />
              ) : null}
              {userHasResource(userContextState, 'quickinvoices', 'get') ? (
                <PaymentOption
                  tw={tw}
                  iconLeft={QuickInvoiceBlue}
                  title="Quick Invoice"
                  description="Create or edit your invoices"
                  style={tw`my-2`}
                  onPress={() => navigate('QuickInvoice')}
                />
              ) : null}
            </ScrollView>
            <Menu setShowAddModal={setShowAddModal} />
          </View>
        </SafeAreaView>
      </View>
      <AccountModal
        isVisible={showAccountModal}
        setShow={setShowAccountModal}
      />
      <AddModal isVisible={showAddModal} setShow={setShowAddModal} />
    </>
  );
};

export default Dashboard;
