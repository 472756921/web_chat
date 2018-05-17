import {api_MSS} from './config';

let ws
export function wsConnect (action, userData) {
  const {user} = userData;
  if(!user){
    return false;
  }
  ws = new global.WebSocket(api_MSS)
  ws.onopen = () => {
    console.log('消息服务器已连接');
    ws.send(JSON.stringify({userID:user.userID, type: 'init'}));
  }
  ws.onmessage = ({data}) => {
    action(JSON.parse(data))
  }
}

export let sendMessage = (msg, tid, uID) => {
  ws.send(JSON.stringify({userID:uID, type: 'chat', Tid: tid, msg: msg}));
}
