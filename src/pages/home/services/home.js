import { api } from '../../../utils/config';
import request from '../../../utils/request';

const JSONS = {'Content-type': 'application/json;charset=UTF-8'};

export function getonLineUser (data) {
  return request(api.getonLineUser, {method: 'get', headers: JSONS});
}
