import {api_MSS} from './config';

let ws
export function wsConnect (action) {
  ws = new global.WebSocket(api_MSS)
  ws.onopen = () => {
      console.log('消息服务器已连接');
      const {data} =JSON.parse( sessionStorage.getItem('user') );
    ws.send(JSON.stringify({userID:data.userID, type: 'init'}));
  }
  ws.onmessage = ({data}) => {
    action(JSON.parse(data))
  }
}
