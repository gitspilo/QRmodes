import { createModel } from '@rematch/core';
import * as rootNavigation from "../helpers/rootNavigation";
import { RootModel } from '.';

export const code = createModel<RootModel>()({
  state: {
    all: [],
  } as CodeState,
  reducers: {
    setCode(state, code: Code) {
      return { ...state, all: state.all.concat(code) }
    },
  },
  effects: (dispatch) => ({
    async addCode(data: Code) {
      try {
        await dispatch.code.setCode(data);
        rootNavigation.navigate('List');
      } catch (e) {
        dispatch.alerts.raiseError({
          domain: 'code',
          message: e.message,
        });
      }
    },
  }),
});

export type CodeState = {
  all: Code[],
};

export enum CodeTypeEnum {
  contact,
  text,
  url
};

export type Code = {
  value: string,
  type: CodeTypeEnum,
};