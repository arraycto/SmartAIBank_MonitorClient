<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="waveChart-time-style">
          <img :src="waveImg" class="wave-img">
          <div class="timer-style">
            <font class="timer">{{waveData.count}}</font>
            <font class="timer-explain">{{chartName}}&nbsp;&nbsp;{{chartDesc}}</font>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="waveChart-average-style">
          <div class="contrast-average">
            <font class="float-value" :class="[calFontColor(waveData.rate)]">
              {{showRateData}}
              <img :src="waveData.rate > 0?arrowsUp:arrowsDown" :style="{verticalAlign: 'middle'}" v-if="waveData.rate"/>
            </font>
            <font class="average-value">{{waveData.avgValue}}</font>
            <font class="average-value">{{waveData.branchAvg}}</font>
          </div>
          <div class="contrast-average">
            <font>环比</font>
            <font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;全行平均&nbsp;&nbsp;{{chartDesc}}</font>
            <font>本机构平均&nbsp;&nbsp;{{chartDesc}}</font>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div :id="chartId" class="waveChart-wave-chart"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import options from './chartOptions'
import base from '@/common/base'

export default {
  name: 'entitywaveChart',
  props: { chartId: String, chartDesc: String, chartName: String, chartImg: String, waveData: Object },
  data () {
    return {
      waveImg: require('@/assets/smartOperate/hallMarket/' + this.chartImg),
      arrowsUp: require('@/assets/arrows_up.png'),
      arrowsDown: require('@/assets/arrows_down.png')
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      const chart = echarts.init(document.getElementById(this.chartId))
      const xData = []
      const currentValue = []
      const avgValue = []
      const entityAvgValue = []
      const rateList = []
      // 设置xAxis的值
      this.waveData.list.map(function (value) {
        xData.push(value.time)
        currentValue.push(value.count)
        avgValue.push(value.avgValue)
        entityAvgValue.push(value.branchAvg)
        if (!value.rate && value.rate !== 0) {
          rateList.push('noRate')
        } else {
          rateList.push(value.rate)
        }
      })
      const mOption = options.entityOption(base.timerShaft(xData), currentValue, avgValue, entityAvgValue, this.chartName, rateList)
      chart.setOption(mOption, true)
      window.onresize = function () {
        chart.resize()
      }
    },
    calFontColor (data) {
      if (data > 0) {
        return 'up-color'
      } else if (data < 0) {
        return 'down-color'
      } else {
        return 'font-color-before'
      }
    }
  },
  watch: {
    waveData: {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) this.initChart()
        })
      },
      deep: true
    },
    'waveData.list': {
      handler (value) {
        this.$nextTick(function () {
          if (value !== null  && value.length > 0) this.initChart()
        })
      },
      deep: true
    }
  },
  computed: {
    // 计算环比 如果环比不返回代表上一月为0，显示‘----’
    showRateData: function () {
      if (this.waveData.rate || this.waveData.rate === 0) {
        return (this.waveData.rate * 100).toFixed(2) + '%'
      } else {
        return '----'
      }
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.waveChart-time-style {
  display: flex;
  flex-direction: row;
  .wave-img {
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
    .teller-timer {
      display: flex;
      align-content: flex-start;
      font-size: 26px;
      color: #000000;
      letter-spacing: 0;
    }
    .teller-timer-explain {
      font-size: 15px;
      color: #000000;
      letter-spacing: 0;
      text-align:left;
    }
  }
}
.waveChart-average-style {
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
      color: #e62112;
      font-weight: 600;
    }
    .average-value {
      font-size: 18px;
      color: #004e97;
      font-weight: 600;
    }
    .up-color{
      color:#E62112
    }
    .down-color{
      color:#50E3C2
    }
    .font-color-before{
      color: #004e97;
    }
  }
}
.waveChart-wave-chart{
  min-height: 220px;
  width: 100%;
  margin-top: 10px;
}
</style>

