<template>
  <div class="hallMarket-style">
    <el-row>
      <el-col :span="24">
        <div class="time-select-style">
          <div class="time-select">
              <time-select></time-select>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15" v-for="(item,index) in initData" :key="item.waveChartId">
      <el-col :span="12">
        <div class="wave-content">
          <wave-chart v-if="hallMarketData[index] !=null" :chart-id="item.waveChartId" :chart-name="item.chartName" :chart-desc="item.chartDesc" :chart-img="item.waveChartImg" :wave-data="hallMarketData[index]"/>
          <occupied v-else explain='暂无营销数据~~'/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="wave-content">
          <branch-ranking-chart v-if="hallMarketRankingData[index] !=null" :chart-id="item.branchRankingChartId" :chart-name="item.chartName" :chart-desc="item.chartDesc" :branch-data="hallMarketRankingData[index]"/>
          <occupied v-else explain='暂无排名数据~~'/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import timeSelect from '@/components/TimeSelect/timeSelect'
import waveChart from '@/syscomponents/smartOperate/Charts/hallMarket/waveChart'
import branchRankingChart from '@/syscomponents/smartOperate/Charts/hallMarket/branchRankingChart'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'

export default {
  name: 'core_hallMarket',
  data: function () {
    return {
      initData: [
        {
          waveChartId: 'waveMarketingCustomer',
          branchRankingChartId: 'marketingCustomer',
          chartName: '营销客户数',
          chartDesc: '人',
          waveChartImg: 'marketingCustomer.png'
        },
        {
          waveChartId: 'wavePotentialCustomer',
          branchRankingChartId: 'potentialCustomer',
          chartName: '潜在客户登记数',
          chartDesc: '笔',
          waveChartImg: 'potentialCustomer.png'
        },
        {
          waveChartId: 'waveMarketingProduct',
          branchRankingChartId: 'marketingProduct',
          chartName: '营销产品数',
          chartDesc: '次',
          waveChartImg: 'marketingProduct.png'
        },
        {
          waveChartId: 'wavePurchasesRegistered',
          branchRankingChartId: 'purchasesRegistered',
          chartName: '预约购买登记数',
          chartDesc: '笔',
          waveChartImg: 'purchasesRegistered.png'
        }
      ],
      hallMarketData: [],
      hallMarketRankingData: []
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
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      this.$http.get('hallMarketDetail', params).then((result) => {
        this.hallMarketData = []
        this.hallMarketData.push(result.saleCustCount)
        this.hallMarketData.push(result.potentialCustRegister)
        this.hallMarketData.push(result.saleProductCount)
        this.hallMarketData.push(result.reserveBuyCust)
      })
      this.$http.get('hallMarketRanking', params).then((result) => {
        this.hallMarketRankingData = []
        this.hallMarketRankingData.push(result.saleCustCount)
        this.hallMarketRankingData.push(result.potentialCustRegister)
        this.hallMarketRankingData.push(result.saleProductCount)
        this.hallMarketRankingData.push(result.reserveBuyCust)
      })
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
  @import '@/styles/hallMarket-common.scss'
</style>
