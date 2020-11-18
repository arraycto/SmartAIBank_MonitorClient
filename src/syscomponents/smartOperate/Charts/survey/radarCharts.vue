<template>
  <div v-if="chartData != null&& chartData.avgDealTime!=null&& chartData.reserve!=null&& chartData.avgWaitTime!=null&& chartData.customer!=null&& chartData.praise!=null"
       @mouseenter="enter()"
       @mouseleave="leave()"
       class="radarcharts-style">
    <div class='root-style'
         :class="[rotate?[aspect?'left-radar-click':'right-radar-click']:'no-click']">
      <div class="keliu-style"
           :class="[keliuclick?'panel-click':'no-click']"
           @click="flag&&ShowTop('keliu')">
        <div class="circle-left-img">
          <img class="img"
               :src="keliuImg" />
        </div>
        <transition name="slide-rightfade">
          <div class="left-style"
               v-if="keliuflag">
            <img class="img"
                 :src="leftImg" />
            <div :class="bankType == 'core' ? 'desc-left-center' : 'desc-left-top'">
              <div class="desc-style">
                <font class="span-font">接待客户数：</font>
                <font class="data-font">{{chartData.customer.recieveCount || 0}}&nbsp;</font>
                <font class="span-font">人</font>
              </div>
              <div class="desc-style">
                <font class="span-font">环比：</font>
                <font class="num-font"
                      :class="[chartData.customer.rate > 0?'up-color':'down-color']">{{calRate(chartData.customer.rate)}} {{calSymbol(chartData.customer.rate)}}</font>
              </div>
              <div class="desc-style"
                   v-if="bankType != 'core'">
                <font class="span-font">全行平均：</font>
                <font class="avgdata-font">{{chartData.customer.avgValue || 0}}&nbsp;</font>
                <font class="span-font">人</font>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="paidui-style"
           :class="[paiduiclick?'panel-click':'no-click']"
           @click="flag&&ShowTop('paidui')">
        <div class="circle-left-img">
          <img class="img"
               :src="paiduiImg" />
        </div>
        <transition name="slide-rightfade">
          <div class="left-style"
               v-if="paiduiflag">
            <img class="img"
                 :src="leftImg" />
            <div :class="bankType == 'core' ? 'desc-left-center' : 'desc-left-top'">
              <div class="desc-style">
                <font class="span-font">排队等待时间：</font>
                <font class="data-font">{{chartData.avgWaitTime.avgWaitTime || 0}}&nbsp;</font>
                <font class="span-font">分钟</font>
              </div>
              <div class="desc-style">
                <font class="span-font">环比：</font>
                <font class="num-font"
                      :class="[chartData.avgWaitTime.rate > 0?'up-color':'down-color']">{{calRate(chartData.avgWaitTime.rate)}} {{calSymbol(chartData.avgWaitTime.rate)}}</font>
              </div>
              <div class="desc-style"
                   v-if="bankType != 'core'">
                <font class="span-font">全行平均：</font>
                <font class="avgdata-font">{{chartData.avgWaitTime.avgValue || 0}}&nbsp;</font>
                <font class="span-font">分钟</font>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="efficiency-style"
           :class="[efficiencyclick?'panel-click':'no-click']"
           @click="flag&&ShowTop('efficiency')">
        <div class="circle-left-img">
          <img class="img"
               :src="efficiencyImg" />
        </div>
        <transition name="slide-rightfade">
          <div class="left-style"
               v-if="efficiencyflag">
            <img class="img"
                 :src="leftImg" />
            <div :class="bankType == 'core' ? 'desc-left-center' : 'desc-left-top'">
              <div class="desc-style">
                <font class="span-font">交易平均处理时长：</font>
                <font class="data-font">{{chartData.avgDealTime.avgDealTime || 0}}&nbsp;</font>
                <font class="span-font">分钟</font>
              </div>
              <div class="desc-style">
                <font class="span-font">环比：</font>
                <font class="num-font"
                      :class="[chartData.avgDealTime.rate > 0?'up-color':'down-color']">{{calRate(chartData.avgDealTime.rate)}} {{calSymbol(chartData.avgDealTime.rate)}}</font>
              </div>
              <div class="desc-style"
                   v-if="bankType != 'core'">
                <font class="span-font">全行平均：</font>
                <font class="avgdata-font">{{chartData.avgDealTime.avgValue || 0}}&nbsp;</font>
                <font class="span-font">分钟</font>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="quality-style"
           :class="[qualityclick?'panel-click':'no-click']"
           @click="flag&&ShowTop('quality')">
        <div class="circle-right-img">
          <img class="img"
               :src="qualityImg" />
        </div>
        <transition name="slide-leftfade">
          <div class="left-style"
               v-if="qualityflag">
            <img class="img"
                 :src="leftImg" />
            <div :class="bankType == 'core' ? 'desc-right-center' : 'desc-right-top'">
              <div class="desc-rightstyle">
                <font class="span-font">差评率：</font>
                <font class="data-font">{{(chartData.praise.praiseRate*100).toFixed(2) || 0}}&nbsp;</font>
                <font class="span-font">%</font>
              </div>
              <div class="desc-rightstyle">
                <font class="span-font">环比：</font>
                <font class="num-font"
                      :class="[chartData.praise.rate > 0?'up-color':'down-color']">{{calRate(chartData.praise.rate)}} {{calSymbol(chartData.praise.rate)}}</font>
              </div>
              <div class="desc-rightstyle"
                   v-if="bankType != 'core'">
                <font class="span-font">全行平均：</font>
                <font class="avgdata-font">{{(chartData.praise.avgValue*100).toFixed(2) || 0}}&nbsp;</font>
                <font class="span-font">%</font>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="yingxiao-style"
           :class="[yingxiaoclick?'panel-click':'no-click']"
           @click="flag&&ShowTop('yingxiao')">
        <div class="circle-right-img">
          <img class="img"
               :src="yingxiaoImg" />
        </div>
        <transition name="slide-leftfade">
          <div class="left-style"
               v-if="yingxiaoflag">
            <img class="img"
                 :src="leftImg" />
            <div :class="bankType == 'core' ? 'desc-right-center' : 'desc-right-top'">
              <div class="desc-rightstyle">
                <font class="span-font">预约购买登记数：</font>
                <font class="data-font">{{chartData.reserve.reserveCount || 0}}&nbsp;</font>
                <font class="span-font">笔</font>
              </div>
              <div class="desc-rightstyle">
                <font class="span-font">环比：</font>
                <font class="num-font"
                      :class="[chartData.reserve.rate > 0?'up-color':'down-color']">{{calRate(chartData.reserve.rate)}} {{calSymbol(chartData.reserve.rate)}}</font>
              </div>
              <div class="desc-rightstyle"
                   v-if="bankType != 'core'">
                <font class="span-font">全行平均：</font>
                <font class="avgdata-font">{{chartData.reserve.avgValue || 0 }}&nbsp;</font>
                <font class="span-font">笔</font>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="chart-style"
           :id="bankType"
           @click="initflag&&initTransition()">
      </div>
      <div class="bottom-div"><img class="bottom-img"
             :src="bottomImg" /></div>
    </div>
    <div :class="[aspect?'left-ranking-style':'right-ranking-style'] "
         class="ranking-style"
         v-if="show">
      <ranking-chart v-if="rankingChartData != null"
                     :chartData="rankingChartData"></ranking-chart>
      <occupied v-else
                height='360px'
                explain='暂无排名数据' />
    </div>
  </div>
  <occupied v-else
            height='360px'
            explain='暂无数据' />
</template>

<script>
import echarts from 'echarts'
import options from './chartOptions'
import rankingChart from '@/syscomponents/smartOperate/Charts/survey/rankingChart'
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'

export default {
  name: 'radarChart',
  props: {
    chartData: {
      type: Object
    },
    bankType: {
      type: String
    }
  },
  data () {
    return {
      flagdata: '',
      flag: true,
      initflag: true,
      rotate: false,
      keliuclick: false,
      paiduiclick: false,
      efficiencyclick: false,
      qualityclick: false,
      yingxiaoclick: false,
      keliuflag: true,
      paiduiflag: true,
      efficiencyflag: true,
      qualityflag: true,
      yingxiaoflag: true,
      show: false,
      aspect: true, // true is left false is right
      rankingChartData: null,
      timer: null,
      timesRun: 0,
      timeflag: false,
      orgid: base.getStore({ key: 'orgId' }),
      dateType: this.$store.state.operate.timeRange,
      timeValue: this.$store.state.operate.timeDate,
      maxdata: [],
      datarr: ['keliu', 'paidui', 'efficiency', 'quality', 'yingxiao'],
      leftImg: require('@/assets/smartOperate/survey/leftpanel.png'),
      rightImg: require('@/assets/smartOperate/survey/rightpanel.png'),
      keliuImg: require('@/assets/smartOperate/survey/keliu.png'),
      paiduiImg: require('@/assets/smartOperate/survey/paidui.png'),
      efficiencyImg: require('@/assets/smartOperate/survey/efficiency.png'),
      qualityImg: require('@/assets/smartOperate/survey/quality.png'),
      yingxiaoImg: require('@/assets/smartOperate/survey/yingxiao.png'),
      bottomImg: require('@/assets/smartOperate/survey/bottom.png')
    }
  },
  components: {
    rankingChart, occupied
  },
  mounted () {
    // this.initChart()
  },
  activated () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created () {
    clearInterval(this.timer)
    this.timer = null
    this.setTimer()
  },
  destroyed () {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    initChart () {
      if (document.getElementById(this.bankType) === null) return
      const me = this
      const radardata = me.chartData
      me.enter()
      me.setTimer()
      me.initTransition()
      me.leave()
      if (radardata === null) {
        return
      }
      let branchArr = []
      const coreArr = [(radardata.customer != null && radardata.customer.recieveCount != null) ? radardata.customer.recieveCount : '',
        (radardata.reserve != null && radardata.reserve.reserveCount != null) ? radardata.reserve.reserveCount : '',
        (radardata.praise != null && radardata.praise.praiseRate != null) ? (radardata.praise.praiseRate * 100).toFixed(2) : '',
        (radardata.avgDealTime != null && radardata.avgDealTime.avgDealTime != null) ? radardata.avgDealTime.avgDealTime : '',
        (radardata.avgWaitTime != null && radardata.avgWaitTime.avgWaitTime != null) ? radardata.avgWaitTime.avgWaitTime : '']

      if (this.bankType !== 'core') {
        branchArr = [(radardata.customer != null && radardata.customer != null) ? radardata.customer.avgValue : '',
          (radardata.reserve != null && radardata.reserve.avgValue != null) ? radardata.reserve.avgValue : '',
          (radardata.praise != null && radardata.praise.avgValue != null) ? (radardata.praise.avgValue * 100).toFixed(2) : '',
          (radardata.avgDealTime != null && radardata.avgDealTime != null) ? radardata.avgDealTime.avgValue : '',
          (radardata.avgWaitTime != null && radardata.avgWaitTime != null) ? radardata.avgWaitTime.avgValue : '']
      }

      // 设置雷达图最大值
      var maxArray = [(radardata.customer != null && radardata.customer != null) ? radardata.customer.maxRecieve : '',
        (radardata.reserve != null && radardata.reserve != null) ? radardata.reserve.maxReserveCount : '',
        (radardata.praise != null && radardata.praise.maxNegativeRate != null) ? (radardata.praise.maxNegativeRate * 100).toFixed(2) : '',
        (radardata.avgDealTime != null && radardata.avgDealTime != null) ? radardata.avgDealTime.maxAvgDealTime : '',
        (radardata.avgWaitTime != null && radardata.avgWaitTime != null) ? radardata.avgWaitTime.maxAvgWaitTime : '']

      me.maxdata = []
      for (let i = 0; i < maxArray.length; i++) {
        if (maxArray[i] === 0) {
          me.maxdata.push(1)
        } else { me.maxdata.push(maxArray[i] * 1.1) }
      }

      const chart = echarts.init(document.getElementById(this.bankType))
      let mOption = null
      if (this.bankType === 'core') {
        mOption = options.coreRadarOption(me.maxdata, coreArr)
      } else if (this.bankType === 'branch') {
        mOption = options.branchRadarOption(me.maxdata, coreArr, branchArr)
      } else {
        mOption = options.entityRadarOption(me.maxdata, coreArr, branchArr)
      }
      chart.setOption(mOption, true)
      // 根据窗口的大小变动图表
      window.onresize = function () {
        chart.resize()
      }
    },
    calRate (data) {
      if (data || data === 0) {
        return (data * 100).toFixed(2) + '%'
      } else {
        return '----'
      }
    },
    calSymbol (data) {
      if (data > 0) {
        return '↑'
      } else if (data < 0) {
        return '↓'
      } else if (!data || data === 0) {
        return ''
      }
    },
    initTransition () {
      const me = this
      if (me.flag === false) return
      me.initflag = false
      me.show = false
      setTimeout(function () {
        me.rotate = false
        for (let index = 0; index < me.datarr.length; index++) {
          const tempclick = me.datarr[index] + 'click'
          const tempflag = me.datarr[index] + 'flag'
          me[tempclick] = false
          me[tempflag] = true
        }
      }, 500)
      me.$emit('timeShowEvent', true)
      me.flagdata = ''
      setTimeout(function () {
        me.initflag = true
      }, 1000)
    },
    setTimer () {
      if (this.timer == null) {
        const me = this
        var config = window.DCSpace.sysConfig
        this.timer = setInterval(() => {
          me.timesRun = me.timesRun + 1
          if (me.timesRun === config.surveySetTime) {
            clearInterval(me.timer)
            me.timer = null
            me.timeflag = true
            me.whileFunction()
          }
        }, 1000)
      }
    },
    async whileFunction () {
      const me = this
      const arr = me.datarr
      var index = 0
      while (me.timeflag) {
        if (me.$route.name.indexOf('survey') < 0) {
          return
        }
        me.ShowTop(arr[index])
        index = index + 1
        if (index === 5) {
          index = 0
        }
        await me.sleep(5000)
      }
    },
    sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time))
    },
    enter () {
      clearInterval(this.timer)
      this.timer = null
      this.timesRun = 0
      this.timeflag = false
      this.setTimer()
    },
    leave () {
      clearInterval(this.timer)
      this.timer = null
      this.timesRun = 0
      this.timeflag = false
      this.setTimer()
    },
    ShowTop: function (ClickName) {
      const me = this
      if (me.initflag === false) return
      me.flag = false
      if (me.bankType === 'entity') {
        return
      }
      const dataname = {
        'keliu': 'surveyCustflow',
        'paidui': 'surveyQueue',
        'efficiency': 'surveyBusiEfficiency',
        'quality': 'surveyServiceQuality',
        'yingxiao': 'surveyHallMarket'
      }
      const clickname = ClickName + 'click'
      const flagname = ClickName + 'flag'
      if (ClickName === me.datarr[4] || ClickName === me.datarr[3]) {
        me.aspect = false
      } else {
        me.aspect = true
      }
      const selectDateType = this.$store.state.operate.timeRange
      const params = {
        orgid: base.getStore({ key: 'orgId' }),
        dateType: selectDateType,
        timeValue: selectDateType === 'day' ? this.$store.state.operate.dayDateRange : this.$store.state.operate.timeDate
      }
      me.$http.getTrend(dataname[ClickName], params).then((result) => {
        me.rankingChartData = result
        if (me.rankingChartData != null) { me.$set(me.rankingChartData, 'clickName', ClickName) }
      })
      if (me.flagdata === '') {
        for (let i = 0; i < me.datarr.length; i++) {
          if (me.datarr[i] !== ClickName) {
            const tempflag = me.datarr[i] + 'flag'
            me[tempflag] = false
          }
        }

        me.rotate = true
        setTimeout(function () {
          me.show = true
          me[clickname] = true
          if (me.chartData.customer) {
            me.$emit('timeShowEvent', false)
          }
        }, 1000)
        me.flagdata = ClickName
      } else if (me.flagdata !== ClickName) {
        me.show = false
        const lastclickname = me.flagdata + 'click'
        const lastflagname = me.flagdata + 'flag'
        me[lastclickname] = false
        me[lastflagname] = false
        me[clickname] = true
        me[flagname] = true
        me.flagdata = ClickName
        setTimeout(function () {
          me.show = true
        }, 500)
      } else {
        me.initTransition()
      }
      setTimeout(function () {
        me.flag = true
      }, 1000)
    }
  },
  watch: {
    chartData: {
      handler (value) {
        this.$nextTick(function () {
          if (undefined !== value && value != null) this.initChart()
        })
      },
      deep: true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.radarcharts-style {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .root-style {
    height: 76vh;
    width: 100%;
    position: relative;
  }
  .no-click {
    transition: all 0.8s;
  }
  .left-radar-click {
    transform: translate(-23vw) scale(0.8);
    transition-timing-function: cubic-bezier(0.42, 0, 1, 1);
    transition: all 0.8s;
  }
  .right-radar-click {
    transform: translate(23vw) scale(0.8);
    transition-timing-function: cubic-bezier(0.42, 0, 1, 1);
    transition: all 0.8s;
  }
  .panel-click {
    transform: scale(1);
    transition: all 0.8s;
  }
  .chart-style {
    height: 65vh;
    width: 100%;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
  .img {
    max-width: 100%;
    max-height: 100%;
  }
  .bottom-div {
    position: absolute;
    left: 50%;
    bottom: 1%;
  }
  .bottom-img {
    position: relative;
    right: 50%;
  }
  .keliu-style {
    position: absolute;
    left: 50%;
    top: 7%;
    width: 14.8vw;
    z-index: 2;
  }

  .paidui-style {
    position: absolute;
    left: 68.4%;
    top: 45%;
    z-index: 2;
    width: 14.8vw;
  }
  .efficiency-style {
    position: absolute;
    left: 63%;
    top: 82%;
    z-index: 2;
    width: 14.8vw;
  }
  .quality-style {
    position: absolute;
    left: 19%;
    top: 82%;
    z-index: 2;
    width: 14.8vw;
  }
  .yingxiao-style {
    position: absolute;
    left: 13.8%;
    top: 45%;
    z-index: 2;
    width: 14.8vw;
  }
  .left-style {
    position: absolute;
  }
  .desc-left-top {
    left: 3.1vw;
    top: 50%;
    transform: translate(0, -50%);
    position: absolute;
  }
  .desc-right-top {
    top: 50%;
    transform: translate(0, -50%);
    left: -0.5vw;
    position: absolute;
  }
  .desc-left-center {
    left: 3.1vw;
    top: 50%;
    transform: translate(0, -50%);
    position: absolute;
  }
  .desc-right-center {
    top: 50%;
    transform: translate(0, -50%);
    left: -0.5vw;
    position: absolute;
  }
  .circle-left-img {
    width: 42%;
    margin-top: -0.3vw;
    margin-left: -3vw;
    position: absolute;
    z-index: 3;
  }
  .circle-right-img {
    width: 42%;
    margin-top: -0.4vw;
    margin-left: 11.4vw;
    position: absolute;
    z-index: 3;
  }
  .desc-style {
    text-align: left;
    margin-left: 5px;
    margin-bottom: 4.5px;
  }
  .desc-rightstyle {
    text-align: left;
    margin-left: 25px;
    margin-bottom: 4.5px;
  }
  .span-font {
    font-size: 0.7vw;
    color: white;
    font-weight: 500;
  }
  .data-font {
    font-size: 1vw;
    color: white;
    font-weight: 700;
  }
  .avgdata-font {
    font-size: 0.7vw;
    color: white;
    font-weight: 700;
  }
  .num-font {
    font-size: 0.7vw;
    color: #f8e71c;
    font-weight: 600;
  }
  .ranking-style {
    width: 29vw;
    min-height: 30vh;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    animation: dialogSlipToBottom 0.5s ease-in;
  }
  @keyframes dialogSlipToBottom {
    0% {
      opacity: 0.5;
      transform: translate(0, -20%);
    }
    100% {
      opacity: 1;
    }
  }
  .left-ranking-style {
    left: 58.8%;
  }
  .right-ranking-style {
    right: 58.8%;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .slide-leftfade-enter-active,
  .slide-leftfade-leave-active {
    transform: scaleX(1);
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-leftfade-enter,
  .slide-leftfade-leave-to {
    transform: translateX(100px) scaleX(0.1);
    opacity: 0;
  }
  .slide-rightfade-enter-active,
  .slide-rightfade-leave-active {
    transform: scaleX(1);
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-rightfade-enter,
  .slide-rightfade-leave-to {
    transform: translateX(-100px) scaleX(0.1);
    opacity: 0;
  }
  .up-color {
    color: #f8e71c;
  }
  .down-color {
    color: #68ffdd;
  }
}
</style>