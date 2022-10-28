import React, {createContext, FC, useState} from 'react';
import {PropsMerchantsContext, MerchantsContextState} from '../models';

const MerchantsContext = createContext<PropsMerchantsContext>({
  merchantsContextState: null,
  setMerchantsContextState: () => {},
});

export const MerchantsProvider: FC = ({children}) => {
  const [merchantsContextState, setMerchantsContextState] =
    useState<MerchantsContextState | null>(null);
  return (
    <MerchantsContext.Provider
      value={{merchantsContextState, setMerchantsContextState}}>
      {children}
    </MerchantsContext.Provider>
  );
};

export default MerchantsContext;
