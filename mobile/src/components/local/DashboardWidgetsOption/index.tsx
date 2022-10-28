import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import tw from '../../../../services/tw';
import {ToggleButton} from '@amplifiui/mobile';
import DragIcon from '../../../icons/drag';
import {DashboardWidgetsContextState} from '../../../models';
import {storeDataObject} from '../../../storage';

type Props = {
  id: string;
  text: string;
  drag: () => void | undefined;
  isDragActive: boolean;
  state: DashboardWidgetsContextState;
  toggleOn: boolean;
  setState: React.Dispatch<
    React.SetStateAction<DashboardWidgetsContextState | null>
  >;
};

const DashboardWidgetsOption = ({
  id,
  text,
  drag,
  isDragActive,
  state,
  toggleOn,
  setState,
}: Props): JSX.Element => {
  const onToggle = () => {
    if (state.dashboardWidgets) {
      const index = state.dashboardWidgets.findIndex(
        option => option.key === id,
      );
      state.dashboardWidgets[index].enabled =
        !state.dashboardWidgets[index].enabled;
      setState({...state, dashboardWidgets: state.dashboardWidgets});
      storeDataObject('@dashboard-widgets', state.dashboardWidgets);
    }
  };

  return (
    <TouchableOpacity
      style={tw.style(
        'flex-row justify-between items-center p-5',
        isDragActive &&
          'rounded-md border-solid border-2 border-primary-700 bg-white m-1 ml-4 p-4',
      )}
      onLongPress={drag}
      activeOpacity={1}>
      <View style={tw`flex-row items-center`}>
        <SvgXml xml={DragIcon} width={25} height={25} />
        <Text style={tw`font-inter text-base ml-5 text-gray-900`}>{text}</Text>
      </View>
      <ToggleButton
        tw={tw}
        isOn={toggleOn}
        onToggle={onToggle}
        style={tw`h-5 w-9 rounded-full`}
        innerStyle={tw`h-4.5 w-4.5 rounded-full`}
      />
    </TouchableOpacity>
  );
};

export default DashboardWidgetsOption;
