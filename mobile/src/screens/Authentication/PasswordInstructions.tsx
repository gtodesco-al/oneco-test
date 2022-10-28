import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  Button,
  H1,
  InputNumber,
  Paragraph,
  ToastMessage,
} from '@amplifiui/mobile';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../RootStackParamList';
import tw from '../../../services/tw';
import {checkResetCode} from '../../../services/api';
import Logo from '../../icons/logo-simple';
import ArrowRight from '../../icons/arrow-right-white';
import {createResetCode} from '../../../services/api';

import {Formik} from 'formik';
import * as Yup from 'yup';

type Props = NativeStackScreenProps<RootStackParamList, 'PasswordInstructions'>;

const PasswordInstructions = ({navigation, route}: Props) => {
  const {navigate} = navigation;
  const email = route.params.toString();
  const [isLoading, setIsLoading] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [resetCodeConfirmationError, setResetCodeConfirmationError] =
    useState(false);

  const resetCodeEmail = () => {
    (async () => {
      try {
        await createResetCode(email.toLowerCase(), navigation);
        return setShowToastMessage(true);
      } catch (e) {
        console.error(
          '[PasswordInstructions] error while resend email:',
          JSON.stringify(e),
        );
      }
    })();
  };

  const FormSchema = Yup.object().shape({
    resetCodePassword: Yup.string().required('Required field.'),
  });

  return (
    <Formik
      initialValues={{
        resetCodePassword: '',
      }}
      onSubmit={values => {
        const completeValues = {resetCodePassword: values.resetCodePassword};
        (async () => {
          try {
            setIsLoading(true);
            const {data} = await checkResetCode(
              email,
              completeValues.resetCodePassword,
              navigation,
            );

            if (!data.ok) {
              throw new Error('Invalid code.');
            }

            const resetCode = completeValues.resetCodePassword;
            return navigate('CreateNewPassword', {email, resetCode});
          } catch (e) {
            setIsLoading(false);
            setResetCodeConfirmationError(true);
            // console.error(`Error while reset password => ${JSON.stringify(e)}`);
          }
        })();
      }}
      validationSchema={FormSchema}>
      {({values, handleChange, errors, setFieldTouched, handleSubmit}) => (
        <>
          <View style={tw`flex-1 bg-white p-5`}>
            <SafeAreaView style={tw`flex-1`}>
              <ToastMessage
                tw={tw}
                // style={tw`flex-1`}
                textStyle={tw`font-inter`}
                show={showToastMessage}
                showCallback={show => setShowToastMessage(show)}
                type="success">
                Instructions have been resent to your email
              </ToastMessage>
              <KeyboardAwareScrollView>
                <View style={tw`w-full px-2 py-6`}>
                  <SvgXml xml={Logo} width={20} height={30} />
                </View>
                <View style={tw`w-full p-2`}>
                  <H1
                    tw={tw}
                    style={tw`font-inter text-2xl font-semibold pb-4`}>
                    Instructions have been sent
                  </H1>
                  <Paragraph
                    tw={tw}
                    style={tw`font-inter text-gray-600 text-base font-normal pb-6`}>
                    If the email address provided is associated with an existing
                    user account, you will receive an email with a Password
                    Reset Code. Please check your email and return here to enter
                    the code below.
                  </Paragraph>
                  <InputNumber
                    tw={tw}
                    style={tw`pb-6`}
                    required={true}
                    value={values.resetCodePassword}
                    onChangeText={handleChange('resetCodePassword')}
                    onBlur={() => setFieldTouched('resetCodePassword', true)}
                    error={
                      resetCodeConfirmationError
                        ? 'Invalid code, please try again.'
                        : errors.resetCodePassword
                    }
                    inputStyle={tw.style(
                      'h-11',
                      (errors.resetCodePassword ||
                        resetCodeConfirmationError) &&
                        'border-red-500',
                    )}
                    label="Password Reset Code"
                    placeholder="Enter your reset code"
                  />
                  <Button
                    tw={tw}
                    type="primary"
                    onPress={handleSubmit}
                    style={tw`mb-6`}
                    iconRight={ArrowRight}
                    isLoading={isLoading}
                    textStyle={tw`font-inter font-medium`}>
                    Continue
                  </Button>
                  <Text
                    style={tw`font-inter text-base font-bold text-gray-600 pb-2`}>
                    Did not received email?
                  </Text>
                  <Paragraph
                    tw={tw}
                    style={tw`font-inter text-gray-600 text-base font-normal pb-4`}>
                    Please check your spam folder before contacting support or
                    resending the email. If you need additional assistance
                    please call 855-465-9999.
                  </Paragraph>
                  <Button
                    tw={tw}
                    onPress={resetCodeEmail}
                    style={tw`mb-6 bg-gray-50 border border-gray-200`}
                    textStyle={tw`font-inter font-medium text-gray-900`}>
                    Resend Email
                  </Button>
                  <TouchableOpacity onPress={() => navigate('SignIn')}>
                    <Text
                      style={tw`font-inter font-medium text-primary-700 text-center`}>
                      Go back to Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={tw`flex-row justify-between pt-8 px-2 bg-white`}>
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
        </>
      )}
    </Formik>
  );
};

export default PasswordInstructions;
