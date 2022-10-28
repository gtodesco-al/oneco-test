import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import tw from '../../../../../services/tw';
import {Checkbox, CollapsibleModal} from '@amplifiui/mobile';
import CloseIcon from '../../../../icons/close';
import MerchantsContext from '../../../../context/MerchantsContext';
import LocationContext from '../../../../context/LocationContext';
import {storeDataObject} from '../../../../storage';

const WINDOW_HEIGHT = Dimensions.get('window').height;

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const MerchantFilterModal = ({isVisible, setShow}: Props): JSX.Element => {
  const {merchantsContextState, setMerchantsContextState} =
    useContext(MerchantsContext);
  const {locationContextState} = useContext(LocationContext);

  const changeCheckboxStatus = (merchantId: string) => {
    const merchants = merchantsContextState?.merchants?.map(merchant => {
      if (merchant.id === merchantId) {
        merchant.checked = !merchant.checked;
      }
      return merchant;
    });

    setMerchantsContextState({merchants});

    const checkedMerchants = merchants?.filter(merchant => merchant.checked);
    const checkedMerchantsIds = checkedMerchants?.map(merchant => merchant.id);

    storeDataObject(
      `@${locationContextState?.locationSelected?.id}_selected_merchants`,
      checkedMerchantsIds ? checkedMerchantsIds : [],
    );
  };

  const renderItems = () => {
    return merchantsContextState?.merchants?.map((merchant, index) => (
      <View
        key={index}
        style={tw`flex-row justify-between h-18 border-b px-5 border-gray-200`}>
        <View style={tw`flex-col justify-center`}>
          <Text style={tw`font-inter text-gray-700 `}>{merchant.title}</Text>
        </View>
        <Checkbox
          tw={tw}
          value={merchant.checked}
          onPress={() => changeCheckboxStatus(merchant.id)}
        />
      </View>
    ));
  };

  return (
    <CollapsibleModal
      tw={tw}
      maxHeight={WINDOW_HEIGHT * 0.95}
      show={isVisible}
      setShow={setShow}>
      <View style={tw``}>
        <View style={tw`flex-row justify-between mb-6 px-5`}>
          <Text style={tw`font-inter font-medium text-xl text-gray-900`}>
            Filter by Merchant Account
          </Text>
          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => setShow(false)}>
            <SvgXml xml={CloseIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView>{renderItems()}</ScrollView>
      </View>
    </CollapsibleModal>
  );
};

export default MerchantFilterModal;
