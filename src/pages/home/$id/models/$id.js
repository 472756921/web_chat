import {sendMessage} from '../../../../utils/webSocket';
import pathToRegexp from 'path-to-regexp';
import {getUserByID} from '../../services/home';

export default {
  namespace: 'chatContent',
  state: {
    chat_message: [],
    send_message: '',
    userInfo: {
      name: ''
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if (pathname.indexOf('/home/') !== -1) {
          const id = pathToRegexp('/home/:id').exec(pathname)[1];
          dispatch({type: 'init', payload:{userID: id}});
        }
      })
    },
  },

  effects: {
    * init({payload},{call, put, select}) {
      let data = yield call(getUserByID, payload);
      if(data === '' || data === null){
        data =  {name: ''};
      }
      yield put({type: 'userInfo', payload:data})
    },

    * sendMessage({payload},{call, put, select}) {
      let {send_message, userInfo} = yield select(_=>_.chatContent);
      let {user} = yield select(_=>_.app);
      sendMessage(user.user.userID, userInfo.userID, send_message);
      yield put({type: 'send', payload:{type:1}})
    },

    * showMesg({payload},{call, put, select}) {
      let {userInfo} = yield select(_=>_.chatContent);
      if(payload.Tid === userInfo.userID){
        yield put({type: 'rbck', payload:{type: 0,msg: payload.msg}})
      }
    }
  },

  reducers: {
    innerMessage (state, {payload} ) {
      return {
        ...state,
        send_message: payload,
      }
    },
    userInfo (state, {payload} ) {
      return {
        ...state,
        userInfo: payload.data,
      }
    },
    send (state, {payload} ) {
      return {
        ...state,
        chat_message: [...state.chat_message, {msg: state.send_message, type: payload.type}],
        send_message: '',
      }
    },
    rbck (state, {payload} ) {
      return {
        ...state,
        chat_message: [...state.chat_message, {msg: payload.msg, type: payload.type}],
      }
    },
  },

};
