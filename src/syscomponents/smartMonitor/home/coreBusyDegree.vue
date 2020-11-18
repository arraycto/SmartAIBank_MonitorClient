<template>
<div class="busy-degree-state">
    <div class="top-style">
    <el-row :gutter="20">
          <el-col :span="16">
              <div class="busy-title-style" @click="moreClick" @mouseover="mouseOver" @mouseleave="mouseLeave">繁忙度 <i v-show="titleShow" class="title-icon icon-dcfs dcfs-gengduo1"></i><i v-show="!titleShow" class="title-icon-hover icon-dcfs dcfs-gengduo1"></i></div>
          </el-col>
          <el-col :span="8">
              <el-row>
                <div class="busy-type-style">
                <el-col :span="12">
                  <div @click="busySpreadEvent('busyStatus')" class="busy-init" :class="[initindex=='busyStatus'?'busy-type':'']">整体繁忙状态</div>
                </el-col>
                <el-col :span="12">
                  <div @click="busySpreadEvent('busySpread')" class="busy-init" :class="[initindex=='busySpread'?'busy-type':'']">网点繁忙分布</div>
                </el-col>
                </div>
              </el-row>
          </el-col>
    </el-row>
  </div>
  <div class="content-style">
    <busy-status v-if="statusShow" :chartsData="statusData" :busyStatusChartId="busyStatusChartId"></busy-status>
    <busy-spread v-if="spreadShow" :chartsData="spreadData" :busySpreadChartId="busySpreadChartId"></busy-spread>
  </div>
</div>
</template>
<script>
import busyStatus from './coreBusyDegreeStatus'
import busySpread from './coreBusyDegreeSpread'
import services from '../../../services'
import base from '@/common/base'

export default {
  name: 'coreBusyDegree',
  data () {
    return {
      initindex: 'busyStatus',
      statusShow: true,
      spreadShow: false,
      statusData: {},
      spreadData: {},
      busyStatusChartId: '',
      busySpreadChartId: '',
      titleShow: true
    }
  },
  components: {
    busyStatus,
    busySpread
  },
  mounted () {
    const self = this
    // const banklevel = self.$store.state.monitor.bankLevel
    const banklevel = base.getStore({ key: 'monitorBankLevel' })
    if (banklevel === 'core') {
      self.busyStatusChartId = 'corebusyStatus'
      self.busySpreadChartId = 'corebusySpread'
    } else {
      self.busyStatusChartId = 'entitybusyStatus'
      self.busySpreadChartId = 'entitybusySpread'
    }
    self.getData('busyStatus')
  },
  methods: {
    async getData (type) {
      try {
        var self = this
        let result
        if (type === 'busyStatus') {
          result = await services.api.monitor.monitorBusy.selectBusinessGatherInfo(base.getStore({ key: 'orgId' }), 2)
          self.statusData = result || {}
        } else if (type === 'busySpread') {
          result = await services.api.monitor.monitorBusy.selectBusinessGatherInfo(base.getStore({ key: 'orgId' }), 2)
          self.spreadData = result || {}
        }
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    busySpreadEvent (clickName) {
      const me = this
      me.initindex = clickName
      if (clickName === 'busyStatus') {
        me.statusShow = true
        me.spreadShow = false
      } else if (clickName === 'busySpread') {
        me.statusShow = false
        me.spreadShow = true
      }
      me.getData(clickName)
    },
    moreClick () {
      this.$nextTick(function () {
        this.$store.commit('monitor/setBoardDoor', 'busyDegree')
      })
      this.$store.commit('monitor/updateBoard', 'monitor')
    },
    mouseOver () {
      this.titleShow = false
    },
    mouseLeave () {
      this.titleShow = true
    }
  },
  watch: {
    '$store.state.monitor.refreshTime': function (value) {
      const me = this
      this.getData(me.initindex)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.busy-degree-state{
  background: white;
  .top-style{
    padding-top: $middlePadding;
    border-bottom: 1px solid $lineColor;
    width: 97%;
    margin: 0 auto;
    .busy-title-style{
      font-size: $smallFontSize;
      font-family: $titleFontFamily;
      color: $homeTitleColor;
      font-weight: bolder;
      cursor: pointer;
    }
    .busy-type-style{
        margin:0 auto
    }
    .busy-type{
        color:$homeBlueColor;
        border-bottom: 2px solid $homeBlueColor;
        padding-bottom: 5px;
        font-weight: bold;
    }
    .busy-init{
        text-align: center;
        cursor: pointer;
        font-family: $textFontFamily;
        font-size: $XSmallFontSize;
    }
    .title-icon{
      font-size: $middleFontSize;
      color: $homeTitleColor;
    }
    .title-icon-hover{
      font-size: $middleFontSize;
      color: $homeBlueColor;
    }
  }
  .content-style{
    width: 97%;
    margin: 0 auto;
  }
}
</style>



