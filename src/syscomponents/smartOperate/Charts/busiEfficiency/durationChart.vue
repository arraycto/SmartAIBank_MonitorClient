<template>
  <div v-if="durationData&&durationData.timeGroupDealTimeList&&durationData.timeGroupDealTimeList.length>0">
    <el-row :gutter="10">
      <el-col :span="14">
        <div class="duration-chart-style">
          <img :src="queueImg" class="queue-img">
          <div class="timer-style">
            <font class="timer">{{durationData.handleTimeAvg}}</font>
            <font class="timer-explain">交易平均处理时长&nbsp;&nbsp;(分钟)</font>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="duration-chart-contrast-average-content">
          <div class="contrast-average">
            <font class="float-value" :class="[rateDataColor]">
              {{showRateData}}
              <img :src="parseFloat(durationData.handleTimeRing)>0?arrowsUp:arrowsDown" v-if="rateDataColor"/>
            </font>
            <font class="average-value" v-if="bankLevel != 'core'">{{durationData.handleTimeTotalAvg}}</font>
          </div>
          <div class="contrast-average">
            <font>环比</font>
            <font v-if="bankLevel != 'core'">全行平均&nbsp;&nbsp;(分钟)</font>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="durationChartsId" class="durtaion-chart"></div>
      </el-col>
    </el-row>
  </div>
  <occupied v-else height='100%' explain="暂无交易平均处理时长数据"/>
</template>

<script>
import echarts from 'echarts'
import options from './chartOptions'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'

export default {
  name: 'durationChart',
  props: { durationData: Object },
  components: { occupied },
  data () {
    return {
      queueImg: require('@/assets/business_duration_icon.png'),
      arrowsUp: require('@/assets/arrows_up.png'),
      arrowsDown: require('@/assets/arrows_down.png'),
      bankLevel: this.$store.state.operate.bankLevel
    }
  },
  mounted () {
    if (this.durationData && this.durationData.timeGroupDealTimeList && this.durationData.timeGroupDealTimeList.length > 0) {
      this.initChart()
    }
  },
  methods: {
    initChart () {
      if (!(document.getElementById('durationChartsId'))) return
      const chart = echarts.init(document.getElementById('durationChartsId'))
      const xData = []
      const curList = []
      const averageList = []
      const rateData = []
      // 设置xAxis的值
      this.durationData.timeGroupDealTimeList.map(function (value) {
        xData.push(value.time)
        curList.push(parseFloat(value.value).toFixed(2))
        averageList.push(parseFloat(value.totalAvg).toFixed(2))
        rateData.push(value.rate !== undefined ? (parseFloat(value.rate) * 100).toFixed(2) : 'null')
      })

      var mOption = ''
      if (this.bankLevel === 'core') {
        const showDataCore = [{ 'name': '交易平均处理时长', 'icon': 'circle' }]
        mOption = options.durationOption(base.timerShaft(xData), curList, [], showDataCore, rateData)
      } else {
        const showData = [{ 'name': '交易平均处理时长', 'icon': 'circle' }, { 'name': '全行平均', 'icon': 'image:// data:image/png;base64,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' }]
        mOption = options.durationOption(base.timerShaft(xData), curList, averageList, showData, rateData)
      }

      chart.setOption(mOption, true)
    }
  },
  watch: {
    'durationData.timeGroupDealTimeList': {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) this.initChart()
        })
      },
      deep: true
    }
  },
  computed: {
    // 计算环比 如果环比不返回代表上一月为0，显示‘----’
    showRateData: function () {
      if (this.durationData.handleTimeRing || this.durationData.handleTimeRing === 0) {
        return ((this.durationData.handleTimeRing) * 100).toFixed(2) + '%'
      } else {
        return '----'
      }
    },
    rateDataColor: function () {
      if (this.durationData.handleTimeRing && this.durationData.handleTimeRing !== 0) {
        if (this.durationData.handleTimeRing > 0) {
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
.duration-chart-style {
  display: flex;
  flex-direction: row;
  .queue-img {
    height: 40px;
    width: 40px;
    align-self: center;
  }
  .timer-style {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    .timer {
      display: flex;
      align-content: flex-start;
      font-size: 26px;
      color: #004e97;
      letter-spacing: 0;
    }
    .timer-explain {
      font-size: 12px;
      color: #9b9b9b;
      letter-spacing: 0;
    }
  }
}
.duration-chart-contrast-average-content {
  display: flex;
  flex-direction: column;
  min-height: 47px;
  justify-content: flex-end;
  .contrast-average {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-shrink: 1;
    font {
      font-size: 12px;
      color: #9b9b9b;
      letter-spacing: 0;
    }
    .float-value {
      font-size: 18px;
      color: #004e97;
      font-weight: 600;
      img{
        vertical-align: middle;
      }
    }
    .average-value {
      font-size: 18px;
      color: #004e97;
      font-weight: 600;
    }
    .font-color-red{
          color: #E62112;

    }
    .font-color-blue{
      color: #50E3C2;
    }
  }
}
.durtaion-chart {
  min-height: 220px;
  width: 100%;
  margin-top: 10px;
}
</style>

