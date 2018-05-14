import { routerRedux } from 'dva/router'
import { login } from '../services/login'
import { message } from 'antd';

export default {
  namespace: 'login',
  state: {
    user: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * login ({payload}, { put, call, select }) {
      const data = yield call(login, payload)
      if(data.err) {
        if(data.err.response.status === 403)
        message.error('账号或密码错误');
        return false
      } else {
        yield put({type: 'loginScuess', payload: data});
        yield put(routerRedux.push({
          pathname: '/home',
        }))
      }
    },
  },

  reducers: {
    loginScuess (state, {payload} ) {
      return {
        ...state,
        user: payload.data,
      }
    }
  },

};
