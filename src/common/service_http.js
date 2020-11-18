import base from '@/common/base'
var axios = require('axios')
var clientConfig = window.DCSpace.sysConfig
var context = require.context('../', true, /\.json$/)
// 存放token
// var token = ''

var Vue = null

// 创建实例
const instance = axios.create({
  baseURL: clientConfig.serveUrl,
  timeout: 3000
})
// 默认异常信息
const undefinedError = {
  code: 'request.undefined',
  message: '未知异常'
}

// instance.defaults.headers.post['Content-type'] = 'application/json'
// instance.defaults.headers.put['Content-type'] = 'application/json'

instance.interceptors.request.use(
  config => {
    var token = sessionStorage.httpToken
    if (token !== '' && token !== undefined) {
      config.headers.token = token
      config.timeout = 600000
    } else {
      if (!clientConfig.useDummy) {
        Vue.$message({
          message: 'token失效，请重新登录',
          type: 'error'
        })
        location.reload()
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(function (response) {
  if (response.headers && response.headers.token) {
    Vue.$store.commit('setHttpToken', response.headers.token)
    reGetToken(clientConfig.tokenOvertime)
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
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
function getTrend (type, params, options) {
  var urlObj = clientConfig.urlList[0][type]
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
function replaceUrlParams (url, params) {
  // 添加公共元素 branchStatsType
  params.branchStatsType =  base.getStore({ 'key': 'operateBranchStatsType' })
  for (const key  in params) {
    url = url.replace('{' + key + '}', params[key])
  }
  return url
}

function success (response) {
  return response.data
  // return Promise.resolve(response.data)
}

function error (err) {
  if (err.response.data.code === 'authorized.token.expired') {
    Vue.$message({
      message: 'token失效，请重新登录',
      type: 'error'
    })
    sessionStorage.clear()
    location.reload()
  }
  if (err.response.data.code || err.response.data.msg) {
    return Promise.reject(err.response.data)
  } else {
    return Promise.reject(undefinedError)
  }
}

export default {
  init: function init (vueModule) {
    Vue = vueModule
  },
  /**
   * 发送GET请求
   * @param {String} url url
   * @param {Object} config 请求配置
   */
  get: async function get (url, config) {
    return instance.get(url, config).then(success, error)
  },

  /**
   * 发送POST请求
   * @param {String} url url
   * @param {Object} config 请求配置
   */
  post: async function post (url, config) {
    return instance.post(url, config).then(success, error)
  },

  /**
   * 发送PUT请求
   * @param {String} url url
   * @param {Object} config 请求配置
   */
  put: function put (url, config) {
    return instance.put(url, config).then(success, error)
  },

  /**
   * 发送DELETE请求
   * @param {String} url url
   * @param {Object} config 请求配置
   */
  delete: function del (url, config) {
    return instance.delete(url, config).then(success, error)
  },

  /**
   * 发送请求
   * @param {Object} config 请求配置
   * @param {String} config.url 请求URL
   * @param {String} [config.method=get] 请求方法，默认GET请求
   * @param {String} [config.baseURL] 基础URL
   * @param {Object} [config.headers] 请求头
   * @param {Object} [config.data] 发送PUT、POST、PATCH请求时的请求数据
   * @param {Integer} [config.timeout=0] 请求超时时间，默认不超时，单位：毫秒
   * @param {String} [config.responseType=json] 响应数据类型，默认JSON
   * @param {String} [config.responseEncoding=utf8] 响应数据编码格式
   * @param {Function} [config.validateStatus] 如果返回true则是promise.resolve,false则是promise.reject
   *                                           默认status >= 200 && status < 300
   */
  request: function request (config) {
    return instance.request(config).then(success, error)
  }
}
