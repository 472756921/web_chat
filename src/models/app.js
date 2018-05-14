import { routerRedux } from 'dva/router'
import { getUser } from '../services/app';

export default {
  namespace: 'app',

  state: {
    user: '',
  },

  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        if(location.pathname!=='/login'){
          dispatch({ type: 'query' });
        }
      })
    },
  },

  effects: {
    * query( {payload}, {call, put, select} ) {
      const {data, err}  = yield call(getUser);
      if(err !== undefined) {
        return false;
      } else {
        const {user} = data;
        if(user === undefined) {
          yield put(routerRedux.push({
            pathname: '/login',
          }))
        } else {
          yield put({type: 'userInfo', payload: {data}});
        }
      }
    },
  },

  reducers: {
    userInfo(state, {payload}) {
      return {
        ...state,
        user: payload.data,
      }
    }
  },
};
