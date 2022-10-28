import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Button, H1, ToastMessage} from '@amplifiui/mobile';
import tw from '../../../services/tw';

import Logo from '../../icons/logo-simple';
import ArrowRight from '../../icons/arrow-right-white';
import Visible from '../../icons/eye-on';
import Invisible from '../../icons/eye-off';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PasswordValidation} from '../../components';
import RootStackParamList from '../RootStackParamList';
import {updatePasswordResetCode} from '../../../services/api';
import InputPassword from '../../components/amplifi-ui/InputPassword';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import * as Keychain from 'react-native-keychain';
import {storeData} from '../../storage';
type Props = NativeStackScreenProps<RootStackParamList, 'CreateNewPassword'>;

const CreateNewPassword = ({navigation, route}: Props) => {
  const {navigate} = navigation;
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('New password is invalid.');
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);

  useEffect(
    () =>
      setPasswordConfirmationError(
        passwordConfirmation !== '' ? password !== passwordConfirmation : false,
      ),
    [password, passwordConfirmation],
  );

  const hasError =
    !password ||
    !passwordConfirmation ||
    passwordError ||
    passwordConfirmationError;

  const saveNewPassword = () => {
    if (hasError) {
      return;
    } else {
      (async () => {
        try {
          setIsLoading(true);
          await updatePasswordResetCode(
            route.params.email,
            route.params.resetCode,
            password,
            navigation as any,
          );
          await storeData('@biometrics-enabled', 'false');
          Keychain.resetGenericPassword();
          return navigate('PasswordSuccessfully');
        } catch (e: any) {
          setIsLoading(false);
          setToastMessage(e?.message);
          setShowToastMessage(true);
          // console.error(
          //   '[CreateNewPassword] error while creating reset code:',
          //   JSON.stringify(e),
          // );
        }
      })();
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-5`}>
      <SafeAreaView style={tw`flex-1 pb-4`}>
        <ToastMessage
          tw={tw}
          // style={tw`flex-1`}
          textStyle={tw`font-inter`}
          show={showToastMessage}
          showCallback={show => setShowToastMessage(show)}
          type="error">
          {toastMessage}
        </ToastMessage>
        <KeyboardAwareScrollView>
          <View style={tw`w-full px-2 py-6`}>
            <SvgXml xml={Logo} width={20} height={30} />
          </View>
          <View style={tw`w-full p-2`}>
            <H1 tw={tw} style={tw`font-inter text-2xl font-semibold pb-4`}>
              Create New Password
            </H1>
            <Text
              style={tw`font-inter text-gray-600 text-base font-normal pb-6`}>
              Please enter a new password for your account{' '}
              {<Text style={tw`font-bold`}>{route.params.email}</Text>}. Make
              sure to not re-use any of your last 4 passwords.
            </Text>
            <InputPassword
              tw={tw}
              onChangeText={setPassword}
              value={password}
              label="New Password"
              labelStyle={tw`font-inter text-gray-700 mb-2`}
              invisibleIcon={Invisible}
              visibleIcon={Visible}
              inputStyle={tw.style(passwordError && 'border-red-500')}
            />
            <PasswordValidation
              password={password}
              onError={value => setPasswordError(value)}
            />
            <InputPassword
              tw={tw}
              onChangeText={setPasswordConfirmation}
              value={passwordConfirmation}
              label="Confirm New Password"
              labelStyle={tw`font-inter text-gray-700 mb-2`}
              invisibleIcon={Invisible}
              visibleIcon={Visible}
              style={tw`pb-8`}
              inputStyle={tw.style(
                passwordConfirmationError && 'border-red-500',
              )}
              error={
                passwordConfirmationError
                  ? "Your password doesn't match, please try again."
                  : ' '
              }
            />
            <Button
              tw={tw}
              type="primary"
              onPress={saveNewPassword}
              style={tw.style('mb-6', hasError && 'bg-gray-400')}
              iconRight={ArrowRight}
              isLoading={isLoading}
              textStyle={tw`font-inter font-medium`}>
              Save New Password
            </Button>
          </View>
          <View style={tw`flex-row justify-between w-full px-5 bg-white`}>
            <TouchableOpacity>
              <Text
                style={tw`font-inter text-gray-500 underline font-semibold text-sm`}>
                Support
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={tw`font-inter text-gray-500 underline font-semibold text-sm`}>
                Terms of Service
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={tw`font-inter text-gray-500 underline font-semibold text-sm`}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CreateNewPassword;
