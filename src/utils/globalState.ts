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
      await login(payload).then((res) => {
        dispatch.uid.setUid(payload.uid);
        console.log('uid', payload.uid);
      });
    },
  }),
});

export const models: RootModel = { uid };
