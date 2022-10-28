import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';

import tw from '../../../services/tw';
import {userHasResource} from '../../../services/permissions';

import UserContext from '../../context/UserContext';

import {AppStatusBar, H1, HR, NotificationBadge} from '@amplifiui/mobile';
import Menu from '../../components/local/Menu';
import AddModal from '../../components/local/modal/Add';
import AccountModal from '../../components/local/modal/Account';

import RightIcon from '../../icons/right-blue';
import AvatarIcon from '../../icons/avatar-icon';

type Nav = {
  navigate: (value: string) => void;
};

const MenuScreen = () => {
  const insets = useSafeAreaInsets();
  const {navigate} = useNavigation<Nav>();

  const {userContextState} = useContext(UserContext);

  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const textStyle = tw`py-5 px-5 font-inter text-lg text-gray-700`;
  const lineStyle = tw`bg-gray-200 h-[0.3]`;
  const optionStyle = tw`flex-row justify-between`;
  const iconViewStyle = tw`justify-center mr-8`;

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
            <View
              style={tw`bg-white px-5 pb-5 pt-4 flex-row justify-between z-50`}>
              <View style={tw`justify-center`}>
                <H1 tw={tw} style={tw`font-inter text-gray-900`}>
                  Menu
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
              {userHasResource(userContextState, 'contacts', 'get') ? (
                <>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={optionStyle}
                    onPress={() => navigate('Customers')}>
                    <Text style={textStyle}>Customers</Text>
                    <View style={iconViewStyle}>
                      <SvgXml xml={RightIcon} />
                    </View>
                  </TouchableOpacity>

                  <HR tw={tw} style={tw`bg-gray-200 h-[0.3]`} />
                </>
              ) : null}
              <TouchableOpacity
                activeOpacity={1}
                style={optionStyle}
                onPress={() => navigate('')}>
                <Text style={textStyle}>Statements</Text>
                <View style={iconViewStyle}>
                  <SvgXml xml={RightIcon} />
                </View>
              </TouchableOpacity>
              <HR tw={tw} style={lineStyle} />
              <TouchableOpacity
                activeOpacity={1}
                style={optionStyle}
                onPress={() => navigate('')}>
                <Text style={textStyle}>Profile Settings</Text>
                <View style={iconViewStyle}>
                  <SvgXml xml={RightIcon} />
                </View>
              </TouchableOpacity>
              <HR tw={tw} style={lineStyle} />
              <TouchableOpacity
                activeOpacity={1}
                style={optionStyle}
                onPress={() => navigate('')}>
                <Text style={textStyle}>Portal Settings</Text>
                <View style={iconViewStyle}>
                  <SvgXml xml={RightIcon} />
                </View>
              </TouchableOpacity>
              <HR tw={tw} style={lineStyle} />
              <TouchableOpacity
                activeOpacity={1}
                style={optionStyle}
                onPress={() => navigate('')}>
                <Text style={textStyle}>Manage Users</Text>
                <View style={iconViewStyle}>
                  <SvgXml xml={RightIcon} />
                </View>
              </TouchableOpacity>
              <HR tw={tw} style={lineStyle} />
              <TouchableOpacity
                activeOpacity={1}
                style={optionStyle}
                onPress={() => navigate('')}>
                <Text style={textStyle}>Account Linking</Text>
                <View style={iconViewStyle}>
                  <SvgXml xml={RightIcon} />
                </View>
              </TouchableOpacity>
              <HR tw={tw} style={lineStyle} />
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

export default MenuScreen;
