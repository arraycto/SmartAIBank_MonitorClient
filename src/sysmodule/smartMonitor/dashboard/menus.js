// 监控菜单
const monitorMenus = [
  {
    icon: 'icon-dcfs dcfs-device-state',
    path: 'deviceStateIndex',
    name: '设备运行'
  },
  {
    icon: 'icon-dcfs dcfs-deal-handle',
    path: 'dealHandleIndex',
    name: '交易处理'
  },
  {
    icon: 'icon-dcfs dcfs-caidan-fanmangdu',
    path: 'busyDegreeIndex',
    name: '繁忙度'
  },
  {
    icon: 'icon-dcfs dcfs-caidan-fuwuzhiliang',
    path: 'serviceQualityIndex',
    name: '服务质量'
  }
]
// 预警菜单
const warningMenus = [
  {
    icon: 'icon-dcfs dcfs-device-state',
    path: 'warnDeviceHandleIndex',
    name: '设备运行'
  },
  {
    icon: 'icon-dcfs dcfs-deal-handle',
    path: 'warnDealHandleIndex',
    name: '交易处理'
  }
]
// 历史记录菜单
const historyMenus = [
  {
    icon: 'icon-dcfs dcfs-query',
    path: 'historyTransQuery',
    name: '历史交易查询'
  },
  {
    icon: 'icon-dcfs dcfs-jiaoyiduizhangjilu',
    path: 'transReconciliyRecord',
    name: '交易对账记录'
  },
  {
    icon: 'icon-dcfs dcfs-tongjibaobiao',
    path: 'StatisticalReports',
    name: '统计报表'
  }
]


export default {
  monitorMenus,
  warningMenus,
  historyMenus
}
