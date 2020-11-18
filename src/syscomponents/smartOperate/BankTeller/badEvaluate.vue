 <template>
  <div class="bad-evaluate-content">
    <bar-ranking-chart chart-id="badEvaluateId"
                       chart-title="差评率"
                       :chart-data="evaluateRankingData"
                       v-if="evaluateRankingData&&evaluateRankingData.rankList&&evaluateRankingData.rankList.length>0"></bar-ranking-chart>
    <occupied v-else
              height='260px'
              explain='暂无柜员差评率排名' />
    <div v-if="tellerInfoArr!=null&&tellerInfoArr.length>0">
      <el-row :gutter="20"
              v-for="(item,index) in tellerInfoArr"
              :key="index+20">
        <el-col :span="12">
          <div class="item-temple">
            <teller-handle-time-chart v-if="null!=item[0]"
                                      :chart-data="item[0]"
                                      :chart-id="'badEvaluate0'+index"
                                      chart-type="bad"></teller-handle-time-chart>
          </div>
        </el-col>
        <el-col :span="12"
                :style="{display:null!=item[1]?'':'none'}">
          <div class="item-temple">
            <teller-handle-time-chart v-if="null!=item[1]"
                                      :chart-data="item[1]"
                                      :chart-id="'badEvaluate1'+index"
                                      chart-type="bad"></teller-handle-time-chart>
          </div>
        </el-col>
      </el-row>
    </div>
    <occupied v-else
              height='500px'
              explain='暂无柜员信息'
              margin-top='15px' />
  </div>
</template>

<script>
import barRankingChart from '@/syscomponents/smartOperate/Charts/bankTeller/barRankingChart'
import tellerHandleTimeChart from '@/syscomponents/smartOperate/Charts/bankTeller/tellerHandleTimeChart'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'
export default {
  name: 'badEvaluate',
  data: function () {
    return {
      evaluateRankingData: null,
      tellerInfoArr: []
    }
  },
  components: { barRankingChart, tellerHandleTimeChart, occupied },
  mounted () {
    this.requestEvaluateRate()
  },
  activated () {
    this.requestEvaluateRate()
  },
  methods: {
    // 获取数据
    requestEvaluateRate () {
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        qualityType: 'negativeRate',
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      this.$http.getTrend('serviceQualityTeller', params).then((result) => {
        this.evaluateRankingData = result.userRankList
        const combinationArr = []
        let temporaryArr = []
        if (result.userDetailList) {
          const length = result.userDetailList.length
          result.userDetailList.map((item, index) => {
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
        this.tellerInfoArr = combinationArr
      })
    }
  },
  watch: {
    // 日期控件类型改变监听
    '$store.state.operate.timeRange': function (newValue, oldValue) {
      if (base.isActivity(this.$parent.$options.name)) this.requestEvaluateRate()
    },
    '$store.state.orgId': function (newValue, oldValue) {
      if (base.isActivity(this.$parent.$options.name)) this.requestEvaluateRate()
    },
    '$store.state.operate.dayDateRange': function (newValue, oldValue) {
      if (base.isActivity(this.$parent.$options.name)) this.requestEvaluateRate()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bad-evaluate-content {
  width: 100%;
  height: 100%;
  background: transparent;
  margin-top: 5px;
  .el-row {
    margin-top: 15px;
  }
  .item-temple {
    width: 100%;
    height: 320px;
    background: white;
    border-radius: 4px;
    padding: 10px;
  }
  .item-temple:hover {
    width: 100%;
    height: 320px;
    background: white;
    border-radius: 4px;
    padding: 10px;
    box-shadow: 5px 5px 15px #3a8ee6;
  }
}
</style>

