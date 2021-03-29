import AsyncStorage from '@react-native-async-storage/async-storage';
import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import { persistCombineReducers } from 'redux-persist';
import reduxLogger from 'redux-logger';
import { models, RootModel } from './models';
import { expo } from './app.json';

const middlewares = [];

if (__DEV__) {
  middlewares.push(reduxLogger);
}

const reduxConfig = {
  combineReducers: persistCombineReducers.bind(null, {
    key: `@${expo.name}:redux`,
    storage: AsyncStorage,
    whitelist: ['session', 'code'],
    version: 1,
    throttle: 2000,
  }),
  middlewares: middlewares,
};

export const store = init<RootModel, FullModel>({
  models,
  plugins: [loadingPlugin()],
  redux: reduxConfig,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>
export type FullModel =  ExtraModelsFromLoading<RootModel>;