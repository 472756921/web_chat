import { getonLineUser } from '../services/home'
import {wsConnect} from '../../../utils/webSocket';

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
          return wsConnect((data) => {
            dispatch({ type:'message', payload: data })
          })
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
    },

    * message({payload}, { put, call, select }) {
      if(payload.type === 'userUpLine'){
        let {userList} = yield select( _ => _.home)
        userList.push(payload.msg);
      }
    }
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
