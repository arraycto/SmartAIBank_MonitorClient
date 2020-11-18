<template>
  <div class="device-state">
    <div class="top-style">
      <el-row>
        <el-col :span="16">
          <div
            class="device-title-style"
            @click="moreClick"
            @mouseover="mouseOver"
            @mouseleave="mouseLeave"
          >
            设备运行
            <i v-show="titleShow" class="title-icon icon-dcfs dcfs-gengduo1"></i>
            <i v-show="!titleShow" class="title-icon-hover icon-dcfs dcfs-gengduo1"></i>
          </div>
        </el-col>
        <el-col :span="8">
          <el-row>
            <div class="device-type-style">
              <el-col :span="12">
                <div
                  @click="deviceTypeEvent('deviceStatus')"
                  class="device-init"
                  :class="[initindex=='deviceStatus'?'device-type':'']"
                >设备状态</div>
              </el-col>
              <el-col :span="12">
                <div
                  @click="deviceTypeEvent('deviceType')"
                  class="device-init"
                  :class="[initindex=='deviceType'?'device-type':'']"
                >设备类型</div>
              </el-col>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="content-style">
      <device-status
        v-if="statusShow"
        :chartsData="statusData"
        :deviceStatusChartId="deviceStatusChartId"
      ></device-status>
      <device-type v-if="typeShow" :chartsData="typeData" :deviceTypeChartId="deviceTypeChartId"></device-type>
    </div>
  </div>
</template>
<script>
import deviceStatus from './deviceStatus'
import deviceType from './deviceType'
import websocketClient from '@/common/websocketClient'
// import statusJson from '@/dummy/smartMonitor/home/deviceStatus.json'
// import typeJson from '@/dummy/smartMonitor/home/deviceType.json'
import services from '../../../services'
import base from '@/common/base'

export default {
  name: 'deviceState',
  data () {
    return {
      initindex: 'deviceStatus',
      statusShow: true,
      typeShow: false,
      statusData: {},
      typeData: {},
      deviceStatusChartId: '',
      deviceTypeChartId: '',
      titleShow: true
    }
  },
  components: {
    deviceStatus,
    deviceType
  },
  mounted () {
    const self = this
    const banklevel = base.getStore({ 'key': 'monitorBankLevel' })
    if (banklevel === 'core') {
      self.deviceStatusChartId = 'coreDeviceStatus'
      self.deviceTypeChartId = 'coreDeviceType'
    } else {
      self.deviceStatusChartId = 'entityDeviceStatus'
      self.deviceTypeChartId = 'entityDeviceType'
    }
    self.getData('deviceStatus')
    this.timeOut()
  },
  methods: {
    timeOut () {
      const self = this
      setTimeout(function () {
        self.websocket()
      }, 1000)
    },
    // websocke推送
    websocket () {
      const self = this
      websocketClient.subscribeToRoom('monitorDevice', window.DCSpace.sysConfig.socketUrl.monitorDevice, function (msg) {
        self.getData(self.initindex)
      })
      websocketClient.subscribeToRoom('monitorNetwork', window.DCSpace.sysConfig.socketUrl.monitorNetwork, function (msg) {
        self.getData(self.initindex)
      })
      websocketClient.subscribeToRoom('monitorApp', window.DCSpace.sysConfig.socketUrl.monitorApp,
        function (msg) {
          self.getData(self.initindex)
        })
    },
    async getData (type) {
      const banklevel = base.getStore({ 'key': 'monitorBankLevel' })
      try {
        var self = this
        let result
        if (type === 'deviceStatus') {
          result = await services.api.monitor.monitorDevice.selectEachStatusCountGatherInfo(base.getStore({ key: 'orgId' }), '2', {})
          self.statusData = result || {}
        } else if (type === 'deviceType') {
          if (banklevel === 'core') {
            result = await services.api.monitor.monitorDevice.selectBranchSummaryInfo(base.getStore({ key: 'orgId' }))
            self.typeData = result || {}
          } else {
            result = await services.api.monitor.monitorDevice.selectBranchSummaryInfo(base.getStore({ key: 'orgId' }), '1')
            self.typeData = result || {}
          }
        }
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    deviceTypeEvent (clickName) {
      const me = this
      me.initindex = clickName
      if (clickName === 'deviceStatus') {
        me.statusShow = true
        me.typeShow = false
      } else if (clickName === 'deviceType') {
        me.statusShow = false
        me.typeShow = true
      }
      me.getData(clickName)
    },
    moreClick () {
      this.$nextTick(function () {
        this.$store.commit('monitor/setBoardDoor', 'sheBei')
      })
      this.$store.commit('monitor/updateBoard', 'monitor')
    },
    mouseOver () {
      this.titleShow = false
    },
    mouseLeave () {
      this.titleShow = true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.device-state {
  background: white;
  border-radius: 8px;
  .top-style {
    padding-top: $middlePadding;
    border-bottom: 1px solid $lineColor;
    width: 97%;
    margin: 0 auto;
    .device-title-style {
      font-size: $smallFontSize;
      font-family: $titleFontFamily;
      color: $homeTitleColor;
      font-weight: bolder;
      cursor: pointer;
    }
    .title-icon {
      font-size: $middleFontSize;
      color: $homeTitleColor;
    }
    .title-icon-hover {
      font-size: $middleFontSize;
      color: $homeBlueColor;
    }
    .device-type-style {
      margin: 0 auto;
    }
    .device-type {
      color: $homeBlueColor;
      border-bottom: 2px solid $homeBlueColor;
      padding-bottom: 5px;
      font-weight: bold;
    }
    .device-init {
      text-align: center;
      cursor: pointer;
      font-family: $textFontFamily;
      font-size: $XSmallFontSize;
    }
  }
  .content-style {
    width: 97%;
    margin: 0 auto;
  }
}
</style>



