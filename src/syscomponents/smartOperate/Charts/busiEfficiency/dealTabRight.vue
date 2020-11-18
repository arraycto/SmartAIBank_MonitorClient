<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="trade-time-bar">
          <deal-statistics-bar-chart chart-id="leftDealStatisticsId" :chart-data="highFrequencyTrade" v-if="highFrequencyTrade&&highFrequencyTrade.list&&highFrequencyTrade.list.length>0"/>
          <occupied v-else height='100%' explain="暂无耗时最长交易图表数据"/>
        </div>
      </el-col>
    </el-row>
    <div v-if="anewArr&&anewArr.length>0">
      <el-row :gutter="20" v-for="(item,index) in anewArr" :key="index">
        <el-col :span="8">
          <div class="item-temple">
            <deal-type-module v-if="null!=item[0]" :deal-data="item[0]" :chart-id="'rightTradeId0'+index" tran-flag="2" :m-name="$parent.$options.name" @onReversalListen="onReversalListen" :curr-reversal-id="currReversalId"></deal-type-module>
          </div>
        </el-col>
        <el-col :span="8" :style="{display:null!=item[1]?'':'none'}">
          <div class="item-temple">
            <deal-type-module v-if="null!=item[1]" :deal-data="item[1]" :chart-id="'rightTradeId1'+index" tran-flag="2" :m-name="$parent.$options.name" @onReversalListen="onReversalListen" :curr-reversal-id="currReversalId"></deal-type-module>
          </div>
        </el-col>
        <el-col :span="8" :style="{display:null!=item[2]?'':'none'}">
          <div class="item-temple">
            <deal-type-module v-if="null!=item[2]" :deal-data="item[2]" :chart-id="'rightTradeId2'+index" tran-flag="2" :m-name="$parent.$options.name" @onReversalListen="onReversalListen" :curr-reversal-id="currReversalId"></deal-type-module>
          </div>
        </el-col>
      </el-row>
    </div>
    <occupied v-else height='400px' margin-top="15px" explain="暂无耗时最长交易列表数据"/>
  </div>
</template>
<script>
import dealTypeModule from './dealTypeModule'
import dealStatisticsBarChart from './dealStatisticsBarChart'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'

export default {
  name: 'dealTabLeft',
  components: { dealTypeModule, dealStatisticsBarChart, occupied },
  data () {
    return {
      highFrequencyTrade: null,
      anewArr: [],
      currReversalId: ''
    }
  },
  mounted () {
    this.requestHighFrequencyTrading()
  },
  activated () {
    this.requestHighFrequencyTrading()
  },
  methods: {
    // 获取数据列表
    requestHighFrequencyTrading () {
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        tradeType: '2',
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      this.$http.getTrend('highFrequencyTrading', params).then((result) => {
        this.highFrequencyTrade = result.highFrequencyTrade
        this.highFrequencyTrade.tradeName = '耗时最长交易业务总量  (笔)           耗时最长交易平均处理时长  (分钟)'
        this.reassemblyData(result.highFrequencyTrade.list)
      })
    },
    // 重组数据
    reassemblyData (dealData) {
      const anewArr = []
      let itemArr = []
      const length = dealData.length
      // 三组数据组合为一组数据
      dealData.map(function (item, index) {
        itemArr.push(item)
        if ((index + 1) % 3 === 0) {
          anewArr.push(itemArr)
          itemArr = []
        }
        if (index + 1 === length && (index + 1) % 3 !== 0) {
          anewArr.push(itemArr)
        }
      })
      this.anewArr = anewArr
    },
    onReversalListen (id) {
      this.currReversalId = id
    }
  },
  watch: {
    // 日期控件类型改变监听
    '$store.state.operate.timeRange': function (newValue, oldValue) {
      if (base.isActivity(this.$parent.$options.name)) this.requestHighFrequencyTrading()
    },
    '$store.state.orgId': function (newValue, oldValue) {
      if (base.isActivity(this.$parent.$options.name)) this.requestHighFrequencyTrading()
    },
    '$store.state.operate.dayDateRange': function (newValue, oldValue) {
      if (base.isActivity(this.$parent.$options.name)) this.requestHighFrequencyTrading()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.item-temple {
  height: 200px;
  min-height: 200px;
  background: white;
  width: 100%;
  border-radius: 4px;
}
.el-row {
  margin-top: 15px;
}
.trade-time-bar {
  width: 100%;
  height: 300px;
  padding: 10px;
  background: #ffffff;
  border-radius: 4px;
}
</style>

