 <template>
  <div class="teller-handle-time-content">
    <div class="teller-head-info">
      <el-row class="teller-height-100">
        <el-col :span="9" class="teller-height-100">
          <div class="teller-height-100 flex-row">
            <img :src="currIcon" alt width="40" height="40" />
            <div class="flex-column handle-number-style">
              <font
                class="handle-number"
                v-if="chartName === '评价率' || chartName === '好评率' || chartName === '差评率'"
              >{{showValue}}</font>
              <font
                class="handle-number"
                v-else-if="chartName === '平均处理时长'"
              >{{parseFloat(chartData.value).toFixed(2)}}</font>
              <font class="handle-number" v-else>{{chartData.value}}</font>
              <font class="explain">{{chartName}}&nbsp;&nbsp;({{unit}})</font>
            </div>
          </div>
        </el-col>
        <el-col :span="5" class="teller-height-100">
          <div class="teller-height-100 flex-column proportion-style">
            <font :class="[rateDataColor]" class="float-value">
              {{showRateData}}&nbsp;
              <img
                :src="parseFloat(chartData.rate)>0?arrowsUp:arrowsDown"
                v-if="rateDataColor"
              />
            </font>
            <font class="explain">环比</font>
          </div>
        </el-col>
        <el-col :span="3" class="teller-height-100">
          <div class="teller-height-100 flex-column proportion-style">
            <font :class="[chartData.rankTrend=='0'?'font-color-red':'font-color-blue']">
              {{chartData.rankNo}}&nbsp;
              <img :src="chartData.rankTrend=='0'?arrowsUp:arrowsDown" />
            </font>
            <font class="explain">排名</font>
          </div>
        </el-col>
        <el-col :span="3" class="teller-height-100">
          <div class="teller-height-100 flex-column average-style">
            <font
              v-if="chartName === '评价率' || chartName === '好评率' || chartName === '差评率'"
            >{{(chartData.totalAvg+"").indexOf('.')>=0?(parseFloat(chartData.totalAvg) * 100).toFixed(2):(chartData.totalAvg*100||0).toFixed(2)}}%</font>
            <font
              v-else
            >{{(chartData.totalAvg+"").indexOf('.')>=0?(parseFloat(chartData.totalAvg)).toFixed(2):chartData.totalAvg}}</font>
            <font class="explain">全行平均</font>
          </div>
        </el-col>
        <el-col :span="4" class="teller-height-100">
          <div class="teller-height-100 flex-column average-style">
            <font
              v-if="chartName === '评价率' || chartName === '好评率' || chartName === '差评率'"
            >{{(chartData.branchAvg+"").indexOf('.')>=0?(parseFloat(chartData.branchAvg)* 100).toFixed(2):(chartData.branchAvg*100||0).toFixed(2)}}%</font>
            <font
              v-else
            >{{(chartData.branchAvg+"").indexOf('.')>=0?(parseFloat(chartData.branchAvg)).toFixed(2):chartData.branchAvg}}</font>
            <font class="explain">本机构平均</font>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="teller-chart-info" :id="chartId"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import options from './chartOptions'
import base from '@/common/base'

export default {
  name: 'detailsModuleChart',
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
  components: {

  },
  mounted () {
    this.initPage()
    this.initChart()
  },
  methods: {
    // 设置页面数据
    initPage () {
      switch (this.chartType) {
      case 'time':
        this.chartName = '平均处理时长'
        this.unit = '分钟'
        this.currIcon = require('@/assets/business_duration_icon.png')
        break
      case 'number':
        this.chartName = '交易笔数'
        this.unit = '笔'
        this.currIcon = require('@/assets/trade_number_icon.png')
        break
      case 'evaluate':
        this.chartName = '评价率'
        this.unit = '%'
        this.currIcon = require('@/assets/smartOperate/serviceQuality/EvaluationRate.png')
        break
      case 'good':
        this.chartName = '好评率'
        this.unit = '%'
        this.currIcon = require('@/assets/smartOperate/serviceQuality/FeedbackRate.png')
        break
      case 'bad':
        this.chartName = '差评率'
        this.unit = '%'
        this.currIcon = require('@/assets/smartOperate/serviceQuality/BadRate.png')
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
          avgData.push(item.value * 100)
          avgTotalData.push(item.totalAvg * 100)
          avgBranchData.push(item.branchAvg * 100)
        } else if (self.chartName === '平均处理时长') {
          avgData.push(parseFloat(item.value).toFixed(2))
          avgTotalData.push(parseFloat(item.totalAvg).toFixed(2))
          avgBranchData.push(parseFloat(item.branchAvg).toFixed(2))
        } else {
          avgData.push(item.value)
          avgTotalData.push(item.totalAvg)
          avgBranchData.push(item.branchAvg)
        }
      })
      const mOption = options.tellerHandleTimeOption(self.chartName, base.timerShaft(xData), avgData, avgTotalData, avgBranchData, rateData)
      mChart.setOption(mOption, true)
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
    showValue: function () {
      if (this.chartData.value || this.chartData.value === 0) {
        return (this.chartData.value * 100).toFixed(2) + '%'
      } else {
        return '0.00'
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
  .teller-head-info {
    width: 100%;
    height: 20%;
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
    .handle-number-style {
      align-items: flex-start;
      margin-top: 3px;
      margin-left: 10px;
      .handle-number {
        font-size: 20px;
        color: #004e97;
        letter-spacing: 0;
        font-weight: 600;
      }
    }
    .proportion-style {
      align-items: center;
      font-size: 18px;
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
      margin-top: 5px;
    }
  }
  .teller-chart-info {
    width: 100%;
    height: 80%;
  }
}
.teller-height-100 {
  height: 100%;
}
</style>

