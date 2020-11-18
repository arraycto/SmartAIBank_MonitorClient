<template>
  <div class="queue-page-content">
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
        <div class="month-minute-content">
          <month-chart :month-data="timeGroupCustWait"/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="month-minute-content">
          <minute-chart :minute-data="queueTimeDistributionList"/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="8" v-for="(item, index) in queueTimeByCustTypeList" :key="index">
        <div class="custerm-type-content">
          <customer-type-chart :line-chart-id="'branchCustomerLineChartId'+index" :circle-chart-id="'branchCustomerCircleChartId'+index" :customer-data="item"/>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="entity-content">
          <branch-ranking-chart :m-name="$options.name"/>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="entity-content">
           <time-frame-chart chart-id="branchTimeFrameId" :chart-data="queueTimeDomainList"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import timeSelect from '@/components/TimeSelect/timeSelect'
import monthChart from '@/syscomponents/smartOperate/Charts/queue/monthChart'
import minuteChart from '@/syscomponents/smartOperate/Charts/queue/minuteChart'
import customerTypeChart from '@/syscomponents/smartOperate/Charts/queue/customerTypeChart'
import branchRankingChart from '@/syscomponents/smartOperate/Charts/queue/branchRankingChart'
import timeFrameChart from '@/syscomponents/smartOperate/Charts/queue/timeFrameChart'
import base from '@/common/base'

export default {
  name: 'branch_queue',
  data: function () {
    return {
      timeGroupCustWait: null,
      queueTimeDistributionList: null,
      entityOrdinaryCustomerData: null,
      entityVIPCustomerData: null,
      entityFirCustomerData: null,
      queueTimeDomainList: null,
      queueTimeByCustTypeList: []
    }
  },
  components: {
    monthChart, minuteChart, customerTypeChart, branchRankingChart, timeFrameChart, timeSelect
  },
  mounted () {
    this.requestQueueDetail()
  },
  activated () {
    this.requestQueueDetail()
  },
  methods: {
    requestQueueDetail () {
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      this.$http.get('queueDetail', params).then((result) => {
        this.timeGroupCustWait = result.queueTimeGather
        this.queueTimeDistributionList = result.queueTimeGroupList
        this.queueTimeDomainList = result.queueTimeDomainList
        this.queueTimeByCustTypeList = result.queueTimeByCustTypeList
      })
    }
  },
  watch: {
    // 日期控件类型改变监听
    '$store.state.operate.timeRange': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) this.requestQueueDetail()
    },
    '$store.state.orgId': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) this.requestQueueDetail()
    },
    '$store.state.operate.dayDateRange': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) this.requestQueueDetail()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '@/styles/queue-common.scss'

</style>
