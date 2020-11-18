<template>
  <div class="busi-effciency-page-content">
    <el-row>
      <el-col :span="24">
        <div class="time-select-nav">
          <div class="time-select">
              <time-select></time-select>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="piece-content">
          <business-chart :business-data="timeGroupBusiSum"></business-chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="piece-content">
          <duration-chart :duration-data="tradeDealAvgTime"></duration-chart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="piece-content">
          <bus-ranking-chart :bus-data="busiSumRankTop10List" chart-id="businessBarChartId" title-text="业务总量排名" series-name="业务总量"></bus-ranking-chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="piece-content">
          <bus-ranking-chart :bus-data="dealTimeRannkTop10List" chart-id="durationBarChartId" title-text="交易平均处理时长排名" series-name="交易平均处理时长"></bus-ranking-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import timeSelect from '@/components/TimeSelect/timeSelect'
import businessChart from '@/syscomponents/smartOperate/Charts/busiEfficiency/businessChart'
import durationChart from '@/syscomponents/smartOperate/Charts/busiEfficiency/durationChart'
import busRankingChart from '@/syscomponents/smartOperate/Charts/busiEfficiency/busRankingChart'
import base from '@/common/base'

export default {
  name: 'branch_busiEfficiency',
  data: function () {
    return {
      timeGroupBusiSum: null,
      tradeDealAvgTime: null,
      busiSumRankTop10List: null,
      dealTimeRannkTop10List: null
    }
  },
  components: {
    timeSelect, businessChart, durationChart, busRankingChart
  },
  mounted () {
    this.requestEfficiencyBusiness()
    this.requestEfficiencyRanking()
  },
  activated () {
    this.requestEfficiencyBusiness()
    this.requestEfficiencyRanking()
  },
  methods: {
    // 获取业务总量和交易平均处理时长月份对应数据
    requestEfficiencyBusiness () {
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      this.$http.get('efficiencyBusiness', params).then((result) => {
        this.timeGroupBusiSum = result.businessSum
        this.tradeDealAvgTime = result.tradeDealAvgTime
      })
    },
    // 获取业务总量和交易平均处理时长对应的机构数据
    requestEfficiencyRanking () {
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      this.$http.get('efficiencyBusinessRanking', params).then((result) => {
        this.busiSumRankTop10List = result.businessSum.busiSumRankTop10List
        this.dealTimeRannkTop10List = result.businessSum.dealTimeRankTop10List
      })
    }
  },
  watch: {
    // 日期控件类型改变监听
    '$store.state.operate.timeRange': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) {
        this.requestEfficiencyBusiness()
        this.requestEfficiencyRanking()
      }
    },
    '$store.state.orgId': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) {
        this.requestEfficiencyBusiness()
        this.requestEfficiencyRanking()
      }
    },
    '$store.state.operate.dayDateRange': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) {
        this.requestEfficiencyBusiness()
        this.requestEfficiencyRanking()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import '@/styles/busiEfficiency-common.scss'
</style>
