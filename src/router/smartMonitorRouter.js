
export default{
  'path': '/smartMonitor',
  'name': 'smartMonitor',
  'component': () => import('@/sysmodule/smartMonitor/dashboard/index.vue'),
  'children': [
    {
      'path': '/homeIndex',
      'component': () => import('@/sysmodule/smartMonitor/home/index.vue'),
      'name': 'homeIndex',
      'meta': { 'title': '首页', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/busyDegreeIndex',
      'component': () => import('@/sysmodule/smartMonitor/monitor/busyDegree/index.vue'),
      'name': 'busyDegreeIndex',
      'meta': { 'title': '监控繁忙度', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/serviceQualityIndex',
      'component': () => import('@/sysmodule/smartMonitor/monitor/serviceQuality/index.vue'),
      'name': 'serviceQualityIndex',
      'meta': { 'title': '监控服务质量', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/deviceStateIndex',
      'component': () => import('@/sysmodule/smartMonitor/monitor/deviceState/index.vue'),
      'name': 'deviceStateIndex',
      'meta': { 'title': '监控设备状态', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/dealHandleIndex',
      'component': () => import('@/sysmodule/smartMonitor/monitor/dealHandle/index.vue'),
      'name': 'dealHandleIndex',
      'meta': { 'title': '监控交易处理', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/warnDealHandleIndex',
      'component': () => import('@/sysmodule/smartMonitor/warning/dealHandle/index.vue'),
      'name': 'warnDealHandleIndex',
      'meta': { 'title': '预警设备运行', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/warnDeviceHandleIndex',
      'component': () => import('@/sysmodule/smartMonitor/warning/deviceHandle/index.vue'),
      'name': 'warnDeviceHandleIndex',
      'meta': { 'title': '预警交易处理', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/historyTransQuery',
      'component': () => import('@/sysmodule/smartMonitor/history/historyTransQuery.vue'),
      'name': 'historyTransQuery',
      'meta': { 'title': '历史交易查询', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/transReconciliyRecord',
      'component': () => import('@/sysmodule/smartMonitor/history/transReconciliyRecord.vue'),
      'name': 'transReconciliyRecord',
      'meta': { 'title': '交易对账记录', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/StatisticalReports',
      'component': () => import('@/sysmodule/smartMonitor/history/StatisticalReports.vue'),
      'name': 'StatisticalReports',
      'meta': { 'title': '统计报表', 'icon': 'dashboard', 'noCache': true }
    }
  ]
}
