import {
  setIdtechMessages,
  deviceDisconnected,
  State,
  checkIfTransactionResponse,
} from '..';

const performEMVTransaction = (
  response: string,
  outputMessages: string[],
  state: State,
) => {
  const parts = response.split('!@#$');
  const type = parts[0];
  const value = parts[1];

  if (type.indexOf('deviceMessage') >= 0) {
    console.log('performEMVTransaction deviceMessage', value);
    setIdtechMessages(value, 'info');
  } else if (type.indexOf('outputLogs') >= 0) {
    console.log('performEMVTransaction outputLogs', value);
    if (parts[1].indexOf('Disconnect') !== -1) {
      deviceDisconnected(parts[1], state);
      if (!state.isDestroyed && !state.isDestroying) {
        state.isPerformingEMVTransaction = false;
      }
    }
    outputMessages.push(value);
  } else if (type.indexOf('transactionResponse') >= 0) {
    // TO-DO Send callback to front
    // this.get('parent').send('closeModal');

    console.log('performEMVTransaction transactionResponse', value);
    checkIfTransactionResponse(value);
  } else {
    checkIfTransactionResponse(response);
    console.log('performEMVTransaction response else', response + ' ---- ');
    if (response.indexOf('EMV Transaction Started') === -1) {
      // TO-DO, notifies the front that the loading should be presented
      // this.set('isLoading', false);
    }
  }

  // TO-DO, notify the front that a bluetooth transaction is running
  // self.get('parent').send('runningBluetoothTransaction', self, true);
};

export default performEMVTransaction;
