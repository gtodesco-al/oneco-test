import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import tw from '../../../services/tw';
import {api} from '../../api';
import {userHasResource} from '../../../services/permissions';

import UserContext from '../../context/UserContext';

import {AppStatusBar, H1, HR, NotificationBadge} from '@amplifiui/mobile';
import Menu from '../../components/local/Menu';
import AccountModal from '../../components/local/modal/Account';
import AddModal from '../../components/local/modal/Add';

import AvatarIcon from '../../icons/avatar-icon';
import RightIcon from '../../icons/right-blue';
import RootStackParamList from '../RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'Reports'>;

const Reports = ({/* route, */ navigation}: Props) => {
  api.reAuthenticate(true);

  const {userContextState} = useContext(UserContext);

  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const insets = useSafeAreaInsets();

  const textStyle = tw`py-5 px-5 font-inter text-lg text-gray-700`;
  // const lineStyle = tw`bg-gray-200 h-[0.3]`;
  const optionStyle = tw`flex-row justify-between`;
  const iconViewStyle = tw`justify-center mr-8`;

  return (
    <>
      <View style={tw`bg-white flex-1`}>
        <View style={tw`h-${Math.floor(insets.top / 4)}`}>
          <SafeAreaView style={{...tw`bg-[#00334D]`}} />
        </View>
        <SafeAreaView style={tw`flex-1`}>
          <AppStatusBar
            tw={tw}
            backgroundColor="#00334D"
            barStyle="light-content"
            top={insets.top}
          />
          <View style={tw`flex-1 ios:-mt-[${insets.top}]`}>
            <View
              style={tw`bg-white px-5 pb-5 pt-4 flex-row justify-between z-50`}>
              <View style={tw`justify-center`}>
                <H1 tw={tw} style={tw`font-inter text-gray-900`}>
                  Reports
                </H1>
              </View>
              <View style={tw`flex-row`}>
                <NotificationBadge
                  tw={tw}
                  style={tw`ml-4`}
                  icon={AvatarIcon}
                  onPress={() => setShowAccountModal(true)}
                  accessibilityLabel="Avatar Icon"
                />
              </View>
            </View>
            <View style={tw`flex-1 z-0`}>
              {userHasResource(userContextState, 'transactions', 'get') ? (
                <>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={optionStyle}
                    onPress={() =>
                      navigation.navigate('ReportGatewayTransactions', {
                        period: null,
                      })
                    }>
                    <Text style={textStyle}>Gateway Transactions</Text>
                    <View style={iconViewStyle}>
                      <SvgXml xml={RightIcon} />
                    </View>
                  </TouchableOpacity>

                  <HR tw={tw} style={tw`bg-gray-200 h-[0.3]`} />
                </>
              ) : null}
              {userHasResource(
                userContextState,
                'transactionbatches',
                'get',
              ) ? (
                <>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={optionStyle}
                    onPress={() => navigation.navigate('ReportBatches', {})}>
                    <Text style={textStyle}>Batches</Text>
                    <View style={iconViewStyle}>
                      <SvgXml xml={RightIcon} />
                    </View>
                  </TouchableOpacity>

                  <HR tw={tw} style={tw`bg-gray-200 h-[0.3]`} />
                </>
              ) : null}
              {userHasResource(userContextState, 'transactions', 'get') ? (
                <>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={optionStyle}
                    onPress={() => navigation.navigate('Deposit')}>
                    <Text style={textStyle}>Deposits</Text>
                    <View style={iconViewStyle}>
                      <SvgXml xml={RightIcon} />
                    </View>
                  </TouchableOpacity>

                  <HR tw={tw} style={tw`bg-gray-200 h-[0.3]`} />
                </>
              ) : null}
              {userHasResource(userContextState, 'transactions', 'get') ? (
                <>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={optionStyle}
                    onPress={() => navigation.navigate('Chargebacks', {})}>
                    <Text style={textStyle}>Chargebacks</Text>
                    <View style={iconViewStyle}>
                      <SvgXml xml={RightIcon} />
                    </View>
                  </TouchableOpacity>

                  <HR tw={tw} style={tw`bg-gray-200 h-[0.3]`} />
                </>
              ) : null}
              {userHasResource(userContextState, 'transactions', 'get') &&
              userHasResource(userContextState, 'recurrings', 'get') ? (
                <>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={optionStyle}
                    onPress={() =>
                      navigation.navigate('RecurringBillingsDeclines', {})
                    }>
                    <Text style={textStyle}>Recurring Billing Declines</Text>
                    <View style={iconViewStyle}>
                      <SvgXml xml={RightIcon} />
                    </View>
                  </TouchableOpacity>

                  <HR tw={tw} style={tw`bg-gray-200 h-[0.3]`} />
                </>
              ) : null}
              {userHasResource(userContextState, 'transactions', 'get') ? (
                <>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={optionStyle}
                    onPress={() => navigation.navigate('ACHRejects', {})}>
                    <Text style={textStyle}>ACH Rejects</Text>
                    <View style={iconViewStyle}>
                      <SvgXml xml={RightIcon} />
                    </View>
                  </TouchableOpacity>

                  <HR tw={tw} style={tw`bg-gray-200 h-[0.3]`} />
                </>
              ) : null}
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
    </>
  );
};

export default Reports;
