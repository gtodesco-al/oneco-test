import React, {createContext, FC, useState} from 'react';

import {PropsChargebacksFilterContext} from '../models/PropsChargebacksFilterContext';
import {ChargebacksFilterContextState} from '../models/State';

const ChargebacksFilterContext = createContext<PropsChargebacksFilterContext>({
  chargebacksFilterContextState: null,
  setChargebacksFilterContextState: () => {},
});

export const ChargebacksFilterProvider: FC = ({children}) => {
  const [chargebacksFilterContextState, setChargebacksFilterContextState] =
    useState<ChargebacksFilterContextState | null>(null);
  return (
    <ChargebacksFilterContext.Provider
      value={{
        chargebacksFilterContextState,
        setChargebacksFilterContextState,
      }}>
      {children}
    </ChargebacksFilterContext.Provider>
  );
};

export default ChargebacksFilterContext;
