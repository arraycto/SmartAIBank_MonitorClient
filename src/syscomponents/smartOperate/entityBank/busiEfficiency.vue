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
        <div class="tab-left">
          <div class="tab-item" @click="leftClick">
            <font :class="[isTabLeft?'tab-color-blue':'tab-color-gray']">高频交易（前20）</font>
            <div class="tab-line" :class="[isTabLeft?'tab-background-blue':'tab-background-transparent']"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="tab-right">
          <div class="tab-item" @click="rightClick">
            <font :class="[isTabLeft?'tab-color-gray':'tab-color-blue']">耗时最长交易（后20）</font>
            <div class="tab-line" :class="[isTabLeft?'tab-background-transparent':'tab-background-blue']"></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <keep-alive>
      <component v-bind:is="currComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import timeSelect from '@/components/TimeSelect/timeSelect'
import businessChart from '@/syscomponents/smartOperate/Charts/busiEfficiency/businessChart'
import durationChart from '@/syscomponents/smartOperate/Charts/busiEfficiency/durationChart'
import dealTabLeft from '@/syscomponents/smartOperate/Charts/busiEfficiency/dealTabLeft'
import dealTabRight from '@/syscomponents/smartOperate/Charts/busiEfficiency/dealTabRight'
import base from '@/common/base'

export default {
  name: 'entity_busiEfficiency',
  data: function () {
    return {
      timeGroupBusiSum: null,
      tradeDealAvgTime: null,
      highFrequencyTradingList: [],
      timeConsumingTradeList: [],
      isTabLeft: true,
      currComponent: 'dealTabLeft'
    }
  },
  components: {
    timeSelect,
    businessChart,
    durationChart,
    dealTabLeft,
    dealTabRight
  },
  mounted () {
    this.requestEfficiencyBusiness()
  },
  activated () {
    this.requestEfficiencyBusiness()
  },
  methods: {
    leftClick () {
      this.isTabLeft = true
      this.currComponent = 'dealTabLeft'
    },
    rightClick () {
      this.isTabLeft = false
      this.currComponent = 'dealTabRight'
    },
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
    }
  },
  watch: {
    // 日期控件类型改变监听
    '$store.state.operate.timeRange': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) this.requestEfficiencyBusiness()
    },
    '$store.state.orgId': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) this.requestEfficiencyBusiness()
    },
    '$store.state.operate.dayDateRange': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) this.requestEfficiencyBusiness()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/busiEfficiency-common.scss";
@import '@/styles/variables.scss';
.tab-left {
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  background: transparent;
}
.tab-right {
  display: flex;
  justify-content: flex-start;
  padding-left: 30px;
}
.tab-item {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  cursor: pointer;
}
.tab-line {
  height: 4px;
  width: 100%;
  background: #258aff;
  border-radius: 4px;
  margin-top: 5px;
}
.tab-color-blue{
  color:$menuBg;
}
.tab-color-gray{
  color:#4A4A4A;
}
.tab-background-blue{
  background:$menuBg;
}
.tab-background-transparent{
  background: transparent;
}
</style>
