import { getonLineUser } from '../services/home'

export default {
  namespace: 'home',
  state: {
    userList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if(location.pathname==='/home'){
          dispatch({ type: 'query' });
        }
      })
    },
  },

  effects: {
    * query ({payload}, { put, call, select }) {
      const data = yield call(getonLineUser, payload)
      if(data.err === undefined ){
        yield put({type: 'userList', payload: data});
      }
    },
  },

  reducers: {
    userList (state, {payload} ) {
      return {
        ...state,
        userList: payload.data,
      }
    }
  },

};
