<template>
  <div class="cusflow-main-content">
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
      <el-col :span="12" class="height-100">
        <div class="bg-write customer-number">
          <customer-num-chart :chart-data="timeGroupCustFlow"></customer-num-chart>
        </div>
      </el-col>
      <el-col :span="12" class="height-100">
        <div class="bg-write customer-number">
          <customer-type-chart :chart-data="timePartCustFlowCustType"></customer-type-chart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="8" class="height-100">
        <div class="bg-write customer-type">
          <chart chart-id="sexChartId" center-text="性别" :chart-data="custFlowPartBySexList" :color-arr="sexColorArr"></chart>
        </div>
      </el-col>
      <el-col :span="8" class="height-100">
        <div class="bg-write customer-type">
          <chart chart-id="ageChartId" center-text="年龄" :chart-data="custFlowPartByAgeList" :color-arr="ageColorArr"></chart>
        </div>
      </el-col>
      <el-col :span="8" class="height-100">
        <div class="bg-write customer-type">
          <chart chart-id="propertyCharttId" center-text="资产" :chart-data="custFlowPartByAssetsList" :color-arr="propertyColorArr"></chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import chart from '@/syscomponents/smartOperate/Charts/custflow/typeDistribute'
import customerNumChart from '@/syscomponents/smartOperate/Charts/custflow/customerNum'
import customerTypeChart from '@/syscomponents/smartOperate/Charts/custflow/customerType'
import timeSelect from '@/components/TimeSelect/timeSelect'
import base from '@/common/base'

export default {
  name: 'entity_custflow',
  data: function () {
    return {
      timeGroupCustFlow: null, // 接待客户数
      timePartCustFlowCustType: null, // 各时段接待客户数数据
      custFlowPartBySexList: [], // 性别数据
      custFlowPartByAgeList: [], // 年龄数据
      custFlowPartByAssetsList: [], // 资产数据
      sexColorArr: ['#E46C6C', '#5295F0', '#B1B1B1'], // 性别图表每一个模块颜色
      ageColorArr: ['#1087FF', '#42DFE6', '#9E7EF7', '#E46C6C', '#F7D205', '#F5974E', '#B1B1B1'], // 年龄图表每一个模块颜色
      propertyColorArr: ['#F96363', '#8664F8', '#1087FF', '#42DFE6', '#596ED6', '#F5974E', '#F7D205', '#B1B1B1'] // 资产图表每一个模块颜色
    }
  },
  mounted () {
    this.requestCustflowDetail()
  },
  activated () {
    this.requestCustflowDetail()
  },
  components: {
    chart,
    customerNumChart,
    customerTypeChart,
    timeSelect
  },
  methods: {
    // 客流模块获取指定机构多维度统计信息
    requestCustflowDetail () {
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      this.$http.get('custflowDetail', params).then((result) => {
        var self = this
        self.timeGroupCustFlow = result.custFlowInfo
        self.timePartCustFlowCustType = result.timePartCustFlow
        self.transformArray(result.custFlowPartBySexList, 'sex')
        self.transformArray(result.custFlowPartByAgeList, 'age')
        self.transformArray(result.custFlowPartByAssetsList, 'assets')
      })
    },
    transformArray: function (arr, type) {
      var chartData = []
      arr.map(function (item) {
        var itemName = item.desc
        var tempObj = { 'value': item.value, 'name': itemName }
        chartData.push(tempObj)
      })
      if (type === 'sex') {
        this.custFlowPartBySexList = chartData
      } else if (type === 'age') {
        this.custFlowPartByAgeList = chartData
      } else if (type === 'assets') {
        this.custFlowPartByAssetsList = chartData
      }
    }
  },
  watch: {
    // 日期控件类型改变监听
    '$store.state.operate.timeRange': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) this.requestCustflowDetail()
    },
    '$store.state.orgId': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) this.requestCustflowDetail()
    },
    '$store.state.operate.dayDateRange': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) this.requestCustflowDetail()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '@/styles/custflow-common.scss'
</style>
