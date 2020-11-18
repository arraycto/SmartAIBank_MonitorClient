 <template>
    <div class="details-ranking-chart" :id="chartId"></div>
 </template>

<script>
import echarts from 'echarts'
import options from './chartOptions'

export default {
  name: 'detailsRankingChart',
  props: { chartId: String, chartData: Array },
  data: function () {
    return {

    }
  },
  components: {},
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      if (document.getElementById(this.chartId) === null) return
      const mChart = echarts.init(document.getElementById(this.chartId))
      const xData = []
      const currBranchData = []
      const averageTimerData = []
      const currOrgAverageData = []
      this.chartData.map((item) => {
        xData.push(item.tranName)
        currBranchData.push(item.value)
        averageTimerData.push(item.totalAvg)
        currOrgAverageData.push(item.branchAvg)
      })
      const mOption = options.detailsRankingOption(xData, currBranchData, averageTimerData, currOrgAverageData)
      mChart.setOption(mOption, true)
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

<style rel="stylesheet/scss" lang="scss" scoped>
.details-ranking-chart{
    width: 100%;
    height: 100%;
}


</style>

