<template>
<div>
  <el-row class="time-point-chart-top">
    <el-col :span="5">
      <el-row :gutter="8">
            <div class="time-point-chart-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#dcfs-dengdaikehushu"></use>
              </svg>
            </div>
        <el-col :span="14">
          <el-row>
            <el-col :span="24">
              <div class="time-point-chart-title">等待客户数</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="time-point-chart-total">{{busyGather.waitingCustomers}}
                <font class="time-point-chart-total-span">
                  <b>人</b>
                </font>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-row :gutter="8">
            <div class="time-point-chart-icon-wait">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#dcfs-kehupingjundengdai"></use>
              </svg>
            </div>
        <el-col :span="17">
          <el-row>
            <el-col :span="24">
              <div class="time-point-chart-title">客户平均等待时间</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="time-point-chart-total">{{busyGather.avgWaitingTime}}
                <font class="time-point-chart-total-span">
                  <b>分钟</b>
                </font>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <div class="trade-time-bar" style="height:250px">
        <div class="chart-class" style="height:240px" id="timePointChartId"></div>
      </div>
    </el-col>
  </el-row>
</div>
</template>
<script>

import echarts from 'echarts'
import monitor from './chartMointor'
export default {
  name: 'timePointChart',
  components: {  },
  data () {
    return {
      chartData: []
    }
  },
  props: {
    timePonitResultDate: Array,
    busyGather: Object,
    startEndTimePoint: Array
  },
  mounted () {
    this.initChart(this.timePonitResultDate)
  },
  activated () {
  },
  methods: {
    initChart (list) {
      if (!(document.getElementById('timePointChartId'))) return
      const mChart = echarts.init(document.getElementById('timePointChartId'))
      const xData = []
      const callCustomersList = []
      const applyCustomersList = []
      // 设置xAxis的值
      this.startEndTimePoint.map(function (item1) {
        xData.push(item1.startEndTime)
      })
      list.map(function (item) {
        // xData.push(item.startEndTime)
        callCustomersList.push(item.callCustomers)
        applyCustomersList.push(item.applyCustomers)
      })
      const mOption = monitor.dealStatisticsBarOption(xData,  applyCustomersList, callCustomersList)
      mChart.setOption(mOption, true)
    }
  },
  watch: {
    timePonitResultDate: {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) this.initChart(value)
        })
      },
      deep: true
    }
  }

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.time-point-chart-top{
  margin: 8px 0 0 16px
}
.time-point-chart-icon{
  width: 32px;
  height: 32px;
  text-align: center;
  font-size: 22px;
  padding-top: 3px;
  border: 1px solid #258AFF;
  border-radius: 100%;
  margin-top: 8px;
  float: left;
}
.time-point-chart-icon-wait{
  width: 32px;
  height: 32px;
  text-align: center;
  font-size: 22px;
  padding-top: 3px;
  border: 1px solid #EE667F;
  border-radius: 100%;
  margin-top: 8px;
  float: left;
}
.time-point-chart-title{
  font-family: PingFangSC-Regular;
font-size: 14px;
color: #9B9B9B;
letter-spacing: 0;
}
.time-point-chart-total{
font-family: DINAlternate-Bold;
font-size: 24px;
color: #4A4A4A;
letter-spacing: 0;
.time-point-chart-total-span{
  font-family: DINAlternate-Bold;
  font-size: 14px;
  color: #4A4A4A;
}
}
</style>

