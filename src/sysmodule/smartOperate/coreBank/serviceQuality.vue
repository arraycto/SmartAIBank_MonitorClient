<template>
  <div class="serviceQuality-style">
    <el-row>
      <el-col :span="24">
        <div class="time-select-style">
          <div class="time-select">
              <time-select></time-select>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15"  v-for="(item) in initData" :key="item.waveChartId">
      <el-col :span="12">
        <div class="wave-content">
          <wave-chart :chart-id="item.waveChartId" :chart-name="item.chartName" :chart-img="item.waveChartImg" :wave-data="item.avgRateSum" v-if="item.avgRateSum!=null"/>
          <occupied v-else explain='暂无评价数据~~'/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="wave-content">
          <branch-ranking-chart :chart-id="item.branchRankingChartId" :chart-name="item.chartName"  :branch-data="item.subBranchRankTop10List" v-if="item.subBranchRankTop10List!=null"/>
          <occupied v-else explain='暂无排名数据~~'/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import timeSelect from '@/components/TimeSelect/timeSelect'
import waveChart from '@/syscomponents/smartOperate/Charts/serviceQuality/waveChart'
import branchRankingChart from '@/syscomponents/smartOperate/Charts/serviceQuality/branchRankingChart'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'

export default {
  name: 'core_serviceQuality',
  data: function () {
    return {
      initData: [
        {
          id: 'evaluteRate',
          waveChartId: 'waveEvaluationRate',
          branchRankingChartId: 'evaluationRate',
          chartName: '评价率',
          waveChartImg: 'EvaluationRate.png',
          avgRateSum: null,
          subBranchRankTop10List: null
        },
        {
          id: 'praiseRate',
          waveChartId: 'waveFeedbackRate',
          branchRankingChartId: 'feedbackRate',
          chartName: '好评率',
          waveChartImg: 'FeedbackRate.png',
          avgRateSum: null,
          subBranchRankTop10List: null
        },
        {
          id: 'navigateRate',
          waveChartId: 'waveBadRate',
          branchRankingChartId: 'badRate',
          chartName: '差评率',
          waveChartImg: 'BadRate.png',
          avgRateSum: null,
          subBranchRankTop10List: null
        }
      ]
    }
  },
  components: {
    waveChart, branchRankingChart, timeSelect, occupied
  },
  mounted () {
    // this.init()
  },
  activated () {
    this.init()
  },
  methods: {
    init () {
      const me = this
      const selectDateType = this.$store.state.operate.timeRange
      for (var index = 0; index < me.initData.length; index++) {
        const params = {
          orgid: base.getStore({ key: 'orgId' }),
          dateType: selectDateType,
          timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate,
          qualityType: me.initData[index].id
        }
        me.$http.getTrend('serviceQualityDetail', params).then((result) => {
          let i = 0
          if (result.qualityType === 'evaluteRate') {
            i = 0
          } else if (result.qualityType === 'praiseRate') {
            i = 1
          } else {
            i = 2
          }
          me.$set(me.initData[i], 'avgRateSum', result.avgRateSum)
          me.$set(me.initData[i], 'subBranchRankTop10List', result.subBranchRankTop10List)
        })
      }
    }
  },
  watch: {
    // 日期控件类型改变监听
    '$store.state.operate.timeRange': {
      handler (newValue, oldValue) {
        if (base.isActivity(this.$options.name)) this.init()
      }
    },
    '$store.state.orgId': {
      handler (newValue, oldValue) {
        if (base.isActivity(this.$options.name)) this.init()
      }
    },
    '$store.state.operate.dayDateRange': {
      handler (newValue, oldValue) {
        if (base.isActivity(this.$options.name)) this.init()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '@/styles/serviceQuality-common.scss'
</style>
