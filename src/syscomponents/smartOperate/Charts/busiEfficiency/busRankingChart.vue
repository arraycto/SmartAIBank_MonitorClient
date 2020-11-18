<template>
  <div class="bus-ranking-chart" :id="chartId" v-if="busData&&busData.length>0"></div>
  <occupied v-else height='100%' :explain="'暂无'+seriesName+'数据'"/>
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'

export default {
  name: 'busRankingChart',
  props: { busData: Array, chartId: String, titleText: String, seriesName: String  },
  components: { occupied },
  data () {
    return {}
  },
  mounted () {
    if (this.busData && this.busData.length > 0) {
      this.initChart()
    }
  },
  methods: {
    initChart () {
      if (!(document.getElementById(this.chartId))) return
      const mChart = echarts.init(document.getElementById(this.chartId))
      const xData = []
      const chartData = []
      const showRatioData = []
      const showRankData = []
      const defaultData = []; let  index = 0
      // 设置xAxis的值
      this.busData.map(function (item) {
        xData.push(item.branchName)
        chartData.push(item.value)
        if (!item.rate && item.rate !== 0) {
          showRatioData.push('noRate')
        } else {
          showRatioData.push(item.rate)
        }
        showRankData.push(item.rankNo)
        const TRAN_COUNT = parseInt(item.value)
        if (TRAN_COUNT > index) {
          index = parseInt(TRAN_COUNT)
        }
      })
      // 设置默认的高度的值
      this.busData.map(function (item) {
        defaultData.push(index + index / 6)
      })
      const mOption = options.businessBarOption(xData, chartData, defaultData, this.titleText, this.seriesName, showRatioData, showRankData)
      mChart.setOption(mOption, true)
      mChart.on('click', function (params) {
        if (params.componentType === 'xAxis') {
          base.rankingChartsClickEvent(params.value)
        }
      })
      window.onresize = function () {
        mChart.resize()
      }
    }
  },
  watch: {
    'busData': {
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
.bus-ranking-chart {
  width: 100%;
  height: 270px;
  margin-top: 10px;
}
</style>

