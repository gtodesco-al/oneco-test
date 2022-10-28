import {Button, InputText, Radio} from '@amplifiui/mobile';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {getCustomers} from '../../../../../services/api';
import {Contact} from '@fortis/api/src/schemas/contact.schema';
import tw from '../../../../../services/tw';
import LocationContext from '../../../../context/LocationContext';

import CloseIcon from '../../../../icons/close';
import NoLocationsIcon from '../../../../icons/icon-no-locations';
import arrowRightBlue from '../../../../icons/right-blue';
import FadedScrollView from '../../../amplifi-ui/FadedScrollView';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../RootStackParamList';
import LoadingDataComponent from '../../../../components/local/LoadingDataComponent';
import CollapsibleModal from '../../../amplifi-ui/CollapsibleModal';
import {useNavigation} from '@react-navigation/native';

type Nav = {
  navigate: (value: string) => void;
};

type Props = {
  isVisible: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  selectedCustomer: React.Dispatch<React.SetStateAction<Object>>;
  navigation?: NativeStackScreenProps<RootStackParamList, ''>;
};

const WINDOW_HEIGHT = Dimensions.get('window').height;

const SelectCustomer = ({
  isVisible,
  setShow,
  navigation,
  onChange,
  selectedCustomer,
}: Props): JSX.Element => {
  const maxHeight = WINDOW_HEIGHT * 0.95;
  const [searchItems, setSearchItems] = useState('');
  const [items, setItems] = useState<Contact[]>([]);
  const {locationContextState} = useContext(LocationContext);
  const [customers, setCustomers] = useState<Contact[]>([]);
  const [idSelected, setIdSelected] = useState('');
  const [loading, setLoading] = useState(false);

  const {navigate} = useNavigation<Nav>();

  useEffect(() => {
    (async () => {
      try {
        const location_id = locationContextState?.locationSelected?.id;
        if (location_id) {
          setLoading(true);
          try {
            const customers_ = await getCustomers(
              navigation as any,
              location_id,
            );
            setCustomers(customers_);
            setLoading(false);
          } catch (e) {
            setLoading(false);
          }
        }
      } catch (e) {
        console.error('error:', e);
      }
    })();
  }, []);

  useEffect(() => {
    setItems(
      customers.filter(item => {
        return (
          `${item.first_name} ${item.last_name}`
            .toLowerCase()
            .indexOf(searchItems.toLowerCase()) !== -1
        );
      }),
    );
  }, [searchItems, customers]);

  const enableCustomer = (item: Contact) => {
    setIdSelected(item.id);
    onChange(item.first_name + item.last_name + '•' + item.id);
    const detailsCustomer = {
      id: item.id,
      nameFormatted:
        item.first_name + item.last_name + '•' + item.account_number,
      address:
        item.address?.street +
        ', ' +
        item.address?.city +
        ', ' +
        item.address?.state,
      company: item.company_name,
      email: item.email,
      phone: item.home_phone,
      api: item.contact_api_id,
    };
    selectedCustomer(detailsCustomer);
  };

  return (
    <CollapsibleModal
      tw={tw}
      maxHeight={maxHeight}
      show={isVisible}
      setShow={() => setShow(!isVisible)}
      style={tw`flex-1`}>
      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between mb-6 px-5`}>
          <Text style={tw`font-inter font-medium text-xl text-gray-900`}>
            Select Customer
          </Text>
          <TouchableOpacity
            style={tw`justify-center`}
            onPress={() => setShow(!isVisible)}>
            <SvgXml xml={CloseIcon} />
          </TouchableOpacity>
        </View>
        <View style={tw`m-5`}>
          <InputText
            tw={tw}
            placeholder="Search"
            style={tw`pb-4`}
            inputStyle={tw`h-11`}
            onChangeText={setSearchItems}
            value={searchItems}
          />
        </View>
        <FadedScrollView tw={tw} fadeSize={20} style={tw`flex-1`}>
          {!loading ? (
            <>
              {items?.length === 0 && (
                <View style={tw`items-center`}>
                  <SvgXml xml={NoLocationsIcon} />
                  <Text style={tw`font-inter text-sm text-gray-600 mt-5`}>
                    Sorry, we couldn't find any matches for that
                  </Text>
                </View>
              )}
              {items.map(item => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={1}
                  onPress={() => {
                    enableCustomer(item);
                    setShow(!isVisible);
                  }}
                  style={tw`flex-row justify-between h-16 border-b px-5 border-gray-200`}>
                  <View style={tw`flex-col justify-center`}>
                    <Text style={tw`font-inter text-base text-gray-700`}>
                      {item.first_name} {item.last_name} • {item.account_number}
                    </Text>
                  </View>
                  <Radio
                    tw={tw}
                    key={item.id}
                    value={item.id === idSelected}
                    onPress={() => {
                      enableCustomer(item);
                      setShow(!isVisible);
                    }}
                  />
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <View style={tw`mx-5 -mt-1`}>
              <LoadingDataComponent />
            </View>
          )}
        </FadedScrollView>
        <Button
          tw={tw}
          style={tw`bg-white border-gray-300 border mx-5 mb-18`}
          textStyle={tw`text-gray-700`}
          onPress={() => navigate('AddNewCustomer')}
          iconLeft={undefined}
          iconRight={arrowRightBlue}>
          Add New Customer
        </Button>
      </View>
    </CollapsibleModal>
  );
};

export default SelectCustomer;
