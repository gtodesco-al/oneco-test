import {Dispatch, SetStateAction} from 'react';
import {GatewayTransactionsFilterContextState} from '../State';

type PropsGatewayTransactionsFilterContext = {
  gatewayTransactionsFilterContextState: GatewayTransactionsFilterContextState | null;
  setGatewayTransactionsFilterContextState: Dispatch<
    SetStateAction<GatewayTransactionsFilterContextState | null>
  >;
};

export type {PropsGatewayTransactionsFilterContext};
