<template>
  <div class="minute-content" v-if="minuteData&&minuteData.length>0">
    <div class="minute-explain">排队等待时长</div>
    <div class="minute-chart" id="minuteChartId"></div>
  </div>
  <occupied v-else height='100%' explain="暂无排队等待时长饼状图数据"/>
</template>

<script>
import echarts from 'echarts'
import options from './chartOptions'
import occupied from '@/components/Occupied/occupied'

export default {
  name: 'minuteChart',
  props: { minuteData: Array },
  components: { occupied },
  data () {
    return {}
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      if (!(document.getElementById('minuteChartId'))) return
      const chart = echarts.init(document.getElementById('minuteChartId'))
      const xLegend = []
      const chartData = []
      // 设置legend的值
      this.minuteData.map(function (item) {
        xLegend.push({ name: item.desc, icon: 'circle' })
        chartData.push({
          name: item.desc,
          value: item.value
        })
      })
      const mOption = options.entityMinuteOption(xLegend, chartData)
      chart.setOption(mOption, true)
    }
  },
  watch: {
    'minuteData': {
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
.minute-content {
  height: 100%;
  .minute-explain {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    color: #4a4a4a;
    letter-spacing: 0;
    text-align: left;
    height: 30px;
    justify-content: center;
    font-weight: 600;
  }
  .minute-chart {
    width: 100%;
    height: 89%;
  }
}
</style>



