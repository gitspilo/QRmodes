import { createModel } from '@rematch/core';
import { RootModel } from './';

export const alerts = createModel<RootModel>()({
  state: {
    all: [],
  } as AlertsState,
  reducers: {
    add(state: AlertsState, alert: Alert) {
      return {...state, all: state.all.concat([alert])};
    },
  },
  effects: (dispatch) => ({
    async raiseError(payload: AlertPayload) {
      dispatch.alerts.add({
        title: 'Error',
        ...payload,
        type: 'error',
      });
    },
    raiseWarning(payload: AlertPayload) {
      dispatch.alerts.add({
        title: 'Problem',
        ...payload,
        type: 'warn',
      });
    },
    raiseInfo(payload: AlertPayload) {
      dispatch.alerts.add({
        title: 'Info',
        ...payload,
        type: 'info',
      });
    },
    raiseSuccess(payload: AlertPayload) {
      dispatch.alerts.add({
        title: 'Success!',
        ...payload,
        type: 'success',
      });
    },
  }),
});

type StateDomain = 'alerts' | 'session' | 'code';

type AlertPayload = {
  domain: StateDomain,
  message: string,
  title?: string,
};

export type Alert = {
  domain: StateDomain,
  title: string,
  message: string,
  type: 'error' | 'warn' | 'success' | 'info',
};

export type AlertsState = {
  all: Alert[],
};
