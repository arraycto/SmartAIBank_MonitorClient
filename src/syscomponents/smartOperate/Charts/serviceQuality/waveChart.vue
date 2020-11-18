<template>
  <div v-if="waveData&&waveData.distributionList&&waveData.distributionList.length>0">
    <el-row :gutter="10">
      <el-col :span="16">
        <div class="waveChart-time-style">
          <img :src="waveImg" class="wave-img">
          <div class="timer-style">
            <font class="timer">{{(waveData.value*100).toFixed(2)}}</font>
            <font class="timer-explain">{{chartName}}&nbsp;&nbsp;(%)</font>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="waveChart-average-style">
          <div class="contrast-average">
            <font class="float-value" :class="[rateDataColor]">
              {{showRateData}}
              <img :src="waveData.rate > 0?arrowsUp:arrowsDown" :style="{verticalAlign: 'middle'}" v-if="rateDataColor"/>
            </font>
            <font class="average-value" v-if="bankLevel != 'core'">{{(waveData.totalAvg*100).toFixed(2)}}</font>
          </div>
          <div class="contrast-average">
            <font>环比</font>
            <font v-if="bankLevel != 'core'">全行平均&nbsp;&nbsp;(%)</font>
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
  <occupied v-else :explain="occupyTitle"/>
</template>

<script>
import echarts from 'echarts'
import options from './chartOptions'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'

export default {
  name: 'waveChart',
  props: { chartId: String, chartName: String, chartImg: String, waveData: Object },
  data () {
    return {
      waveImg: require('@/assets/smartOperate/serviceQuality/' + this.chartImg),
      arrowsUp: require('@/assets/arrows_up.png'),
      arrowsDown: require('@/assets/arrows_down.png'),
      bankLevel: this.$store.state.operate.bankLevel,
      occupyTitle: '暂无' + this.chartName + '数据~~'
    }
  },
  mounted () {
    this.initChart()
  },
  components: {
    occupied
  },
  methods: {
    initChart () {
      if (document.getElementById(this.chartId) === null) return
      const me = this
      const chart = echarts.init(document.getElementById(this.chartId))
      const xData = []
      const currentValue = []
      let avgValue = []
      let avgname = '全行平均'
      const rateData = []
      // 设置xAxis的值
      this.waveData.distributionList.map(function (value) {
        xData.push(value.time)
        currentValue.push(((value.value) * 100).toFixed(2))
        avgValue.push(((value.totalAvg) * 100).toFixed(2))
        rateData.push(value.rate !== undefined ? (parseFloat(value.rate) * 100).toFixed(2) : 'null')
      })
      if (me.$store.state.operate.bankLevel === 'core') {
        avgname = 'none'
        avgValue = []
      }
      const mOption = options.entityMonthOption(base.timerShaft(xData), currentValue, avgValue, this.chartName, avgname, rateData)
      chart.setOption(mOption, true)
      window.onresize = function () {
        chart.resize()
      }
    }
  },
  watch: {
    'waveData.distributionList': {
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
      if (this.waveData.rate || this.waveData.rate === 0) {
        return (this.waveData.rate * 100).toFixed(2) + '%'
      } else {
        return '----'
      }
    },
    rateDataColor: function () {
      if (this.waveData.rate && this.waveData.rate !== 0) {
        if (this.waveData.rate > 0) {
          return 'up-color'
        } else {
          return 'down-color'
        }
      } else {
        return ''
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
      color: #004e97;
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
  }
}
.waveChart-wave-chart{
  min-height: 220px;
  width: 100%;
  margin-top: 10px;
}
</style>

