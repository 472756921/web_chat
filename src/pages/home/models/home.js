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
        if(location.pathname==='/home'&&JSON.parse(sessionStorage.getItem('user'))){
          dispatch({ type: 'query' });
          return wsConnect((data) => {
            dispatch({ type:'message', payload: data })
            }, JSON.parse(sessionStorage.getItem('user'))
          )
        }
      })
    },
  },

  effects: {
    * query ({payload}, { put, call, select }) {
      let {user} = yield select( _ => _.app);
      const data = yield call(getonLineUser);
      if(data.err === undefined ){
        yield put({type: 'userList', payload: data});
      }
    },

    * message({payload}, { put, call, select }) {
      if(payload.type === 'userUpLine'){
        let {userList} = yield select( _ => _.home)
        const d = userList.filter(u => u.userID === payload.msg.userID);
        if(d.length === 0) {
          userList.push(payload.msg);
        }
      } else if (payload.type === 'chat') {
        yield put({type: 'chatContent/showMesg', payload});
      }
    },

    * datile({payload}, { put, call, select }) {
      if(payload === JSON.parse(sessionStorage.getItem('user')).data.userID){
        return false
      } else {
        yield put(routerRedux.push({
          pathname: '/home/' + payload, userName: 'Benson'
        }))
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
