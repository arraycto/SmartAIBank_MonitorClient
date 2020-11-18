<template>
<div class="device-state">
    <div class="top-style">
    <el-row :gutter="20">
          <el-col :span="18">
              <div class="device-title-style">排队等待时长</div>
          </el-col>
    </el-row>
  </div>
  <div v-if="this.chartsData1[0].total>0">
    <waitQueueTimeChart :chartsData="chartsData"></waitQueueTimeChart>
  </div>
  <div class="content-style" v-else>
    <occupied height='309px' explain='暂无数据'/>
  </div>
</div>
</template>
<script>
import occupied from '@/components/Occupied/occupied'
import waitQueueTimeChart from '@/syscomponents/smartMonitor/monitor/busyDegree/charts/waitQueueTimeChart'
import services from '../../../../services'
import base from '@/common/base'
export default {
  name: 'entityBusyWaitQueue',
  data () {
    return {
      branchId: '',
      chartsData1: [{
        waitTimeLaber: '10分钟以下',
        total: 0,
        color: '#497DEA'
      }],
      chartsData: [
        {
          waitTimeLaber: '10分钟以下',
          waitTimeValue: 0,
          waitTimeRate: 0,
          color: '#497DEA'

        },
        {
          waitTimeLaber: '10-20分钟',
          waitTimeValue: 0,
          waitTimeRate: 0,
          color: '#F37D7D'
        },
        {
          waitTimeLaber: '20-30分钟',
          waitTimeValue: 0,
          waitTimeRate: 0,
          color: '#E9B437'
        },
        {
          waitTimeLaber: '30分钟以上',
          waitTimeValue: 0,
          waitTimeRate: 0,
          color: '#A483FB'
        }
      ]
    }
  },
  components: {
    occupied, waitQueueTimeChart
  },
  mounted () {
    this.branchId = base.getStore({ key: 'orgId' })
    this.getData()
  },
  methods: {
    async getData () {
      const me = this
      try {
        const chartsDatas = await services.api.monitor.monitorBusy.getBusyWaitingTimeDistribution(this.branchId)

        me.$set(me.chartsData[0], 'waitTimeValue', chartsDatas.lessThanTenMinCount || 0)
        me.$set(me.chartsData[1], 'waitTimeValue', chartsDatas.betweenTenAndTwentyMinCount || 0)
        me.$set(me.chartsData[2], 'waitTimeValue', chartsDatas.betweenTwentyAndThirtyMinCount || 0)
        me.$set(me.chartsData[3], 'waitTimeValue', chartsDatas.moreThanThirtyMinCount || 0)


        me.$set(me.chartsData[0], 'waitTimeRate', parseFloat(chartsDatas.lessThanTenMinRate || 0).toFixed(2))
        me.$set(me.chartsData[1], 'waitTimeRate', parseFloat(chartsDatas.betweenTenAndTwentyMinRate || 0).toFixed(2))
        me.$set(me.chartsData[2], 'waitTimeRate', parseFloat(chartsDatas.betweenTwentyAndThirtyMinRate || 0).toFixed(2))
        me.$set(me.chartsData[3], 'waitTimeRate', parseFloat(chartsDatas.moreThanThirtyMinRate || 0).toFixed(2))
        me.$set(me.chartsData1[0], 'total', chartsDatas.totalCount || 0)
      } catch (err) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    }
  },
  watch: {
    '$store.state.monitor.tableBranchId': function (value) {
      if (this.$store.state.monitor.tableBranchId != null) {
        this.branchId = value.substring(0, value.length - 13)
        this.getData()
      }
    },
    '$store.state.monitor.refreshTime': function (value) {
      this.getData()
    }
  }

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.device-state{
  box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
  border-radius: 8px;
  background: white;
  .top-style{
    padding-top: $largePadding;
    padding-bottom: $middlePadding;

    width: 97%;
    margin: 0 auto;
    margin-left: 12px;
    .device-title-style{
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #333333;
      letter-spacing: 0;
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



