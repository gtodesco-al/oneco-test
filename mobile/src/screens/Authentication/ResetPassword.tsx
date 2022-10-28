import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Button, H1, InputText, Paragraph} from '@amplifiui/mobile';
import {createResetCode} from '../../../services/api';
import tw from '../../../services/tw';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Logo from '../../icons/logo-simple';
import ArrowRight from '../../icons/arrow-right-white';
import RootStackParamList from '../RootStackParamList';

import {Formik} from 'formik';
import * as Yup from 'yup';

type Props = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;

const ResetPassword = ({navigation}: Props) => {
  const {navigate} = navigation;

  const [isLoading, setIsLoading] = useState(false);

  const FormSchema = Yup.object().shape({
    username: Yup.string()
      .email('Please enter a valid email')
      .required('Required field.'),
  });

  return (
    <Formik
      initialValues={{
        username: '',
      }}
      onSubmit={values => {
        const completeValues = {username: values.username};
        (async () => {
          try {
            setIsLoading(true);
            await createResetCode(completeValues.username, navigation as any);
            return navigate('PasswordInstructions', values.username);
          } catch (e) {
            setIsLoading(false);
            console.error(
              '[ResetPassword] error while creating reset code:',
              JSON.stringify(e),
            );
          }
        })();
      }}
      validationSchema={FormSchema}>
      {({values, handleChange, errors, setFieldTouched, handleSubmit}) => (
        <>
          <View style={tw`flex-1 bg-white p-5`}>
            <SafeAreaView style={tw`flex-1`}>
              <ScrollView>
                <View style={tw`w-full px-2 py-6`}>
                  <SvgXml xml={Logo} width={20} height={30} />
                </View>
                <View style={tw`w-full p-2`}>
                  <H1
                    tw={tw}
                    style={tw`font-inter text-2xl font-semibold pb-4`}>
                    Reset Password
                  </H1>
                  <Paragraph
                    tw={tw}
                    style={tw`font-inter text-gray-600 text-base font-normal pb-4`}>
                    Please enter the username associated with your account. We
                    will send and email with more instructions on how to
                    proceed.
                  </Paragraph>
                  <InputText
                    tw={tw}
                    value={values.username}
                    label="Username"
                    required={true}
                    onChangeText={handleChange('username')}
                    onBlur={() => setFieldTouched('username', true)}
                    error={errors.username}
                    style={tw`pb-8`}
                    inputStyle={tw.style(
                      'pt-2 h-11',
                      errors.username && 'border-red-500',
                    )}
                    labelStyle={tw`font-inter text-gray-700 mb-2`}
                    keyboardType="email-address"
                  />
                  <Button
                    tw={tw}
                    type="primary"
                    onPress={handleSubmit}
                    style={tw``}
                    iconRight={ArrowRight}
                    isLoading={isLoading}
                    textStyle={tw`font-inter font-medium`}>
                    Send Instructions
                  </Button>
                  <TouchableOpacity
                    style={tw`mt-9`}
                    onPress={() => navigate('SignIn')}>
                    <Text
                      style={tw`font-inter font-medium text-primary-700 text-center`}>
                      Go back to Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={tw`flex-row justify-between pt-8 mb-1 marker:w-full px-2 bg-white`}>
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
              </ScrollView>
            </SafeAreaView>
          </View>
        </>
      )}
    </Formik>
  );
};

export default ResetPassword;
