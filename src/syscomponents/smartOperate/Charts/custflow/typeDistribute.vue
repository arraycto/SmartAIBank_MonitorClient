<template>
  <div class="type-distribute" :id="chartId" v-if="chartData!=null&&chartData.length>0"/>
  <occupied v-else height='100%' :explain="'暂无'+centerText+'数据'"/>
</template>

<script>
import echarts from 'echarts'
import options from './chartOptions'
import occupied from '@/components/Occupied/occupied'

export default {
  props: {
    chartData: {
      type: Array
    },
    chartId: {
      type: String
    },
    colorArr: {
      type: Array
    },
    centerText: {
      type: String
    }
  },
  components: { occupied },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    if (this.chartData != null && this.chartData.length > 0) {
      this.initChart()
    }
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      if (!(document.getElementById(this.chartId))) return
      this.chart = echarts.init(document.getElementById(this.chartId))
      const mOption = options.typeDistributeOption(this.centerText, this.colorArr, this.chartData)
      this.chart.setOption(mOption, true)
    }
  },
  watch: {
    'chartData': {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) this.initChart()
        })
      },
      deep: true
    }
  }
}
</script>
<style>
.type-distribute{
  height: 100%;
  width: 100%;
}
</style>
