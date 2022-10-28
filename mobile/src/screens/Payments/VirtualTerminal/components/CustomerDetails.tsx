import React, {useState} from 'react';
import tw from '../../../../../services/tw';
import {Card, H2, ToggleButton} from '@amplifiui/mobile';
import {Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import CloseInput from '../../../../icons/close-input';
import Search from '../../../../icons/icon-search';
import Company from '../../../../icons/icon-company';
import Address from '../../../../icons/icon-address';
import Email from '../../../../icons/icon-email';
import Phone from '../../../../icons/icon-phone';
import Api from '../../../../icons/icon-api';

type Props = {
  labelCustomer: string;
  customerSelected: {
    id: string;
    nameFormatted: string;
    address: string;
    company_name: string;
    email: string;
    phone: string;
    api: string;
  };
  onPressSelectCustomer: React.Dispatch<void>;
  onToggleOff: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomerDetails = ({
  labelCustomer,
  customerSelected,
  onPressSelectCustomer,
  onToggleOff,
}: Props): JSX.Element => {
  const [toggleStatus, setToggleStatus] = useState(false);

  const onToggle = () => {
    setToggleStatus(!toggleStatus);
  };

  return (
    <>
      <View style={tw`flex-row justify-between`}>
        <View>
          <H2 tw={tw}>Customer Details</H2>
          <Text>Add or create a customer for this transaction</Text>
        </View>
        <View style={tw`mt-2`}>
          <ToggleButton
            tw={tw}
            isOn={toggleStatus}
            onToggle={onToggle}
            style={tw`h-5 w-9 rounded-full`}
            innerStyle={tw`h-4.5 w-4.5 rounded-full`}
          />
        </View>
      </View>
      <View>
        {toggleStatus && (
          <View style={tw`pt-2`}>
            <Text style={tw`font-inter font-medium text-gray-700 pb-1 mt-4`}>
              Select Customer
            </Text>
            <TouchableOpacity
              style={tw`bg-white border p-3 h-12 rounded-md border-gray-300 flex-row`}
              onPress={() => onPressSelectCustomer()}>
              <View style={tw`justify-center pr-2`}>
                <SvgXml xml={Search} />
              </View>
              {labelCustomer !== '' && (
                <View
                  style={tw`flex-row flex-1 bg-blue-50 justify-between rounded h-6`}>
                  <Text
                    style={tw`text-sm text-light-blue-800 font-medium ml-2`}>
                    {labelCustomer}
                  </Text>
                  <TouchableOpacity
                    style={tw`justify-center pr-2`}
                    onPress={() => onToggleOff(true)}>
                    <SvgXml xml={CloseInput} />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
      <>
        {labelCustomer.length > 0 && (
          <Card
            tw={tw}
            style={tw`flex-1 bg-gray-50 border p-4 h-84 rounded-md border-gray-200 mt-5`}>
            <View style={tw`flex-row items-center pt-4 pl-4`}>
              <SvgXml xml={Company} />
              <Text
                style={tw`font-inter text-sm font-normal pl-2 text-gray-600`}>
                Company
              </Text>
            </View>
            <Text
              style={tw`font-inter text-sm font-medium pl-10 text-gray-900`}>
              {customerSelected.company_name}
            </Text>
            <View style={tw`flex-row items-center pt-4 pl-4`}>
              <SvgXml xml={Address} />
              <Text
                style={tw`font-inter text-sm font-normal pl-2 text-gray-600`}>
                Address
              </Text>
            </View>
            <Text
              style={tw`font-inter text-sm font-medium pl-10 text-gray-900`}>
              {customerSelected.address}
            </Text>
            <View style={tw`flex-row items-center pt-4 pl-4`}>
              <SvgXml xml={Email} />
              <Text
                style={tw`font-inter text-sm font-normal pl-2 text-gray-600`}>
                Email
              </Text>
            </View>
            <Text
              style={tw`font-inter text-sm font-medium pl-10 text-gray-900`}>
              {customerSelected.email}
            </Text>
            <View style={tw`flex-row items-center pt-4 pl-4`}>
              <SvgXml xml={Phone} />
              <Text
                style={tw`font-inter text-sm font-normal pl-2 text-gray-600`}>
                Phone
              </Text>
            </View>
            <Text
              style={tw`font-inter text-sm font-medium pl-10 text-gray-900`}>
              {customerSelected.phone}
            </Text>
            <View style={tw`flex-row items-center pt-4 pl-4`}>
              <SvgXml xml={Api} />
              <Text
                style={tw`font-inter text-sm font-normal pl-2 text-gray-600`}>
                API
              </Text>
            </View>
            <Text
              style={tw`font-inter text-sm font-medium pl-10 text-gray-900`}>
              {customerSelected.api}
            </Text>
          </Card>
        )}
      </>
    </>
  );
};

export default CustomerDetails;
