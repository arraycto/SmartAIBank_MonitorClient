<template>
    <div :id="chartId" class="time-frame-chart" v-if="chartData&&chartData.length>0"></div>
    <occupied v-else height='100%' explain="暂无各时段排队等待时长线形图数据"/>
</template>

<script>
import echarts from 'echarts'
import options from './chartOptions'
import occupied from '@/components/Occupied/occupied'

export default {
  name: 'timeFrameChart',
  props: { chartId: String, chartData: Array },
  components: { occupied },
  data () {
    return {}
  },
  mounted () {
    this.initChart()
  },
  methods: {
    // 初始化
    initChart (timeFrameList) {
      if (!(document.getElementById(this.chartId))) return
      const chart = echarts.init(document.getElementById(this.chartId))
      const xData = []
      const chartData = []
      // 设置xAxis的值
      this.chartData.map(function (item) {
        xData.push(item.desc)
        chartData.push(item.value)
      })
      const mOption = options.entityTimeFrameOption(xData, chartData)
      chart.setOption(mOption, true)
    }
  },
  watch: {
    'chartData': {
      handler (value) {
        this.$nextTick(function () {
          if (value && value.length > 0) this.initChart()
        })
      },
      deep: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .time-frame-chart{
        width: 100%;
        height: 100%;
    }
</style>


