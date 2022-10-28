import React, {createContext, FC, useState} from 'react';
import {
  PropsDashboardWidgetsContext,
  DashboardWidgetsContextState,
} from '../models';

const DashboardWidgetsContext = createContext<PropsDashboardWidgetsContext>({
  dashboardWidgetsContextState: null,
  setDashboardWidgetsContextState: () => {},
});

export const DashboardWidgetsProvider: FC = ({children}) => {
  const [dashboardWidgetsContextState, setDashboardWidgetsContextState] =
    useState<DashboardWidgetsContextState | null>(null);
  return (
    <DashboardWidgetsContext.Provider
      value={{dashboardWidgetsContextState, setDashboardWidgetsContextState}}>
      {children}
    </DashboardWidgetsContext.Provider>
  );
};

export default DashboardWidgetsContext;
