 <template>
    <div class="bank-teller-details-content">
        <el-row>
            <el-col :span="12">
                <div class="teller-name-number">
                  <el-button @click="goBackList" size="mini" type="primary" icon="el-icon-arrow-left" class="back">返回</el-button>
                  <font class="teller-name">{{$route.query.tellerName}}</font>
                  <font class="teller-number">（工号{{$route.query.tellerId}}）</font>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="time-select-nav">
                    <time-select></time-select>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="12">
            <div class="item-module-style">
              <details-module-chart chart-id="tellerTradeNumId" chart-type="number" :chart-data="tranCountDistributionList" v-if="tranCountDistributionList&&tranCountDistributionList.value"/>
              <occupied v-else height='340px' explain='暂无交易笔数'/>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item-module-style">
              <details-module-chart chart-id="tellerHandleTimeId" chart-type="time" :chart-data="handleTimeDistributionList" v-if="null!=handleTimeDistributionList&&handleTimeDistributionList.distributionList&&handleTimeDistributionList.distributionList.length>0"/>
              <occupied v-else height='340px' explain='暂无交易平均处理时长'/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <div class="item-module-style">
               <details-module-chart chart-id="tellerEvaluateId" chart-type="evaluate" :chart-data="evaluateRateList" v-if="null!=evaluateRateList&&evaluateRateList.distributionList&&evaluateRateList.distributionList.length>0"/>
              <occupied v-else height='340px' explain='暂无评价率'/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="12">
            <div class="item-module-style">
               <details-module-chart chart-id="tellerGoodEvaluateId" chart-type="good" :chart-data="positiveRateList" v-if="null!=positiveRateList&&positiveRateList.distributionList&&positiveRateList.distributionList.length>0"/>
              <occupied v-else height='340px' explain='暂无好评率'/>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item-module-style">
               <details-module-chart chart-id="tellerBadEvaluateId" chart-type="bad" :chart-data="negativeRateList" v-if="negativeRateList&&negativeRateList.distributionList&&negativeRateList.distributionList.length>0"/>
              <occupied v-else height='340px' explain='暂无差评率'/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="24">
            <div class="item-module-ranking-style">
              <details-ranking-chart chart-id="detailsRankingChartId" :chart-data="tranTop20HandleTimeList" v-if="tranTop20HandleTimeList&&tranTop20HandleTimeList.length>0"/>
              <occupied v-else height='340px' explain='暂无高频交易（前20）处理时长'/>
            </div>
          </el-col>
        </el-row>
    </div>
 </template>

<script>
import timeSelect from '@/components/TimeSelect/timeSelect'
import detailsModuleChart from '@/syscomponents/smartOperate/Charts/bankTeller/detailsModuleChart'
import detailsRankingChart from '@/syscomponents/smartOperate/Charts/bankTeller/detailsRankingChart'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'
var currRouter = null

export default {
  name: 'entity_tellerDetails',
  data: function () {
    return {
      tranCountDistributionList: null,
      handleTimeDistributionList: null,
      evaluateRateList: null,
      positiveRateList: null,
      negativeRateList: null,
      tranTop20HandleTimeList: null

    }
  },
  components: {
    timeSelect,
    detailsModuleChart,
    detailsRankingChart,
    occupied
  },
  mounted () {
    currRouter = this.$route
    this.requestTellerDetails()
  },
  activated () {
    this.requestTellerDetails()
  },
  methods: {
    goBackList () {
      this.$store.dispatch('operate/delView', this.$route).then(({ visitedViews }) => {
        this.$router.back()
      })
    },
    requestTellerDetails () {
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        tellerid: this.$route.query.tellerId,
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      this.$http.get('tellerDetails', params).then((result) => {
        this.tranCountDistributionList = result.tranCountDistributionList
        this.handleTimeDistributionList = result.handleTimeDistributionList
        this.evaluateRateList = result.evaluateRateList
        this.positiveRateList = result.positiveRateList
        this.negativeRateList = result.negativeRateList
        this.tranTop20HandleTimeList = result.ranTop20HandleTimeList
      })
    }
  },
  watch: {
    // 日期控件类型改变监听
    '$store.state.operate.timeRange': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) this.requestTellerDetails()
    },
    '$route.query.tellerId': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) this.requestTellerDetails()
    },
    '$store.state.orgId': function (newValue, oldValue) {
      this.$store.dispatch('operate/delView', currRouter).then(({ visitedViews }) => {
        if (this.$route.path === currRouter.path) {
          this.$router.back()
        }
      })
    },
    '$store.state.operate.dayDateRange': function (newValue, oldValue) {
      if (base.isActivity(this.$options.name)) this.requestTellerDetails()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bank-teller-details-content{
    width: 100%;
    height: 100%;
    background: #f2f3f7;
    padding: 0rem 1rem 1rem 1rem;
    .el-row {
      margin-top: 15px;
    }
    .teller-name-number{
      min-height: 25px;
      text-align: left;
      .back{
        background: white;
        font-size: 15px;
        color: #258AFF;
        border: none;
        padding: 6px 10px;

      }
      .teller-name{
        font-size: 24px;
        color: #4A4A4A;
        font-weight: 500;
        margin-left: 10px;
        vertical-align: middle;
      }
      .teller-number{
        font-size: 20px;
        color: #000000;
        letter-spacing: 0;
        vertical-align: middle;
      }
    }
    .time-select-nav{
      min-height: 25px;
      text-align: right;
      padding-right: 10px;
    }
    .item-module-style{
      width: 100%;
      height: 360px;
      background: white;
      border-radius: 4px;
      padding: 10px;
      box-sizing: border-box;
    }
    .item-module-ranking-style{
      width: 100%;
      height: 260px;
      background: white;
      border-radius: 4px;
      padding: 10px;
      box-sizing: border-box;
    }
}

</style>

