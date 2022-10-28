import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {Button, CollapsibleModal, H1, HR} from '@amplifiui/mobile';
import Round from '../../../../components/amplifi-ui/Round';
import {t} from 'i18next';

import tw from '../../../../../services/tw';
import {SvgXml} from 'react-native-svg';
import CloseIcon from '../../../../icons/close';
import Warning from '../../../../icons/warning-red-filled';

const WINDOW_HEIGHT = Dimensions.get('window').height;

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onRetry: React.Dispatch<void>;
  onCancel: React.Dispatch<void>;
};

const Error = ({isVisible, setShow, onRetry, onCancel}: Props): JSX.Element => {
  return (
    <CollapsibleModal
      tw={tw}
      maxHeight={WINDOW_HEIGHT * 0.95}
      show={isVisible}
      setShow={() => setShow(!isVisible)}>
      <View style={tw`h-[${WINDOW_HEIGHT * 0.81}px]`}>
        <View style={tw`px-5`}>
          <View style={tw`flex-row justify-end`}>
            <TouchableOpacity
              style={tw`justify-center mr-[3.5px]`}
              onPress={() => {
                setShow(!isVisible);
                onCancel();
              }}>
              <SvgXml xml={CloseIcon} />
            </TouchableOpacity>
          </View>
          <View style={tw`items-center mt-10`}>
            <Round tw={tw} style={tw`bg-red-100`}>
              <SvgXml xml={Warning} />
            </Round>
            <H1 tw={tw} style={tw`font-inter text-xl mt-8`}>
              Something went wrong
            </H1>
            <Text
              style={tw`font-inter font-normal text-gray-700 text-base mt-8 text-center`}>
              Something went wrong while processing your request, try again.
            </Text>
          </View>
        </View>
        <View style={tw`absolute bottom-0 left-0 right-0`}>
          <HR tw={tw} style={tw`bg-gray-200`} />
          <View style={tw`px-5`}>
            <Button
              tw={tw}
              style={tw`my-2 shadow-sm border-gray-200 h-[52px]`}
              textStyle={tw`font-inter font-medium text-base`}
              type="primary"
              onPress={() => {
                setShow(!isVisible);
                onRetry();
              }}>
              {t('Try Again')}
            </Button>
            <Button
              tw={tw}
              style={tw`my-2 bg-gray-50 shadow-sm border-gray-200 h-[52px]`}
              textStyle={tw`font-inter font-medium text-gray-900 text-base`}
              type="primary"
              onPress={() => {
                setShow(!isVisible);
                onCancel();
              }}>
              {t('Cancel')}
            </Button>
          </View>
        </View>
      </View>
    </CollapsibleModal>
  );
};

export default Error;
