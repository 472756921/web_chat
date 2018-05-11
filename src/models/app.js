import { routerRedux } from 'dva/router'
import { getUser } from '../services/app';

export default {
  namespace: 'app',

  state: {
    user: '',
    wss: '',
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
      const {data}  = yield call(getUser);
      const {wss} = yield select(_=>_.app);
      const {user} = data;
      if(user === undefined) {
        yield put(routerRedux.push({
          pathname: '/login',
        }))
      } else {
        if(wss !== ''){
          yield put({type: 'userInfo', payload: {data}});
        } else {
          const ws = yield new WebSocket("ws://localhost:8181");
          ws.onopen = (e) => {
            console.log('消息服务器已连接');
            ws.send(JSON.stringify({userID:user.userID, type: 'init'}));
          }
          yield put({type: 'userInfoAndWss', payload: {data, ws}});
        }
      }
    },
  },

  reducers: {
    userInfoAndWss(state, {payload}) {
      return {
        ...state,
        user: payload.data,
        wss: payload.ws,
      }
    },
    userInfo(state, {payload}) {
      return {
        ...state,
        user: payload.data,
      }
    }
  },
};
