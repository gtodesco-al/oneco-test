import {NativeModules} from 'react-native';

const {PaymentSDKPlugin} = NativeModules;

import {
  deviceConnected,
  deviceDisconnected,
  disconnectDevice,
  State,
} from '../index';

const connectDeviceByName = (
  response: string,
  deviceName: string,
  state: State,
) => {
  const parts = response.split('!@#$');
  console.log('connectDeviceByName parts', parts);
  console.log('deviceName', deviceName);
  console.log("self.get('isConnecting')", state.isConnecting);

  if (parts[0].indexOf('deviceConnected') >= 0) {
    deviceConnected(
      parts[1]
        ? parts[1].toLowerCase().indexOf('idtech') !== -1
          ? parts[1]
          : deviceName
        : deviceName,
    );
  } else if (parts[0].indexOf('deviceDisconnected') >= 0) {
    deviceDisconnected(parts[1], state);
    disconnectDevice();

    state.deviceConnectionConnected = false;
    state.isDisconnecting = false;

    PaymentSDKPlugin.execute('stopScanForDevices', null);

    // TO-DO stop scanning bluetooth
    // ble.stopScan();
  } else if (parts[0].indexOf('deviceMessage') >= 0) {
    console.log('in else if 2');
    console.log('deviceMessage', parts[1]);
  } else if (parts[0].indexOf('outputLogs') >= 0) {
    console.log('in else if 3');
    console.log('outputLogs', parts[1]);
  } else {
    console.log('connectDeviceByName else ---- ');
  }
};

export default connectDeviceByName;
