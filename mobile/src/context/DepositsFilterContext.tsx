import React, {createContext, FC, useState} from 'react';

import {PropsDepositsFilterContext} from '../models/PropsDepositsFilterContext';
import {DepositsFilterContextState} from '../models/State';

const DepositsFilterContext = createContext<PropsDepositsFilterContext>({
  depositsFilterContextState: null,
  setDepositsFilterContextState: () => {},
});

export const DepositsFilterProvider: FC = ({children}) => {
  const [depositsFilterContextState, setDepositsFilterContextState] =
    useState<DepositsFilterContextState | null>(null);
  return (
    <DepositsFilterContext.Provider
      value={{depositsFilterContextState, setDepositsFilterContextState}}>
      {children}
    </DepositsFilterContext.Provider>
  );
};

export default DepositsFilterContext;
