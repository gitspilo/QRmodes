import { Models } from '@rematch/core';
import { session } from './session';
import { alerts } from './alerts';
import { code } from './code';

export interface RootModel extends Models<RootModel> {
  alerts: typeof alerts,
  session: typeof session,
  code: typeof code,
};

export const models: RootModel = { session, alerts, code };