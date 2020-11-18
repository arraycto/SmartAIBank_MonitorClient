<template>
  <div class="branch-ranking-chart" id="branchRankingId" v-if="chartData&&chartData.length>0"></div>
  <occupied v-else height='100%' explain="暂无各支行排队等待时长排名数据"/>
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'

export default {
  name: 'branchRankingChart',
  props: { mName: String },
  components: { occupied },
  data () {
    return {
      chartData: []
    }
  },
  mounted () {
    this.requestQueueRank()
  },
  methods: {
    requestQueueRank () {
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        orgid: this.$store.state.orgId,
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      this.$http.get('queueRank', params).then((result) => {
        this.chartData = result.queueTimeRankList
        this.$nextTick(function () {
          this.initChart(result.queueTimeRankList)
        })
      })
    },
    // 设置图表数据
    initChart (branchData) {
      if (!(document.getElementById('branchRankingId'))) return
      const mChart = echarts.init(document.getElementById('branchRankingId'))
      const xData = []
      const chartData = []
      const showRatioQueue = []
      const showRankQueue = []
      const defaultData = []; let  index = 0
      // 设置xAxis的值
      branchData.map(function (item) {
        xData.push(item.branchName)
        chartData.push(item.value)
        if (!item.rate  && item.rate !== 0) {
          showRatioQueue.push('noRate')
        } else {
          showRatioQueue.push(item.rate)
        }
        showRankQueue.push(item.rankNo)
        const waitTime = parseInt(item.value)
        if (waitTime > index) {
          index = waitTime
        }
      })
      // 设置默认的高度的值
      branchData.map(function (value) {
        defaultData.push(index + index / 3)
      })
      const mOption = options.entityBranchBarOption(xData, chartData, defaultData, showRatioQueue, showRankQueue)
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
    // 日期控件类型改变监听
    '$store.state.operate.timeRange': function (newValue, oldValue) {
      if (base.isActivity(this.mName)) this.requestQueueRank()
    },
    '$store.state.orgId': function (newValue, oldValue) {
      if (base.isActivity(this.mName)) this.requestQueueRank()
    },
    '$store.state.operate.dayDateRange': function (newValue, oldValue) {
      if (base.isActivity(this.mName)) this.requestQueueRank()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.branch-ranking-chart {
  width: 100%;
  height: 100%;
}
</style>

