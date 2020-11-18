<template>
  <div class="entityRankingChart-style" :id="chartId"></div>
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions'

export default {
  name: 'entityRankingChart',
  props: { chartId: String, chartName: String, chartDesc: String, branchData: Array },
  data () {
    return {}
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      const me = this
      const mChart = echarts.init(document.getElementById(this.chartId))
      const xData = []
      const yData = []
      const avgData = []
      let  index = 0
      const entityAvgData = []
      const initdata = []
      // 设置xAxis的值
      me.branchData.map(function (value) {
        xData.push(value.tellerName)
        yData.push(value.count)
        avgData.push(value.avgValue)
        entityAvgData.push(value.branchAvg)
        if (value.count > index) {
          index = value.count
        }
      })
      // 设置默认的高度的值
      this.branchData.map(function (value) {
        initdata.push(index + index / 3)
      })
      const mOption = options.entityBarOption(xData, yData, avgData, entityAvgData, initdata, this.chartName, this.chartDesc)
      mChart.setOption(mOption, true)
      window.onresize = function () {
        mChart.resize()
      }
    }
  },
  watch: {
    branchData: {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) this.initChart()
        })
      },
      deep: true
    },
    chartName: {
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

<style rel="stylesheet/scss" lang="scss" scoped>
.entityRankingChart-style {
  width: 100%;
  height: 280px;
}
</style>

