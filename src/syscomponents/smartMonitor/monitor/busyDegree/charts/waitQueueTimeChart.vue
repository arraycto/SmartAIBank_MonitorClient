<template>
<div>
  <el-row>
    <el-col :span="24">
      <div class="trade-time-bar" style="height:309px">
        <div class="chart-class" style="height:280px" id="waitQueueTimeChartId"></div>
      </div>
    </el-col>
  </el-row>
</div>
</template>
<script>

import echarts from 'echarts'
import monitor from './chartMointor'
export default {
  name: 'waitQueueTimeChart',
  components: {  },
  data () {
    return {

    }
  },
  props: {
    chartsData: Array
  },
  mounted () {
    this.initChart(this.chartsData)
  },
  activated () {
  },
  methods: {
    initChart (list) {
      if (!(document.getElementById('waitQueueTimeChartId'))) return
      const mChart = echarts.init(document.getElementById('waitQueueTimeChartId'))
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

      const mOption = monitor.entityMinuteMonitor(xLegend, chartData, colorlist)
      mChart.setOption(mOption, true)
      // 根据窗口的大小变动图表
      window.onresize = function () {
        mChart.resize()
      }
    }
  },
  watch: {
    chartsData: {
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

</style>

