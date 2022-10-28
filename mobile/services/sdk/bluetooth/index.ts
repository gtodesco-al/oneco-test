import BluetoothStateManager from 'react-native-bluetooth-state-manager';

export const enableBluetooth = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    BluetoothStateManager.enable()
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};
