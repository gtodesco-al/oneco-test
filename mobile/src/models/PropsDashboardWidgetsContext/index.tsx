import {Dispatch, SetStateAction} from 'react';
import {DashboardWidgetsContextState} from '../State';

type PropsDashboardWidgetsContext = {
  dashboardWidgetsContextState: DashboardWidgetsContextState | null;
  setDashboardWidgetsContextState: Dispatch<
    SetStateAction<DashboardWidgetsContextState | null>
  >;
};

export type {PropsDashboardWidgetsContext};
