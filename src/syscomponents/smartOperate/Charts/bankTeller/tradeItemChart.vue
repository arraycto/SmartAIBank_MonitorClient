 <template>
    <div class="trade-item-chart">
        <div class="trade-name-style">{{chartData.tranName}}</div>
        <div class="trade-chart-style" :id="chartId"></div>
    </div>
 </template>

<script>
import echarts from 'echarts'
import options from './chartOptions'

export default {
  name: 'tradeItemChart',
  props: { chartId: String, chartData: Object },
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
      if (!(document.getElementById(this.chartId))) return
      const mChart = echarts.init(document.getElementById(this.chartId))
      const yData = []
      const currBranchData = []
      const allBranchData = []
      // 设置xAxis的值
      this.chartData.rankList.map((item) => {
        yData.unshift(item.userName + '（工号' + item.userId + '）')
        currBranchData.unshift(item.value)
        allBranchData.push(this.chartData.totalAvg)
      })
      const mOption = options.tradeItemOption(yData, currBranchData, allBranchData)
      mChart.setOption(mOption, true)
    }
  },
  watch: {
    'chartData.rankList': {
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
.trade-item-chart{
    width: 100%;
    height: 100%;
    .trade-name-style{
        font-size: 20px;
        color: #4A4A4A;
        letter-spacing: 0;
        text-align: left;
        height: 5%;
    }
    .trade-chart-style{
        width: 100%;
        height: 95%;
    }
}


</style>

