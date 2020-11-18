 <template>
    <div class="head-select-content">
        <el-row>
            <el-col :span="10">
                <div class="left-meun">
                    <el-dropdown @command="selectChang">
                        <span class="el-dropdown-link">
                            {{dropdownValue=="efficiency"?"业务效率":"服务质量"}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="efficiency">业务效率</el-dropdown-item>
                            <el-dropdown-item command="quality">服务质量</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div class="trade-type-content">
                        <div v-for="item in tabArr" :key="item.value" class="item-tab" :class="item.value==tabValue?'select-item-tab':''" @click="itemClick(item.value)">{{item.name}}</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="14">
                <div class="right-menu">
                    <time-select></time-select>
                </div>
            </el-col>
        </el-row>
    </div>
 </template>

<script>
import timeSelect from '@/components/TimeSelect/timeSelect'
export default {
  name: 'bankTellerStatistics',
  props: { handleClick: {
    type: Function,
    default: null
  }},
  data: function () {
    return {
      dropdownValue: 'efficiency',
      tabValue: 'disposeTime',
      tabArr: [{ name: '交易平均处理时长', value: 'disposeTime' }, { name: '交易笔数', value: 'tradeNum' }, { name: '高频交易(前20)处理时长', value: 'oftenTrade' }]
    }
  },
  components: {
    timeSelect
  },
  mounted () {},
  methods: {
    // 业务效率或者服务质量
    selectChang (value) {
      this.dropdownValue = value
      if (value === 'efficiency') { // 业务效率
        this.tabValue = 'disposeTime'
        this.tabArr = [{ name: '交易平均处理时长', value: 'disposeTime' }, { name: '交易笔数', value: 'tradeNum' }, { name: '高频交易(前20)处理时长', value: 'oftenTrade' }]
        this.handleClick('disposeTime')
      } else { // 服务质量
        this.tabValue = 'evaluate'
        this.tabArr = [{ name: '评价率', value: 'evaluate' }, { name: '好评率', value: 'evaluateGood' }, { name: '差评率', value: 'evaluateBad' }]
        this.handleClick('evaluate')
      }
    },
    // tab切换
    itemClick (type) {
      this.tabValue = type
      this.handleClick(type)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/variables.scss';
.head-select-content{
    width: 100%;
    height: 100%;
    background: transparent;
    .left-meun{
      min-height: 25px;
      width: 100%;
      text-align: left;
      display: flex;
      flex-direction: row;
      align-items: center;
      align-content: center;
      .el-dropdown-link {
        cursor: pointer;
        font-size: 14px;
        color: #4A4A4A;
        .el-icon-arrow-down {
            font-size: 14px;
        }
      }
      .trade-type-content{
          background: #E3E4EA;
          border-radius: 20px;
          display: flex;
          flex-direction: row;
          margin-left: 15px;
          .item-tab{
            padding: 6px 15px;
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 0;
            cursor: pointer;
          }
      }
    }
    .right-menu{
        min-height: 25px;
        width: 100%;
        text-align: right;
        padding-right: 10px;

    }
}



</style>

