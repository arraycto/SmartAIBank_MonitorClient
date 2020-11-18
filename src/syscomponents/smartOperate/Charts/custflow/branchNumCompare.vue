<template>
  <div class="branch-num-compare" id="branchRankingId" v-if="custFlowTop10List!=null&&custFlowTop10List.length>0"></div>
  <occupied v-else height='15rem' explain="暂无接待客户数排名数据"/>
</template>

<script>
import echarts from 'echarts'
import occupied from '@/components/Occupied/occupied'
import options from './chartOptions'
import base from '@/common/base'

export default {
  name: 'branchRankingChart',
  components: { occupied },
  props: ['mName'],
  data () {
    return {
      custFlowTop10List: []
    }
  },
  mounted () {
    this.requestCustflowRank()
  },
  activated () {
    this.requestCustflowRank()
  },
  methods: {
    // 客流模块获取机构的子机构客流量排名信息
    requestCustflowRank () {
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      this.$http.get('custflowRank', params).then((result) => {
        this.custFlowTop10List = result.list
        if (this.custFlowTop10List) {
          this.$nextTick(function () {
            this.initChart(this.custFlowTop10List)
          })
        }
      })
    },
    // 初始化和设置图标数据
    initChart (branchData) {
      if (!(document.getElementById('branchRankingId'))) return
      const mChart = echarts.init(document.getElementById('branchRankingId'))
      const xData = []
      const defaultData = []
      // 接待客户数值
      const showValueData = []
      const showRatio = []
      const showRank = []
      let  showHeight = 0
      // 设置xAxis的值
      branchData.map(function (item) {
        xData.push(item.branchName)
        const itemVale = parseInt(item.value)
        if (itemVale > showHeight) {
          showHeight = itemVale
        }
        showValueData.push(item.value)
        if (!item.rate && item.rate !== 0) {
          showRatio.push('noRate')
        } else {
          showRatio.push(item.rate)
        }
        showRank.push(item.rankNo)
      })
      // 设置默认的高度的值
      branchData.map(function (value) {
        defaultData.push(showHeight + showHeight / 3)
      })
      const mOption = options.branchNumCompareOption(xData, showValueData, defaultData, showRatio, showRank)
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
      if (base.isActivity(this.mName)) this.requestCustflowRank()
    },
    '$store.state.orgId': function (newValue, oldValue) {
      if (base.isActivity(this.mName)) this.requestCustflowRank()
    },
    '$store.state.operate.dayDateRange': function (newValue, oldValue) {
      if (base.isActivity(this.mName)) this.requestCustflowRank()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.branch-num-compare {
  width: 100%;
  height: 15rem;
  padding: 10px;
  box-sizing: border-box;
}
</style>

