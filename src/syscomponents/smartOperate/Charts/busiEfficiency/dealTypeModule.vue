<template>
  <div class="deal-type-module">
    <transition name="frontage">
      <!-- 交易数据模块 -->
      <div class="frontage-deal" @mousemove="onMouseMove" @mouseout="onMouseOut" v-if="isFrontage">
        <div class="deal-name">{{dealData.tradeName}}</div>
        <el-row :gutter="10">
          <el-col :span="10">
            <div class="queue-wait-timer-style">
              <div class="timer-style">
                <font class="timer">{{dealData.trandCount}}</font>
                <font class="timer-explain">交易笔数&nbsp;&nbsp;(笔)</font>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="queue-wait-timer-style">
              <div class="timer-style">
                <font
                  class="float-value"
                  :class="[countRateDataColor]">
                  {{showRateData}}
                  <img :src="parseFloat(dealData.tranCountRing)>0?arrowsUp:arrowsDown" v-if="countRateDataColor"/>
                </font>
                <font class="timer-explain">环比</font>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="queue-wait-timer-style">
              <div class="timer-style">
                <font class="average-value">{{dealData.tranCountTotalAvg}}</font>
                <font class="timer-explain">全行平均&nbsp;&nbsp;(笔)</font>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <div class="queue-wait-timer-style">
              <div class="timer-style">
                <font class="timer">{{dealData.handleTimeAvg}}</font>
                <font class="timer-explain">平均处理时长&nbsp;&nbsp;(分钟)</font>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="queue-wait-timer-style">
              <div class="timer-style">
                <font
                  class="float-value"
                  :class="[timeRateDataColor]"
                >
                  {{showHandleTimeData}}
                  <img :src="parseFloat(dealData.handleTimeRing)>0?arrowsUp:arrowsDown" v-if="timeRateDataColor"/>
                </font>
                <font class="timer-explain">环比</font>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="queue-wait-timer-style">
              <div class="timer-style">
                <font class="average-value">{{dealData.handleTimeTotalAvg}}</font>
                <font class="timer-explain">全行平均&nbsp;&nbsp;(分钟)</font>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="overturn-mask-layer" v-show="isMaskLayer">
          <img
            src="../../../../assets/overturn_blue_icon.png"
            width="90"
            height="95"
            alt
            @click="onOverturnClick"
          />
          <font @click="onOverturnClick">翻转</font>
        </div>
      </div>
    </transition>
    <transition name="reverse">
        <!-- 图表模块 -->
      <div class="reverse-chart" v-if="!isFrontage">
        <img
          src="../../../../assets/overturn_white_icon.png"
          class="back-frontage-img"
          alt
          @click="onBackFrontageClick"
        />
        <div class="line-chart" :id="chartId">
          <!-- {{chartId}} -->
        </div>
      </div>
    </transition>
    <div style="bag"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions'
import base from '@/common/base'

export default {
  name: 'dealTypeModule',
  props: {
    dealData: Object,
    chartId: String,
    tranFlag: String,
    mName: String,
    currReversalId: String
  },
  data () {
    return {
      arrowsUp: require('@/assets/arrows_up.png'),
      arrowsDown: require('@/assets/arrows_down.png'),
      isMaskLayer: false, // 是否显示遮罩层
      isFrontage: true // 是否正面
    }
  },
  methods: {
    requestTradeTrend () {
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        tradeType: this.dealData.tradeCode,
        tranFlag: this.tranFlag,
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      this.$http.getTrend('timeConsumingTrade', params).then(result => {
        const timeConsumingTradeList = result.tendList
        setTimeout(function () {
          this.initChart(timeConsumingTradeList)
        }.bind(this), 500)
      })
    },
    // 鼠标移入
    onMouseMove () {
      this.isMaskLayer = true
    },
    // 鼠标移出
    onMouseOut () {
      this.isMaskLayer = false
    },
    // 翻转到反面
    onOverturnClick () {
      this.isFrontage = false
      this.requestTradeTrend()
      this.$emit('onReversalListen', this.chartId)
    },
    // 返回正面
    onBackFrontageClick () {
      this.isFrontage = true
      this.$emit('onReversalListen', '')
    },
    // 交易图表
    initChart (list) {
      if (!(document.getElementById(this.chartId))) return
      const mChart = echarts.init(document.getElementById(this.chartId))
      const xData = []; const tradeNumArr = []; const disposeTimeList = []; const allDealAverageList = []; const  allDisposeAverageList = []
      const tradeNumRatioList = []
      const handleTimeRatioList = []
      const fastHandleTimeList = []
      // 设置xAxis的值
      list.map(function (item) {
        xData.push(item.time)
        tradeNumArr.push(item.trandCount || 0)
        disposeTimeList.push(item.tranCountTotalAvg || 0)
        allDealAverageList.push(item.handleTimeAvg || 0)
        allDisposeAverageList.push(item.handleTimeTotalAvg || 0)
        if (!item.tranCountRing && item.tranCountRing !== 0) {
          tradeNumRatioList.push('noRate')
        } else {
          tradeNumRatioList.push(item.tranCountRing)
        }
        if (!item.handleTimeRing && item.handleTimeRing !== 0) {
          handleTimeRatioList.push('noRate')
        } else {
          handleTimeRatioList.push(item.handleTimeRing)
        }
        fastHandleTimeList.push(item.mostQuickTime || 0)
      })


      const mOption = options.deallinerOption(base.timerShaft(xData), tradeNumArr, disposeTimeList, allDealAverageList, allDisposeAverageList, tradeNumRatioList, handleTimeRatioList, fastHandleTimeList)
      mChart.setOption(mOption, true)
    }
  },
  watch: {
    // 日期控件类型改变监听
    '$store.state.operate.timeRange': function (newValue, oldValue) {
      if (!this.isFrontage && base.isActivity(this.mName)) {
        this.requestTradeTrend()
      }
    },
    '$store.state.orgId': function (newValue, oldValue) {
      this.onBackFrontageClick()
    },
    '$store.state.operate.dayDateRange': function (newValue, oldValue) {
      if (!this.isFrontage && base.isActivity(this.mName)) {
        this.requestTradeTrend()
      }
    },
    currReversalId: function (v) {
      if (v === this.chartId) {
        this.isFrontage = false
      } else {
        this.isFrontage = true
      }
    }
  },
  computed: {
    // 计算环比 如果环比不返回代表上一月为0，显示‘----’
    showRateData: function () {
      if (this.dealData.tranCountRing || this.dealData.tranCountRing === 0) {
        return ((this.dealData.tranCountRing) * 100).toFixed(2) + '%'
      } else {
        return '----'
      }
    },
    showHandleTimeData: function () {
      if (this.dealData.handleTimeRing || this.dealData.handleTimeRing === 0) {
        return ((this.dealData.handleTimeRing) * 100).toFixed(2) + '%'
      } else {
        return '----'
      }
    },
    countRateDataColor: function () {
      if (this.dealData.tranCountRing && this.dealData.tranCountRing !== 0) {
        if (this.dealData.tranCountRing > 0) {
          return 'font-color-red'
        } else {
          return 'font-color-blue'
        }
      } else {
        return ''
      }
    },
    timeRateDataColor: function () {
      if (this.dealData.handleTimeRing && this.dealData.handleTimeRing !== 0) {
        if (this.dealData.handleTimeRing > 0) {
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
.deal-type-module {
  height: 100%;
  width: 100%;
  position: relative;
  .frontage-deal {
    height: 100%;
    width: 100%;
    padding: 15px;
    cursor: pointer;
    background: white;
    border-radius: 4px;
    position: relative;
    z-index: 0;
    .deal-name {
      font-size: 18px;
      color: #4a4a4a;
      letter-spacing: 0;
      margin-bottom: 30px;
      text-align: left;
      font-weight: 600;
    }
    .el-row {
      margin-top: 25px;
    }
    .queue-wait-timer-style {
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
        .timer {
          display: flex;
          align-content: flex-start;
          font-size: 17px;
          color: #004e97;
          letter-spacing: 0;
        }
        .timer-explain {
          font-size: 12px;
          color: #4a4a4a;
          letter-spacing: 0;
          text-align: left;
          margin-top: 5px;
        }
        .float-value {
          font-size: 17px;
          color: #4a4a4a;
          font-weight: 600;
          img{
            vertical-align: middle;
          }
        }
        .average-value {
          font-size: 17 px;
          color: #4a4a4a;
          font-weight: 600;
          text-align: left;
        }
        .font-color-red{
          color: #E62112;

        }
        .font-color-blue{
          color: #50E3C2;
        }
      }
    }
    .overturn-mask-layer {
      position: absolute;
      top: 0px;
      left: 0px;
      background: #FFFFFF;
      z-index: 10;
      height: 100%;
      width: 100%;
      opacity: 0.8;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      font-size: 24px;
      color: #4A4A4A;
    }
  }
  .reverse-chart {
    height: 100%;
    width: 100%;
    min-height: 200px;
    opacity: 0.8;
    background-image: radial-gradient( #00316A 0%, #011C3B 100%);
    border-radius: 4px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    padding: 10px;
    .back-frontage-img {
      width: 28px;
      height: 30px;
      padding: 5px;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
      z-index: 3;
    }
    .line-chart{
      height: 100%;
      width: 100%;
      min-height: 180px;
      z-index: 2;
    }
  }
}


.frontage-enter-active{
   -webkit-animation-duration: .0.75s;
  animation-duration: 0.75s;
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation-name: flipInY;
  animation-name: flipInY;

}
.frontage-leave-active {
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation-name: flipOutY;
  animation-name: flipOutY;
}
 .frontage-leave-to{
  display: none;
}

.reverse-enter-active{
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation-name: flipInY;
  animation-name: flipInY;
}
.reverse-leave-active {
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation-name: flipOutY;
  animation-name: flipOutY;
}
.reverse-leave-to{
  display: none;
}

@keyframes flipOutY {
  from {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }

  30% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
    opacity: 1;
  }

  to {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    opacity: 0;
  }
}
@keyframes flipInY {
  from {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    opacity: 1;
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}
</style>