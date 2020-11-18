 <template>
  <div class="teller-handle-time-content">
    <div class="teller-head-info">
      <el-row class="teller-height-100"
              @click.native="goTellerDeails">
        <el-col :span="6"
                class="teller-height-100">
          <div class="flex-row icon-style">
            <img :src="currIcon"
                 alt=""
                 width="20"
                 height="25"
                 style="margin-top: 5px;"
                 :style="{display:null!=currIcon?'':'none'}" />
            <div class="rank-number"
                 :style="{display:null==currIcon?'':'none'}">{{chartData.rankNo}}</div>
            <div class="flex-column teller-name-num">
              <div>{{chartData.name}}</div>
              <div class="teller-number">{{chartData.id}}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6"
                class="teller-height-100">
          <div class="teller-height-100 flex-column handle-number-style">
            <font class="handle-number"
                  v-if="unit === '%'">{{showValue}}</font>
            <font class="handle-number"
                  v-else-if="chartName === '平均处理时长'">{{parseFloat(chartData.value).toFixed(2)}}</font>
            <font class="handle-number"
                  v-else>{{chartData.value}}</font>
            <font class="explain">{{chartName}}&nbsp;&nbsp;({{unit}})</font>
          </div>
        </el-col>
        <el-col :span="4"
                class="teller-height-100">
          <div class="teller-height-100 flex-column proportion-style">
            <font :class="[rateDataColor]"
                  class="float-value">
              {{showRateData}}
              <img :src="parseFloat(chartData.rate)>0?arrowsUp:arrowsDown"
                   v-if="rateDataColor" />
            </font>
            <font class="explain">环比</font>
          </div>
        </el-col>
        <el-col :span="4"
                class="teller-height-100">
          <div class="teller-height-100 flex-column average-style">
            <font v-if="unit === '%'">{{showTotalAvg}}</font>
            <font v-else>{{chartData.totalAvg}}&nbsp;&nbsp;</font>
            <font class="explain">全行平均</font>
          </div>
        </el-col>
        <el-col :span="4"
                class="teller-height-100">
          <div class="teller-height-100 flex-column average-style">
            <font v-if="unit === '%'">{{showBranchAvg}}</font>
            <font v-else>{{chartData.branchAvg}}&nbsp;&nbsp;</font>
            <font class="explain">本机构平均</font>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="teller-chart-info"
         :id="chartId"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import options from './chartOptions'
import base from '@/common/base'
export default {
  name: 'tellerHandleTimeChart',
  // chartType 图表类型 {time 交易处理时长  number:交易笔数  evaluate:好评率  good:好评  bad:差评}
  props: { chartData: Object, chartId: String, chartType: String },
  data: function () {
    return {
      arrowsUp: require('@/assets/arrows_up.png'),
      arrowsDown: require('@/assets/arrows_down.png'),
      currIcon: null,
      chartName: '',
      unit: ''

    }
  },
  components: {},
  mounted () {
    this.initPage()
    this.initIcon()
    this.initChart()
  },
  methods: {
    // 设置页面数据
    initPage () {
      switch (this.chartType) {
      case 'time':
        this.chartName = '平均处理时长'
        this.unit = '分钟'
        break
      case 'number':
        this.chartName = '交易笔数'
        this.unit = '笔'
        break
      case 'evaluate':
        this.chartName = '评价率'
        this.unit = '%'
        break
      case 'good':
        this.chartName = '好评率'
        this.unit = '%'
        break
      case 'bad':
        this.chartName = '差评率'
        this.unit = '%'
        break
      }
    },
    // 初始化图表数据
    initChart () {
      var self = this
      if (document.getElementById(self.chartId) === null) return
      const mChart = echarts.init(document.getElementById(self.chartId))
      const xData = []
      const avgData = []
      const avgTotalData = []
      const avgBranchData = []
      const rateData = []
      // 设置xAxis的值
      self.chartData.distributionList.map(function (item) {
        xData.push(item.time)
        rateData.push(item.rate !== undefined ? (parseFloat(item.rate) * 100).toFixed(2) : 'null')
        if (self.chartName === '评价率' || self.chartName === '好评率' || self.chartName === '差评率') {
          if (item.value) {
            avgData.push(item.value * 100)
          } else {
            avgData.push('0.00')
          }
          if (item.totalAvg) {
            avgTotalData.push(item.totalAvg * 100)
          } else {
            avgTotalData.push('0.00')
          }
          if (item.branchAvg) {
            avgBranchData.push(item.branchAvg * 100)
          } else {
            avgBranchData.push('0.00')
          }
        } else if (self.chartName === '平均处理时长') {
          if (item.value) {
            avgData.push(parseFloat(item.value).toFixed(2))
          } else {
            avgData.push('0.00')
          }
          if (item.totalAvg) {
            avgTotalData.push(parseFloat(item.totalAvg).toFixed(2))
          } else {
            avgTotalData.push('0.00')
          }
          if (item.branchAvg) {
            avgBranchData.push(parseFloat(item.branchAvg).toFixed(2))
          } else {
            avgBranchData.push('0.00')
          }
        } else {
          if (item.value) {
            avgData.push(item.value)
          } else {
            avgData.push('0')
          }
          if (item.totalAvg) {
            avgTotalData.push(item.totalAvg)
          } else {
            avgTotalData.push('0')
          }
          if (item.branchAvg) {
            avgBranchData.push(item.branchAvg)
          } else {
            avgBranchData.push('0')
          }
        }
      })
      const mOption = options.tellerHandleTimeOption(self.chartName, base.timerShaft(xData), avgData, avgTotalData, avgBranchData, rateData)
      mChart.setOption(mOption, true)
    },
    // 设置初始化图标
    initIcon () {
      const rank = parseInt(this.chartData.rankNo)
      if (rank === 1) {
        this.currIcon = require('@/assets/smartOperate/survey/gold.png')
      } else if (rank === 2) {
        this.currIcon = require('@/assets/smartOperate/survey/silver.png')
      } else if (rank === 3) {
        this.currIcon = require('@/assets/smartOperate/survey/copper.png')
      }
    },
    // 跳转到详情
    goTellerDeails () {
      this.$router.push({ path: 'entity_tellerDetails', query: { tellerId: this.chartData.id, tellerName: this.chartData.name } })
    }
  },
  watch: {
    'chartData.distributionList': {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) this.initChart()
        })
      },
      deep: true
    }
  },
  computed: {
    showBranchAvg: function () {
      if (this.chartData.branchAvg || this.chartData.branchAvg === 0) {
        return parseFloat(this.chartData.branchAvg * 100).toFixed(2)
      } else {
        return '0.00'
      }
    },
    showTotalAvg: function () {
      if (this.chartData.totalAvg || this.chartData.totalAvg === 0) {
        return parseFloat(this.chartData.totalAvg * 100).toFixed(2)
      } else {
        return '0.00'
      }
    },
    showValue: function () {
      if (this.chartData.value || this.chartData.value === 0) {
        return (this.chartData.value * 100).toFixed(2) + '%'
      } else {
        return '0.00%'
      }
    },
    // 计算环比 如果环比不返回代表上一月为0，显示‘----’
    showRateData: function () {
      if (this.chartData.rate || this.chartData.rate === 0) {
        return ((this.chartData.rate) * 100).toFixed(2) + '%'
      } else {
        return '----'
      }
    },
    rateDataColor: function () {
      if (this.chartData.rate && this.chartData.rate !== 0) {
        if (this.chartData.rate > 0) {
          return 'font-color-red'
        } else {
          return 'font-color-blue'
        }
      } else {
        return ''
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.teller-handle-time-content {
  width: 100%;
  height: 100%;
  background: transparent;
  cursor: pointer;
  .teller-head-info {
    width: 100%;
    height: 25%;
    align-items: center;
    padding-top: 10px;
    .flex-column {
      display: flex;
      flex-direction: column;
    }
    .flex-row {
      display: flex;
      flex-direction: row;
    }
    .icon-style {
      align-items: flex-start;
      width: 100%;
      .teller-name-num {
        margin-left: 10px;
        font-size: 20px;
        color: #4a4a4a;
        font-weight: 600;
        flex-grow: 1;
        width: 70%;
        .teller-number {
          font-size: 16px;
          color: #000000;
          letter-spacing: 0;
          font-weight: 100;
          width: 98%;
          word-wrap: break-word;
        }
      }
      .rank-number {
        display: flex;
        flex-direction: row;
        width: 24px;
        height: 24px;
        border-radius: 12px;
        justify-content: center;
        align-items: center;
        background: #4a4a4a;
        font-size: 18px;
        color: #ffffff;
        margin-top: 5px;
      }
    }
    .handle-number-style {
      align-items: flex-start;
      margin-top: 3px;
      .handle-number {
        font-size: 20px;
        color: #004e97;
        letter-spacing: 0;
        font-weight: 600;
      }
    }
    .proportion-style {
      align-items: center;
      font-size: 16px;
      color: #50e3c2;
      margin-top: 5px;
      .float-value {
        font-size: 18px;
        color: #004e97;
        font-weight: 600;
      }
      img {
        vertical-align: middle;
      }
      .font-color-red {
        color: #e62112;
        font-weight: 600;
      }
      .font-color-blue {
        color: #50e3c2;
        font-weight: 600;
      }
    }
    .average-style {
      align-items: flex-end;
      font-size: 18px;
      color: #004e97;
      letter-spacing: 0;
      margin-top: 5px;
    }
    .explain {
      font-size: 12px;
      color: #9b9b9b;
      letter-spacing: 0;
    }
  }
  .teller-chart-info {
    width: 100%;
    height: 75%;
  }
}
.teller-height-100 {
  height: 100%;
}
</style>

