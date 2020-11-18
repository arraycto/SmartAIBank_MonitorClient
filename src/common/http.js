/**
 * http适配器，http通讯
 * 该模块作为适配器的一个模块，支持Windows、Linux、Mac系统
 * @module mobile/http
 * @author litianye
 * @version 1.0.0
 */
import base from '@/common/base'
var axios = require('axios')
var clientConfig = window.DCSpace.sysConfig
var serverList = window.DCSpace.sysConfig
var Vue = null
var token = null
var context = require.context('../', true, /\.json$/)
// 添加响应拦截器，用于拦截响应
axios.interceptors.response.use(function (response) {
  if (response.headers && response.headers.token) {
    Vue.$store.commit('setHttpToken', response.headers.token)
    token = response.headers.token
    reGetToken(clientConfig.tokenOvertime)
  }
  return response
}, function (error) {
  // Vue.$store.commit('setErrorMsg', error.message)
  // Vue.$router.push('error')
  return Promise.reject(error)
})
axios.interceptors.request.use(

  config => {
    if (config.headers.token) {
      return config
    } else if (token !== '') {
      config.headers.token = token || sessionStorage.httpToken
      return config
    } else {
      if (!clientConfig.useDummy) {
        Vue.$message({
          message: 'token失效，请重新登录',
          type: 'error'
        })
        location.reload()
      }
    }
  },
  err => {
    return Promise.reject(err)
  })

function init (vueModule) {
  Vue = vueModule
}

/**
 * token过期重新获取token
 * @private
 * @param {Number} overtime 超时时间，单位是毫秒
 */
function reGetToken (overtime) {
  setTimeout(() => {
    getTrend('getHttpToken', {}).then(() => {
    }).catch(function () {
      Vue.$message({
        message: 'token失效，请重新登录',
        type: 'error',
        duration: 10000
      })
      sessionStorage.clear()
      Vue.$router.push('login')
    })
  }, overtime)
}
const undefinedError = {
  code: 'request.undefined',
  message: '未知异常'
}

/**
 * 处理正确响应结果
 * @private
 * @param {Object} response 正确响应
 * @returns {Promise} Promise实例
 */
function success (response) {
  return Promise.resolve(response ? response.data : null)
}
/**
 * 处理失败响应结果
 * @private
 * @param {Object} err 异常响应
 * @returns {Promise} Promise实例
 */
function error (err) {
  if (err.response.data.code === 'authorized.token.expired') {
    Vue.$message({
      message: 'token失效，请重新登录',
      type: 'error'
    })
    sessionStorage.clear()
    location.reload()
  }
  if (err.response.data.code === 'authorized.account.locked') {
    return Promise.reject(err.response.data)
  }
  if (err.response.data.code === 'authorized.userpassword.incorrect') {
    return Promise.reject(err.response.data)
  }
  if (err.response.data.code === 'authorized.account.notfound') {
    return Promise.reject(err.response.data)
  }
  if (err.response.data.code || err.response.data.message) {
    return Promise.reject(err.response.data)
  } else {
    return Promise.reject(undefinedError)
  }
}

/**
 * @public
 * @alias module:selfservice/http.get
 * @param {String} url 请求的URL地址
 * @param {Object} params 请求的参数
 */
function get (type, params, options) {
  var urlObj = serverList.urlList[0][type]
  var url = urlObj.server
  if (clientConfig.useDummy) {
    url = urlObj.dummy
    var dummyData = context(url)
    return Promise.resolve(dummyData)
  } else {
    // 判断是否需要请求数据（机构未改变切换打开的看板不用请求数据,日月季年改变需要重新请求数据）
    if (base.isRequest(type + '_' + Vue.$route.name, type + '_' + Vue.$route.name + '_dataType')) {
      url = replaceUrlParams(url, params)
      return axios.get(url, {}, options).then(success, error)
    } else {
      return new Promise(function () { })
    }
  }
}
/**
 * 业务效率高频和耗时走势图请求，不拦截请求
 * @alias module:selfservice/http.getTrend
 * @param {String} url 请求的URL地址
 * @param {Object} params 请求的参数
 */
function getTrend (type, params, options) {
  var urlObj = serverList.urlList[0][type]
  var url = urlObj.server
  if (clientConfig.useDummy) {
    url = urlObj.dummy
    var dummyData = context(url)
    return Promise.resolve(dummyData)
  } else {
    url = replaceUrlParams(url, params)
    return axios.get(url, {}, options).then(success, error)
  }
}


/**
 * http的post请求
 * 会在请求中增加终端流水号及其他的通用报文头信息
 * @public
 * @alias module:selfservice/http.post
 * @param {String} url 请求的URL地址
 * @param {Object} data 请求的数据
 * @param {Object} options 请求参数
 * @param {Boolean} [options.mask=false] 是否开始遮罩层，true：在请求开始时开启遮罩，收到响应时关闭遮罩。默认为false
 */
function post (type, data, options) {
  var urlObj = serverList.urlList[0][type]
  var url = urlObj.server
  // 转化格式使参数能被后台解析
  //   var params = new URLSearchParams()
  //   Object.keys(data).forEach(key => {
  //     params.append(key, data[key])
  //   })
  if (clientConfig.useDummy) {
    url = urlObj.dummy
    var dummyData = context(url)
    return Promise.resolve(dummyData)
  } else {
    return axios.post(url, data, options).then(success, error)
  }
}
/**
 * 替换url路径字段
 * @param {String} url 请求地址
 * @param {Object} params 请求参数对象
 */
function replaceUrlParams (url, params) {
  // 添加公共元素 branchStatsType
  params.branchStatsType = base.getStore({ 'key': 'operateBranchStatsType' })
  for (const key in params) {
    url = url.replace('{' + key + '}', params[key])
  }
  return url
}
export {
  init,
  post,
  get,
  getTrend
}
