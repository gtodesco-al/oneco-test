import {DeviceEventEmitter, NativeModules, Platform} from 'react-native';
import {enableBluetooth} from './bluetooth';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const {PaymentSDKPlugin} = NativeModules;

type Transaction = {
  account_holder_name?: string;
  action?: string;
  advance_deposit?: any;
  auth_code?: string;
  billing_city?: string;
  billing_phone?: string;
  billing_state?: string;
  billing_street?: string;
  billing_zip?: string;
  checkin_date?: any; // Is it date or string?
  checkout_date?: any; // Is it date or string?
  clerk_number?: any;
  description?: string;
  extra_flag?: any;
  location_id?: any;
  notification_email_address?: string;
  order_num?: any;
  payment_method?: any;
  product_transaction_id?: string;
  room_num?: any;
  room_rate?: any;
  save_account?: any;
  save_account_title?: string;
  subtotal_amount?: any;
  surcharge_amount?: any;
  tax?: any;
  terminal_id?: string;
  tip_amount?: any;
  transaction_amount?: any;
  errors?: [string, string][];
};

export type State = {
  isConnecting: boolean;
  isDisconnecting: boolean;
  isScanInProgress: boolean;
  deviceConnectionConnected: boolean;
  deviceConnectionMessage?: string;
  idtechInfoMessages?: any[];
  processMethodBluetooth?: boolean;
  processMethodTerminal?: boolean;
  isDestroyed?: boolean;
  isDestroying?: boolean;
  locationTerminalsWithBluetooth?: Terminal[];
  connectedBluetoothDevice?: Terminal;
  processMethodManual?: boolean;
  isStartScan?: boolean;
  isLoading?: boolean;
  isPerformingEMVTransaction?: boolean;
  idtechOutputMessages?: string[];
  transaction?: Transaction;
  inStartScan?: boolean;
  errorMessages?: string[];
  trans_actions_list_cc?: {
    id?: string;
  }[];
};

const state: State = {
  isDisconnecting: false,
  deviceConnectionConnected: false,
  isDestroyed: false,
  isDestroying: false,
  connectedBluetoothDevice: undefined,
  isConnecting: false,
  isScanInProgress: false,
  processMethodManual: false,
  isStartScan: false,
  isLoading: false,
  isPerformingEMVTransaction: false,
  idtechOutputMessages: [],
  transaction: {
    account_holder_name: undefined,
    action: undefined,
    advance_deposit: undefined,
    auth_code: undefined,
    billing_city: undefined,
    billing_phone: undefined,
    billing_state: undefined,
    billing_street: undefined,
    billing_zip: undefined,
    checkin_date: undefined,
    checkout_date: undefined,
    clerk_number: undefined,
    description: undefined,
    extra_flag: undefined,
    location_id: undefined,
    notification_email_address: undefined,
    order_num: undefined,
    payment_method: undefined,
    product_transaction_id: undefined,
    room_num: undefined,
    room_rate: undefined,
    save_account: undefined,
    save_account_title: undefined,
    subtotal_amount: undefined,
    surcharge_amount: undefined,
    //  'tags', // figure out how to avoid json.stringify cannot serialize cyclic structures error
    tax: undefined,
    terminal_id: undefined,
    tip_amount: undefined,
    transaction_amount: undefined,
    errors: [],
  },
  errorMessages: [],
};

type Terminal = {
  id?: string;
  title?: string;
  serial_number?: string;
  mac_address?: string;
  last_registration_ts?: number;
  titleWithSerialNumber?: string;
  deviceFoundString?: string;
  isConnecting?: boolean;
};

export type Device = {
  id?: string;
  serial_number?: string;
};

export type HeaderParams = {
  protocol?: string;
  hostname?: string;
  apiEndpoint?: string;
  authType?: string;
  developerId?: string;
  accessToken?: string;
  deviceType?: string;
  transactionId?: string;
};

export type BodyParams = {
  account_holder_name?: string;
  action?: string;
  advance_deposit?: string;
  auth_code?: string;
  billing_city?: string;
  billing_phone?: string;
  billing_state?: string;
  billing_street?: string;
  billing_zip?: string;
  checkin_date?: string;
  checkout_date?: string;
  clerk_number?: string;
  description?: string;
  extra_flag?: string;
  location_id?: string;
  notification_email_address?: string;
  order_num?: string;
  payment_method?: string;
  product_transaction_id?: string;
  room_num?: string;
  room_rate?: string;
  save_account?: string;
  save_account_title?: string;
  subtotal_amount?: string;
  surcharge_amount?: string;
  tax?: string;
  terminal_id?: string;
  tip_amount?: string;
  transaction_amount?: string;
};

const DEVELOPER_ID = '';
const ENV = {
  environment: 'develop',
};

const setIntervalLimited = (f: Function, interval: number, x: number) => {
  for (var i = 0; i < x; i++) {
    setTimeout(f, i * interval);
  }
}

export const disconnectDevice = () => {
  console.log('--------------------------');
  console.log('Running disconnectDevice');

  if (state.isDisconnecting || !state.deviceConnectionConnected) {
    return;
  } else {
    if (!state.isDestroyed && !state.isDestroying) {
      state.isDisconnecting = true;
    }
  }

  console.log('===> Running PaymentSDKPlugin.execute(\'stopScanForDevices\', null);');
  PaymentSDKPlugin.execute('stopScanForDevices', null);

  // TO-DO stop scanning bluetooth
  // ble.stopScan();

  // TO-DO, send event to front
  // self.send('changeProcessMethod', 'manual');

  let deviceName = null;
  const connectedBluetoothDevice = state.connectedBluetoothDevice;
  const serialNumber = connectedBluetoothDevice
    ? connectedBluetoothDevice.serial_number
    : null;

  if (serialNumber) {
    deviceName = 'IDTECH-VP3300-' + serialNumber.slice(serialNumber.length - 5);
  }
  console.log('disconnectDevice deviceName', deviceName);

  try {
    console.log('===> Running PaymentSDKPlugin.execute(\'disconnectDevice\', null);');
    PaymentSDKPlugin.execute('disconnectDevice', null);
  } catch (error) {
    console.error('error white disconnecting device');
  }
};

// Internal
export const getTerminalFromPartialSerialNumberOrMAC = (
  num: string,
): Terminal | undefined => {
  console.log('getTerminalFromPartialSerialNumberOrMAC', num);
  if (!num) {
    return undefined;
  }

  const partialSerialNumber = num ? num.split('-') : '';
  let tempNum = num.indexOf(':') ? num : '';
  console.log('partialSerialNumber', partialSerialNumber);
  console.log('tempNum', tempNum);
  if (partialSerialNumber && partialSerialNumber.length) {
    partialSerialNumber.forEach(n => {
      if (String(Number(n)) !== 'NaN') {
        tempNum = String(n).trim();
      }
    });
  }

  let terminal: Terminal = {};
  let terminals = state.locationTerminalsWithBluetooth;
  if (terminals && terminals.length && tempNum) {
    terminals.forEach((t: Terminal) => {
      if (
        t.serial_number?.indexOf(tempNum) !== -1 ||
        t.mac_address === tempNum
      ) {
        terminal = t;
      }
    });
  }

  const tempTerminal: Terminal = {
    id: terminal ? terminal.id : '',
    title: terminal ? terminal.title : '',
    serial_number: terminal ? terminal.serial_number : '',
    mac_address: terminal ? terminal.mac_address : '',
    titleWithSerialNumber: terminal
      ? terminal.title + ' - ' + terminal.serial_number
      : '',
    last_registration_ts: terminal ? terminal.last_registration_ts : 0,
    deviceFoundString: num,
    isConnecting: false,
  };

  console.log(
    'tempTerminal: id=' +
      tempTerminal.id +
      ' , title=' +
      tempTerminal.title +
      ' , serial_number=' +
      tempTerminal.serial_number +
      ' , deviceFoundString=' +
      num,
  );

  console.log(
    "(tempTerminal && tempTerminal.get('serial_number')) ? tempTerminal : null",
    tempTerminal && tempTerminal.serial_number ? tempTerminal : null,
  );

  return tempTerminal && tempTerminal.serial_number ? tempTerminal : undefined;
};

// Internal
export const deviceConnected = (message: string) => {
  console.log('in deviceConnected', message);
  var terminal = getTerminalFromPartialSerialNumberOrMAC(message);

  state.isConnecting = false;
  state.isScanInProgress = false;
  state.deviceConnectionConnected = true;
  state.connectedBluetoothDevice = terminal;
  state.deviceConnectionMessage =
    (terminal ? terminal.titleWithSerialNumber : 'Device') + ' connected';
  state.idtechInfoMessages = [];
  state.processMethodBluetooth = true;
  state.processMethodTerminal = false;
  state.processMethodManual = false;

  console.log('===> Running PaymentSDKPlugin.execute(\'stopScanForDevices\', null);');
  PaymentSDKPlugin.execute('stopScanForDevices', null);

  // TO-DO stop scanning bluetooth
  // ble.stopScan();

  state.inStartScan = false;
  if (terminal && terminal.id && state.transaction) {
    state.transaction.terminal_id = terminal.id;
  } else if (state.transaction) {
    state.transaction.terminal_id = undefined;
  }

  // TO-DO Send callback to front
  // this.get('parent').send('closeModal');
};

// Internal
const createPayloadForDevice = () => {
  console.log('in createPayloadForDevice');

  // Mandatory section -- Starts
  var headerParams: HeaderParams = {};
  headerParams.protocol = 'https';
  let hostname = '';
  if (ENV.environment === 'develop') {
    hostname = 'api.develop.zeamster.com';
  } else if (ENV.environment === 'cert') {
    hostname = 'certification.develop.zeamster.com';
  } else {
    hostname = 'api' + (ENV.APP.IS_PROD ? '' : '.sandbox') + '.zeamster.com';
  }
  headerParams.hostname = hostname;
  headerParams.apiEndpoint = '/v2/transactions';

  headerParams.authType = 'token';
  headerParams.developerId = DEVELOPER_ID;

  // TO-DO, retrieve access token from session
  // headerParams.accessToken = this.get('session.authenticated.token');

  headerParams.deviceType = 'IDTECH-VP3300BT';
  //Mandatory section -- Ends

  //Mandatory section -- Starts
  var params: {header: HeaderParams} = {header: headerParams};

  console.log('createPayloadForDevice params', params);
  return JSON.stringify(params);
};

export const connectDeviceByName = (deviceName: string) => {
  console.log('--------------------------');
  console.log('Running connectDeviceByName => deviceName:', deviceName);

  if (state.isConnecting || state.deviceConnectionConnected) {
    return;
  } else {
    if (!state.isDestroyed && !state.isDestroying) {
      state.isConnecting = true;
    }
  }

  try {
    console.log('===> Running PaymentSDKPlugin.execute(\'connectDeviceByName\', deviceName);');
    PaymentSDKPlugin.execute('connectDeviceByName', deviceName);
  } catch (error) {
    console.log('connectDeviceByName error ---- ', error);
  }
};

// Internal
const createPayloadForEMV = () => {
  //Mandatory section -- Starts
  var headerParams: HeaderParams = {};
  headerParams.protocol = 'https';
  let hostname = '';
  if (ENV.environment === 'develop') {
    hostname = 'api.develop.zeamster.com';
  } else if (ENV.environment === 'cert') {
    hostname = 'certification.develop.zeamster.com';
  } else {
    hostname = 'api' + (ENV.APP.IS_PROD ? '' : '.sandbox') + '.zeamster.com';
  }

  headerParams.hostname = hostname;
  headerParams.apiEndpoint = '/v2/transactions';

  headerParams.authType = 'token';
  headerParams.developerId = DEVELOPER_ID;

  // TO-DO, retrieve access token from session
  // headerParams.accessToken = this.get('session.authenticated.token');

  //Mandatory section -- Ends

  //Optional as per use
  headerParams.transactionId = '';
  headerParams.deviceType = 'IDTECH-VP3300BT';

  console.log('headerParams.protocol', headerParams.protocol);
  console.log('headerParams.hostname', headerParams.hostname);
  console.log('headerParams.apiEndpoint', headerParams.apiEndpoint);
  console.log('headerParams.authType', headerParams.authType);
  console.log('headerParams.developerId', headerParams.developerId);
  console.log('headerParams.accessToken', headerParams.accessToken);
  console.log('headerParams.deviceType', headerParams.deviceType);

  //Optional section (as per use) -- Starts
  var bodyParams: BodyParams = {};
  const attributes = [
    'account_holder_name',
    'action',
    'advance_deposit',
    'auth_code',
    'billing_city',
    'billing_phone',
    'billing_state',
    'billing_street',
    'billing_zip',
    'checkin_date',
    'checkout_date',
    'clerk_number',
    'description',
    'extra_flag',
    'location_id',
    'notification_email_address',
    'order_num',
    'payment_method',
    'product_transaction_id',
    'room_num',
    'room_rate',
    'save_account',
    'save_account_title',
    'subtotal_amount',
    'surcharge_amount',
    //  'tags', // figure out how to avoid json.stringify cannot serialize cyclic structures error
    'tax',
    'terminal_id',
    'tip_amount',
    'transaction_amount',
  ]

  attributes.forEach((attr: string) => {
    // bodyParams[attr] = self.get('transaction.' + attr) || '';
    if (state.transaction && attr) {
      bodyParams[attr] = state.transaction[attr] || undefined;
    }
  });

  //Mandatory section -- Starts
  const params: any = {};
  params.header = headerParams;
  // params.queryParams = queryParams;     //optional, add as per need.
  params.body = bodyParams;
  console.log('params.body.terminal_id', params.body.terminal_id);
  console.log('params', params);
  console.log('JSON.stringify(params)', JSON.stringify(params));

  return JSON.stringify(params);
  //Mandatory section -- Ends
};

// Internal
export const connectKnownDevice = (
  device: Device /* , isTryingToConnectToDefault: boolean */,
) => {
  console.log('in connectKnownDevice', device);
  if (
    !device ||
    state.isDestroyed ||
    state.isDestroying ||
    state.isConnecting
  ) {
    return;
  }

  if (device && device.serial_number) {
    let serialNumber = device.serial_number;
    if (!state.deviceConnectionConnected) {
      connectDeviceByName(
        'IDTECH-VP3300-' +
          serialNumber.slice(
            serialNumber.length - 5,
          ) /*, isTryingToConnectToDefault */,
      );
    }
  } else {
    state.deviceConnectionMessage = 'Unknown Device';
    state.deviceConnectionConnected = false;

    setTimeout(() => {
      if (state.isDestroyed || state.isDestroying) {
        return;
      }

      if (!state.deviceConnectionConnected) {
        state.deviceConnectionMessage = '';
      }
    }, 3000);
  }
};

export const cancelEMVTransaction = () => {
  state.isPerformingEMVTransaction = false;
  state.isLoading = false;

  // TO-DO Send callback to front
  // this.get('parent').send('closeModal');

  try {
    console.log('===> Running PaymentSDKPlugin.execute(\'cancelEMVTransaction\', createPayloadForEMV());');
    PaymentSDKPlugin.execute('cancelEMVTransaction', createPayloadForEMV());
  } catch (error) {
    console.log('cancelEMVTransaction error', error);
  }
};

// Internal
export const setIdtechMessages = (
  value: string,
  type: 'info' | 'error',
  isString?: boolean,
) => {
  let messages = [];
  var transaction = state.transaction;
  if (type === 'error') {
    if (isString) {
      /* if(asNoty) {
        noty({
          text: value,
          type: 'error',
          timeout: 10000
        });
      } else { */
      if (transaction?.errors) {
        transaction.errors.push(['string_error_message', value]);
      }

      // Why remove this message?
      /* setTimeout(function() {
          transaction.get('errors').remove('string_error_message');
        }, 5000); */
      //}
    } else {
      let data = JSON.parse(value);
      if (data && data.errors) {
        for (var prop in data.errors) {
          const errs = data.errors[prop];
          /* if (asNoty) {
            noty({
              text: errs,
              type: 'error',
              timeout: 10000
            });
          } else { */
          if (transaction?.errors) {
            for (let i = 0; i < errs.length; i += 1) {
              transaction.errors.push([prop, errs[i]]);
            }
          }
          // }
        }
      }
    }

    // TO-DO Show loading on the interface
    // this.setIsLoading(false);
  } else if (type === 'info') {
    if (
      value.indexOf('Unknown: See last lines in log for more details') !== -1
    ) {
      value = 'Please Swipe, Tap, or Insert';
    } else if (value.indexOf('TRY ICC AGAIN') !== -1) {
      value = 'Please insert Chip again';
    } else if (value.indexOf('USE MAGSTRIPE') !== -1) {
      value = 'Please swipe card';
    } else if (
      value.indexOf('TIMEOUT') !== -1 ||
      value.indexOf('TERMINATED') !== -1
    ) {
      // TO-DO Show loading on the interface
      // this.setIsLoading(false);
    }

    /* if (asNoty) {
      noty({
        text: value,
        type: 'info',
        timeout: 10000
      });
    } else { */
    if (value) {
      messages.push(value);
    }

    if (state.errorMessages?.length) {
      messages = [];
    }

    state.idtechInfoMessages = messages;
    setTimeout(() => {
      if (state.isDestroyed || state.isDestroying) {
        return;
      }

      if (!state.isPerformingEMVTransaction) {
        state.idtechInfoMessages = [];
      }
    }, 10000);
    // }
  }
};

// Internal
export const deviceDisconnected = (message: string, state: State) => {
  if (state.isDestroyed || state.isDestroying) {
    return;
  }

  state.isLoading = false;
  state.isConnecting = false;
  state.isScanInProgress = false;

  if (!state.processMethodManual && !state.processMethodTerminal) {
    const terminal = getTerminalFromPartialSerialNumberOrMAC(message);
    state.deviceConnectionMessage =
      (terminal ? terminal.titleWithSerialNumber : 'Device') + ' disconnected';
    state.processMethodManual = true;
  } else if (
    (state.processMethodManual || state.processMethodTerminal) &&
    !state.deviceConnectionConnected
  ) {
    state.deviceConnectionMessage = undefined;
  }

  state.connectedBluetoothDevice = undefined;
  state.deviceConnectionConnected = false;

  setTimeout(() => {
    if (state.isDestroyed || state.isDestroying) {
      return;
    }

    if (!state.deviceConnectionConnected) {
      state.deviceConnectionMessage = undefined;
    }

    state.idtechInfoMessages = [];
  }, 3000);

  console.log('===> Running PaymentSDKPlugin.execute(\'stopScanForDevices\', null);');
  PaymentSDKPlugin.execute('stopScanForDevices', null);

  // TO-DO stop scanning bluetooth
  // ble.stopScan();

  if (!state.processMethodManual) {
    // TO-DO, send event to front
    // self.send('changeProcessMethod', 'manual');
  }

  state.isDisconnecting = false;

  // TO-DO Send callback to front
  // this.get('parent').send('closeModal');
};

// Internal
export const checkIfTransactionResponse = (value: string) => {
  if (!value) {
    return;
  }

  const parsedValue = JSON.parse(value);
  if (parsedValue && parsedValue.errors) {
    setIdtechMessages(value, 'error');
  }

  console.log('parsedValue', parsedValue);
  if (parsedValue && parsedValue.transaction) {
    let finishedTrx = parsedValue.transaction;
    state.transaction = undefined;
    console.log('finishedTrx.action', finishedTrx.action);

    const trans = {
      payment_method: 'cc',
      exp_month: null,
      exp_year: null,
      subtotal_amount: null,
      tip_amount: null,
      tax: null,
      transaction_amount: null,
      location_id: finishedTrx.location_id,
      product_transaction_id: finishedTrx.product_transaction_id,
      terminal_id: finishedTrx.terminal_id,
      action: finishedTrx.action || state.trans_actions_list_cc[0].id || 'sale',
    };

    state.transaction = trans;
    // state.selectedTags = null; I don't see it being used anywhere on the app

    // TO-DO, a lot of things to change here
    // self.resetSplits(); // What this function does?

    // TO-DO, hides loading indicator on the front
    // self.setIsLoading(false);

    state.errorMessages = [];

    if (state.deviceConnectionMessage) {
      deviceConnected(state.deviceConnectionMessage);
    }

    state.processMethodManual = false;

    console.log('finishedTrx:', finishedTrx);

    setTimeout(() => {
      // TO-DO, send transaction details to the front
      // self.get('parent').send('showTransDetail', Ember.Object.create(finishedTrx), self.get('location'));
      // Where are this outputMessages coming from?
      // state.idtechOutputMessages = outputMessages;
    }, 500);
  }

  if (!state.isDestroyed && !state.isDestroying) {
    state.isPerformingEMVTransaction = false;
  }
};

export const performEMVTransaction = () => {
  console.log('in performEMVTransaction');

  state.idtechInfoMessages = [];
  state.idtechOutputMessages = [];

  // const outputMessages = state.idtechOutputMessages;

  state.isPerformingEMVTransaction = true;

  // TO-DO, notifies the front that the loading should be presented
  //  this.set('isLoading', true);

  // TO-DO, notify the front that a bluetooth transaction is running
  // self.get('parent').send('runningBluetoothTransaction', self, true);

  try {
    console.log('===> Running PaymentSDKPlugin.execute(\'performEMVTransaction\', createPayloadForEMV());');
    PaymentSDKPlugin.execute('performEMVTransaction', createPayloadForEMV());
  } catch (error) {
    console.log('performEMVTransaction error', error);
    if (!state.isDestroyed && !state.isDestroying) {
      state.isPerformingEMVTransaction = false;
    }
  }
};

// Internal
const startScan = (devicesFound: string[]) => {
  console.log('in startScan');

  state.inStartScan = true;
  state.isScanInProgress = true;
  state.processMethodBluetooth = true;
  state.processMethodTerminal = false;
  state.processMethodManual = false;
  state.isConnecting = false;
  state.deviceConnectionConnected = false;
  state.deviceConnectionMessage = undefined;

  setIntervalLimited(
    () => {
      if (
        !state.isConnecting &&
        !state.deviceConnectionConnected &&
        state.inStartScan
      ) {
        tryConnecting(devicesFound);
      }
    },
    1000,
    15,
  );

  try {
    DeviceEventEmitter.addListener('scanForDevices', (event: any) => {
      console.log('scanForDevices event:', event);
    });

    const payloadForDevice = createPayloadForDevice();
    console.log('payloadForDevice:', payloadForDevice);

    // PaymentSDKPlugin.execute('scanForDevices', payloadForDevice, '', 0);
    console.log('===> Running PaymentSDKPlugin.execute(\'scanForDevices\', payloadForDevice);');
    PaymentSDKPlugin.execute('scanForDevices', JSON.stringify([payloadForDevice]));
  } catch (error) {
    console.log('scanForDevices error', error);
    console.log('===> Running PaymentSDKPlugin.execute(\'stopScanForDevices\', null);');
    PaymentSDKPlugin.execute('stopScanForDevices', null);
  }
};

// Internal
const tryConnecting = (
  devicesFound: string[],
  checkCounter?: number,
  defaultDevice?: Device,
) => {
  console.log('devicesFound', devicesFound);
  if (
    state.isConnecting ||
    state.deviceConnectionConnected ||
    state.isDestroyed ||
    state.isDestroying ||
    state.isDisconnecting ||
    !state.processMethodBluetooth
  ) {
    state.isScanInProgress = false;
    return;
  }
  if (
    checkCounter &&
    checkCounter > 4 &&
    devicesFound &&
    devicesFound.length > 1 &&
    !defaultDevice
  ) {
    const tempDevices: Device[] = [];
    devicesFound.map(d => {
      const terminal = getTerminalFromPartialSerialNumberOrMAC(d);
      if (terminal) {
        tempDevices.push(terminal);
      }
    });

    console.log('tempDevices', tempDevices);
    if (tempDevices.length > 1) {
      console.log(' > 1 tempDevices');

      // TO-DO, populate the list of devices
      // self.get('parent').send('showBluetoothDevices', self, tempDevices);
    } else if (tempDevices.length === 1) {
      console.log(' = 1 tempDevices');
      connectKnownDevice(tempDevices[0]);
    } else if (
      checkCounter === 15 &&
      (!tempDevices || tempDevices.length === 0)
    ) {
      unableToFind();
    }
  } else if (
    checkCounter &&
    checkCounter > 4 &&
    devicesFound &&
    devicesFound.length === 1
  ) {
    if (devicesFound[0]) {
      const t = getTerminalFromPartialSerialNumberOrMAC(devicesFound[0]);
      if (t) {
        connectKnownDevice(t);
      }
    }
  }

  if (checkCounter) {
    checkCounter++;
  }

  console.log('checkCounter', checkCounter);
  if (checkCounter === 15 && (!devicesFound || devicesFound.length === 0)) {
    unableToFind();
  }
};

const unableToFind = () => {
  if (!state.processMethodManual) {
    /* noty({
      text: 'Unable to find a device. Please try again.',
      type: 'error',
    }); */
    // TO-DO show toast message
  }

  // TO-DO, send event to front
  // self.send('changeProcessMethod', 'manual');

  state.isScanInProgress = false;

  setTimeout(() => {
    if (
      !state.isDestroyed &&
      !state.isDestroying &&
      !state.deviceConnectionConnected &&
      !state.isConnecting
    ) {
      state.deviceConnectionMessage = undefined;
    }
  }, 5000);
};

export const scanForDevices = async () => {
  console.log('in scanForDevices', state.isScanInProgress);

  const devicesFound: string[] = [];

  if (Platform.OS === 'ios') {
    startScan(devicesFound);
  } else {
    try {
      await enableBluetooth();

      startScan(devicesFound);
      console.log(
        'isBluetoothEnabled && isLocationAuthorized - Bluetooth is able to connect',
      );
    } catch (error) {
      console.error('Error while activating bluetooth.');
    }
  }

  if (state.isScanInProgress) {
    return;
  } else if (!state.deviceConnectionConnected) {
    console.log('setting isScanInProgress 2');
    state.isScanInProgress = true;
  }
};
