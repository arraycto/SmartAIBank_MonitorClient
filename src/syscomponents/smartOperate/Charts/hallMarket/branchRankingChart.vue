<template>
  <div class="branchRankingChart-style" :id="chartId"></div>
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions'
import base from '@/common/base'

export default {
  name: 'branchRankingChart',
  props: { chartId: String, chartName: String, chartDesc: String, branchData: Object },
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
      const defaultData = []
      const avgData = []
      const rateData = []
      const rankData = []
      let  index = 0
      let num = 0
      // 设置xAxis的值
      me.branchData.rankList.map(function (value) {
        xData.push(value.branchName)
        yData.push(value.value)
        if (!value.rate && value.rate !== 0) {
          rateData.push('noRate')
        } else {
          rateData.push(value.rate)
        }
        rankData.push(value.rankNo)
        const count = parseInt(value.value)
        if (count > index) {
          index = parseInt(count)
        }
        num = num + 1
      })
      // 设置默认的高度的值
      me.branchData.rankList.map(function (value) {
        defaultData.push(parseInt(index + index / num))
        avgData.push(value.totalAvg)
      })
      const mOption = options.entityBranchBarOption(xData, yData, defaultData, avgData, rateData, rankData, me.chartName, me.chartDesc)
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
    branchData: {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) this.initChart()
        })
      },
      deep: true
    },
    'branchData.rankList': {
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
.branchRankingChart-style {
  width: 100%;
  height: 280px;
}
</style>

