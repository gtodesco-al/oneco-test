import React, {createContext, FC, useState} from 'react';

import {PropsCustomerFilterContext} from '../models/PropsCustomerFilterContext';
import {CustomerFilterContextState} from '../models/State';

const CustomerFilterContext = createContext<PropsCustomerFilterContext>({
  customerFilterContextState: null,
  setCustomerFilterContextState: () => {},
});

export const CustomerFilterProvider: FC = ({children}) => {
  const [customerFilterContextState, setCustomerFilterContextState] =
    useState<CustomerFilterContextState | null>(null);
  return (
    <CustomerFilterContext.Provider
      value={{customerFilterContextState, setCustomerFilterContextState}}>
      {children}
    </CustomerFilterContext.Provider>
  );
};

export default CustomerFilterContext;
