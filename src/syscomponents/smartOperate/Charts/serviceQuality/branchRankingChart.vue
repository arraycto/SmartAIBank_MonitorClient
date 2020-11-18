<template>
  <div class="branchRankingChart-style"
       :id="chartId"
       v-if="branchData&&branchData.length>0"></div>
  <occupied v-else
            :explain='occupyTitle' />
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'

export default {
  name: 'branchRankingChart',
  props: { chartId: String, chartName: String, branchData: Array },
  data () {
    return {
      occupyTitle: '暂无' + this.chartName + '排名数据~~'
    }
  },
  components: {
    occupied
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      if (document.getElementById(this.chartId) === null) return
      const me = this
      const mChart = echarts.init(document.getElementById(me.chartId))
      const xData = []
      const yData = []
      const avgData = []
      const rateData = []
      const rankData = []
      const defaultData = []; let index = 0
      // 设置xAxis的值
      me.branchData.map(function (value) {
        xData.push(value.branchName)
        if (!value.value || value.value === 0) {
          yData.push(0)
        } else {
          yData.push((value.value) * 100)
        }
        if (!value.rate && value.rate !== 0) {
          rateData.push('noRate')
        } else {
          rateData.push(value.rate)
        }
        rankData.push(value.rankNo)
        avgData.push((value.totalVag) * 100)
        if (value.value > index) {
          index = value.value
        }
      })
      // 设置默认的高度的值
      me.branchData.map(function (value) {
        defaultData.push(index + index / 3)
      })
      const mOption = options.entityBranchBarOption(xData, yData, defaultData, avgData, rateData, rankData, me.chartName)
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

