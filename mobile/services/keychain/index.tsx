import * as Keychain from 'react-native-keychain';

type Credentials = {
  username: string;
  password: string;
};

export const setCredentials = async (obj: Credentials): Promise<void> => {
  const {username, password} = obj;
  await Keychain.setGenericPassword(username, password);
  return;
};

export const getCredentials = async (): Promise<Credentials | null> => {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(
        `Credentials successfully loaded for user ${credentials.username}`,
      );
      return credentials;
    }

    console.log('No credentials stored');
    return null;
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
    throw error;
  }
};

export const resetCredentials = async (): Promise<void> => {
  await Keychain.resetGenericPassword();
};
