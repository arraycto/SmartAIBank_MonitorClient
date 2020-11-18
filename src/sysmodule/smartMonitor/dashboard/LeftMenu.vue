<template>
<div style="background-color:#2F4156;height:100%">
  <el-col :span="24-colSpanWarnEquip" >
    <el-menu
      class="left-menu-height  menu-bg"
      :default-active="defaultActive"
      @select="handleSelect"
      background-color="#2F4156"
      text-color="#BFCBD9"
      active-text-color="#439AFF">
      <el-menu-item v-for="item in menus" :index="item.path" :key="item.path">
        <i :class="item.icon"></i>
        {{item.name}}
      </el-menu-item>
    </el-menu>
  </el-col>
  <el-col :span="colSpanWarnEquip" class="left-menu-warn">
    <!-- <div>
      <el-col :span="24" class="left-menu-height">
        <el-menu :default-active="active" @select="setUser"  background-color="#F0F4FB" text-color="#4A4A4A" active-text-color="#258AFF">
          <el-menu-item index="1">
              <span class="left-menu-span icon-dcfs dcfs-quanbuyujing">&nbsp;&nbsp;全部预警</span>
          </el-menu-item>
          <el-menu-item index="1-1" >
            <span slot="title" class="left-menu-item">未处理</span>
            <span v-show ="warnAmount>0?true:false" class="left-menu-amou">{{warnAmount}}</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <span slot="title" class="left-menu-item">处理中</span>
          </el-menu-item>
          <el-menu-item index="2">
              <span class="left-menu-span icon-dcfs dcfs-wochulide">&nbsp;&nbsp;我处理的</span>
          </el-menu-item>
          <el-menu-item index="2-1">
            <span slot="title"  class="left-menu-item">处理中</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <span slot="title"  class="left-menu-item">已报修</span>
          </el-menu-item>
          <el-menu-item index="2-3">
            <span slot="title"  class="left-menu-item">已挂起</span>
          </el-menu-item>
          <el-menu-item index="2-4">
            <span slot="title"  class="left-menu-item">已解除</span>
          </el-menu-item>
          </el-menu>
      </el-col>
    </div> -->
    <div>
      <el-col :span="24" class="left-menu-height">
        <el-menu :default-active="active" @select="setUser"  background-color="#F0F4FB" text-color="#4A4A4A" active-text-color="#258AFF">
          <el-menu-item :index="item.index" v-for="item in leftMenusDate" :key="item.index">
              <span slot="title" :class="item.class">&nbsp;{{item.desc}}</span>
              <span v-show ="item.value>0?true:false" class="left-menu-amou">{{item.value}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
  </el-col>
</div>
</template>
<script>
import menus from './menus'
import services from '../../../services'
import base from '@/common/base'
export default {
  data () {
    return {
      menus: [],
      leftMenusDate: [],
      warnMenusDate: [{
        index: '1',
        class: 'left-menu-span icon-dcfs dcfs-quanbuyujing',
        desc: '全部预警',
        value: 0
      }, {
        index: '1-1',
        class: 'left-menu-item',
        desc: '未处理',
        value: 0
      }, {
        index: '1-2',
        class: 'left-menu-item',
        desc: '处理中',
        value: 0
      }, {
        index: '2',
        class: 'left-menu-span icon-dcfs dcfs-wochulide',
        desc: '我处理的',
        value: 0
      }, {
        index: '2-1',
        class: 'left-menu-item',
        desc: '处理中',
        value: 0
      }, {
        index: '2-2',
        class: 'left-menu-item',
        desc: '已报修',
        value: 0
      }, {
        index: '2-3',
        class: 'left-menu-item',
        desc: '已挂起',
        value: 0
      }, {
        index: '2-4',
        class: 'left-menu-item',
        desc: '已解除',
        value: 0
      }],
      reportsData: [{
        index: 'reports-shebei',
        class: 'left-menu-amou-item',
        desc: '设备运行情况',
        value: 0
      }, {
        index: 'reports-waishe',
        class: 'left-menu-amou-item',
        desc: '外设故障情况',
        value: 0
      }, {
        index: 'reports-cuozhang',
        class: 'left-menu-amou-item',
        desc: '网点错账处理速度考核',
        value: 0
      }, {
        index: 'reports-guzhangchuli',
        class: 'left-menu-amou-item',
        desc: '故障处理速度考核',
        value: 0
      }, {
        index: 'reports-jiaoyi',
        class: 'left-menu-amou-item',
        desc: '交易质量统计',
        value: 0
      }, {
        index: 'reports-haocai',
        class: 'left-menu-amou-item',
        desc: '设备凭条耗材统计',
        value: 0
      }, {
        index: 'reports-corequtime',
        class: 'left-menu-amou-item',
        desc: '总行排队等待时长统计',
        value: 0
      }, {
        index: 'reports-waitingTime-branch',
        class: 'left-menu-amou-item',
        desc: '支行客户平均等候时间',
        value: 0
      }, {
        index: 'reports-client-flow',
        class: 'left-menu-amou-item',
        desc: '时段客户流量曲线',
        value: 0
      }, {
        index: 'reports-serviceTime',
        class: 'left-menu-amou-item',
        desc: '柜员服务客户时间统计',
        value: 0
      }, {
        index: 'reports-tradetime-ZH',
        class: 'left-menu-amou-item',
        desc: '总行视角交易时长报表',
        value: 0
      }, {
        index: 'reports-tradetime-leader',
        class: 'left-menu-amou-item',
        desc: '支行主管视角柜员交易时长',
        value: 0
      }, {
        index: 'reports-tradetime-counterclerk',
        class: 'left-menu-amou-item',
        desc: '支行柜员视角柜员交易时长',
        value: 0
      }, {
        index: 'reports-tradeTime-branch',
        class: 'left-menu-amou-item',
        desc: '支行网点视角交易时长数据',
        value: 0
      }, {
        index: 'reports-satisfaction-org',
        class: 'left-menu-amou-item',
        desc: '总行视角各机构满意度评价数据',
        value: 0
      }, {
        index: 'reports-satisfaction-teller',
        class: 'left-menu-amou-item',
        desc: '柜员满意度评价数据',
        value: 0
      }],
      defaultActive: '',
      active: '',
      monitorPath: '', // 监控路径
      warningPath: '', // 预警路劲
      historyPath: '', // 历史记录路劲
      colSpan: 4
    }
  },
  components: {
  },
  props: {
    colSpanWarnEquip: {
      type: Number,
      default: 12
    }
  },
  mounted () {
    this.queryNoAmount()
  },
  methods: {
    handleSelect (path) {
      var board = this.$store.state.monitor.board
      if (board === 'monitor') { // 保存监控对应的历史路径，以便于切换回监控看板定位到上次浏览的位置
        this.warnMenusDate[2].value = path
        this.monitorPath = path
      } else if (board === 'warning') { // 保存预警对应的历史路径，以便于切换回预警看板定位到上次浏览的位置
        this.warningPath = path
        if (path === 'warnDeviceHandleIndex') {
          this.$emit('colSpan', 6)
        } else {
          this.$emit('colSpan', 4)
        }
      } else if (board === 'history') { // 保存历史记录对应的历史路径，以便于切换回历史记录看板定位到上次浏览的位置
        this.historyPath = path
        if (path === 'StatisticalReports') {
          this.$emit('colSpan', 6)
        } else {
          this.$emit('colSpan', 4)
        }
      }
      this.$router.push(path)
    },
    setUser: function (index) {
      this.active = index
      if (this.$store.state.monitor.board === 'warning') {
        this.$store.commit('monitor/setWarnLeftIndex', index) // 保存预警设备运行对应的历史记录，以便于切换回历史记录看板定位到上次浏览的位置
      } else if (this.$store.state.monitor.board === 'history') {
        this.$store.commit('monitor/setReportsLeftIndex', index) // 保存历史记录报表对应的历史记录，以便于切换回历史记录看板定位到上次浏览的位置
      }
    },
    // 查询预警未处理数
    queryNoAmount: async function () {
      const obj = {
        queryType: 'sum',
        branchNo: base.getStore({ key: 'orgId' }), // 机构
        alarmParams: { // 查询参数
          pageNum: 1, // 当前页数
          pageSize: 10, // 每页大小
          alarmDealStatus: '1',
          branchNo: '', // 机构
          devType: '', // 设备类型
          devId: '', // 设备编号
          userId: base.getStore({ key: 'userName' }), // 用户id
          orderColumn: '' // 排序 默认降序
        }
      }
      try {
        const tableDate = await services.api.monitor.alarmDevice.getAlarmInfo(obj.alarmParams, obj.branchNo, obj.queryType)
        this.warnMenusDate[1].value = tableDate.total
      } catch (err) {
        if (err.message) {
          this.$message.error(err.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    }
  },
  watch: {
    '$store.state.monitor.warnAmount': function (value) {
      this.queryNoAmount()
    },
    '$store.state.monitor.board': function (value) {
      if (this.$store.state.monitor.interimBankLevel === 'entity') {
        this.$store.state.monitor.interimBankLevel = 'core'
        this.$store.state.monitor.interimBankId = ''
      }
      switch (value) {
      case 'home':// 首页
        this.$router.push('homeIndex')
        break
      case 'monitor':// 监控
        // 显示菜单列表为监控对应的菜单列表
        this.menus = menus.monitorMenus
        this.$nextTick(function () {
          if (this.monitorPath) { // 浏览过监控看板
            if (this.$store.state.monitor.boardDoor !== '') {
              if (this.$store.state.monitor.boardDoor === 'jiaoYi') { // 首页'交易'固定进入交易处理页面
                this.monitorPath = 'dealHandleIndex'
                this.defaultActive = 'dealHandleIndex'
              } else if (this.$store.state.monitor.boardDoor === 'busyDegree') {
                this.monitorPath = 'busyDegreeIndex'
                this.defaultActive = 'busyDegreeIndex'
              } else if (this.$store.state.monitor.boardDoor === 'serviceQuality') {
                this.monitorPath = 'serviceQualityIndex'
                this.defaultActive = 'serviceQualityIndex'
              } else if (this.$store.state.monitor.boardDoor === 'dealHandle') {
                this.monitorPath = 'dealHandleIndex'
                this.defaultActive = 'dealHandleIndex'
              } else {
                this.monitorPath = 'deviceStateIndex'
                this.defaultActive = 'deviceStateIndex'
              }
            } else {
              if (!sessionStorage.monitorOrgid || undefined === sessionStorage.monitorOrgid) {
                sessionStorage.monitorOrgid = sessionStorage.orgId
              }
              this.defaultActive = this.monitorPath
            }
          } else { // 首次进入监控看板默认选中第一个菜单
            if (this.$store.state.monitor.boardDoor !== '') {
              if (this.$store.state.monitor.boardDoor === 'jiaoYi') { // 首页'交易'固定进入交易处理页面
                this.monitorPath = 'dealHandleIndex'
                this.defaultActive = 'dealHandleIndex'
              } else if (this.$store.state.monitor.boardDoor === 'busyDegree') {
                this.monitorPath = 'busyDegreeIndex'
                this.defaultActive = 'busyDegreeIndex'
              } else if (this.$store.state.monitor.boardDoor === 'serviceQuality') {
                this.monitorPath = 'serviceQualityIndex'
                this.defaultActive = 'serviceQualityIndex'
              } else if (this.$store.state.monitor.boardDoor === 'dealHandle') {
                this.monitorPath = 'dealHandleIndex'
                this.defaultActive = 'dealHandleIndex'
              } else {
                this.monitorPath = 'deviceStateIndex'
                this.defaultActive = 'deviceStateIndex'
              }
            } else {
              if (!sessionStorage.monitorOrgid || undefined === sessionStorage.monitorOrgid) {
                sessionStorage.monitorOrgid = sessionStorage.orgId
              }
              this.defaultActive = this.menus[0].path
              this.monitorPath = this.menus[0].path
            }
          }
          this.$store.commit('monitor/setBoardDoor', '')
          this.$router.push(this.monitorPath)
        })

        break
      case 'warning':// 预警
        this.leftMenusDate = []
        this.leftMenusDate = this.warnMenusDate
        // 显示菜单列表为预警对应的菜单列表
        this.menus = menus.warningMenus
        if (this.warningPath) { // 浏览过预警看板
          if (this.$store.state.monitor.boardDoor !== '') { // 判断是否首页交易进入
            if (this.$store.state.monitor.boardDoor === 'gengDuo') { // 首页'更多'固定进入我处理的-处理中页面
              this.$emit('colSpan', 6)
              this.defaultActive = 'warnDeviceHandleIndex'
              this.warningPath = 'warnDeviceHandleIndex'
              this.active = '2-1'
              this.$store.commit('monitor/setWarnLeftIndex', '2-1')
            } else if (this.$store.state.monitor.boardDoor === 'sheBei') { // // 从首页设备处进入时默认进入设备页面
              this.$emit('colSpan', 6)
              this.defaultActive = 'warnDeviceHandleIndex'
              this.warningPath = 'warnDeviceHandleIndex'
              this.active = '1'
              this.$store.commit('monitor/setWarnLeftIndex', '1')
            } else {
              this.$emit('colSpan', 4)
              this.defaultActive = 'warnDealHandleIndex'
              this.warningPath = 'warnDealHandleIndex'
              // this.$store.commit('monitor/setWarnLeftIndex', '1')
            }
            this.$router.push(this.warningPath)
          } else {
            if (this.warningPath === 'warnDeviceHandleIndex') { // 判断是否设备运行
              this.$emit('colSpan', 6)
              this.active = this.$store.state.monitor.warnLeftIndex
            } else {
              this.$emit('colSpan', 4)
            }
            this.defaultActive = this.warningPath
            this.$router.push(this.warningPath)
          }
        } else { // 首次进入预警看板
          // 默认选中第一个菜单
          if (this.$store.state.monitor.boardDoor === 'jiaoYi') {
            // 从首页交易处进入默认进入交易处理页面
            this.$emit('colSpan', 4)
            this.defaultActive = 'warnDealHandleIndex'
            this.warningPath = 'warnDealHandleIndex'
          } else {
            this.defaultActive = this.menus[0].path
            this.warningPath = this.menus[0].path
          }
          // 首次进入从首页看板更多进入的直接跳转至我处理的 处理中页面
          if (this.$store.state.monitor.boardDoor === 'gengDuo') {
            this.active = '2-1'
            this.$store.commit('monitor/setWarnLeftIndex', '2-1')
          } else {
            this.active = '1'
            this.$store.commit('monitor/setWarnLeftIndex', '1')
          }
        }
        this.$store.commit('monitor/setBoardDoor', '')
        this.$router.push(this.warningPath)
        break
      case 'history':// 历史记录
        this.leftMenusDate = []
        this.leftMenusDate = this.reportsData
        // 显示菜单列表为历史记录对应的菜单列表
        this.menus = menus.historyMenus
        if (this.historyPath) { // 浏览过历史记录看板
          if (this.historyPath === 'StatisticalReports') {
            this.$emit('colSpan', 6)
            this.active = this.$store.state.monitor.reportsLeftIndex
          }
          this.defaultActive = this.historyPath
        } else { // 首次进入历史记录看板
          // 默认选中第一个菜单
          this.defaultActive = this.menus[0].path
          this.historyPath = this.menus[0].path
          this.active = this.reportsData[0].index
          this.$store.state.monitor.reportsLeftIndex = this.reportsData[0].index
        }
        this.$router.push(this.historyPath)
        break
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .top-bank-title{
    color:white;
  }
  .el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: transparent;
  }
  .el-submenu__title:focus,.el-submenu__title:hover {
    background-color: transparent;
  }
  .left-menu-height{
    height: 100%;
 }
  .left-menu-warn{
    background-color:#F0F4FB;
    height:100%;
    border-right: 1px solid #C0CDE3;
    .left-menu-height{
      height: 100%;
      .el-menu-item:focus, .el-menu-item:hover {
        outline: 0;
        color: #258AFF !important;
        background-color: #E2EEFD!important;
      }
      .left-menu-item{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        letter-spacing: 0;
      }
      .left-menu-span{
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        letter-spacing: 0;
      }
    }
  }
 .left-menu-amou-item{
    margin-left: -10px;
 }
  .left-menu-amou{
  float:right;
  line-height:1.2rem;
  margin-top:1.1rem;
  margin-right:0.4rem;
  background: #D0021B;
  width:1.5rem;
  color:#FFFFFF;
  border-radius: 0.6rem;
  text-align:center;
}
</style>
