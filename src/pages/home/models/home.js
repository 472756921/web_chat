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
      const {user} = yield select( _ => _.app )
      const ws = yield new WebSocket("ws://localhost:8181");
      ws.onopen = (e) => {
        console.log('消息服务器已连接');
        ws.send(JSON.stringify({userID:user.user.userID, type: 'init'}));
        window.ws = ws;
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
