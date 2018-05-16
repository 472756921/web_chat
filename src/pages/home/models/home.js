import { getonLineUser } from '../services/home';
import {wsConnect} from '../../../utils/webSocket';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'home',
  state: {
    userList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if(location.pathname==='/home'){
          if(sessionStorage.getItem('user') !== null) {
            dispatch({ type: 'query' });
            return wsConnect((data) => {
              dispatch({ type:'message', payload: data })
            })
          }
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

    * message({payload}, { put, call, select }) {
      if(payload.type === 'userUpLine'){
        let {userList} = yield select( _ => _.home)
        userList.push(payload.msg);
      }
    },

    * datile({payload}, { put, call, select }) {
      yield put(routerRedux.push({
        pathname: '/home/1',
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
