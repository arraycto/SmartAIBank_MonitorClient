window.DCSpace = {}
window.DCSpace.sysConfig = {
  'useDummy': false,
  'serveUrl': 'http://127.0.0.1:8085/',
  'customThemeColor': '#258AFF',
  'socketUrl': {
    'monitorDevice': '/user/queue/monitor/device',
    'monitorTran': '/user/queue/monitor/tran',
    'monitorNetwork': '/user/queue/monitor/network',
    'monitorApp': '/user/queue/monitor/app',
    'alarmDevice': '/user/queue/alarm/device',
    'alarmTran': '/user/queue/alarm/tran',
    'alarmNetwork': '/user/queue/alarm/network',
    'alarmApp': '/user/queue/alarm/app'
  },
  'AUTH': {
    'FIRST_KEY': 'teller'
  },
  'surveySetTime': 60,
  'tokenOvertime': 10000,
  'refreshTime': 180000,
  'resourceMappingArray': {
    '0101': 'userManage',
    '0201': 'orgManage',
    '0301': 'roleManage',
    '0102': 'resrtPassword'
  },
  batchOrgList: ['08001']
}
