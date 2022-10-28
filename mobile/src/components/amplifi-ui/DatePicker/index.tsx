import * as React from 'react';
import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TailwindFn} from 'twrnc';
import {Style} from 'twrnc/dist/esm/types';
import DatePicker from 'react-native-date-picker';

type Props = {
  tw: TailwindFn;
  label?: string;
  labelStyle?: Style;
  placeholderStyle?: Style;
  style?: Style;
  datePickerStyle?: Style;
  value?: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const InputDatePicker = ({
  tw,
  label,
  style,
  labelStyle,
  datePickerStyle,
  placeholderStyle,
  value,
  setDate,
}: Props): JSX.Element => {
  const defaultLabelStyle = tw.style('text-sm font-medium text-gray-700 mb-1');
  const defaultDatePickerStyle = tw.style(
    'flex-row justify-between items-center text-sm font-bold text-gray-500 px-3 py-2 bg-white rounded-md border-gray-300 border',
  );
  const defaultPlaceholderStyle = tw.style('text-lg text-gray-500');

  const [placeholder, setPlaceholder] = useState('00/00/0000');
  const [insideDate, setInsideDate] = useState<Date | undefined>(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  useEffect(() => {
    if (value) {
      setInsideDate(value);
      setPlaceholder(
        value.toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      );
    } else {
      // setInsideDate(undefined);
      setPlaceholder('00/00/0000');
    }
  }, [value]);

  return (
    <>
      <View style={style}>
        <Text
          style={{...defaultLabelStyle, ...labelStyle}}
          accessible={true}
          accessibilityLabel={label}
          accessibilityRole="none"
          accessibilityValue={{text: label}}>
          {label}
        </Text>
        <TouchableOpacity
          style={{
            ...defaultDatePickerStyle,
            ...datePickerStyle,
          }}
          onPress={() => setOpenDatePicker(!openDatePicker)}
          accessible={true}
          accessibilityLabel={label}>
          <Text style={{...defaultPlaceholderStyle, ...placeholderStyle}}>
            {placeholder}
          </Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        mode={'date'}
        open={openDatePicker}
        date={insideDate}
        onConfirm={newDate => {
          setOpenDatePicker(false);
          setInsideDate(newDate);
          setPlaceholder(
            newDate.toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
          );
          setDate(newDate);
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />
    </>
  );
};

export default InputDatePicker;
