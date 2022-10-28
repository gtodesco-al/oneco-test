import TouchID from 'react-native-touch-id';

const detectBiometrics = (): Promise<boolean> => {
  return new Promise(resolve => {
    TouchID.isSupported()
      .then((biometryType: string | boolean) => {
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
          resolve(true);
        } else if (biometryType === 'TouchID') {
          console.log('TouchID is supported.');
          resolve(true);
        } else if (biometryType === true) {
          console.log('Touch ID is supported on Android');
          resolve(true);
        }
        resolve(false);
      })
      .catch((error: Error) => {
        // Failure code if the user's device does not have touchID or faceID enabled
        console.log(error);
        resolve(false);
      });
  });
};

export {detectBiometrics};
