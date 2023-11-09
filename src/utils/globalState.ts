import { createModel, Models } from '@rematch/core';
import { login, LoginRequest } from './requests';

export interface RootModel extends Models<RootModel> {
  uid: typeof uid;
}

export const uid = createModel<RootModel>()({
  state: '' as string,
  reducers: {
    setUid(state, payload: string) {
      return payload;
    },
  },
  effects: (dispatch) => ({
    async loginAsync(payload: LoginRequest) {
      const uid = await login(payload);
      dispatch.uid.setUid(uid);
    },
  }),
});

export const models: RootModel = { uid };
