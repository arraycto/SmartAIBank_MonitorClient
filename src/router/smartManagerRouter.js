
import smartManagerDashboard from '../sysmodule/smartManager/dashboard/index.vue'

export default{
  'path': '/smartManager',
  'name': 'smartManager',
  'component': smartManagerDashboard,
  'meta': { 'title': '我的首页', 'icon': 'dashboard', 'noCache': true },
  'children': [
    {
      'path': '/orgManage',
      'component': () => import('@/sysmodule/smartManager/publicArguManage/orgManage/orgManage.vue'),
      'name': 'orgManage',
      'meta': { 'title': '机构信息维护', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/roleManage',
      'component': () => import('@/sysmodule/smartManager/publicArguManage/authorityManage/roleManage/roleManage.vue'),
      'name': 'roleManage',
      'meta': { 'title': '角色信息维护', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/userManage',
      'component': () => import('@/sysmodule/smartManager/publicArguManage/userManager/userManager.vue'),
      'name': 'userManage',
      'meta': { 'title': '用户信息维护', 'icon': 'dashboard', 'noCache': true }
    },
    {
      'path': '/resrtPassword',
      'component': () => import('@/sysmodule/smartManager/publicArguManage/userManager/resrtPassword.vue'),
      'name': 'resrtPassword',
      'meta': { 'title': '密码重置', 'icon': 'dashboard', 'noCache': true }
    }
  ]
}
