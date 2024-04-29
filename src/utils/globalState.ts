import { createModel, Models } from '@rematch/core';
import { getUserInfo, login, LoginRequest } from './requests';

export interface RootModel extends Models<RootModel> {
  uid: typeof uid;
  role: typeof role;
}

export const role = createModel<RootModel>()({
  state: 2 as number,
  reducers: {
    setRole(state, payload: number) {
      return payload;
    },
  },
});

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
      await getUserInfo({ uid: payload.uid }).then((res) => {
        console.log('role', res);
        dispatch.role.setRole(res.data.role);
      });
    },
  }),
});

export interface FilterValue {
  eqName?: string;
  labName?: string;
  userName?: string;
  applyDate?: string;
  isExpire?: string;
}

const initialFilterValue: FilterValue = {};

export const filterValue = createModel<RootModel>()({
  state: initialFilterValue,
  reducers: {
    setFilterValue(state, payload: FilterValue) {
      return payload;
    },
  },
});

export const models: RootModel = { uid, role, filterValue };
