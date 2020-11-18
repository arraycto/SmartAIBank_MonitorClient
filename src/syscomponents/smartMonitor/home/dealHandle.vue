<template>
<div class="device-state">
    <div class="top-style">
    <el-row :gutter="20">
          <el-col :span="16">
            <div class="device-title-style"
                @click="moreClick"
                @mouseover="mouseOver"
                @mouseleave="mouseLeave">交易处理
                  <i v-show="titleShow" class="title-icon icon-dcfs dcfs-gengduo1"></i>
                  <i v-show="!titleShow" class="title-icon-hover icon-dcfs dcfs-gengduo1"></i>
            </div>
          </el-col>
          <el-col :span="8">
              <el-row>
                <div class="device-type-style">
                <el-col :span="12">
                  <div @click="tranNumEvent('tranStatus')" class="device-init" :class="[initindex=='tranStatus'?'device-type':'']">交易状态</div>
                </el-col>
                <el-col :span="12">
                  <div @click="tranNumEvent('tranNum')" class="device-init" :class="[initindex=='tranNum'?'device-type':'']">设备类型</div>
                </el-col>
                </div>
              </el-row>
          </el-col>
    </el-row>
  </div>
  <div class="content-style">
    <tran-status v-if="statusShow" :chartsData="statusData" :tranStatusChartId="tranStatusChartId"></tran-status>
    <tran-num v-if="numShow" :chartsData="numData" :tranTimeList="tranTimeList" :tranNumChartId="tranNumChartId"></tran-num>
  </div>
</div>
</template>
<script>
import tranStatus from './tranStatus'
import tranNum from './tranNum'
import services from '../../../services'
import base from '@/common/base'
import websocketClient from '@/common/websocketClient'
export default {
  name: 'dealHandle',
  data () {
    return {
      initindex: 'tranStatus',
      statusShow: true,
      numShow: false,
      statusData: {}, // 交易汇总
      numData: {}, // 设备交易汇总
      tranTimeList: [], // 时间段交易数量
      tranStatusChartId: '',
      tranNumChartId: '',
      tranTime: '', // 当前时间
      titleShow: true
    }
  },
  components: {
    tranStatus,
    tranNum
  },
  mounted () {
    const self = this
    const banklevel = base.getStore({ 'key': 'monitorBankLevel' })
    if (banklevel === 'core') {
      self.tranStatusChartId = 'coretranStatus'
      self.tranNumChartId = 'coretranNum'
    } else {
      self.tranStatusChartId = 'entitytranStatus'
      self.tranNumChartId = 'entitytranNum'
    }
    self.getData('tranStatus')
    self.timeOut()
  },
  methods: {
    timeOut () {
      const self = this
      setTimeout(function () {
        self.websocket()
      }, 1000)
    },
    // websocket通讯
    websocket () {
      const self = this
      websocketClient.subscribeToRoom('monitorTran',  window.DCSpace.sysConfig.socketUrl.monitorTran, function (msg) {
        self.getData(self.initindex)
      })
    },
    async getData (type) {
      this.getTime()
      try {
        var self = this
        let result
        if (type === 'tranStatus') {
          // result = statusJson
          result = await services.api.monitor.monitorTrans.selectEachStatusCountGatherInfo(base.getStore({ key: 'orgId' }), 2)
          self.statusData = result || {}
        } else if (type === 'tranNum') {
          // result = typeJson
          result = await services.api.monitor.monitorTrans.selectTransCount(base.getStore({ key: 'orgId' }), 2)
          // self.tranTimeList = tranTime
          self.tranTimeList = await services.api.monitor.monitorTrans.selectTimePhasedTransCount(base.getStore({ key: 'orgId' }), this.tranTime)
          self.numData = result || {}
        }
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    tranNumEvent (clickName) {
      const me = this
      me.initindex = clickName
      if (clickName === 'tranStatus') {
        me.statusShow = true
        me.numShow = false
      } else if (clickName === 'tranNum') {
        me.statusShow = false
        me.numShow = true
      }
      me.getData(clickName)
    },
    // 获取当前时间
    getTime: async function () {
      var curDate = new Date()
      var hour = curDate.getHours()
      var minutes = curDate.getMinutes()
      var seconds = curDate.getSeconds()
      if (hour >= 1 && hour <= 9) {
        hour = '0' + hour
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds
      }
      this.tranTime = hour + ':' + minutes + ':' + seconds
    },
    moreClick () {
      this.$nextTick(function () {
        this.$store.commit('monitor/setBoardDoor', 'jiaoYi')
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
.device-state{
  background: white;
  border-radius: 8px;
  .top-style{
    padding-top: $middlePadding;
    border-bottom: 1px solid $lineColor;
    width: 97%;
    margin: 0 auto;
    .device-title-style{
      font-size: $smallFontSize;
      font-family: $titleFontFamily;
      color: $homeTitleColor;
      cursor: pointer;
      font-weight: bolder;
    }
    .title-icon{
      font-size: $middleFontSize;
      color: $homeTitleColor;
    }
    .title-icon-hover{
      font-size: $middleFontSize;
      color: $homeBlueColor;
    }
    .device-type-style{
        margin:0 auto
    }
    .device-type{
        color:$homeBlueColor;
        border-bottom: 2px solid $homeBlueColor;
        padding-bottom: 5px;
        font-weight: bold;
    }
    .device-init{
        text-align: center;
        cursor: pointer;
        font-family: $textFontFamily;
        font-size: $XSmallFontSize;
    }
  }
  .content-style{
    width: 97%;
    margin: 0 auto;
  }
}
</style>



