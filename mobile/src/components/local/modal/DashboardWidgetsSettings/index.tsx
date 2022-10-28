import React, {useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';
import tw from '../../../../../services/tw';
import {CollapsibleModal, Info} from '@amplifiui/mobile';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
  RenderItemParams,
  ShadowDecorator,
} from 'react-native-draggable-flatlist';
import CloseIcon from '../../../../icons/close';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DashboardWidgetsOption} from '../../../../components';
import DashboardWidgetsContext from '../../../../context/DashboardWidgetsContext';
import {getStorageDataObject, storeDataObject} from '../../../../storage';
import DashboardWidgets_ from '../../../../mocks/DashboardWidgets';
import {DashboardWidgets} from '../../../../models';
import LinearGradient from 'react-native-linear-gradient';

const WINDOW_HEIGHT = Dimensions.get('window').height;

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardWidgetsSettingsModal = ({
  isVisible,
  setShow,
}: Props): JSX.Element => {
  const {dashboardWidgetsContextState, setDashboardWidgetsContextState} =
    useContext(DashboardWidgetsContext);

  useEffect(() => {
    const getDashboardWidgets = async () => {
      let dashboardWidgets = await getStorageDataObject('@dashboard-widgets');

      if (dashboardWidgets === null || dashboardWidgets === undefined) {
        setDashboardWidgetsContextState({
          dashboardWidgets: DashboardWidgets_,
        });

        storeDataObject('@dashboard-widgets', DashboardWidgets_);
      } else if (compareKeys(dashboardWidgets)) {
        setDashboardWidgetsContextState({
          dashboardWidgets: DashboardWidgets_,
        });

        storeDataObject('@dashboard-widgets', DashboardWidgets_);
      } else {
        setDashboardWidgetsContextState({
          dashboardWidgets,
        });
      }
    };

    getDashboardWidgets();
  }, []);

  const compareKeys = (dashboardWidgets: DashboardWidgets[]) => {
    // dashboardWidgets.forEach((widget, idx) => {
    for (let i = 0; i < dashboardWidgets.length; i += 1) {
      let found = false;
      for (let j = 0; j < DashboardWidgets_.length; j += 1) {
        if (dashboardWidgets[i].key === DashboardWidgets_[j].key) {
          found = true;
        }
      }

      if (!found) {
        return false;
      }
    }
  };

  const renderOptions = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<DashboardWidgets>) => {
    if (dashboardWidgetsContextState) {
      return (
        <ShadowDecorator>
          <DashboardWidgetsOption
            id={item.key}
            text={item.text}
            drag={drag}
            isDragActive={isActive}
            state={dashboardWidgetsContextState}
            toggleOn={item.enabled}
            setState={setDashboardWidgetsContextState}
          />
        </ShadowDecorator>
      );
    }

    return null;
  };

  const renderPlaceholder = () => {
    return <View style={tw`h-15 bg-gray-100 m-1 p-2 rounded-md`} />;
  };

  return (
    <CollapsibleModal
      tw={tw}
      maxHeight={WINDOW_HEIGHT * 0.95}
      show={isVisible}
      setShow={setShow}>
      <View style={tw`flex-row justify-between mb-6 px-5`}>
        <Text style={tw`font-inter font-medium text-xl text-gray-900`}>
          Dashboard Widget Settings
        </Text>
        <TouchableOpacity
          style={tw`justify-center`}
          onPress={() => setShow(false)}>
          <SvgXml xml={CloseIcon} />
        </TouchableOpacity>
      </View>
      <Info tw={tw} style={tw`px-5 mb-3`}>
        Enable and reorder the widgets you would like to see on your dashboard.
      </Info>
      <GestureHandlerRootView style={tw`h-${WINDOW_HEIGHT * 0.63}px`}>
        <NestableScrollContainer>
          {dashboardWidgetsContextState &&
            dashboardWidgetsContextState.dashboardWidgets && (
              <NestableDraggableFlatList
                data={dashboardWidgetsContextState.dashboardWidgets}
                onDragEnd={({data}) => {
                  setDashboardWidgetsContextState({dashboardWidgets: data});
                  storeDataObject('@dashboard-widgets', data);
                }}
                keyExtractor={item => item.key}
                renderItem={renderOptions}
                renderPlaceholder={renderPlaceholder}
              />
            )}
        </NestableScrollContainer>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={tw`absolute w-full h-5`}
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.1)',
            'rgba(255, 255, 255, 0.2)',
            'rgba(255, 255, 255, 0.3)',
            'rgba(255, 255, 255, 0.4)',
            'rgba(255, 255, 255, 0.5)',
            'rgba(255, 255, 255, 0.6)',
            'rgba(255, 255, 255, 0.7)',
            'rgba(255, 255, 255, 0.8)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 1)',
          ]}
          pointerEvents={'none'}
        />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={tw`absolute bottom-0 w-full h-3`}
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.1)',
            'rgba(255, 255, 255, 0.2)',
            'rgba(255, 255, 255, 0.3)',
            'rgba(255, 255, 255, 0.4)',
            'rgba(255, 255, 255, 0.5)',
            'rgba(255, 255, 255, 0.6)',
            'rgba(255, 255, 255, 0.7)',
            'rgba(255, 255, 255, 0.8)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 1)',
          ]}
          pointerEvents={'none'}
        />
      </GestureHandlerRootView>
    </CollapsibleModal>
  );
};

export default DashboardWidgetsSettingsModal;
