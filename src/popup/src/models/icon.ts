import { GetIcons } from '@/requests';
export default {
  namesapce: 'icon',
  state: {
    icons: [] as Icon[],
  },
  reducers: {
    set(state: any, { payload: p }: any) {
      return p;
    },
  },
  effects: {
    *get({ tag, query, marker, success }, { call, put }) {
      const r: Response = yield call(GetIcons, tag, query, marker);
      if (r.status == 200) {
        const a: APIResponse = yield r.json();
        if (a.success) {
          yield put({
            type: 'set',
            payload: { icons: a.data },
          });
          success();
        }
      }
    },
  },
};
