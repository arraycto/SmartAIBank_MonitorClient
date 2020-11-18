<template>
<div class="service-degree-state">
  <div class="top-style">
    <span class="device-title-style" @click="moreClick" @mouseover="mouseOver" @mouseleave="mouseLeave">服务质量 <i v-show="titleShow" class="title-icon icon-dcfs dcfs-gengduo1"></i><i v-show="!titleShow" class="title-icon-hover icon-dcfs dcfs-gengduo1"></i></span>
  </div>
  <div class="content-style">
        <el-row :gutter="10">
            <el-col :span="5">
                <el-row>
                      <el-col :span="23">
                        <circlePanel :circleData="circleData[0]"/>
                      </el-col>
                      <el-col :span="1">
                        <div class="line"></div>
                      </el-col>
                </el-row>
            </el-col>
            <el-col :span="5">
                <el-row>
                      <el-col :span="23">
                        <circlePanel :circleData="circleData[1]"/>
                      </el-col>
                      <el-col :span="1">
                        <div class="line"></div>
                      </el-col>
                </el-row>
            </el-col>
            <el-col :span="5">
                <el-row>
                      <el-col :span="24">
                        <circlePanel :circleData="circleData[2]"/>
                      </el-col>
                </el-row>
            </el-col>
        </el-row>
    <!-- 饼图 -->
    <div class="device-state-chart" v-if="JSON.stringify(serviceData) != '{}' && serviceData.evaluateCount != 0">
      <el-row>
        <el-col :span="12">
          <div id="entityServiceQualityChartId1" class="chart-left"></div>
        </el-col>
        <el-col :span="12">
          <div id="entityServiceQualityChartId2"  class="chart-right"></div>
        </el-col>
      </el-row>
    </div>
    <occupied v-else height='330px' explain='暂无数据'/>
  </div>
</div>
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions.js'
import occupied from '@/components/Occupied/occupied'
import circlePanel from '@/syscomponents/smartMonitor/home/circlePanel'
import services from '../../../services'
import base from '@/common/base'

export default {
  name: 'entityServiceQuality',
  data () {
    return {
      circleData: [{
        type: 'photo',
        circleContent: 'icon-dcfs dcfs-pingjiashu',
        color: '#258AFF',
        title: '评价',
        count: 0,
        unit: '个'
      },
      {
        type: 'photo',
        circleContent: 'icon-dcfs dcfs-haopingshu',
        color: '#F5A623',
        title: '好评',
        count: 0,
        unit: '个'
      },
      {
        type: 'photo',
        circleContent: 'icon-dcfs dcfs-chapingshu',
        color: '#EE667F',
        title: '差评',
        count: 0,
        unit: '个'
      }],
      titleShow: true,
      serviceData: {}
    }
  },
  components: {
    occupied, circlePanel
  },
  mounted () {
    // 初始化获取数据
    this.getData()
  },
  methods: {
    async getData () {
      try {
        const self = this
        const result = await services.api.monitor.monitorQuality.getSumBranchQualityInfo(base.getStore({ key: 'orgId' }), 'false')
        self.serviceData = result || {}
        if (JSON.stringify(self.serviceData) !== '{}') {
          self.$set(self.circleData[0], 'count', self.serviceData.evaluateCount || 0)
          self.$set(self.circleData[1], 'count', self.serviceData.evaluateGoodCount || 0)
          self.$set(self.circleData[2], 'count', self.serviceData.evaluateBadCount || 0)
        }
        self.$nextTick(function () {
          self.initChart()
        })
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    initChart () {
      if (!document.getElementById('entityServiceQualityChartId1')) return
      // 初始化左右两张饼图
      const charLeft = echarts.init(document.getElementById('entityServiceQualityChartId1'))
      const charRight = echarts.init(document.getElementById('entityServiceQualityChartId2'))
      const me = this
      // 初始化左边饼图数据
      const xLegendLeft = []
      const chartDataLeft = []
      chartDataLeft.push({ name: '评价率', value: me.serviceData.evaluateRate.toFixed(2) || 0 })
      chartDataLeft.push({ name: '未评价', value: (100 - me.serviceData.evaluateRate).toFixed(2) || 0 })
      const colorlistL = ['#497DEA', '#D5D5D5']
      const mOptionLeft = options.circleOption(xLegendLeft, chartDataLeft, colorlistL)

      // 修改个别样式
      mOptionLeft.tooltip.show = false
      mOptionLeft.series[0].silent = true
      mOptionLeft.series[0].avoidLabelOverlap = false
      mOptionLeft.series[0].legendHoverLink = false
      mOptionLeft.series[0].hoverAnimation = false
      mOptionLeft.series[0].cursor = 'default'
      mOptionLeft.series[0].label.normal = {
        show: true,
        position: 'center',
        'formatter': function (arg) {
          if (arg.data.name === '评价率') {
            const formatterStr = '{top|' + arg.data.name + '}' + '\n' + '{left|' + arg.data.value + '%}'
            return formatterStr
          } else {
            return ''
          }
        },
        rich: {
          top: {
            'fontSize': 14,
            'fontWeight': '700',
            'color': ' #9B9B9B'
          },
          left: {
            'fontSize': 18,
            'fontWeight': '700',
            'color': '#000000'
          }
        }
      }
      // mOptionLeft.tooltip.formatter = ['{b}', '\n', '{c}%'].join('')
      mOptionLeft.series[0].label.emphasis = {
        show: true
      }
      // 初始化右边饼图数据
      const xLegendRight = []
      const chartDataRight = []
      const colorlistR = []
      if (me.serviceData.evaluateGoodRate !== 0) {
        chartDataRight.push({ name: '好评', value: me.serviceData.evaluateGoodCount, percent: me.serviceData.evaluateGoodRate.toFixed(2) })
        colorlistR.push('#E9B437')
      }
      if (me.serviceData.evaluateBadRate !== 0) {
        chartDataRight.push({ name: '差评', value: me.serviceData.evaluateBadCount, percent: me.serviceData.evaluateBadRate.toFixed(2) })
        colorlistR.push('#F37D7D')
      }
      if (100 - me.serviceData.evaluateGoodRate - me.serviceData.evaluateBadRate !== 0) {
        chartDataRight.push({ name: '中评', value: me.serviceData.evaluateCount - me.serviceData.evaluateGoodCount - me.serviceData.evaluateBadCount, percent: (100 - me.serviceData.evaluateGoodRate - me.serviceData.evaluateBadRate).toFixed(2) })
        colorlistR.push('#C1C1C1')
      }
      const mOptionRight = options.coreBusyDegreeSpreadCharts(xLegendRight, chartDataRight, colorlistR)

      // mOptionRight.tooltip.formatter = '{b} {c}%'
      // mOptionRight.series[0].label.normal.formatter = ['{sectionStyle|{b}}', '{percentStyle|{c}%}'].join('\n')

      // 生成图表
      charLeft.setOption(mOptionLeft, true)
      charRight.setOption(mOptionRight, true)
      // 根据窗口的大小变动图表
      window.onresize = function () {
        charLeft.resize()
      }
      window.onresize = function () {
        charRight.resize()
      }
    },
    moreClick () {
      this.$nextTick(function () {
        this.$store.commit('monitor/setBoardDoor', 'serviceQuality')
      })
      this.$store.commit('monitor/updateBoard', 'monitor')
    },
    mouseOver () {
      this.titleShow = false
    },
    mouseLeave () {
      this.titleShow = true
    }
  },
  watch: {
    '$store.state.monitor.refreshTime': function (value) {
      this.getData()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.service-degree-state{
  background: white;
  .top-style{
    padding-top: $largePadding;
    padding-bottom: $largePadding;
    border-bottom: 1px solid $lineColor;
    width: 97%;
    margin: 0 auto;
    .device-title-style{
      font-size: $smallFontSize;
      font-family: $titleFontFamily;
      color: $homeTitleColor;
      font-weight: bolder;
      cursor: pointer;
      .title-icon{
        font-size: $middleFontSize;
        color: $homeTitleColor;
      }
      .title-icon-hover{
        font-size: $middleFontSize;
        color: $homeBlueColor;
      }
    }
  }
  .content-style{
    width: 97%;
    margin: 0 auto;
    padding: $smallPadding;
    .line{
        width: 1px;
        height: 2.5em;
        background: $lineColor;
        }
    //修改子组件circlePanel的宽度属性，以方便文字在一行显示
    .circle-main-content{
        width: 10rem;
        /deep/ .right-title-content{
            width: 7.5rem;
        }
    }
    //设置charts部分样式
    .device-state-chart{
      margin-top: 30px;
      width: 100%;
      height: 300px;
      .chart-left , .chart-right{
        width: 100%;
        height: 300px;
      }
    }
  }
}
</style>
