import React, {useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';

import {
  Button,
  H1,
  InputText,
  Paragraph,
  ToastMessage,
} from '@amplifiui/mobile';

import tw from '../../../services/tw';

import Logo from '../../icons/logo-simple';
import Visible from '../../icons/eye-on';
import Invisible from '../../icons/eye-off';
import ArrowRight from '../../icons/arrow-right-white';
import {api} from '../../api';
import {getStorageData, storeData} from '../../storage';
import {detectBiometrics} from '../../../services/touch-id';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../RootStackParamList';
import InputPassword from '../../components/amplifi-ui/InputPassword';

import {Formik} from 'formik';
import * as Yup from 'yup';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation}: Props) => {
  const {navigate} = navigation;

  const [isLoading, setLoading] = useState(false);
  const [automaticAttempt, setAutomaticAttempt] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('Not Authorized');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const FormSchema = Yup.object().shape({
    username: Yup.string()
      .email('Please enter a valid email.')
      .required('Required field.'),
    password: Yup.string().required('Required field'),
  });

  const sign = async () => {
    try {
      setAutomaticAttempt(false);
      setLoading(true);

      await api.authenticate({
        email: email.toLowerCase(),
        password,
      });

      // Get's the old password from the keychain
      const oldCredentials = await Keychain.getGenericPassword();
      // We compare the old pass with the one informed to login
      if (oldCredentials && oldCredentials.password !== password) {
        // If they are different, we disable biometrics
        await storeData('@biometrics-enabled', 'false');
      }

      const biometrics = await detectBiometrics();
      const biometricsStorage = await getStorageData('@biometrics-enabled');

      if (!biometricsStorage || biometricsStorage === 'false') {
        setEmail('');
        setPassword('');
        if (biometrics) {
          navigate('EnableBiometrics', {
            email: email.toLowerCase(),
            password,
          });
        } else {
          navigate('Dashboard');
        }
      } /* else if (biometricsStorage === 'true') {
        navigate('Dashboard');
      } */ else {
        navigate('Dashboard');
      }

      setEmail('');
      setPassword('');

      setLoading(false);
    } catch (e) {
      setLoading(false);
      if ((e as any).message) {
        if ((e as any).message === 'Reached the max login attempts!') {
          setErrorMessage(
            'Reached the max login attempts! Please, redefine your password.',
          );
        } else {
          setErrorMessage((e as any).message);
        }
        setShowErrorMessage(true);
        // await resetCredentials();

        setLoading(false);
      }
    }
  };

  // Try to retrieve credentials stored on the device
  useEffect(() => {
    (async () => {
      try {
        const biometrics = await detectBiometrics();
        const biometricsStorage = await getStorageData('@biometrics-enabled');
        if (biometrics && biometricsStorage === 'true') {
          TouchID.authenticate('Please, proceed with Touch ID', {
            passcodeFallback: true,
          })
            .then(async () => {
              // Retrieve the credentials
              const credentials = await Keychain.getGenericPassword();
              if (credentials) {
                setEmail(credentials.username);
                setPassword(credentials.password);
                setAutomaticAttempt(true);
              } else {
                setAutomaticAttempt(false);
              }
            })
            .catch((error: Error) => {
              console.log(error);
            });
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
        setAutomaticAttempt(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (automaticAttempt && email && password) {
      sign();
    }
  }, [automaticAttempt, email, password]);

  return (
    <Formik
      initialValues={{username: '', password: ''}}
      onSubmit={sign}
      validationSchema={FormSchema}>
      {({values, errors, setFieldTouched, handleSubmit}) => (
        <View style={tw`flex-1 bg-white p-5`}>
          <SafeAreaView style={tw`flex-1`}>
            <ToastMessage
              tw={tw}
              show={showErrorMessage}
              type="error"
              showCallback={() => {
                setShowErrorMessage(false);
              }}>
              {errorMessage}
            </ToastMessage>
            <ScrollView>
              <View style={tw`w-full px-2 py-6`}>
                <SvgXml xml={Logo} width={20} height={30} />
              </View>
              <View style={tw`w-full p-2`}>
                <H1 tw={tw} style={tw`font-inter text-2xl font-semibold pb-4`}>
                  Sign in to your account
                </H1>
                <Paragraph
                  tw={tw}
                  style={tw`font-inter text-gray-600 text-base font-normal pb-4`}>
                  Welcome back! Please enter your account details.
                </Paragraph>
                <InputText
                  tw={tw}
                  style={tw`pb-4`}
                  onChangeText={(value: any) => {
                    setEmail(value);
                    values.username = value;
                  }}
                  onBlur={() => setFieldTouched('username', true)}
                  error={errors.username}
                  value={email}
                  label="Email"
                  labelStyle={tw`font-inter text-gray-700 mb-2`}
                  inputStyle={tw.style(
                    'pt-2 h-11',
                    errors.username && 'border-red-500',
                  )}
                  keyboardType="email-address"
                />
                <InputPassword
                  tw={tw}
                  onChangeText={(value: string) => {
                    setPassword(value);
                    values.password = value;
                  }}
                  onBlur={() => setFieldTouched('password', true)}
                  error={errors.password}
                  value={password}
                  label="Password"
                  labelStyle={tw`font-inter text-gray-700 mb-2`}
                  inputStyle={tw.style(
                    'h-12 pt-2',
                    errors.password && 'border-red-500',
                  )}
                  invisibleIcon={Invisible}
                  visibleIcon={Visible}
                />
                <TouchableOpacity
                  style={tw`pb-8 pt-2`}
                  onPress={() => navigate('ResetPassword')}>
                  <Text
                    style={tw`font-inter underline text-primary-700 font-semibold text-right text-sm`}>
                    Forgot your password?
                  </Text>
                </TouchableOpacity>
                <Button
                  tw={tw}
                  type="primary"
                  onPress={handleSubmit}
                  style={tw`h-14`}
                  iconRight={ArrowRight}
                  textStyle={tw`font-inter font-medium`}
                  isLoading={isLoading}
                  loadingStyle={tw`ml-0 pt-2`}>
                  {!isLoading ? 'Sign In' : ''}
                </Button>
              </View>
              <View style={tw`flex-row justify-between pt-8 pb-4 w-full px-2`}>
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
      )}
    </Formik>
  );
};

export default SignIn;
