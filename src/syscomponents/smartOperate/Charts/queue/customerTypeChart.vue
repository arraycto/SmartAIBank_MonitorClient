<template>
  <div v-if="customerData.distributionList&&customerData.distributionList.length>0&&customerData.groupList&&customerData.groupList.length>0">
    <el-row :gutter="10" class="height-23">
      <el-col :span="10">
        <div class="customer-type-chart-queue-wait-style">
          <div class="customer-type-style">
            <font class="customer-type-timer">{{customerData.value}}</font>
            <font class="customer-type-timer-explain">{{customerData.name}}&nbsp;&nbsp;(分钟)</font>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="customer-type-chart-contrast-average-content">
          <div class="customer-type-contrast-average">
            <font class="customer-type-float-value" :class="[rateDataColor]">
              {{showRateData}}
              <img :src="parseFloat(customerData.rate)>0?arrowsUp:arrowsDown" v-if="rateDataColor"/>
            </font>
            <font class="customer-type-average-value" v-if="bankLevel != 'core'">{{customerData.totalAvg}}</font>
          </div>
          <div class="customer-type-contrast-average">
            <font>环比</font>
            <font v-if="bankLevel != 'core'">全行平均&nbsp;&nbsp;(分钟)</font>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row  class="height-77">
      <el-col :span="10"  class="height-100">
        <div :id="circleChartId" class="customer-type-chart"></div>
      </el-col>
      <el-col :span="14"  class="height-100">
        <div :id="lineChartId" class="customer-type-chart"></div>
      </el-col>
    </el-row>
  </div>
  <occupied v-else height='100%' :explain="'暂无'+customerData.name+'数据'"/>
</template>

<script>
import echarts from 'echarts'
import options from './chartOptions'
import occupied from '@/components/Occupied/occupied'

export default {
  name: 'monthChart',
  props: { lineChartId: String, circleChartId: String, customerData: Object  },
  components: { occupied },
  data () {
    return {
      arrowsUp: require('@/assets/arrows_up.png'),
      arrowsDown: require('@/assets/arrows_down.png'),
      bankLevel: this.$store.state.operate.bankLevel
    }
  },
  mounted () {
    this.initLineChart()
    this.initPieChart()
  },
  methods: {
    // 线性图表
    initLineChart () {
      if (!(document.getElementById(this.lineChartId))) return
      const lineChart = echarts.init(document.getElementById(this.lineChartId))
      const curList = []
      const averageList = []
      const rateData = []
      this.customerData.distributionList.map((item) => {
        curList.push(item.value)
        averageList.push(item.totalAvg)
        rateData.push(item.rate !== undefined ? (parseFloat(item.rate) * 100).toFixed(2) : 'null')
      })

      var mLineOption = ''
      if (this.bankLevel === 'core') {
        mLineOption = options.entityCustomerTypeLineOption(curList, [], rateData)
      } else {
        mLineOption = options.entityCustomerTypeLineOption(curList, averageList, rateData)
      }
      lineChart.setOption(mLineOption, true)
    },
    // 饼状图表
    initPieChart () {
      if (!(document.getElementById(this.circleChartId))) return
      const circleChart = echarts.init(document.getElementById(this.circleChartId))
      const chartData = []
      this.customerData.groupList.map((item) => {
        chartData.push({
          name: item.desc,
          value: item.value
        })
      })
      const mPieOption = options.entityCustomerTypePieOption(chartData)
      circleChart.setOption(mPieOption, true)
    }
  },
  watch: {
    'customerData.distributionList': {
      handler (value) {
        this.$nextTick(function () {
          if (value && value.length > 0) this.initLineChart()
        })
      },
      deep: true
    },
    'customerData.groupList': {
      handler (value) {
        this.$nextTick(function () {
          if (value && value.length > 0) this.initPieChart()
        })
      },
      deep: true
    }
  },
  computed: {
    // 计算环比 如果环比不返回代表上一月为0，显示‘----’
    showRateData: function () {
      if (this.customerData.rate || this.customerData.rate === 0) {
        return ((this.customerData.rate) * 100).toFixed(2) + '%'
      } else {
        return '----'
      }
    },
    rateDataColor: function () {
      if (this.customerData.rate && this.customerData.rate !== 0) {
        if (this.customerData.rate > 0) {
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
.customer-type-chart-queue-wait-style {
  display: flex;
  flex-direction: row;
  .queue-img {
    height: 40px;
    width: 40px;
    align-self: center;
  }
  .customer-type-style {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    .customer-type-timer {
      display: flex;
      align-content: flex-start;
      font-size: 24px;
      color: #004e97;
      letter-spacing: 0;
    }
    .customer-type-timer-explain {
      font-size: 12px;
      color: #9b9b9b;
      letter-spacing: 0;
    }
  }
}
.customer-type-chart-contrast-average-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  margin-top: 8px;
  .customer-type-contrast-average {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-shrink: 1;
    font {
      font-size: 12px;
      color: #9b9b9b;
      letter-spacing: 0;
    }
    .customer-type-float-value {
      font-size: 18px;
      color: #004e97;
      font-weight: 600;
      img {
        vertical-align: middle;
      }

    }
    .customer-type-average-value {
      font-size: 18px;
      color: #004e97;
      font-weight: 600;
    }
    .font-color-red {
      color: #E62112;

    }
    .font-color-blue {
      color: #50E3C2;
    }
  }
}
.customer-type-chart {
  height: 170px;
  width: 100%;
}
.height-23{
  height: 23%;
}
.height-77{
  height: 77%;
  padding-top: 20px;
}
.height-100{
  height: 100%;
}
</style>

