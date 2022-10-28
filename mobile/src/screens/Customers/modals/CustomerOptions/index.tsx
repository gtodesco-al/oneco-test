import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Button, HR} from '@amplifiui/mobile';
import CollapsibleModal from '../../../../components/amplifi-ui/CollapsibleModal';
import {t} from 'i18next';
import {SvgXml} from 'react-native-svg';
import tw from '../../../../../services/tw';
import arrowRightBlue from '../../../../icons/right-blue';

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeactivateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReactivateModal: React.Dispatch<React.SetStateAction<boolean>>;
  customerId: string;
  navigate: any;
  active: boolean;
};

const CustomerOptions = ({
  isVisible,
  setShow,
  setShowDeactivateModal,
  setShowReactivateModal,
  customerId,
  navigate,
  active,
}: Props): JSX.Element => {
  const textOptionStyle = tw`text-gray-700 text-[4] font-inter pl-5 font-medium`;
  const buttonOptionStyle = tw`flex-row items-center justify-between`;
  const lineOptionStyle = tw`my-4 h-[1px]`;
  const colorOption = 'gray-200';
  const marginRightIconStyle = tw`mr-5`;

  return (
    <CollapsibleModal
      tw={tw}
      // maxHeight={tw.prefixMatch('ios') ? 410 : 360}
      show={isVisible}
      setShow={() => setShow(!isVisible)}>
      <View>
        <TouchableOpacity
          style={buttonOptionStyle}
          onPress={() => {
            setShow(false);
            navigate('ViewCustomer', {customerId});
          }}>
          <Text style={textOptionStyle}>View</Text>
          <View style={marginRightIconStyle}>
            <SvgXml xml={arrowRightBlue} />
          </View>
        </TouchableOpacity>
        {active && (
          <>
            <HR style={lineOptionStyle} tw={tw} color={colorOption} />
            <TouchableOpacity
              style={buttonOptionStyle}
              onPress={() => {
                setShow(false);
                navigate('EditCustomer', {customerId});
              }}>
              <Text style={textOptionStyle}>Edit</Text>
              <View style={marginRightIconStyle}>
                <SvgXml xml={arrowRightBlue} />
              </View>
            </TouchableOpacity>
          </>
        )}
        <HR style={lineOptionStyle} tw={tw} color={colorOption} />
        <TouchableOpacity
          style={buttonOptionStyle}
          onPress={() => navigate('ChargeCustomer', {customerId})}>
          <Text style={textOptionStyle}>Charge</Text>
          <View style={marginRightIconStyle}>
            <SvgXml xml={arrowRightBlue} />
          </View>
        </TouchableOpacity>
        <HR style={lineOptionStyle} tw={tw} color={colorOption} />
        <TouchableOpacity
          style={buttonOptionStyle}
          onPress={() => {
            setShow(false);
            if (active) {
              setShowDeactivateModal(true);
            } else {
              setShowReactivateModal(true);
            }
          }}>
          <Text style={textOptionStyle}>
            {active ? 'Deactivate' : 'Reactivate'}
          </Text>
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
            onPress={() => {
              setShow(!isVisible);
            }}>
            {t('Cancel')}
          </Button>
        </View>
      </View>
    </CollapsibleModal>
  );
};

export default CustomerOptions;
