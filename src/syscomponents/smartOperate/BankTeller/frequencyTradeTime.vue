 <template>
  <div class="frequency-trade-time-content"
       v-if="tranTop20HandleTimeList!=null&&tranTop20HandleTimeList.length>0">
    <el-row :gutter="20"
            v-for="(item,index) in tranTop20HandleTimeList"
            :key="index+40">
      <el-col :span="8">
        <div class="item-temple">
          <trade-item-chart v-if="null!=item[0]"
                            :chart-data="item[0]"
                            :chart-id="'frequencyTradeTime0'+index"></trade-item-chart>
        </div>
      </el-col>
      <el-col :span="8"
              :style="{display:null!=item[1]?'':'none'}">
        <div class="item-temple">
          <trade-item-chart v-if="null!=item[1]"
                            :chart-data="item[1]"
                            :chart-id="'frequencyTradeTime1'+index"></trade-item-chart>
        </div>
      </el-col>
      <el-col :span="8"
              :style="{display:null!=item[2]?'':'none'}">
        <div class="item-temple">
          <trade-item-chart v-if="null!=item[2]"
                            :chart-data="item[2]"
                            :chart-id="'frequencyTradeTime2'+index"></trade-item-chart>
        </div>
      </el-col>
    </el-row>
  </div>
  <occupied v-else
            height='500px'
            explain='暂无高频交易(前20)处理时长数据' />
</template>

<script>
import tradeItemChart from '@/syscomponents/smartOperate/Charts/bankTeller/tradeItemChart'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'
export default {
  name: 'frequencyTradeTime',
  data: function () {
    return {
      tranTop20HandleTimeList: []
    }
  },
  components: { tradeItemChart, occupied },
  mounted () {
    this.requestFrequencyTradeTime()
  },
  activated () {
    this.requestFrequencyTradeTime()
  },
  methods: {
    // 获取数据
    requestFrequencyTradeTime () {
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      this.$http.getTrend('frequencyTradeTime', params).then((result) => {
        const combinationArr = []
        let temporaryArr = []
        if (result.tranTop20List) {
          const length = result.tranTop20List.length
          result.tranTop20List.map((item, index) => {
            temporaryArr.push(item)
            if ((index + 1) % 3 === 0) {
              combinationArr.push(temporaryArr)
              temporaryArr = []
            }
            if ((index + 1) === length && (index + 1) % 3 !== 0) {
              combinationArr.push(temporaryArr)
            }
          })
        }
        this.tranTop20HandleTimeList = combinationArr
      })
    }
  },
  watch: {
    // 日期控件类型改变监听
    '$store.state.operate.timeRange': function (newValue, oldValue) {
      if (base.isActivity(this.$parent.$options.name)) this.requestFrequencyTradeTime()
    },
    '$store.state.orgId': function (newValue, oldValue) {
      if (base.isActivity(this.$parent.$options.name)) this.requestFrequencyTradeTime()
    },
    '$store.state.operate.dayDateRange': function (newValue, oldValue) {
      if (base.isActivity(this.$parent.$options.name)) this.requestFrequencyTradeTime()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.frequency-trade-time-content {
  width: 100%;
  height: 100%;
  background: transparent;
  margin-top: -10px;
  .el-row {
    margin-top: 15px;
  }
  .item-temple {
    width: 100%;
    height: 620px;
    background: white;
    border-radius: 4px;
    padding: 10px;
  }
}

</style>

