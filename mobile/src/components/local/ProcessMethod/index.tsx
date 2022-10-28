import React, {useState} from 'react';
import {View} from 'react-native';
import {RadioGroup} from '@amplifiui/mobile';
import Dropdown from '../../amplifi-ui/Dropdown';
import {TailwindFn} from 'twrnc';

type Props = {
  tw: TailwindFn;
  processMethodValue?: number;
  terminalValue?: number;
};

const processMethodData = [
  {
    key: 1,
    label: 'Manual / Swipe',
  },
  {
    key: 2,
    label: 'Terminal Transaction',
  },
];

const ProcessMethod = ({
  tw,
  processMethodValue,
  terminalValue,
}: Props): JSX.Element => {
  const [radioOption, setRadioOption] = useState(processMethodValue);

  const changeRadioOption = (value: {key: number; label: string}) => {
    setRadioOption(value.key);
  };

  return (
    <View>
      <RadioGroup
        tw={tw}
        label="Process Method"
        labelStyle={tw`font-inter font-bold text-4x1`}
        data={processMethodData}
        showRadio={false}
        onChangeOption={changeRadioOption}
        value={radioOption}
      />
      {radioOption === 2 && terminalValue && (
        <Dropdown
          tw={tw}
          label="Select a Terminal"
          labelStyle={tw`font-inter font-bold text-4x1`}
          placeholder="Terminal Identification Name"
          style={tw`mt-4`}
          dropDownStyle={tw`h-11`}
          value={`${terminalValue}`}
        />
      )}
    </View>
  );
};

export default ProcessMethod;
