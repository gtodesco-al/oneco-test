import {Dispatch, SetStateAction} from 'react';
import {MerchantsContextState} from '../State';

type PropsMerchantsContext = {
  merchantsContextState: MerchantsContextState | null;
  setMerchantsContextState: Dispatch<
    SetStateAction<MerchantsContextState | null>
  >;
};

export type {PropsMerchantsContext};
