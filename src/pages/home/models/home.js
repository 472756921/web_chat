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
      console.log(history);
    },
  },

  effects: {
    * query ({payload}, { put, call, select }) {
      const data = yield call(getonLineUser);
      let {user} = yield select( _ => _.app);
      if(data.err === undefined ){
        yield put({type: 'userList', payload: data});
      }

      wsConnect((data) => {
        put({ type:'message', payload: data })
      }, user)
    },

    * message({payload}, { put, call, select }) {
      console.log(123);
      console.log(payload);
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
