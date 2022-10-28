import {Dispatch, SetStateAction} from 'react';
import {DepositsFilterContextState} from '../State';

type PropsDepositsFilterContext = {
  depositsFilterContextState: DepositsFilterContextState | null;
  setDepositsFilterContextState: Dispatch<
    SetStateAction<DepositsFilterContextState | null>
  >;
};

export type {PropsDepositsFilterContext};
