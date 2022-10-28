import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from '../../../../services/tw';
import {SvgXml} from 'react-native-svg';
import StatusTag from '../../../components/local/StatusTag';
import {HR} from '@amplifiui/mobile';
import {Contact} from '@fortis/api/src/schemas/contact.schema';
import Options from '../../../icons/options-vertical';
import convertPhoneNumber from '../../../../services/data-conversion/phoneNumbers';

type Props = {
  item: any;
  index: number;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Contact>>;
  setShowCustomerOptionsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CostumersComponent = ({
  item,
  index,
  setIsActive,
  setSelectedCustomer,
  setShowCustomerOptionsModal,
}: Props) => {
  const pPhone = item.cell_phone || item.home_phone;
  const processedPhoneNUmber = convertPhoneNumber(pPhone) || '-';
  return (
    <View
      style={tw`shadow-none bg-white border-white overflow-visible px-4 ${
        index === 0 ? 'rounded-t-md' : ''
      }`}>
      <View style={tw`pt-6 ${index % 2 ? 'bg-gray-50' : ''}`}>
        <View style={tw`flex-row justify-between mb-2 mx-3`}>
          <Text style={tw`font-inter text-gray-900 text-sm font-bold`}>
            {`${item.first_name || ''} ${item.last_name}` || '-'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsActive(item.active);

              setSelectedCustomer(item);

              setShowCustomerOptionsModal(true);
            }}
            style={tw`w-12 h-12 -mt-5 -mr-5 flex-row justify-center`}>
            <View style={tw`flex-col justify-center`}>
              <SvgXml xml={Options} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row justify-between mx-3`}>
          <View style={tw`flex-col flex-1`}>
            <Text style={tw`font-inter font-medium text-gray-500 text-xs mb-1`}>
              Customer ID
            </Text>
            <Text style={tw`font-inter text-gray-800 text-xs`}>
              {item.account_number || '-'}
            </Text>
            <View style={tw`pt-2`}>
              <Text
                style={tw`font-inter font-medium text-gray-500 text-xs mb-1`}>
                Email
              </Text>
              <Text style={tw`font-inter text-gray-800 text-xs mb-1`}>
                {item.email || '-'}
              </Text>
            </View>
          </View>
          <View style={tw`w-2`} />
          <View style={tw`flex-col flex-1`}>
            <Text style={tw`font-inter font-medium text-gray-500 text-xs mb-1`}>
              Phone
            </Text>
            <Text style={tw`font-inter text-gray-800 text-xs`}>
              {processedPhoneNUmber}
            </Text>
            <View style={tw`pt-2`}>
              <Text
                style={tw`font-inter font-medium text-gray-500 text-xs mb-1`}>
                Status
              </Text>
              <View style={tw`w-20`}>
                <StatusTag
                  label={`${item.active === true ? 'Active' : 'Inactive'}`}
                  type={`${item.active === true ? 'success' : 'disabled'}`}
                />
              </View>
            </View>
          </View>
        </View>
        {index + 1 !== item.length && (
          <HR style={tw`mt-4 h-[0.25]`} tw={tw} color="gray-200" />
        )}
      </View>
    </View>
  );
};

export default CostumersComponent;
