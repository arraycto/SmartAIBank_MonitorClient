<template>
<div class="device-status">
  <div class="top-style">
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
            <el-col :span="5">
                <el-row>
                      <el-col :span="24">
                        <circlePanel :circleData="circleData[3]"/>
                      </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
  <div class="device-status-chart" v-if="JSON.stringify(chartsData) != '{}' && chartsData.evaluateCount != 0">
      <el-row>
        <el-col :span="12">
          <div :id="qualityTotalChartId + '1'" class="chart-left"></div>
        </el-col>
        <el-col :span="12">
          <div :id="qualityTotalChartId + '2'"  class="chart-right"></div>
        </el-col>
      </el-row>
    </div>
  <occupied v-else height='300px' explain='暂无数据'/>
</div>
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions.js'
import occupied from '@/components/Occupied/occupied'
import circlePanel from '@/syscomponents/smartMonitor/home/circlePanel'

export default {
  name: 'coreServiceQualityTotal',
  components: {
    occupied, circlePanel
  },
  props: { chartsData: Object, qualityTotalChartId: String },
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
      }, {
        type: 'photo',
        circleContent: 'icon-dcfs dcfs-zhongpingshu',
        color: '#C1C1C1',
        title: '中评',
        count: 0,
        unit: '个'
      }]
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      if (!document.getElementById(this.qualityTotalChartId + '1') || !this.qualityTotalChartId) return

      // 初始化左右两张饼图
      const charLeft = echarts.init(document.getElementById(this.qualityTotalChartId + '1'))
      const charRight = echarts.init(document.getElementById(this.qualityTotalChartId + '2'))
      const me = this
      me.$set(me.circleData[0], 'count', me.chartsData.evaluateCount || 0)
      me.$set(me.circleData[1], 'count', me.chartsData.evaluateGoodCount || 0)
      me.$set(me.circleData[2], 'count', me.chartsData.evaluateBadCount || 0)
      me.$set(me.circleData[3], 'count', me.chartsData.evaluateCount - me.chartsData.evaluateGoodCount - me.chartsData.evaluateBadCount || 0)

      // 初始化左边饼图数据
      const xLegendLeft = []
      const chartDataLeft = []
      chartDataLeft.push({ name: '评价率', rateName: '评价', value: parseFloat(me.chartsData.evaluateRate  || 0).toFixed(2), percent: me.chartsData.evaluateCount })
      chartDataLeft.push({ name: '未评价', rateName: '未评价', value: parseFloat((100 - me.chartsData.evaluateRate || 0)).toFixed(2),  percent: me.chartsData.inviteCount - me.chartsData.evaluateCount })
      const colorlistL = ['#497DEA', '#D5D5D5']
      const mOptionLeft = options.circleOption(xLegendLeft, chartDataLeft, colorlistL)
      // 修改个别样式
      // mOptionLeft.tooltip.show = false
      //  mOptionLeft.series[0].silent = true
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
      if (me.chartsData.evaluateGoodRate !== 0) {
        chartDataRight.push({ name: '好评', value: me.chartsData.evaluateGoodCount, percent: me.chartsData.evaluateGoodRate.toFixed(2) })
        colorlistR.push('#E9B437')
      }
      if (me.chartsData.evaluateBadRate !== 0) {
        chartDataRight.push({ name: '差评', value: me.chartsData.evaluateBadCount, percent: me.chartsData.evaluateBadRate.toFixed(2) })
        colorlistR.push('#F37D7D')
      }
      if (100 - me.chartsData.evaluateGoodRate - me.chartsData.evaluateBadRate !== 0) {
        chartDataRight.push({ name: '中评', value: me.chartsData.evaluateCount - me.chartsData.evaluateGoodCount - me.chartsData.evaluateBadCount, percent: (100 - me.chartsData.evaluateGoodRate - me.chartsData.evaluateBadRate).toFixed(2) })
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
    }
  },
  watch: {
    'chartsData': {
      handler (value) {
        this.$nextTick(function () {
          if (value && value != null) this.initChart()
        })
      },
      deep: true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.device-status{
  .top-style{
    padding: $smallPadding;
    .line{
        width: 1px;
        height: 2.5em;
        background: $lineColor;
        }
  }
  .device-status-chart{
    width: 100%;
    height: 300px;
    .chart-left , .chart-right{
      width: 100%;
      height: 300px;
    }
  }
}

</style>



