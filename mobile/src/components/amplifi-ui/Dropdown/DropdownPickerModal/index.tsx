import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {TailwindFn} from 'twrnc';
import {Button, CollapsibleModal} from '@amplifiui/mobile';
import {Picker} from '@react-native-picker/picker';
import {SvgXml} from 'react-native-svg';

import CloseScreen from '../../../../icons/close-screen';

type Props = {
  tw: TailwindFn;
  maxHeight: number;
  show: boolean;
  setShow: (v: boolean) => void;
  content: {value: string; name: string}[];
  selectedValue: string;
  onValueChange: (v: any) => void;
  numberOfLines?: number;
  title: string;
  showValue?: boolean;
};

const DropdownPickerModal = ({
  tw,
  maxHeight,
  show,
  setShow,
  content,
  selectedValue,
  onValueChange,
  numberOfLines = 1,
  title,
  showValue = true,
}: Props) => {
  const [localSelection, setLocalSelection] = useState(selectedValue);

  /* Set the first value as default when user opens modal and
  press Select without scrolling the options */
  useEffect(() => {
    if (!selectedValue && content.length > 0) {
      setLocalSelection(content[0].value);
    }
  }, [content]);

  return (
    <CollapsibleModal
      tw={tw}
      maxHeight={maxHeight}
      show={show}
      setShow={setShow}>
      <View style={tw`flex-row justify-between mb-6 px-5`}>
        <Text style={tw`font-inter font-medium text-xl text-gray-900`}>
          {title}
        </Text>
        <TouchableOpacity
          style={tw`justify-center`}
          onPress={() => setShow(false)}>
          <SvgXml xml={CloseScreen} />
        </TouchableOpacity>
      </View>
      <ScrollView style={tw`px-5`}>
        <Picker
          selectedValue={localSelection}
          onValueChange={setLocalSelection}
          numberOfLines={numberOfLines}>
          {content.map(item => {
            return (
              <Picker.Item
                key={item.value}
                value={item.value}
                label={`${item.name}${showValue ? ` - ${item.value}` : ''}`}
              />
            );
          })}
        </Picker>
      </ScrollView>
      <Button
        tw={tw}
        type="primary"
        style={tw`mx-5`}
        onPress={() => {
          onValueChange(localSelection);
          setShow(false);
        }}>
        Select
      </Button>
    </CollapsibleModal>
  );
};

export default DropdownPickerModal;
