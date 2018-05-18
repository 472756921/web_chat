import {api_MSS} from './config';

let ws
export function wsConnect (action, userData) {
  const {data} = userData;
  if(!data){
    return false;
  }
  ws = new global.WebSocket(api_MSS)
  ws.onopen = () => {
    console.log('消息服务器已连接');
    ws.send(JSON.stringify({userID:data.userID, type: 'init'}));
  }
  ws.onmessage = ({data}) => {
    action(JSON.parse(data))
  }
  ws.onclose = () => {
    console.log('消息服务已断开');
  }
}

export let sendMessage = (uID, tid, msg) => {
  ws.send(JSON.stringify({userID:uID, type: 'chat', Tid: tid, msg: msg}));
}
