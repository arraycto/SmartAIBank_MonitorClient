import Vue from 'vue'
import Vuex from 'vuex'
import operateModule from './operateModule'
import monitorModule from './monitorModule'
import managerModule from './managerModule'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    sysArray: [],
    errorMsg: '',
    httpToken: '',// 请求的token信息
    userName: '',// 登录用户名字
    currSys: '',// 系统模块  智能运营（smartOperate） 智能监控（smartMonitor） 管理端（smartManager）
    orgId: '',
    loginUser: '',//用户中文名称
    sessionOrgId: '',
    userOrgId:''
  },
  getters: {},
  mutations: {
    setHttpToken(state, msg) {
      state.httpToken = msg
      sessionStorage.httpToken = msg
    },
    setUserName(state, name) {
      state.userName = name
      sessionStorage.userName = name
    },
    setLoginUser(state, msg) {
      state.loginUser = msg
      sessionStorage.loginUser = msg
    },
    setErrorMsg(state, msg) {
      state.errorMsg = msg
    },
    setCurrSys(state, data) {
      state.currSys = data
      sessionStorage.currSys = data
    },
    setSysArray(state, msg) {
      state.sysArray = msg
      sessionStorage.sysArray = msg
    },
    setOrgId(state, msg) {
      state.orgId = msg
      sessionStorage.orgId = msg
    },
    setSessionOrgId(state, msg) {
      state.sessionOrgId = msg
      sessionStorage.sessionOrgId = msg
    },
    setUserOrgId(state, msg) {
      state.userOrgId = msg
      sessionStorage.userOrgId = msg
    }
  },
  actions: {},
  modules: {
    operate: operateModule,
    manager: managerModule,
    monitor: monitorModule
  }
})
