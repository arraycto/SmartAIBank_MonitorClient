<template>
  <div class="hallMarket-style">
    <el-row>
      <el-col :span="12">
        <div>
            <el-button class="button-style" size="mini" type="primary" icon="el-icon-arrow-left" @click="clickEvent()">返回</el-button>
            <div class="top-style">{{$route.query.tellerName}}</div>
            <div class="top-style">（工号{{$route.query.tellerId}}）</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="time-select-style">
          <div class="time-select">
              <time-select></time-select>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="market-content">
          <div class="market-top">客户接待</div>
          <el-row :gutter="15">
            <el-col :span="8">
              <div class="block-red">
                  <div class="top-font">{{(busiAcceptPartList!=null && busiAcceptPartList.pushCount != undefined) ? busiAcceptPartList.pushCount : '暂无数据'}}</div>
                  <div class="bottom-font">推送客户数(人)</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="block-red">
                <div class="top-font">{{(busiAcceptPartList!=null && busiAcceptPartList.receiveCount != undefined) ? busiAcceptPartList.receiveCount : '暂无数据'}}</div>
                <div class="bottom-font">推送客户接待数(人)</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="block-red">
                <div class="top-font">{{(busiAcceptPartList!=null && busiAcceptPartList.recevieRate != undefined) ?(busiAcceptPartList.recevieRate*100).toFixed(2) : '暂无数据'}}</div>
                <div class="bottom-font">推送客户接待率(%)</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="8">
              <div class="block-green">
                <div class="top-font">{{(busiAcceptPartList!=null && busiAcceptPartList.negativeCount != undefined) ?busiAcceptPartList.negativeCount : '暂无数据'}}</div>
                <div class="bottom-font">差评数(人)</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="block-green">
                <div class="top-font">{{(busiAcceptPartList!=null && busiAcceptPartList.negativeHandleCount != undefined) ?busiAcceptPartList.negativeHandleCount : '暂无数据'}}</div>
                <div class="bottom-font">差评客户处理数(人)</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="block-green">
                <div class="top-font">{{(busiAcceptPartList!=null && busiAcceptPartList.negativeHandleRate != undefined) ?(busiAcceptPartList.negativeHandleRate*100).toFixed(2) : '暂无数据'}}</div>
                <div class="bottom-font">差评客户处理率(%)</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="market-content">
           <div class="market-top">业务受理</div>
          <el-row :gutter="15">
            <el-col :span="8">
              <div class="block-blue">
                <div class="top-font">{{(busiAcceptPartList!=null && busiAcceptPartList.authHandleCount != undefined) ?busiAcceptPartList.authHandleCount : '暂无数据'}}</div>
                <div class="bottom-font">业务授权处理总数(人)</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="block-blue">
                <div class="top-font">{{(busiAcceptPartList!=null && busiAcceptPartList.queueHandleCount != undefined) ?busiAcceptPartList.queueHandleCount : '暂无数据'}}</div>
                <div class="bottom-font">队列管理处理数(次)</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="block-blue">
                <div class="top-font">{{(busiAcceptPartList!=null && busiAcceptPartList.identifiedCount != undefined) ?busiAcceptPartList.identifiedCount : '暂无数据'}}</div>
                <div class="bottom-font">身份核查处理总数(人)</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="8">
              <div class="block-blue">
                <div class="top-font">{{(busiAcceptPartList!=null && busiAcceptPartList.reserveHandleCount != undefined) ?busiAcceptPartList.reserveHandleCount : '暂无数据'}}</div>
                <div class="bottom-font">预约维护处理数(次)</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="block-blue">
                <div class="top-font">{{(busiAcceptPartList!=null && busiAcceptPartList.callHandleCount != undefined) ?busiAcceptPartList.callHandleCount : '暂无数据'}}</div>
                <div class="bottom-font">柜员呼叫处理总数(人)</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="product-market-content">产品营销</div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="wave-content">
          <teller-wave-chart v-if="hallMarketData[0] !=null" :chart-id="initData[0].waveChartId" :chart-name="initData[0].chartName" :chart-desc="initData[0].chartDesc" :chart-img="initData[0].waveChartImg" :wave-data="hallMarketData[0]"/>
          <occupied v-else explain='暂无该柜员营销数据~~'/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="wave-content">
          <teller-wave-chart v-if="hallMarketData[1] !=null" :chart-id="initData[1].waveChartId" :chart-name="initData[1].chartName" :chart-desc="initData[1].chartDesc" :chart-img="initData[1].waveChartImg" :wave-data="hallMarketData[1]"/>
          <occupied v-else explain='暂无该柜员营销数据~~'/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="wave-content">
          <teller-wave-chart v-if="hallMarketData[2] !=null" :chart-id="initData[2].waveChartId" :chart-name="initData[2].chartName" :chart-desc="initData[2].chartDesc" :chart-img="initData[2].waveChartImg" :wave-data="hallMarketData[2]"/>
          <occupied v-else explain='暂无该柜员营销数据~~'/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="wave-content">
          <teller-wave-chart v-if="hallMarketData[3] !=null" :chart-id="initData[3].waveChartId" :chart-name="initData[3].chartName" :chart-desc="initData[3].chartDesc" :chart-img="initData[3].waveChartImg" :wave-data="hallMarketData[3]"/>
          <occupied v-else explain='暂无该柜员营销数据~~'/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import timeSelect from '@/components/TimeSelect/timeSelect'
import tellerWaveChart from '@/syscomponents/smartOperate/Charts/hallMarket/tellerWaveChart'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'

export default {
  name: 'entity_tellerHallMarket',
  data: function () {
    return {
      waveMarketingCustomer: null,
      wavePotentialCustomer: null,
      waveMarketingProduct: null,
      wavePurchasesRegistered: null,
      initData: [
        {
          waveChartId: 'waveMarketingCustomer',
          branchRankingChartId: 'marketingCustomer',
          chartName: '营销客户数',
          chartDesc: '(人)',
          waveChartImg: 'marketingCustomer.png'
        },
        {
          waveChartId: 'wavePotentialCustomer',
          branchRankingChartId: 'potentialCustomer',
          chartName: '潜在客户登记数',
          chartDesc: '(笔)',
          waveChartImg: 'potentialCustomer.png'
        },
        {
          waveChartId: 'waveMarketingProduct',
          branchRankingChartId: 'marketingProduct',
          chartName: '营销产品数',
          chartDesc: '(次)',
          waveChartImg: 'marketingProduct.png'
        },
        {
          waveChartId: 'wavePurchasesRegistered',
          branchRankingChartId: 'purchasesRegistered',
          chartName: '预约购买登记数',
          chartDesc: '(笔)',
          waveChartImg: 'purchasesRegistered.png'
        }
      ],
      entityInitData: {
        'marketingCustomer': {
          chartName: '营销客户数',
          chartDesc: '(人)'
        },
        'potentialCustomer': {
          chartName: '潜在客户登记数',
          chartDesc: '(笔)'
        },
        'marketingProduct': {
          chartName: '营销产品数',
          chartDesc: '(次)'
        },
        'purchasesRegistered': {
          chartName: '预约购买登记数',
          chartDesc: '(笔)'
        }
      },
      hallMarketData: [],
      busiAcceptPartList: null
    }
  },
  components: {
    tellerWaveChart, timeSelect, occupied
  },
  mounted () {
    // this.init()
  },
  activated () {
    this.init()
  },
  methods: {
    clickEvent () {
      this.$router.push('entity_hallMarket')
    },
    init () {
      const me = this
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate,
        tellerid: me.$route.query.tellerId
      }
      this.$http.getTrend('tellerHallMarketDetail', params).then((result) => {
        this.busiAcceptPartList = result.busineAcceptList
        this.hallMarketData.push(result.saleCustCount)
        this.hallMarketData.push(result.potentialCustRegister)
        this.hallMarketData.push(result.saleProductCount)
        this.hallMarketData.push(result.reserveBuyCust)
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
