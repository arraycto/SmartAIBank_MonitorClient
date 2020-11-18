
import smartOperateDashboard from '../sysmodule/smartOperate/dashboard/index.vue'

export default{
  'path': '/smartOperate',
  'name': 'smartOperate',
  'component': smartOperateDashboard,
  'children': [
    {
      'path': '/branch_survey',
      'component': () => import('@/sysmodule/smartOperate/branchBank/survey.vue'),
      'name': 'branch_survey',
      'meta': { 'title': '分行概况', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/branch_serviceQuality',
      'component': () => import('@/sysmodule/smartOperate/branchBank/serviceQuality.vue'),
      'name': 'branch_serviceQuality',
      'meta': { 'title': '分行服务质量', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/branch_queue',
      'component': () => import('@/sysmodule/smartOperate/branchBank/queue.vue'),
      'name': 'branch_queue',
      'meta': { 'title': '分行排队', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/branch_busiEfficiency',
      'component': () => import('@/sysmodule/smartOperate/branchBank/busiEfficiency.vue'),
      'name': 'branch_busiEfficiency',
      'meta': { 'title': '分行业务效率', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/branch_hallMarket',
      'component': () => import('@/sysmodule/smartOperate/branchBank/hallMarket.vue'),
      'name': 'branch_hallMarket',
      'meta': { 'title': '分行厅堂营销', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/branch_custflow',
      'component': () => import('@/sysmodule/smartOperate/branchBank/custflow.vue'),
      'name': 'branch_custflow',
      'meta': { 'title': '分行客流', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/core_survey',
      'component': () => import('@/sysmodule/smartOperate/coreBank/survey.vue'),
      'name': 'core_survey',
      'meta': { 'title': '总行概况', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/core_serviceQuality',
      'component': () => import('@/sysmodule/smartOperate/coreBank/serviceQuality.vue'),
      'name': 'core_serviceQuality',
      'meta': { 'title': '总行服务质量', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/core_queue',
      'component': () => import('@/sysmodule/smartOperate/coreBank/queue.vue'),
      'name': 'core_queue',
      'meta': { 'title': '总行排队', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/core_busiEfficiency',
      'component': () => import('@/sysmodule/smartOperate/coreBank/busiEfficiency.vue'),
      'name': 'core_busiEfficiency',
      'meta': { 'title': '总行业务效率', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/core_hallMarket',
      'component': () => import('@/sysmodule/smartOperate/coreBank/hallMarket.vue'),
      'name': 'core_hallMarket',
      'meta': { 'title': '总行厅堂营销', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/core_custflow',
      'component': () => import('@/sysmodule/smartOperate/coreBank/custflow.vue'),
      'name': 'core_custflow',
      'meta': { 'title': '总行客流', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/entity_survey',
      'component': () => import('@/sysmodule/smartOperate/entityBank/survey.vue'),
      'name': 'entity_survey',
      'meta': { 'title': '支行概况', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/entity_serviceQuality',
      'component': () => import('@/sysmodule/smartOperate/entityBank/serviceQuality.vue'),
      'name': 'entity_serviceQuality',
      'meta': { 'title': '支行服务质量', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/entity_queue',
      'component': () => import('@/sysmodule/smartOperate/entityBank/queue.vue'),
      'name': 'entity_queue',
      'meta': { 'title': '支行排队', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/entity_busiEfficiency',
      'component': () => import('@/sysmodule/smartOperate/entityBank/busiEfficiency.vue'),
      'name': 'entity_busiEfficiency',
      'meta': { 'title': '支行业务效率', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/entity_hallMarket',
      'component': () => import('@/sysmodule/smartOperate/entityBank/hallMarket.vue'),
      'name': 'entity_hallMarket',
      'meta': { 'title': '支行厅堂营销', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/entity_custflow',
      'component': () => import('@/sysmodule/smartOperate/entityBank/custflow.vue'),
      'name': 'entity_custflow',
      'meta': { 'title': '支行客流', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/entity_custMovingLine',
      'component': () => import('@/sysmodule/smartOperate/entityBank/custMovingLine.vue'),
      'name': 'entity_custMovingLine',
      'meta': { 'title': '支行客户动线', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/entity_bankteller',
      'component': () => import('@/sysmodule/smartOperate/entityBank/bankTellerStatistics.vue'),
      'name': 'entity_bankteller',
      'meta': { 'title': '支行柜员视角', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/entity_tellerDetails',
      'component': () => import('@/sysmodule/smartOperate/entityBank/bankTellerDetails.vue'),
      'name': 'entity_tellerDetails',
      'meta': { 'title': '支行柜员详情', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/entity_tellerHallMarket',
      'component': () => import('@/sysmodule/smartOperate/entityBank/tellerHallMarket.vue'),
      'name': 'entity_tellerHallMarket',
      'meta': { 'title': '支行大堂经理厅堂营销', 'icon': 'dashboard', 'noCache': true }
    }
  ]
}
