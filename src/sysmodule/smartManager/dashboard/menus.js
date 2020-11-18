const defMenus = [
  {
    'resourceId': 'smartManager',
    'resourceName': '我的首页'
  },
  {
    'resourceId': 'publicArguManage',
    'resourceName': '公共参数管理'
  },
  {
    'resourceId': 'mobileManage',
    'resourceName': '排队参数管理'
  },
  {
    'resourceId': 'monitoringManage',
    'resourceName': '监控参数管理'
  },
  {
    'resourceId': 'mobileQueueManage',
    'resourceName': '移动厅堂/户外参数管理'
  },
  {
    'resourceId': 'selfHelpManage',
    'resourceName': '自助终端管理'
  },
  {
    'resourceId': 'YHGL',
    'parent': 'publicArguManage',
    'resourceName': '用户管理'
  },
  {
    'resourceId': 'QXGL',
    'parent': 'publicArguManage',
    'resourceName': '权限管理'
  },
  {
    'resourceId': 'JGGL',
    'parent': 'publicArguManage',
    'resourceName': '机构管理'
  },
  {
    'resourceId': 'DEVMANG',
    'parent': 'publicArguManage',
    'resourceName': '终端管理'
  },
  {
    'resourceId': '0101',
    'parent': 'YHGL',
    'resourceName': '用户信息维护'
  },
  {
    'resourceId': '0102',
    'parent': 'YHGL',
    'resourceName': '密码重置'
  },
  {
    'resourceId': '0301',
    'parent': 'QXGL',
    'resourceName': '角色信息维护'
  },
  {
    'resourceId': 'T001',
    'parent': 'QXGL',
    'resourceName': '版本上传及发布'
  },
  {
    'resourceId': 'T002',
    'parent': 'QXGL',
    'resourceName': '设备端版本查询'
  },
  {
    'resourceId': '0201',
    'parent': 'JGGL',
    'resourceName': '机构信息维护'
  }
]
/**
 * 给一级资源设置对应的icon图片
 * @param {资源列表} menus
 * @param {下标} index
 * @param {资源id} resourceId
 */
const setMenuIcon = function (menus, index, resourceId) {
  switch (resourceId) {
  case 'smartManager':// 我的首页
    menus[index]['icon'] = 'icon-dcfs dcfs-home-fill'
    break
  case 'publicArguManage':// 公共参数管理
    menus[index]['icon'] = 'icon-dcfs dcfs-common-parameter'
    break
  case 'mobileManage':// 排队参数管理
    menus[index]['icon'] = 'icon-dcfs dcfs-line-up'
    break
  case 'monitoringManage':// 监控参数管理
    menus[index]['icon'] = 'icon-dcfs dcfs-monitoring'
    break
  case 'mobileQueueManage':// 移动厅堂/户外参数管理
    menus[index]['icon'] = 'icon-dcfs dcfs-mobile'
    break
  case 'selfHelpManage':// 自助终端管理
    menus[index]['icon'] = 'icon-dcfs dcfs-self-help'
    break
  }
}

const combination = function (menusList) {
  menusList = menusList || defMenus
  menusList = JSON.parse(JSON.stringify(menusList))
  // 将机构按照机构父级分类
  var classifyRes = {}
  var menus = []
  menusList.map(item => {
    if (classifyRes[item.parent]) {
      classifyRes[item.parent].push(Object.assign(item, { children: [] }))
    } else {
      classifyRes[item.parent] = []
      classifyRes[item.parent].push(Object.assign(item, { children: [] }))
    }
  })
  menus = classifyRes.undefined// 没有父级的资源树（总资源树）
  if (!menus || menus.length === 0) {
    return []
  }
  // 循环父资源，插入对应的子集机构
  menus.map((item, index) => { // 往一级资源添加对应的子资源
    setMenuIcon(menus, index, item.resourceId)
    menus[index].children = classifyRes[item.resourceId] || []
    menus[index].children.map((item1, index1) => { // 往二级资源添加对应的子资源
      menus[index].children[index1].children = classifyRes[item1.resourceId] || []
      menus[index].children[index1].children.map((item2, index2) => { // 往三级资源添加子资源
        menus[index].children[index1].children[index2].children = classifyRes[item2.resourceId] || []
        menus[index].children[index1].children[index2].children.map((item3, index3) => { // 往四级资源添加子资源
          menus[index].children[index1].children[index2].children[index3].children = classifyRes[item3.resourceId] || []
        })
      })
    })
  })
  return menus
}

export default {
  combination
}
