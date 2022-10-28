import {init} from '@fortis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export * from '@fortis/api';

import config from '../config';

const payload = {
  fetch,
  storage: AsyncStorage,
  root: config.API_ROOT,
  apiDomain: config.API_DOMAIN,
  developerId: config.API_DEVELOPER_ID,
};

export const api = init(payload);
