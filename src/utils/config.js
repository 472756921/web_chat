const api_M = 'http://localhost:3000'
const api_MSS = 'ws://localhost:8181'

module.exports = {
  name: '在线聊天系统',
  footerText: ' System © 2018 Benson',
  logo: '',
  openPages: ['/login', '/404'],
  api: {
    getUser: api_M + '/users/getUser',
    login: api_M + '/users/login',
    loginOut: api_M + '/users/loginOut',
  }
}
