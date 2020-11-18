
import HashMap from './hashmap.js'
import echarts from 'echarts'
import base from '@/common/base'
var map = new HashMap()
var $ = require('jquery')
var self = null
var resizeTime = null

function init (vue) {
  self = vue
}

/**
 * 时间处理
 * @param {dateArr} 需要处理的时间列表
 * @returns {Array} 处理后的数据
 */
function timerShaft (dateArr) {
  if (!(dateArr instanceof Array)) return dateArr
  var timeRange = self.$store.state.operate.timeRange
  var xData = []
  var xValue = ''
  switch (timeRange) {
  case 'day':
    dateArr.map((value) => {
      value = value + ''
      if (value.length >= 8) {
        var xValue = value.substring(6, 8)
      }
      xData.push(parseInt(xValue) + '号')
    })
    break
  case 'month':
    dateArr.map((value) => {
      value = value + ''
      if (value.length >= 6) {
        xValue = value.substring(4, 6)
      }
      xData.push(parseInt(xValue) + '月')
    })
    break
  case 'quarter':

    dateArr.map((value) => {
      value = value + ''
      if (value.length >= 6) {
        xValue = value.substring(4, 6)
      }
      if (parseInt(xValue) > 0 && parseInt(xValue) < 4) {
        xData.push('第1季度')
      } else if (parseInt(xValue) > 3 && parseInt(xValue) < 7) {
        xData.push('第2季度')
      } else if (parseInt(xValue) > 6 && parseInt(xValue) < 9) {
        xData.push('第3季度')
      } else {
        xData.push('第4季度')
      }
    })
    break
  case 'year':
    dateArr.map((value) => {
      value = value + ''
      if (value.length >= 4) {
        xValue = value.substring(0, 4)
      }
      xData.push(parseInt(xValue) + '年')
    })
    break
  }
  return xData.length === 0 ? dateArr : xData
}
/**
 * 排名组件X坐标点击事件处理
 * @param {branchArr} 需要处理的银行名
 * @param {value} 点击的X坐标
 * @param {branchType}银行ID代表字段
 * @returns {branchNo} 处理后的银行ID
 */
function rankingChartsClickEvent (value) {
  const branchArr = getStore({ 'key': 'operate' }).menus
  //  const currOrgId = self.$store.state.orgId
  const currOrgId = base.getStore({ key: 'orgId' })
  let branchNo = null
  let bankLevelId = null
  let branchStatsType = ''
  for (var index = 0; index < branchArr.length; index++) {
    var branchName = branchArr[index].ORGNAME_CN
    if (branchName === value && currOrgId === branchArr[index].PARENTORGID) {
      branchNo = branchArr[index].ORGID
      bankLevelId = branchArr[index].ORGLEVELID
      branchStatsType = branchArr[index].BRANCH_STATYS_TYPE || '0'
      break
    }
  }
  if (branchNo != null) {
    if (bankLevelId === '2' || bankLevelId === '3') {
      self.$router.push('branch_survey')
      self.$store.commit('operate/setbankLevel', 'branch')
    } else if (bankLevelId === '4') {
      self.$router.push('entity_survey')
      self.$store.commit('operate/setbankLevel', 'entity')
    } else {
      return false
    }
    // self.$store.commit('operate/setOrgId', branchNo)
    self.$store.commit('setOrgId', branchNo)
    self.$store.commit('operate/setBranchStatusType', branchStatsType)
  } else {
    return false
  }
  return true
}
/**
 * 根据行号找行名
 * @param {menu} 菜单数组
 * @param {orgid} 银行ID
 * @returns {branchName} 银行名称
 */
function findNameFromOrgid (menu, orgid) {
  let branchName = ''
  for (var index = 0; index < menu.length; index++) {
    if (menu[index].ORGID === orgid) {
      branchName = menu[index].ORGNAME_CN
      break
    }
  }
  return branchName
}
/**
 * 判断当前组件是否处于当前路由（组件是否处于可见状态）
 * @param {String} mRouter
 * @returns {boolean}
 */
function isActivity (mRouter) {
  var routeName = self.$route.name
  if (routeName === mRouter) {
    return true
  }
  return false
}

/**
 * 判断是否需要请求数据 （机构未改变切换打开的看板不用请求数据）
 * @param {String} key 请求组url名称
 * @returns {boolean}
 */
function isRequest (orgKey, dateTypeKey) {
  var oldOrgId = map.get(orgKey)// 上次请求的orgiD
  var oldDateType = map.get(dateTypeKey)// 上次请求的时间类型
  var currOrgId = self.$store.state.operate.orgId// 当前的orgid
  var currDateType = self.$store.state.operate.timeRange// 当前时间类型
  var currStatusType = getStore({ 'key': 'operateBranchStatsType' })
  // 判断上次请求跟本次请求的日月季年类型是否一样
  if (oldDateType == null || oldDateType !== currDateType) {
    map.set(dateTypeKey, currDateType)
  }
  // 判断上次请求的orgId跟本次请求的是否一致，一致就不发请求
  if (oldOrgId && oldOrgId === currOrgId) {
    // 如果日月季年类型发生改变就要请求
    if (oldDateType === currDateType && currStatusType !== '1' && currStatusType !== '2') {
      return false
    } else {
      return true
    }
  } else {
    map.set(orgKey, currOrgId)
    return true
  }
}
/**
 * 清除map对象
 */
function clearMap () {
  map.clear()
}

/**
 * 重新调整Echart大小
 */
var resizeEcharts = () => {
  if (resizeTime) clearTimeout(resizeTime)
  resizeTime = setTimeout(() => {
    $('[_echarts_instance_]').each((i, e) => {
      echarts.getInstanceByDom(e).resize()
    })
  }, 200)
}
/**
   * 获取vuex数据
   * @public
   * @alias module:module/base.getStore
   * @param {String} key 存储的键值
   * @return {any} 存储的内容
   */
function getStore (obj) {
  if (sessionStorage.board && sessionStorage.board == 'monitor' && obj.key === 'orgId') {
    if (sessionStorage['monitorOrgid']) {
      return sessionStorage['monitorOrgid']
    } else {
      return sessionStorage['orgId']
    }
  } else if (self && self.$store.state[obj.key]) {
    return self.$store.state[obj.key]
  } else if (sessionStorage[obj.key]) {
    if (obj.key === 'monitorUnderOrg' || obj.key === 'sysArray') {
      return JSON.parse(sessionStorage[obj.key])
    } else {
      return sessionStorage[obj.key]
    }
  } else {
    console.info('Vuex数据不存在')
  }
}

export default {
  findNameFromOrgid,
  rankingChartsClickEvent,
  timerShaft,
  isActivity,
  isRequest,
  clearMap,
  init,
  resizeEcharts,
  getStore
}
