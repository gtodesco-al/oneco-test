import React, {createContext, FC, useState} from 'react';
import {PropsGatewayTransactionsFilterContext} from '../models/PropsGatewayTransactionsFilterContext';

import {GatewayTransactionsFilterContextState} from '../models/State';

const GatewayTransactionsFilterContext =
  createContext<PropsGatewayTransactionsFilterContext>({
    gatewayTransactionsFilterContextState: null,
    setGatewayTransactionsFilterContextState: () => {},
  });

export const GatewayTransactionsFilterProvider: FC = ({children}) => {
  const [
    gatewayTransactionsFilterContextState,
    setGatewayTransactionsFilterContextState,
  ] = useState<GatewayTransactionsFilterContextState | null>(null);
  return (
    <GatewayTransactionsFilterContext.Provider
      value={{
        gatewayTransactionsFilterContextState,
        setGatewayTransactionsFilterContextState,
      }}>
      {children}
    </GatewayTransactionsFilterContext.Provider>
  );
};

export default GatewayTransactionsFilterContext;
