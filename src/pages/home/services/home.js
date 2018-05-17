import { api } from '../../../utils/config';
import request from '../../../utils/request';
import {getParmas} from '../../../utils';

const JSONS = {'Content-type': 'application/json;charset=UTF-8'};

export function getonLineUser () {
  return request(api.getonLineUser, {method: 'get', headers: JSONS});
}
export function getUserByID (data) {
  let url = getParmas( api.getUserByID, data);
  return request(url, {method: 'get', headers: JSONS});
}
