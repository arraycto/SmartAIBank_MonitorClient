/**
 * 菜单重新组合
 * ORGTYPEID: 1 营业机构  2财务机构 3管理机构 4报表机构 5营业管理机构 6管理机构部门
 */
const combination = function (menusList) {
  var levels = {}
  // 将机构按照机构登记分类
  menusList.map((item, index) => {
    if (levels[item.ORGLEVELID]) {
      levels[item.ORGLEVELID].push(item)
    } else {
      levels[item.ORGLEVELID] = []
      levels[item.ORGLEVELID].push(item)
    }
  })
  // 将分类的对象按照登记进行排序
  const keys = Object.keys(levels).sort()
  var newLevels = {}
  for (var i = 0; i < keys.length; i++) {
    newLevels[keys[i]] = levels[keys[i]]
  }
  var sorts = 0
  var menuList = []
  /**
   * 将登记分类的数据进行组装为子机构跟父机构一一对应 ；
   * 例：menus:[{
   *   orgid:111,
   *   level:1,
   *   meuns[{
   *      orgid:111,
   *      level:1,
   *      meuns[{
   *        .......
   *      }]
   *   }]
   *  }]
   */
  for (var key in newLevels) {
    // 第一级机构菜单
    if (sorts === 0) {
      newLevels[key].map((item, index) => {
        menuList.push(Object.assign(item, { menus: [] }))
      })
    }
    // 第二级机构菜单
    if (sorts === 1) {
      newLevels[key].map((item, index) => {
        menuList.map((item1, index1) => {
          if (item1.ORGID == item.PARENTORGID) {
            menuList[index1].menus.push(Object.assign(item, { menus: [] }))
          }
        })
      })
    }
    // 第三级级机构菜单
    if (sorts === 2) {
      newLevels[key].map((item, index) => {
        menuList.map((item1, index1) => {
          item1.menus.map((item2, index2) => {
            if (item2.ORGID == item.PARENTORGID) {
              menuList[index1].menus[index2].menus.push(Object.assign(item, { menus: [] }))
            }
          })
        })
      })
    }
    // 第四级级机构菜单
    if (sorts === 3) {
      newLevels[key].map((item, index) => {
        menuList.map((item1, index1) => {
          item1.menus.map((item2, index2) => {
            item2.menus.map((item3, index3) => {
              if (item3.ORGID == item.PARENTORGID) {
                menuList[index1].menus[index2].menus[index3].menus.push(Object.assign(item, { menus: [] }))
              }
            })
          })
        })
      })
    }
    sorts++
  }
  return menuList
}

export default {
  combination
}
