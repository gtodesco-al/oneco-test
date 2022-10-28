import {Dispatch, SetStateAction} from 'react';
import {CustomerFilterContextState} from '../State';

type PropsCustomerFilterContext = {
  customerFilterContextState: CustomerFilterContextState | null;
  setCustomerFilterContextState: Dispatch<
    SetStateAction<CustomerFilterContextState | null>
  >;
};

export type {PropsCustomerFilterContext};
