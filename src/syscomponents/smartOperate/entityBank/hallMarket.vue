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
              <!-- <div class="block-blue">
                <div class="top-font">{{(busiAcceptPartList!=null && busiAcceptPartList.identifiedCount != undefined) ?busiAcceptPartList.identifiedCount : '暂无数据'}}</div>
                <div class="bottom-font">身份核查处理总数(人)</div>
              </div> -->
              <div class="block-blue">
                <div class="top-font">{{(busiAcceptPartList!=null && busiAcceptPartList.callHandleCount != undefined) ?busiAcceptPartList.callHandleCount : '暂无数据'}}</div>
                <div class="bottom-font">柜员呼叫处理总数(人)</div>
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
          <wave-chart v-if="waveMarketingCustomer != null" :chart-id="initData[0].waveChartId" :chart-name="initData[0].chartName" :chart-desc="initData[0].chartDesc" :chart-img="initData[0].waveChartImg" :wave-data="waveMarketingCustomer"/>
          <occupied v-else explain='暂无营销数据~~'/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="wave-content">
          <wave-chart v-if="wavePotentialCustomer != null" :chart-id="initData[1].waveChartId" :chart-name="initData[1].chartName" :chart-desc="initData[1].chartDesc" :chart-img="initData[1].waveChartImg" :wave-data="wavePotentialCustomer"/>
          <occupied v-else explain='暂无营销数据~~'/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="wave-content">
          <wave-chart v-if="waveMarketingProduct != null" :chart-id="initData[2].waveChartId" :chart-name="initData[2].chartName" :chart-desc="initData[2].chartDesc" :chart-img="initData[2].waveChartImg" :wave-data="waveMarketingProduct"/>
          <occupied v-else explain='暂无营销数据~~'/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="wave-content">
          <wave-chart v-if="wavePurchasesRegistered != null" :chart-id="initData[3].waveChartId" :chart-name="initData[3].chartName" :chart-desc="initData[3].chartDesc" :chart-img="initData[3].waveChartImg" :wave-data="wavePurchasesRegistered"/>
          <occupied v-else explain='暂无营销数据~~'/>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="product-market-content">大堂经理统计</div>
      </el-col>
    </el-row>
    <el-row>
      <div class="market-type-style">
      <el-col :span="6">
        <div @click="marketTypeEvent('marketingCustomer')" class="market-init" :class="[initindex=='marketingCustomer'?'market-type':'']">营销客户数</div>
      </el-col>
      <el-col :span="6">
        <div @click="marketTypeEvent('potentialCustomer')" class="market-init" :class="[initindex=='potentialCustomer'?'market-type':'']">潜在客户登记数</div>
      </el-col>
      <el-col :span="6">
        <div @click="marketTypeEvent('marketingProduct')" class="market-init" :class="[initindex=='marketingProduct'?'market-type':'']">营销产品次数</div>
      </el-col>
      <el-col :span="6">
        <div @click="marketTypeEvent('purchasesRegistered')" class="market-init" :class="[initindex=='purchasesRegistered'?'market-type':'']">预约购买登记数</div>
      </el-col>
      </div>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="wave-content">
          <entity-ranking-chart  v-if="hallMarketRankingEntityData != null && hallMarketRankingEntityData.length > 0" chart-id="firstRank" :chart-name="entityInitData[initindex].chartName" :chart-desc="entityInitData[initindex].chartDesc" :branch-data="hallMarketRankingEntityData"/>
          <occupied v-else explain='暂无排名数据~~'/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="wave-content">
          <entity-wave-chart v-if="hallMarketEntityData!== undefined && hallMarketEntityData.length > 0" chart-id="firstWave" :chart-name="entityInitData[initindex].chartName" :chart-desc="entityInitData[initindex].chartDesc" :chart-img="first" :wave-data="hallMarketEntityData[0]"/>
          <occupied v-else explain='暂无营销数据~~'/>
        </div>
      </el-col>
    </el-row>
    <div v-if="hallMartetOtherData!=null&&hallMartetOtherData.length>0">
        <el-row :gutter="15" v-for="(item,index) in hallMartetOtherData" :key="index">
          <el-col :span="12">
            <div class="wave-content">
              <entity-wave-chart v-if="null!=item[0]" :chart-id="'hallMartetOtherData'+index" :chart-name="entityInitData[initindex].chartName" :chart-desc="entityInitData[initindex].chartDesc" :chart-img = "index*2+2" :wave-data="item[0]"/>
            </div>
          </el-col>
          <el-col :span="12" :style="{display:null!=item[1]?'':'none'}">
            <div class="wave-content">
              <entity-wave-chart v-if="null!=item[1]" :chart-id="'hallMartetOtherData1'+index" :chart-name="entityInitData[initindex].chartName" :chart-desc="entityInitData[initindex].chartDesc" :chart-img ="index*2+3" :wave-data="item[1]"/>
            </div>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import timeSelect from '@/components/TimeSelect/timeSelect'
import waveChart from '@/syscomponents/smartOperate/Charts/hallMarket/waveChart'
import entityWaveChart from '@/syscomponents/smartOperate/Charts/hallMarket/entitywaveChart'
import entityRankingChart from '@/syscomponents/smartOperate/Charts/hallMarket/entityRankingChart'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'

export default {
  name: 'entity_hallMarket',
  data: function () {
    return {
      first: 1,
      waveMarketingCustomer: null,
      wavePotentialCustomer: null,
      waveMarketingProduct: null,
      wavePurchasesRegistered: null,
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
      hallMarketEntityData: [],
      hallMartetOtherData: [],
      hallMarketRankingEntityData: [],
      initindex: 'marketingCustomer',
      busiAcceptPartList: null
    }
  },
  components: {
    waveChart, timeSelect, entityWaveChart, entityRankingChart, occupied
  },
  mounted () {
    // this.init()
  },
  activated () {
    this.init()
  },
  methods: {
    marketTypeEvent (clickName) {
      const selectDateType = this.$store.state.operate.timeRange
      const me = this
      this.initindex = clickName
      const entityParams = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate,
        tranCode: clickName
      }
      me.$http.getTrend('hallMarketEntityDetail', entityParams).then((result) => {
        me.hallMarketEntityData = result.top3
        me.hallMarketRankingEntityData = result.brokerRank
        me.dataChanged(result.top3)
      })
    },
    init () {
      const me = this
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      const entityParams = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate,
        tranCode: me.initindex
      }
      me.$http.get('hallMarketDetail', params).then((result) => {
        me.waveMarketingCustomer = result.saleCustCount
        me.wavePotentialCustomer = result.potentialCustRegister
        me.waveMarketingProduct = result.saleProductCount
        me.wavePurchasesRegistered = result.reserveBuyCust
      })
      me.$http.get('hallMarketCustInfo', params).then((result) => {
        me.busiAcceptPartList = result
      })
      me.$http.get('hallMarketEntityDetail', entityParams).then((result) => {
        me.hallMarketEntityData = result.top3
        me.hallMarketRankingEntityData = result.brokerRank
        me.dataChanged(result.top3)
      })
    },
    dataChanged (listData) {
      const me = this
      const combinationArr = []
      let temporaryArr = []
      if (listData && listData.length > 3) {
        const list = listData.slice(1, listData.length)
        const length = list.length
        list.map((item, index) => {
          temporaryArr.push(item)
          if ((index + 1) % 2 === 0) {
            combinationArr.push(temporaryArr)
            temporaryArr = []
          }
          if ((index + 1) === length && (index + 1) % 2 !== 0) {
            combinationArr.push(temporaryArr)
          }
        })
      }
      me.hallMartetOtherData = combinationArr
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
    '$store.state.operate.dayDateRange': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) this.init()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '@/styles/hallMarket-common.scss'
</style>
