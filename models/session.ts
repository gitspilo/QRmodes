import { createModel } from '@rematch/core';
import { RootModel } from './';

export const session = createModel<RootModel>()({
  state: {
    auth: "auth",
    user: {
      first_name: 'Piyush',
      last_name: 'Kakadiya'
    },
  } as SessionState,
  reducers: {
    setAuth(state, auth: string | null) {
      return { ...state, auth };
    },
    setUser(state, user: User | null) {
      return { ...state, user };
    },  
  },
  effects: (dispatch) => ({
    async authenticate() {
      try {
        dispatch.session.setAuth(null);
      } catch (e) {
        dispatch.alerts.raiseError({
          domain: 'session',
          message: e.message,
        });
      }
    },
    async register() {
      try {
        dispatch.session.setUser(null);
      } catch (e) {
        dispatch.alerts.raiseError({
          domain: 'session',
          message: e.message,
        });
      }
    },
    async logout() {
      try {
        dispatch.session.setAuth(null);
        dispatch.session.setUser(null);
      } catch (e) {
        dispatch.alerts.raiseError({
          domain: 'session',
          message: e.message,
        });
      }
    },
  }),
});

export type SessionState = {
  user: User | null,
  auth: string | null,
};

export type User = {
  prefix: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  role: number,
  phone: string,
};
