import {Dispatch, SetStateAction} from 'react';
import {ChargebacksFilterContextState} from '../State';

type PropsChargebacksFilterContext = {
  chargebacksFilterContextState: ChargebacksFilterContextState | null;
  setChargebacksFilterContextState: Dispatch<
    SetStateAction<ChargebacksFilterContextState | null>
  >;
};

export type {PropsChargebacksFilterContext};
