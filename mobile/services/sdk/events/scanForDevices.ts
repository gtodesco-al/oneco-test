import {NativeModules} from 'react-native';
const {PaymentSDKPlugin} = NativeModules;

import {
  State,
  Device,
  getTerminalFromPartialSerialNumberOrMAC,
  connectKnownDevice,
  deviceDisconnected,
} from '..';

// Internal
const deviceScanCompleted = (state: State) => {
  if (state.isDestroyed || state.isDestroying) {
    return;
  }

  state.isConnecting = false;
  state.isScanInProgress = false;
};

const scanForDevices = (
  response: string,
  devicesFound: string[],
  defaultDevice: Device,
  state: State,
) => {
  console.log('response', response);
  const parts = response.split('!@#$');
  console.log('scanForDevices parts', parts);
  if (parts[0].indexOf('deviceScanResponse') >= 0) {
    console.log('Device Found: ' + parts[2] + ' -- ' + parts[1]);
    let alreadyFound = false;
    let dtitle = parts[2];
    let dmac = parts[1] ? parts[1].replace(/:/g, '').toLowerCase() : '';

    devicesFound.forEach((d: string) => {
      if ((dtitle && d === dtitle) || d === dmac) {
        alreadyFound = true;
      }
    });

    if (
      !alreadyFound &&
      dtitle &&
      dtitle.toLowerCase().indexOf('idtech') !== -1
    ) {
      devicesFound.push(dtitle);
    }

    if (!alreadyFound && !dtitle && dmac) {
      devicesFound.push(dmac);
    }

    if (defaultDevice && !state.isConnecting && parts[2]) {
      const terminalFromSerial = getTerminalFromPartialSerialNumberOrMAC(
        parts[2],
      )?.id;

      if (defaultDevice.id === terminalFromSerial) {
        connectKnownDevice(defaultDevice);
      }
    }
  } else if (parts[0].indexOf('deviceScanCompleted') >= 0) {
    deviceScanCompleted(state);
  } else if (parts[0].indexOf('deviceMessage') >= 0) {
    console.log('scanForDevices deviceMessage', parts[1]);
  } else if (parts[0].indexOf('outputLogs') >= 0) {
    console.log('scanForDevices outputLogs', parts[1]);
    if (parts[1].indexOf('Disconnect') !== -1) {
      deviceDisconnected(parts[1], state);
    }

    if (parts[1] === 'Enabling Search for BLE') {
      setTimeout(() => {
        console.log('entering timeout 1');
        if (
          state.isDestroyed ||
          state.isDestroying ||
          state.deviceConnectionConnected ||
          (devicesFound && devicesFound.length)
        ) {
          PaymentSDKPlugin.execute('stopScanForDevices', null);

          // TO-DO stop scanning bluetooth
          // ble.stopScan();

          if (
            !state.isConnecting &&
            !state.isDestroyed &&
            !state.isDestroying &&
            !state.deviceConnectionConnected &&
            !state.inStartScan
          ) {
            state.isScanInProgress = false;

            state.deviceConnectionConnected = false;
            if (!state.processMethodManual) {
              /* noty({
                text: 'Unable to find a device. Please try again.',
                type: 'error',
              }); */
              // TO-DO show toast message
            }

            // TO-DO, send event to front
            // self.send('changeProcessMethod', 'manual');
          }
          return;
        }

        if (!state.processMethodManual && !state.inStartScan) {
          /* noty({
            text: 'Unable to find a device. Please try again.',
            type: 'error',
          }); */
          // TO-DO show toast message
        }

        state.isLoading = false;
        state.isConnecting = false;
        state.isScanInProgress = false;
        state.deviceConnectionConnected = false;

        // TO-DO, send event to front
        // self.send('changeProcessMethod', 'manual');

        setTimeout(() => {
          console.log('entering timeout 2');
          if (
            (state.isDestroyed || state.isDestroying) &&
            !state.deviceConnectionConnected &&
            !devicesFound
          ) {
            PaymentSDKPlugin.execute('stopScanForDevices', null);

            // TO-DO stop scanning bluetooth
            // ble.stopScan();
            return;
          }

          if (!state.deviceConnectionConnected) {
            state.deviceConnectionMessage = undefined;
          }
        }, 5000);
      }, 15000);
    }
  } else {
    console.log('scanForDevices else ---- ');
  }
};

export default scanForDevices;
