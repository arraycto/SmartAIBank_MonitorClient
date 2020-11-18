<template>
  <div class="deal-statistics-bar-content">
    <div class="head-num">
      <font style="width:130px">{{chartData.trandCount}}</font>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <font>{{chartData.handleTimeTotal}}</font>
    </div>
    <div class="chart-class" :id="chartId"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions'
export default {
  name: 'tradeStatisticsBar',
  props: { chartId: String, chartData: Object },
  data () {
    return {
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      if (!(document.getElementById(this.chartId))) return
      const mChart = echarts.init(document.getElementById(this.chartId))
      const xData = []; const tradeNumArr = []; const disposeTimeList = []; const allDealAverageList = []; const  allDisposeAverageList = []
      // 设置xAxis的值
      this.chartData.list.map(function (item) {
        xData.push(item.tradeName)
        tradeNumArr.push(item.trandCount)
        disposeTimeList.push(item.handleTimeAvg)
        allDealAverageList.push(item.tranCountTotalAvg)
        allDisposeAverageList.push(item.handleTimeTotalAvg)
      })
      const mOption = options.dealStatisticsBarOption(this.chartData.tradeName, xData, tradeNumArr, disposeTimeList, allDealAverageList, allDisposeAverageList)
      mChart.setOption(mOption, true)
    }
  },
  watch: {
    'chartData.list': {
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
.deal-statistics-bar-content {
  width: 100%;
  height: 100%;
  .head-num{
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: row;
    align-items:center;
    font-size: 26px;
    color: #004E97;
    letter-spacing: 0;
    text-align: left;
  }
  .chart-class{
    width: 100%;
    height: 85%;
  }
}
</style>

