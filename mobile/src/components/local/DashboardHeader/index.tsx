import React from 'react';
import {View} from 'react-native';
import {H2, NotificationBadge} from '@amplifiui/mobile';
import tw from '../../../../services/tw';
import AvatarIcon from '../../../icons/avatar-icon';

type Props = {
  title: string;
  setShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({title, setShowAccountModal}: Props) => {
  return (
    <View
      style={tw`bg-white px-5 pb-2 pt-4 shadow-xl flex-row justify-between z-50`}>
      <View style={tw`justify-center`}>
        <H2 tw={tw} style={tw`font-inter text-gray-900`}>
          {title}
        </H2>
      </View>
      <View style={tw`flex-row`}>
        {/* <NotificationBadge tw={tw} /> */}
        <NotificationBadge
          tw={tw}
          style={tw`ml-4`}
          icon={AvatarIcon}
          onPress={() => setShowAccountModal(true)}
        />
      </View>
    </View>
  );
};

export default Header;
