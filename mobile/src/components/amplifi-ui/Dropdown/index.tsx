import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {TailwindFn} from 'twrnc';
import {Style} from 'twrnc/dist/esm/types';
import ChevronDownIcon from '../../../icons/chevron-down';

type Props = {
  tw: TailwindFn;
  label?: string;
  labelStyle?: Style;
  placeholder?: string;
  placeholderStyle?: Style;
  style?: Style;
  dropDownStyle?: Style;
  value?: string;
  onPress?: () => void;
  error?: string;
  errorStyle?: Style;
  helper?: string;
  helperStyle?: Style;
  helperType?: 'primary' | 'secondary';
  required?: boolean;
  requiredStyle?: Style;
};

const Dropdown = ({
  tw,
  label,
  placeholder,
  style,
  labelStyle,
  dropDownStyle,
  placeholderStyle,
  value,
  onPress,
  error,
  errorStyle,
  helper,
  helperStyle,
  helperType,
  required = false,
  requiredStyle,
}: Props): JSX.Element => {
  const defaultLabelStyle = tw.style('text-sm font-medium text-gray-700 mb-1');
  const defaultDropdownStyle = tw.style(
    'flex-row justify-between items-center text-sm font-bold text-gray-500 px-3 py-2 bg-white rounded-md border-gray-300 border',
  );
  const defaultPlaceholderStyle = tw.style('text-lg text-gray-500');

  const defaultHelperStyle = tw.style('text-xs font-normal text-gray-500 pt-1');

  const typeHelperStyle = helperType ? tw`text-${helperType}-700` : tw``;

  const defaultErrorStyle = tw.style('text-xs font-normal text-red-500 pt-1');

  const defaultRequiredStyle = tw`ml-1 text-red-400 text-xs`;

  return (
    <View style={style}>
      {label && (
        <View style={tw`flex-row`}>
          <Text
            style={{...defaultLabelStyle, ...labelStyle}}
            accessible={true}
            accessibilityLabel={label}
            accessibilityRole="radiogroup"
            accessibilityValue={{text: label}}>
            {label}
          </Text>
          {required && (
            <Text style={{...defaultRequiredStyle, ...requiredStyle}}>*</Text>
          )}
        </View>
      )}
      <TouchableOpacity
        style={{
          ...defaultDropdownStyle,
          ...dropDownStyle,
        }}
        onPress={onPress}
        accessible={true}
        accessibilityLabel={label}>
        {!!placeholder && !value && (
          <Text style={{...defaultPlaceholderStyle, ...placeholderStyle}}>
            {placeholder}
          </Text>
        )}
        {!!value && (
          <Text style={{...tw`text-lg text-gray-900`, ...placeholderStyle}}>
            {value}
          </Text>
        )}
        <SvgXml style={tw`mr-2`} xml={ChevronDownIcon} />
      </TouchableOpacity>
      {helper && !error && (
        <Text
          style={{...defaultHelperStyle, ...typeHelperStyle, ...helperStyle}}>
          {helper}
        </Text>
      )}
      {error && (
        <Text style={{...defaultErrorStyle, ...errorStyle}}>{error}</Text>
      )}
    </View>
  );
};

export default Dropdown;
