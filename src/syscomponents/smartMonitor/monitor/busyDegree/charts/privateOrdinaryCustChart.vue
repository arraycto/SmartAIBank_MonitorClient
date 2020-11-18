<template>
<div>
  <el-row class="time-point-chart-top">
    <el-col :span="8">
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
              <div class="time-point-chart-total">{{busyCustGatherInfoInCustType.waitingCustomers}}
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
            <div class="time-point-chart-icon-rate">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#dcfs-kehupingjundengdai"></use>
              </svg>
            </div>
        <el-col :span="17">
          <el-row>
            <el-col :span="24">
              <div class="time-point-chart-title">占比</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="time-point-chart-total">{{busyCustGatherInfoInCustType.waitingCustomersRate}}
                <font class="time-point-chart-total-span">
                  <b>%</b>
                </font>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-row :gutter="6">
            <div class="time-point-chart-icon-wait">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#dcfs-kehupingjundengdai"></use>
              </svg>
            </div>
        <el-col :span="18">
          <el-row>
            <el-col :span="24">
              <div class="time-point-chart-title">客户平均等待时间</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="time-point-chart-total">{{busyCustGatherInfoInCustType.avgWaitingTime}}
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
    <el-col :span="10">
      <div class="trade-time-bar" style="height:199px">
        <div class="chart-class" style="height:180px" id="privateCustomersCicle"></div>
      </div>
    </el-col>
    <el-col :span="14">
      <div class="trade-time-bar" style="height:199px">
        <div class="chart-class" style="height:180px" id="privateLineChartChartId"></div>
      </div>
    </el-col>
  </el-row>
</div>
</template>
<script>

import echarts from 'echarts'
import monitor from './chartMointor'
export default {
  name: 'privateOrdinaryCustomers',
  components: {  },
  data () {
    return {
      chartData: []
    }
  },
  props: {
    chartsData: Array,
    busyCustGatherInfoInCustType: Object,
    timePonitResultDate: Array,
    startEndTimePoint: Array
  },
  watch: {
    chartsData: {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) this.initCicleChart(value)
        })
      },
      deep: true
    },
    busyCustGatherInfoInCustType: {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) {

          }
        })
      },
      deep: true
    },
    timePonitResultDate: {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) this.initLineChart(value)
        })
      },
      deep: true
    }
  },
  mounted () {
    this.initCicleChart(this.chartsData)
    this.initLineChart(this.timePonitResultDate)
  },
  activated () {
  },
  methods: {
    initCicleChart (list) {
      if (!(document.getElementById('privateCustomersCicle'))) return
      const mChart = echarts.init(document.getElementById('privateCustomersCicle'))
      const xLegend = []
      const chartData = []
      // 设置xAxis的值
      var i = 0
      const colorlist = []
      list.map(function (item, index) {
        if (item.waitTimeValue !== 0) {
          colorlist[i] = item.color
          i = i + 1
          xLegend.push({ name: item.waitTimeLaber, icon: 'circle' })
          chartData.push({
            name: item.waitTimeLaber,
            value: item.waitTimeValue,
            percent: item.waitTimeRate
          })
        }
      })
      const mOption = monitor.entityCustomerTypePieMointor(chartData, colorlist)
      mChart.setOption(mOption, true)
      // 根据窗口的大小变动图表
      window.onresize = function () {
        mChart.resize()
      }
    },
    initLineChart (list) {
      if (!(document.getElementById('privateLineChartChartId'))) return
      const mChart = echarts.init(document.getElementById('privateLineChartChartId'))
      const xData = []
      const waitCustomerList = []
      const waitTimeList = []
      // 设置xAxis的值
      this.startEndTimePoint.map(function (item1) {
        xData.push(item1.startEndTime)
      })
      list.map(function (item) {
        // xData.push(item.startEndTime)
        waitCustomerList.push(item.callCustomers)
        waitTimeList.push(item.applyCustomers)
      })
      const mOption = monitor.entityCustomerTypeLineMonitor(xData, waitCustomerList, waitTimeList)
      mChart.setOption(mOption, true)
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
.time-point-chart-icon-rate{
  width: 32px;
  height: 32px;
  text-align: center;
  font-size: 22px;
  padding-top: 3px;
  border: 1px solid #F5A623;
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

