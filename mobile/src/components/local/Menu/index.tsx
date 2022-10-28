import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import UserContext from '../../../context/UserContext';

import {SvgXml} from 'react-native-svg';

import tw from '../../../../services/tw';
import {userHasResource} from '../../../../services/permissions';

import IconButton from './Icons/iconButtonPlus';
import IconDashboard from './Icons/iconDashboard';
import IconPayments from './Icons/iconPayments';
import IconReports from './Icons/iconReports';
import IconMenu from './Icons/iconMenu';

type Props = {
  iconColor?: string;
  buttonColor?: string;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type Nav = {
  navigate: (value: string) => void;
};

const Menu = ({
  iconColor,
  buttonColor,
  setShowAddModal,
}: Props): JSX.Element => {
  const {navigate} = useNavigation<Nav>();

  const {userContextState} = useContext(UserContext);

  const iconButton = IconButton({color: buttonColor});
  const iconDashboard = IconDashboard({color: iconColor});
  const iconPayments = IconPayments({color: iconColor});
  const iconReports = IconReports({color: iconColor});
  const iconMenu = IconMenu({color: iconColor});

  const defaultIconStyle = tw`w-5 h-5 items-center`;
  const defaultTextStyle = tw`py-1 font-inter font-bold text-xs`;
  const defaultButtonStyle = tw`items-center flex-1`;
  const defaultButtonPlusStyle = tw`items-center absolute -top-16`;

  const route = useRoute();

  const showPayments =
    userHasResource(userContextState, 'transactions', 'post') ||
    userHasResource(userContextState, 'recurrings', 'get') ||
    userHasResource(userContextState, 'quickinvoices', 'get');
  const showReports =
    userHasResource(userContextState, 'reports', 'get') &&
    (userHasResource(userContextState, 'transactions', 'get') ||
      userHasResource(userContextState, 'transactionbatches', 'get') ||
      userHasResource(userContextState, 'recurrings', 'get'));

  return (
    <View style={tw`py-2 bg-white px-2 pt-4 shadow z-50 overflow-visible`}>
      <View style={tw`flex-row items-center`}>
        <TouchableOpacity
          style={{...defaultButtonStyle}}
          onPress={() => navigate('Dashboard')}>
          <View style={{...defaultIconStyle}}>
            <SvgXml xml={iconDashboard} />
          </View>
          <Text
            style={{
              ...defaultTextStyle,
              ...(route.name === 'Dashboard'
                ? tw`text-gray-900`
                : tw`text-gray-500`),
            }}>
            Dashboard
          </Text>
        </TouchableOpacity>
        {showPayments ? (
          <TouchableOpacity
            style={{...defaultButtonStyle}}
            onPress={() => navigate('Payments')}>
            <View style={{...defaultIconStyle}}>
              <SvgXml xml={iconPayments} />
            </View>
            <Text
              style={{
                ...defaultTextStyle,
                ...(route.name === 'Payments'
                  ? tw`text-gray-900`
                  : tw`text-gray-500`),
              }}>
              Payments
            </Text>
          </TouchableOpacity>
        ) : null}
        {showReports ? (
          <TouchableOpacity
            style={{...defaultButtonStyle}}
            onPress={() => navigate('Reports')}>
            <View style={{...defaultIconStyle}}>
              <SvgXml xml={iconReports} />
            </View>
            <Text
              style={{
                ...defaultTextStyle,
                ...(route.name === 'Reports'
                  ? tw`text-gray-900`
                  : tw`text-gray-500`),
              }}>
              Reports
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={{...defaultButtonStyle}}
          onPress={() => navigate('MenuScreen')}>
          <View style={{...defaultIconStyle}}>
            <SvgXml xml={iconMenu} />
          </View>
          <Text
            style={{
              ...defaultTextStyle,
              ...tw`text-gray-500`,
            }}>
            Menu
          </Text>
        </TouchableOpacity>
        <View style={tw`flex-1`}>
          <TouchableOpacity
            style={{...defaultButtonPlusStyle}}
            onPress={() => setShowAddModal(true)}>
            <View>
              <SvgXml xml={iconButton} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Menu;
