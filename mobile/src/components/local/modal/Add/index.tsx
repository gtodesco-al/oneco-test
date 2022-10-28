import {Button, CollapsibleModal, HR} from '@amplifiui/mobile';
import {t} from 'i18next';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import tw from '../../../../../services/tw';

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

import arrowRightBlue from '../../../../icons/right-blue';

const AddModal = ({isVisible, setShow}: Props): JSX.Element => {
  const textOptionStyle = tw`text-gray-700 text-[4] font-inter pl-5 font-medium`;
  const buttonOptionStyle = tw`flex-row items-center justify-between`;
  const lineOptionStyle = tw`my-4 h-[0.2]`;
  const colorOption = 'gray-200';
  const marginRightIconStyle = tw`mr-5`;

  return (
    <>
      <CollapsibleModal
        tw={tw}
        maxHeight={tw.prefixMatch('ios') ? 350 : 320}
        show={isVisible}
        setShow={() => setShow(!isVisible)}>
        <View>
          <TouchableOpacity style={buttonOptionStyle}>
            <Text style={textOptionStyle}>Run Transaction</Text>
            <View style={marginRightIconStyle}>
              <SvgXml xml={arrowRightBlue} />
            </View>
          </TouchableOpacity>
          <HR style={lineOptionStyle} tw={tw} color={colorOption} />
          <TouchableOpacity style={buttonOptionStyle}>
            <Text style={textOptionStyle}>Create Recurring Payment</Text>
            <View style={marginRightIconStyle}>
              <SvgXml xml={arrowRightBlue} />
            </View>
          </TouchableOpacity>
          <HR style={lineOptionStyle} tw={tw} color={colorOption} />
          <TouchableOpacity style={buttonOptionStyle}>
            <Text style={textOptionStyle}>Create Quick Invoice</Text>
            <View style={marginRightIconStyle}>
              <SvgXml xml={arrowRightBlue} />
            </View>
          </TouchableOpacity>
          <HR style={lineOptionStyle} tw={tw} color={colorOption} />
          <View style={tw`mx-5`}>
            <Button
              tw={tw}
              style={tw`my-2 bg-gray-50 shadow-sm border-gray-200`}
              textStyle={tw`text-gray-900 text-[4]`}
              type="primary"
              onPress={() => setShow(!isVisible)}>
              {t('Cancel')}
            </Button>
          </View>
        </View>
      </CollapsibleModal>
    </>
  );
};

export default AddModal;
