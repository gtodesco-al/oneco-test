import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import tw from '../../../../services/tw';

type Props = {
  password: string;
  onError: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordValidation = ({password, onError}: Props): JSX.Element => {
  const [isValidLetter, setIsValidLetter] = useState(false);
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [isValidSpecialCharacter, setIsValidSpecialCharacter] = useState(false);
  const [isValidCount, setIsValidCount] = useState(false);

  useEffect(() => {
    setIsValidLetter(letterValidation(password));
    setIsValidNumber(numberValidation(password));
    setIsValidSpecialCharacter(specialCharacterValidation(password));
    setIsValidCount(countValidation(password));
  }, [password]);

  useEffect(
    () =>
      onError(
        password.trim() !== '' &&
          (!isValidLetter ||
            !isValidNumber ||
            !isValidSpecialCharacter ||
            !isValidCount),
      ),
    [isValidLetter, isValidNumber, isValidSpecialCharacter, isValidCount],
  );

  const letterValidation = (value: string): boolean => {
    if (!/[A-Za-z]/.test(value)) {
      return false;
    }

    return true;
  };

  const numberValidation = (value: string): boolean => {
    if (!/[0-9]/.test(value)) {
      return false;
    }

    return true;
  };

  const specialCharacterValidation = (value: string): boolean => {
    if (!/(\W|_)/.test(value)) {
      return false;
    }

    return true;
  };

  const countValidation = (value: string): boolean => {
    if (!/^.{8,}$/.test(value)) {
      return false;
    }

    return true;
  };

  return (
    <View style={tw`mt-2 mb-8`}>
      <View style={tw`flex-row items-center my-1`}>
        <View
          style={tw.style(
            'h-1.5 w-1.5 bg-red-500 rounded-full',
            isValidLetter && 'bg-green-400',
          )}
        />
        <Text style={tw`font-inter text-gray-500 ml-2`}>
          At least one letter (upper or lower case)
        </Text>
      </View>
      <View style={tw`flex-row items-center my-1`}>
        <View
          style={tw.style(
            'h-1.5 w-1.5 bg-red-500 rounded-full',
            isValidNumber && 'bg-green-400',
          )}
        />
        <Text style={tw`font-inter text-gray-500 ml-2`}>
          At least one number
        </Text>
      </View>
      <View style={tw`flex-row items-center my-1`}>
        <View
          style={tw.style(
            'h-1.5 w-1.5 bg-red-500 rounded-full',
            isValidSpecialCharacter && 'bg-green-400',
          )}
        />
        <Text style={tw`font-inter text-gray-500 ml-2`}>
          At least 1 special character (!, @, #, etc.)
        </Text>
      </View>
      <View style={tw`flex-row items-center my-1`}>
        <View
          style={tw.style(
            'h-1.5 w-1.5 bg-red-500 rounded-full',
            isValidCount && 'bg-green-400',
          )}
        />
        <Text style={tw`font-inter text-gray-500 ml-2`}>
          At least 8 characters
        </Text>
      </View>
    </View>
  );
};

export default PasswordValidation;
