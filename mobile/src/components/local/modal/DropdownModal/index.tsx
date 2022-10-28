import {CollapsibleModal, InputText, Radio} from '@amplifiui/mobile';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import tw from '../../../../../services/tw';

import CloseIcon from '../../../../icons/close';
import NoLocationsIcon from '../../../../icons/icon-no-locations';

type Props = {
  isVisible: boolean;
  isSearchVisible?: boolean;
  titleModal: string;
  placeholderInput?: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  data: Array<{id: number; label: string; enabled: boolean}>;
  OnChange: React.Dispatch<React.SetStateAction<string>>;
};

const WINDOW_HEIGHT = Dimensions.get('window').height;

const DropdownModal = ({
  isVisible,
  isSearchVisible,
  setShow,
  titleModal,
  placeholderInput,
  data,
  OnChange,
}: Props): JSX.Element => {
  const maxHeight = WINDOW_HEIGHT * 0.95;
  const [searchItems, setSearchItems] = useState('');
  const [items, setItems] = useState<typeof data | undefined>([]);

  useEffect(() => {
    setItems(
      data.filter(item => {
        return (
          item.label.toLowerCase().indexOf(searchItems.toLowerCase()) !== -1
        );
      }),
    );
  }, [searchItems]);

  const changeValueOption = (id: number) => {
    data[id - 1].enabled = true;
    data.forEach(d => {
      if (d.id === id) {
        d.enabled = true;
        OnChange(d.label);
      } else {
        d.enabled = false;
      }
    });
    setShow(!isVisible);
  };

  return (
    <>
      <CollapsibleModal
        tw={tw}
        maxHeight={maxHeight}
        show={isVisible}
        setShow={() => setShow(!isVisible)}>
        <View style={tw`justify-center`}>
          <View style={tw`flex-row justify-between mb-6 px-5`}>
            <Text style={tw`font-inter font-medium text-xl text-gray-900`}>
              {titleModal}
            </Text>
            <TouchableOpacity
              style={tw`justify-center`}
              onPress={() => setShow(!isVisible)}>
              <SvgXml xml={CloseIcon} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {isSearchVisible && (
              <View style={tw`m-5`}>
                <InputText
                  tw={tw}
                  placeholder={'Search' ?? placeholderInput}
                  style={tw`pb-4`}
                  inputStyle={tw`h-11`}
                  onChangeText={setSearchItems}
                  value={searchItems}
                />
              </View>
            )}
            {items?.length === 0 && (
              <View style={tw`items-center`}>
                <SvgXml xml={NoLocationsIcon} />
                <Text style={tw`font-inter text-sm text-gray-600 mt-5`}>
                  Sorry, we couldn't find any matches for that
                </Text>
              </View>
            )}
            {items?.map(item => (
              <View
                key={item.id}
                style={tw`flex-row justify-between h-18 border-b px-5 border-gray-200`}>
                <View style={tw`flex-col justify-center`}>
                  <Text style={tw`font-inter`}>{item.label}</Text>
                </View>
                <Radio
                  tw={tw}
                  key={null}
                  value={item.enabled}
                  onPress={() => changeValueOption(item.id)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </CollapsibleModal>
    </>
  );
};

export default DropdownModal;
