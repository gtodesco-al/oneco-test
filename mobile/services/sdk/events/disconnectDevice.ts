import {State} from '../index';

const disconnectDevice = (response: string, state: State) => {
  const parts = response.split('!@#$');
  console.log('disconnectDevice parts', parts);
  if (parts[0].indexOf('deviceMessage') >= 0) {
    console.log('disconnectDevice deviceMessage ---- ', parts[0]);
  } else if (parts[0].indexOf('outputLogs') >= 0) {
    console.log('disconnectDevice outputLogs ---- ', parts[0]);
    state.isDisconnecting = false;
  } else {
    console.log('disconnectDevice else ---- ');
  }
};

export default disconnectDevice;
