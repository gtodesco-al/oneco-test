import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {CollapsibleModal, HR, Button} from '@amplifiui/mobile';

import {SvgXml} from 'react-native-svg';

import arrowRightBlue from '../../../../icons/right-blue';
import tw from '../../../../../services/tw';
import RootStackParamList from '../../../RootStackParamList';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {closeBatch} from '../../../../../services/api';

type Props = {
  isVisible: boolean;
  setShow:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((v: boolean) => void);
  setBatchClosed:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((v: boolean) => void);
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'ReportBatches',
    undefined
  >;

  batchId: string;
  isOpen: number;
};

const BatchOptionsModal = ({
  isVisible,
  setShow,
  setBatchClosed,
  navigation,
  batchId,
  isOpen,
}: Props) => {
  const lineOptionStyle = tw`my-4 h-[1px]`;
  const buttonOptionStyle = tw`flex-row items-center justify-between`;
  const textOptionStyle = tw`text-gray-700 text-[4] font-inter pl-5 font-medium`;
  const colorOption = 'gray-200';
  const marginRightIconStyle = tw`mr-5`;

  const closeReportBatch = async () => {
    try {
      await closeBatch(batchId, navigation as any);
      setBatchClosed(true);
      return setShow(false);
    } catch (e: any) {
      console.error(
        '[Close Batch] error while closing batch',
        JSON.stringify(e),
      );
    }
  };

  return (
    <CollapsibleModal
      tw={tw}
      maxHeight={tw.prefixMatch('ios') ? 320 : 280}
      show={isVisible}
      setShow={() => setShow(!isVisible)}>
      <TouchableOpacity
        style={buttonOptionStyle}
        onPress={() => {
          setShow(false);
          navigation.navigate('BatchDetails', {
            transactionBatchId: batchId,
          });
        }}>
        <Text style={textOptionStyle}>View</Text>
        <View style={marginRightIconStyle}>
          <SvgXml xml={arrowRightBlue} />
        </View>
      </TouchableOpacity>
      <HR style={lineOptionStyle} tw={tw} color={colorOption} />
      <>
        {isOpen === 1 && (
          <View>
            <TouchableOpacity
              style={buttonOptionStyle}
              onPress={closeReportBatch}>
              <Text style={textOptionStyle}>Close Batch</Text>
              <View style={marginRightIconStyle}>
                <SvgXml xml={arrowRightBlue} />
              </View>
            </TouchableOpacity>
            <HR style={lineOptionStyle} tw={tw} color={colorOption} />

            <HR style={lineOptionStyle} tw={tw} color={colorOption} />
          </View>
        )}
      </>
      <View style={tw`mx-5`}>
        <Button
          tw={tw}
          style={tw`my-2 bg-gray-50 shadow-sm border-gray-200`}
          textStyle={tw`text-gray-900 text-[4]`}
          type="primary"
          onPress={() => {
            setShow(!isVisible);
          }}>
          Cancel
        </Button>
      </View>
    </CollapsibleModal>
  );
};

export default BatchOptionsModal;
