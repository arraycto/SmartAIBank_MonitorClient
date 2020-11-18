 <template>
    <div class="bank-teller-statistice-content">
        <head-select :handle-click="handleClick"></head-select>
        <keep-alive>
          <component v-bind:is="currComponent"></component>
        </keep-alive>

    </div>
 </template>

<script>
import headSelect from '@/syscomponents/smartOperate/Charts/bankTeller/headSelect'
import tradeAverageTime from '@/syscomponents/smartOperate/BankTeller/tradeAverageTime'
import tradeNumber from '@/syscomponents/smartOperate/BankTeller/tradeNumber'
import frequencyTradeTime from '@/syscomponents/smartOperate/BankTeller/frequencyTradeTime'
import evaluateRate from '@/syscomponents/smartOperate/BankTeller/evaluateRate'
import goodEvaluate from '@/syscomponents/smartOperate/BankTeller/goodEvaluate'
import badEvaluate from '@/syscomponents/smartOperate/BankTeller/badEvaluate'
export default {
  name: 'entity_bankteller',
  data: function () {
    return {
      currComponent: 'tradeAverageTime'

    }
  },
  components: {
    headSelect,
    tradeAverageTime,
    tradeNumber,
    frequencyTradeTime,
    evaluateRate,
    goodEvaluate,
    badEvaluate
  },
  mounted () {

  },
  methods: {
    // 模块切换回调
    handleClick (type) {
      switch (type) {
      case 'disposeTime':// 交易平均处理时长
        this.currComponent = 'tradeAverageTime'
        break
      case 'tradeNum':// 交易笔数
        this.currComponent = 'tradeNumber'
        break
      case 'oftenTrade':// 高频交易(前20)处理时长
        this.currComponent = 'frequencyTradeTime'
        break
      case 'evaluate':// 评价率
        this.currComponent = 'evaluateRate'
        break
      case 'evaluateGood':// 好评率
        this.currComponent = 'goodEvaluate'
        break
      case 'evaluateBad':// 差评率
        this.currComponent = 'badEvaluate'
        break
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bank-teller-statistice-content{
    width: 100%;
    height: 100%;
    background: #f2f3f7;
    padding: 15px;
}

</style>

