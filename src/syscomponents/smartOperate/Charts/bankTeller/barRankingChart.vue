 <template>
  <div class="bra-ranking-chart"
       :id="chartId"></div>
</template>

<script>
import echarts from 'echarts'
import options from './chartOptions'

export default {
  name: 'barRankingChart',
  props: { chartId: String, chartData: Object, chartTitle: String },
  data: function () {
    return {

    }
  },
  components: {},
  mounted () {
    this.initChart()
  },
  activated () {
    this.initChart()
  },
  methods: {
    initChart () {
      var self = this
      if (document.getElementById(this.chartId) === null) return
      const mChart = echarts.init(document.getElementById(this.chartId))
      const xData = []
      const chartData = []
      const defaultData = []
      let index = 0
      const allData = []
      const branchData = []
      var desc = ''
      // 设置xAxis的值
      self.chartData.rankList.map(function (item) {
        xData.push(item.userName)
        var avgOrPercentage = ''
        if (self.chartTitle === '评价率' || self.chartTitle === '好评率' || self.chartTitle === '差评率') {
          if (item.value) {
            avgOrPercentage = parseFloat(item.value * 100).toFixed(2)
          } else {
            avgOrPercentage = '0.00'
          }
        } else if (self.chartTitle === '交易笔数') {
          if (item.value) {
            avgOrPercentage = item.value
          } else {
            avgOrPercentage = 0
          }
        } else {
          if (item.value) {
            avgOrPercentage = parseFloat(item.value).toFixed(2)
          } else {
            avgOrPercentage = '0.00'
          }
        }
        chartData.push(avgOrPercentage)
        if (parseInt(avgOrPercentage) > index) {
          index = parseInt(avgOrPercentage)
        }
      })
      // 设置默认的高度的值
      self.chartData.rankList.map((value) => {
        defaultData.push(index + index / 8)
        if (self.chartTitle === '评价率' || self.chartTitle === '好评率' || self.chartTitle === '差评率') {
          if (self.chartData.totalAvg) {
            allData.push(parseFloat(self.chartData.totalAvg * 100).toFixed(2))// 全行平均数据
          } else {
            allData.push('0.00')// 全行平均数据
          }
          if (self.chartData.branchAvg) {
            branchData.push(parseFloat(self.chartData.branchAvg * 100).toFixed(2))// 全行平均数据
          } else {
            branchData.push('0.00')// 全行平均数据
          }
          desc = '%'
        } else if (self.chartTitle === '交易笔数') {
          desc = '笔'
          if (self.chartData.totalAvg) {
            allData.push(self.chartData.totalAvg)// 全行平均数据
          } else {
            allData.push('0')// 全行平均数据
          }
          if (self.chartData.branchAvg) {
            branchData.push(self.chartData.branchAvg)// 全行平均数据
          } else {
            allData.push('0')// 全行平均数据
          }
        } else {
          desc = '分钟'
          if (self.chartData.totalAvg) {
            allData.push(self.chartData.totalAvg)// 全行平均数据
          } else {
            allData.push('0.00')// 全行平均数据
          }
          if (self.chartData.branchAvg) {
            branchData.push(self.chartData.branchAvg)// 全行平均数据
          } else {
            branchData.push('0.00')// 全行平均数据
          }
        }
      })
      var leftTitle = '柜员' + self.chartTitle + '排名'
      const mOption = options.barRankingOption(leftTitle, self.chartTitle, xData, defaultData, allData, chartData, branchData, desc)
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
.bra-ranking-chart {
  width: 100%;
  height: 260px;
  padding: 10px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 4px;
}
</style>

