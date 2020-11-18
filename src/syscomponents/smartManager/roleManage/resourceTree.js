const defaultResource = [{
  'id': 'queuedashboard',
  'parent': 'smartOperation',
  'name': '排队看板',
  'operationMode': [{
    id: 'add',
    name: '新增'
  }, { id: 'mod', name: '修改' }, { id: 'del', name: '删除' }]
},
{
  'id': 'smartOperation',
  'name': '智能运营',
  'operationMode': [{ id: 'add', name: '新增' }, { id: 'mod', name: '修改' }, { id: 'del', name: '删除' }]
},
{
  'id': '0101',
  'parent': 'YHGL',
  'name': '用户信息维护',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': '0201',
  'parent': 'JGGL',
  'name': '机构信息维护',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': '0301',
  'parent': 'QXGL',
  'name': '角色信息维护',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': '0703',
  'parent': 'YHGL',
  'name': '密码重置',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': '0803',
  'parent': 'DEVMANG',
  'name': '终端外设绑定信息维护',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': '30201',
  'parent': 'DEVMANG',
  'name': '终端机具管理',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': '30303',
  'parent': 'JGGL',
  'name': '网点布局参数维护',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'DEVMANG',
  'parent': 'publicArguManage',
  'name': '终端管理',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'JGGL',
  'parent': 'publicArguManage',
  'name': '机构管理',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'Q101',
  'parent': 'queueManage',
  'name': '队列管理',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'Q103',
  'parent': 'queueManage',
  'name': '排队策略管理',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'Q104',
  'parent': 'queueManage',
  'name': '号票信息维护',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'Q110',
  'parent': 'queueManage',
  'name': '工作日期类型维护',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'Q120',
  'parent': 'queueManage',
  'name': '预约参数维护',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'Q121',
  'parent': 'queueManage',
  'name': '大额取现预约确认',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'Q122',
  'parent': 'queueManage',
  'name': '机构队列管理',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'Q132',
  'parent': 'queueManage',
  'name': '网点营业信息维护',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'Q312',
  'parent': 'queueManage',
  'name': '客户语言管理',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'QR01',
  'parent': 'queueManage',
  'name': '报表信息查询',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'QXGL',
  'parent': 'publicArguManage',
  'name': '权限管理',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'YHGL',
  'parent': 'publicArguManage',
  'name': '用户管理',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'operatorManagerStage',
  'name': '网点管理系统',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'publicArguManage',
  'parent': 'operatorManagerStage',
  'name': '公共参数管理',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'queueManage',
  'parent': 'operatorManagerStage',
  'name': '排队参数管理',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'T00003',
  'parent': 'TS02',
  'name': '余额及明细查询',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'TS01',
  'parent': 'selfService',
  'name': '账户管理',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'TS02',
  'parent': 'selfService',
  'name': '查询转账',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'TS03',
  'parent': 'selfService',
  'name': '签约管理',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'TS04',
  'parent': 'selfService',
  'name': '其他业务',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'receipt',
  'name': '回单业务',
  'operationMode': [{ id: 'add', name: '新增' }]
},
{
  'id': 'selfService',
  'name': '自助业务',
  'operationMode': [{ id: 'add', name: '新增' }]
}
]


/**
 * 获取最后一个交易对应的操作方式信息
 * @param {最后一个交易的id} id
 * @param {操作方式 add,mod,del,que } operationMode
 */
const jurisdiction = function (id, operationMode) {
  if (!operationMode) {
    return []
  }
  const mode = operationMode // .split(',') // 获取操作方式的数组  新增 修改 删除 查看
  const jur = [] // 操作方式数组
  if (mode.length > 0) {
    mode.map((item) => {
      jur.push({
        'id': id + '-' + item.id,
        'name': item.name,
        'operationModeType': 'operationMode', // 用来判断是否是操作方式数组
        'parent': id
      })
    })
  }
  return JSON.parse(JSON.stringify(jur))
}
/**
   * 资源树重新组合(左边资源树)
   * @param {*} resourceList 资源数原始列表
   */
const combination = function (resourceList) {
  resourceList = resourceList || defaultResource
  resourceList = JSON.parse(JSON.stringify(resourceList))
  // 将机构按照机构父级分类
  var classifyRes = {}
  var resources = []
  resourceList.map((item, index) => {
    if (classifyRes[item.parent]) {
      classifyRes[item.parent].push(Object.assign(item, { children: [] }))
    } else {
      classifyRes[item.parent] = []
      classifyRes[item.parent].push(Object.assign(item, { children: [] }))
    }
  })
  resources = classifyRes.undefined // 没有父级的资源树（总资源树）
  if (!resources || resources.length === 0) {
    return []
  }
  //   console.log(resources)
  // 循环父资源，插入对应的子集机构
  resources.map((item, index) => { // 往一级资源添加对应的子资源
    resources[index].children = classifyRes[item.id] || jurisdiction(item.id, item.operationMode)
    resources[index].children.map((item1, index1) => { // 往二级资源添加对应的子资源
      if (!item1.operationModeType) { // 如果是权限数组就没有子资源了
        resources[index].children[index1].children = classifyRes[item1.id] || jurisdiction(item1.id, item1.operationMode)
        resources[index].children[index1].children.map((item2, index2) => { // 往三级资源添加子资源
          if (!item2.operationModeType) { // 如果是权限数组就没有子资源了
            resources[index].children[index1].children[index2].children = classifyRes[item2.id] || jurisdiction(item2.id, item2.operationMode)
            resources[index].children[index1].children[index2].children.map((item3, index3) => { // 往四级资源添加子资源
              if (!item3.operationModeType) { // 如果是权限数组就没有子资源了
                resources[index].children[index1].children[index2].children[index3].children = classifyRes[item3.id] || jurisdiction(item3.id, item3.operationMode)
              }
            })
          }
        })
      }
    })
  })

  return resources
}
/**
   * 重新组合可访问资源树 （移除操作方式的数组，重新添加 operationMode 字段的权限的数组）
   * @param {可访问资源树列表} resourceList
   */
const usableCombination = function (resourceList) {
  resourceList = JSON.parse(JSON.stringify(resourceList))
  var classifyRes = {} // 储存资源列表对象
  var operationMode = {} // 储存可权限的对象
  var resources = []
  resourceList.map((item, index) => {
    if (item.operationModeType === 'operationMode') { // 可操作方式（按照对应的资源保存对应的权限）
      const modeNmod = item.id.substring(item.id.indexOf('-') + 1, item.id.length)
      const operationJson = {
        id: modeNmod,
        name: item.name
      }
      if (operationMode[item.parent]) {
        operationMode[item.parent].push(operationJson)
      } else {
        operationMode[item.parent] = []
        operationMode[item.parent].push(operationJson)
      }
    } else { // 资源数据（按照父级分类资源）
      if (classifyRes[item.parent]) {
        classifyRes[item.parent].push(Object.assign(item, { children: [] }))
      } else {
        classifyRes[item.parent] = []
        classifyRes[item.parent].push(Object.assign(item, { children: [] }))
      }
    }
  })
  // 把资源放到列表中（移除了权限列表）
  for (var key in classifyRes) {
    resources = resources.concat(classifyRes[key])
  }
  // 重新给资源赋值对应的权限
  resources.map((item, index) => {
    if (operationMode[item.id]) {
      resources[index].operationMode = operationMode[item.id]
    }
  })
  return resources
}


export default {
  defaultResource,
  combination,
  usableCombination
}
