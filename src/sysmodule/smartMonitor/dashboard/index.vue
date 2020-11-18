<template>
<div class="index-main">


  <el-row class="index-header">
    <el-col :span="4">
      <div class="index-logo"></div>
      <div class="index-sysName">智能监控管理平台</div>
    </el-col>
    <el-col  :span="20" >
      <top-header></top-header>
    </el-col>
  </el-row>

  <el-row class="index-content">
    <el-col :span="colSpan" class="index-left menu-bg">
      <left-menu :colSpanWarnEquip="colSpanWarnEquip" @colSpan="getColSpan"></left-menu>
    </el-col>
   <el-col :push="colSpan" :span="24-colSpan" class="index-right">
     <el-row :span="24" class="index-right-content">
        <div>

            <router-view/>

        </div>
      </el-row>
   </el-col>
  </el-row>
</div>
</template>

<script>
import LeftMenu from './LeftMenu.vue'
import TopHeader from './TopHeader.vue'
import websocketClient from '@/common/websocketClient'
import services from '../../../services'
import base from '@/common/base'
export default {
  name: 'index',
  data: function () {
    return {
      colSpan: 0,
      colSpanWarnEquip: 12,
      amount: null,
      timer: null // 定时器名称
    }
  },
  components: {
    LeftMenu,
    TopHeader
  },
  mounted () {
    this.beforeDestroy()
    this.setTimer()
    var routerArray = [
      {
        'name': 'homeIndex', 'belong': 'home'
      },
      {
        'name': 'busyDegreeIndex', 'belong': 'monitor'
      },
      {
        'name': 'serviceQualityIndex', 'belong': 'monitor'
      },
      {
        'name': 'deviceStateIndex', 'belong': 'monitor'
      },
      {
        'name': 'dealHandleIndex', 'belong': 'monitor'
      },
      {
        'name': 'warnDeviceHandleIndex', 'belong': 'warning'
      },
      {
        'name': 'warnDealHandleIndex', 'belong': 'warning'
      },
      {
        'name': 'historyTransQuery', 'belong': 'history'
      },
      {
        'name': 'transReconciliyRecord', 'belong': 'history'
      },
      {
        'name': 'StatisticalReports', 'belong': 'history'
      }
    ]
    if (sessionStorage.currentPage == 'smartMonitor') {
      this.$router.push('homeIndex')
    }
    for (var i = 0; i < routerArray.length; i++) {
      if (routerArray[i].name == sessionStorage.currentPage) {
        this.$store.commit('monitor/updateBoard', routerArray[i].belong)
      }
    }
    base.init(this)
    this.timeOut()
    this.getwarn()
  },
  methods: {
    timeOut () {
      const self = this
      setTimeout(function () {
        self.websocket()
      }, 1000)
    },
    websocket () {
      const self = this
      websocketClient.subscribeToRoom('alarmDevice',  window.DCSpace.sysConfig.socketUrl.alarmDevice, function (msg) {
        self.getwarn()
      })
      websocketClient.subscribeToRoom('alarmTran',  window.DCSpace.sysConfig.socketUrl.alarmTran, function (msg) {
        self.getwarn()
      })
      websocketClient.subscribeToRoom('alarmNetwork',  window.DCSpace.sysConfig.socketUrl.alarmNetwork, function (msg) {
        self.getwarn()
      })
      websocketClient.subscribeToRoom('alarmApp',  window.DCSpace.sysConfig.socketUrl.alarmApp, function (msg) {
        self.getwarn()
      })
      websocketClient.subscribeToRoom('monitorDevice',  window.DCSpace.sysConfig.socketUrl.monitorDevice, function (msg) {
        self.getwarn()
      })
      websocketClient.subscribeToRoom('monitorTran',  window.DCSpace.sysConfig.socketUrl.monitorTran, function (msg) {
        self.getwarn()
      })
      websocketClient.subscribeToRoom('monitorNetwork',  window.DCSpace.sysConfig.socketUrl.monitorNetwork, function (msg) {
        self.getwarn()
      })
      websocketClient.subscribeToRoom('monitorApp',  window.DCSpace.sysConfig.socketUrl.monitorApp, function (msg) {
        self.getwarn()
      })
    },
    async getwarn () {
      try {
        const data = await services.api.monitor.alarmDevice.getAlarmDevCount(base.getStore({ key: 'orgId' }))
        this.$store.state.monitor.warnAmount = data
      } catch (error) {
        if (error.message) {
          this.$message.error(error.message)
        } else {
          this.$message.error('未知异常')
        }
      }
    },
    getColSpan (msg) {
      this.colSpan = msg
      if (msg === 4) {
        this.colSpanWarnEquip = 0
      } else {
        this.colSpanWarnEquip = 12
      }
    },
    // 定时任务
    setTimer: function () {
      this.timer = setInterval(() => {
        this.$store.state.monitor.refreshTime = this.$store.state.monitor.refreshTime + 1
      }, window.DCSpace.sysConfig.refreshTime)
    },
    // 销毁定时器
    beforeDestroy () {
      clearInterval(this.timer)
    }
  },
  watch: {
    '$store.state.monitor.board': function (value) {
      switch (value) {
      case 'home':// 首页
        // 控制左侧菜单不显示
        this.colSpan = 0
        break
      case 'monitor':// 监控
        // 显示左侧菜单
        this.colSpan = 4
        this.colSpanWarnEquip = 0
        break
      case 'warning':// 预警
        // 显示左侧菜单
        this.colSpan = 6
        this.colSpanWarnEquip = 12
        break
      case 'history':// 历史记录
        // 显示左侧菜单
        this.colSpan = 4
        this.colSpanWarnEquip = 0
        break
      }
    }
  }
}
</script>

<style>
.el-menu.el-menu--horizontal {
    border-bottom: none !important;
    background:transparent;
}
.index-header{
  background-image: linear-gradient(-180deg, #FFFFFF 4%, #F2F3F7 100%);
  box-shadow: 0 2px 8px 0 rgba(181,181,181,0.50);
  border-bottom: solid 1px #e6e6e6;
}
.index-main{
 position:absolute;
 width:100%;
 height:100%;
}
.index-content{
  min-height: calc(100vh - 61px);
}
.index-left{
  position: absolute;
  bottom: 0px;
  top: 0px;
  left: 0px;
}
.index-right-content {
  background: #f2f3f7;
}
.index-logo{
  background-image: url('../../../assets/jjLogo.png');
  background-size: auto;
  background-repeat: no-repeat;
  height: 45px;
  margin-left: 2rem;
  margin-top: 0.5rem;
}
.index-sysName{
  font-weight: bold;
  position: absolute;
  left:2.6rem;
  bottom:0.5rem;
}
.left-menu-item{
  margin-left:3rem;
}
</style>
