
var VERSION = '1.0.0'
var conf = window.DCSpace.sysConfig
// 授权安全模块
var engine = getAuthSecurity()

/**
     * 加密字符串
     * @public
     * @alias module:module/authSecurity.encrypt
     * @param {String} src 明文字符串
     * @returns {String} 加密后密文
     */
function encrypt (src) {
  // 授权配置信息
  var authConfig = conf['AUTH']
  return engine.encrypt(src, authConfig)
}

/**
     * 解密字符串
     * @public
     * @alias module:module/authSecurity.decrypt
     * @param {String} src 密文
     * @returns {String} 解密后的明文
     */
function decrypt (src) {
  // 授权配置信息
  var authConfig = conf['AUTH']
  return engine.decrypt(src, authConfig)
}

/**
     * 获取实际的授权安全模块
     * @private
     * @returns {Object} 授权安全模块
     */
function getAuthSecurity () {
  // 获取实际授权安全模块名称
  return require('@/common/auth_teller.js')
}
export {
  VERSION,
  encrypt,
  decrypt
}

