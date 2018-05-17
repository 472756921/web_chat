import { getonLineUser } from '../services/home';
import { wsConnect } from '../../../utils/webSocket';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'home',
  state: {
    userList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if(location.pathname === '/home'){
          dispatch({ type: 'rest' });
        }
      })
    },
  },

  effects: {
    * query ({payload}, { put, call, select }) {
      const data = yield call(getonLineUser);
      if(data.err === undefined ){
        yield put({type: 'userList', payload: data});
      }
      return wsConnect((data) => {
        put({ type:'message', payload: data })
      })
    },

    * message({payload}, { put, call, select }) {
      if(payload.type === 'userUpLine'){
        let {userList} = yield select( _ => _.home)
        userList.push(payload.msg);
      }
    },

    * datile({payload}, { put, call, select }) {
      yield put(routerRedux.push({
        pathname: '/home/' + payload, userName: 'Benson'
      }))
    },

    * rest({payload}, { put, call, select }) {
      let user = yield select( _ => _.app)
      console.log(user);
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
