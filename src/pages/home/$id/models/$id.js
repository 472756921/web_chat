import {wsConnect} from '../../../../utils/webSocket';

export default {
  namespace: 'chatContent',
  state: {
    chat_message: [],
    send_message: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
  },

  reducers: {
    innerMessage (state, {payload} ) {
      return {
        ...state,
        send_message: payload,
      }
    }
  },

};
