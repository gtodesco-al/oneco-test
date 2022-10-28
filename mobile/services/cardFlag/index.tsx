import {Image} from 'react-native';

import FlagAch from '../../assets/credit-cards/ach.png';
import FlagAmex from '../../assets/credit-cards/amex.png';
import FlagDinners from '../../assets/credit-cards/diners.png';
import FlagDiscover from '../../assets/credit-cards/discover.png';
import FlagJcb from '../../assets/credit-cards/jcb.png';
import FlagVisa from '../../assets/credit-cards/visa.png';
import FlagMastercard from '../../assets/credit-cards/mastercard.png';

const ACH = Image.resolveAssetSource(FlagAch).uri;
const AMEX = Image.resolveAssetSource(FlagAmex).uri;
const DINNERS = Image.resolveAssetSource(FlagDinners).uri;
const DISCOVER = Image.resolveAssetSource(FlagDiscover).uri;
const JCB = Image.resolveAssetSource(FlagJcb).uri;
const VISA = Image.resolveAssetSource(FlagVisa).uri;
const MASTERCARD = Image.resolveAssetSource(FlagMastercard).uri;

export default (flag: any) => {
  if (flag) {
    return flag === 'visa'
      ? VISA
      : flag === 'mastercard'
      ? MASTERCARD
      : flag === 'ach'
      ? ACH
      : flag === 'amex' || 'american express'
      ? AMEX
      : flag === 'dinners'
      ? DINNERS
      : flag === 'discover'
      ? DISCOVER
      : flag === 'jcb'
      ? JCB
      : ACH;
  }
};
