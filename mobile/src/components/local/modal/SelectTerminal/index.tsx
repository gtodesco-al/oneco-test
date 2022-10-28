import {Button, CollapsibleModal, LoadingRound, Radio} from '@amplifiui/mobile';
import {t} from 'i18next';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import tw from '../../../../../services/tw';
import LocationContext from '../../../../context/LocationContext';

import CloseIcon from '../../../../icons/close';
import NoLocationsIcon from '../../../../icons/icon-no-locations';
import Spinner from '../../../../icons/spinner';
import FadedScrollView from '../../../amplifi-ui/FadedScrollView';

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

const WINDOW_HEIGHT = Dimensions.get('window').height;

const SelectTerminal = ({isVisible, setShow, onChange}: Props): JSX.Element => {
  const maxHeight = WINDOW_HEIGHT * 0.95;
  const {locationContextState} = useContext(LocationContext);
  const [selectedTerminal, setSelectedTerminal] = useState('');

  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSearching(false);
    }, 6000);
  }, []);

  return (
    <CollapsibleModal
      tw={tw}
      maxHeight={maxHeight}
      show={isVisible}
      setShow={() => setShow(!isVisible)}>
      <View style={tw`justify-center px-5`}>
        <View style={tw`flex-row justify-between mb-6`}>
          <Text style={tw`font-inter font-medium text-xl text-gray-900`}>
            Select Terminal
          </Text>
          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => setShow(!isVisible)}>
            <SvgXml xml={CloseIcon} />
          </TouchableOpacity>
        </View>
        <FadedScrollView
          tw={tw}
          fadeSize={20}
          style={tw.style(
            tw.prefixMatch('ios')
              ? `h-${WINDOW_HEIGHT * 0.54}px`
              : `h-${WINDOW_HEIGHT * 0.5}px`,
          )}>
          {locationContextState?.locationSelected?.terminals?.length === 0 && (
            <View style={tw`items-center`}>
              <SvgXml xml={NoLocationsIcon} />
              <Text style={tw`font-inter text-sm text-gray-600 mt-5`}>
                Sorry, we couldn't find any terminal
              </Text>
            </View>
          )}
          {locationContextState?.locationSelected?.terminals?.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={1}
              onPress={() => {
                onChange(item);
                setSelectedTerminal(item.id);
                setShow(!isVisible);
              }}
              style={tw`flex-row justify-between h-16 border-b border-gray-200`}>
              <View style={tw`flex-col justify-center`}>
                <Text style={tw`font-inter text-base text-gray-700`}>
                  {item.title}
                </Text>
              </View>
              <Radio
                tw={tw}
                key={item.id}
                value={item.id === selectedTerminal}
                onPress={() => {
                  onChange(item);
                  setSelectedTerminal(item.id);
                  setShow(!isVisible);
                }}
              />
            </TouchableOpacity>
          ))}

          {isSearching ? (
            <View style={tw`items-center px-4`}>
              <LoadingRound tw={tw} style={tw`bg-light-blue-100`}>
                <SvgXml xml={Spinner} />
              </LoadingRound>
              <View style={tw``}>
                <Text style={tw`text-[3.5] text-center mt-2.5 text-gray-600`}>
                  Searching devices
                </Text>
              </View>
            </View>
          ) : null}
        </FadedScrollView>

        <Button
          tw={tw}
          style={tw`my-2`}
          type="primary"
          onPress={() => {
            setIsSearching(true);
            setTimeout(() => {
              setIsSearching(false);
            }, 4000);
          }}>
          {t('Search Devices')}
        </Button>
        <Button
          tw={tw}
          style={tw`my-2 bg-gray-50 shadow-sm border-gray-200`}
          textStyle={tw`text-gray-900`}
          type="primary"
          onPress={() => setShow(!isVisible)}>
          {t('Cancel')}
        </Button>
      </View>
    </CollapsibleModal>
  );
};

export default SelectTerminal;
