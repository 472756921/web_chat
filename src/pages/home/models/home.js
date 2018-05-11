import { login } from '../services/home'

export default {
  namespace: 'home',
  state: {
    userList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * createWSS ({payload}, { put, call, select }) {
    },
  },

  reducers: {
    loginScuess (state, {payload} ) {
    }
  },

};
