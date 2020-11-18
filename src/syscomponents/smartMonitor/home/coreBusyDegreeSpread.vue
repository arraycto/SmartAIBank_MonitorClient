<template>
  <div class="device-status">
      <div class="top-style">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-row>
              <el-col :span="23">
                <circlePanel :circleData="circleData[0]" />
              </el-col>
              <el-col :span="1">
                <div class="line" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="23">
                <circlePanel :circleData="circleData[1]" />
              </el-col>
              <el-col :span="1">
                <div class="line" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="23">
                <circlePanel :circleData="circleData[2]" />
              </el-col>
              <el-col :span="1">
                <div class="line" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="23">
                <circlePanel :circleData="circleData[3]" />
              </el-col>
              <el-col :span="1">
                <div class="line" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="23">
                <circlePanel :circleData="circleData[4]" />
              </el-col>
              <el-col :span="1">
                <div class="line" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="24">
                <circlePanel :circleData="circleData[5]" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
    </div>
    <div class="device-status-chart" v-if="JSON.stringify(chartsData) != '{}' && chartsData.totalCount != 0" :id="busySpreadChartId"></div>
    <occupied v-else height="300px" explain="暂无数据" />
  </div>
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions.js'
import occupied from '@/components/Occupied/occupied'
import circlePanel from '@/syscomponents/smartMonitor/home/circlePanel'

export default {
  name: 'coreBusyDegreeSpread',
  components: {
    occupied,
    circlePanel
  },
  props: { chartsData: Object, busySpreadChartId: String },
  data () {
    return {
      circleData: [
        {
          type: 'symbol',
          circleContent: '#dcfs-fanmangzhuangtaizongshu',
          color: '#1087FF',
          title: '网点总数',
          count: 0,
          unit: '个',
          rate: 0
        },
        {
          type: '',
          circleContent: '',
          color: '#EE667F',
          title: '饱和',
          count: 0,
          unit: '个',
          rate: 0
        },
        {
          type: '',
          circleContent: '',
          color: '#F5A623',
          title: '忙碌',
          count: 0,
          unit: '个',
          rate: 0
        },
        {
          type: '',
          circleContent: '',
          color: '#55CFB4',
          title: '正常',
          count: 0,
          unit: '个',
          rate: 0
        },
        {
          type: '',
          circleContent: '',
          color: '#1087FF',
          title: '空闲',
          count: 0,
          unit: '个',
          rate: 0
        },
        {
          type: '',
          circleContent: '',
          color: '#9B9B9B',
          title: '未采集',
          count: 0,
          unit: '个',
          rate: 0
        }
      ]
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      if (!document.getElementById(this.busySpreadChartId)) return
      const chart = echarts.init(document.getElementById(this.busySpreadChartId))
      const xLegend = []
      const chartData = []
      const me = this
      me.$set(me.circleData[0], 'count', me.chartsData.totalCount || 0)
      me.$set(me.circleData[1], 'count', me.chartsData.saturationCount || 0)
      me.$set(me.circleData[2], 'count', me.chartsData.busyCount || 0)
      me.$set(me.circleData[3], 'count', me.chartsData.normalCount || 0)
      me.$set(me.circleData[4], 'count', me.chartsData.idleCount || 0)
      me.$set(me.circleData[5], 'count', me.chartsData.unopenedCount || 0)

      me.$set(me.circleData[1], 'rate', parseFloat(me.chartsData.saturationRate || 0).toFixed(2))
      me.$set(me.circleData[2], 'rate', parseFloat(me.chartsData.busyRate || 0).toFixed(2))
      me.$set(me.circleData[3], 'rate', parseFloat(me.chartsData.normalRate || 0).toFixed(2))
      me.$set(me.circleData[4], 'rate', parseFloat(me.chartsData.idleRate || 0).toFixed(2))
      me.$set(me.circleData[5], 'rate', parseFloat(me.chartsData.unopenedRate || 0).toFixed(2))

      const colorlistTemp = ['#EE667F', '#EE667F', '#F5A623', '#55CFB4', '#1087FF', '#9B9B9B']
      const colorlist = []

      me.circleData.map(function (item, index) {
        if (item.title !== '网点总数' && item.count !== 0) {
          xLegend.push({ name: item.title, icon: 'circle' })
          chartData.push({
            name: item.title,
            value: item.count,
            percent: item.rate
          })
          colorlist.push(colorlistTemp[index])
        }
      })

      const mOption = options.coreBusyDegreeSpreadCharts(xLegend, chartData, colorlist)
      chart.setOption(mOption, true)
      // 根据窗口的大小变动图表
      window.onresize = function () {
        chart.resize()
      }
    }
  },
  watch: {
    chartsData: {
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
.device-status {
  .top-style {
    padding: $smallPadding;
    .line {
      width: 1px;
      height: 2.5em;
      background: $lineColor;
    }
  }
  .device-status-chart {
    width: 100%;
    height: 300px;
  }
}
</style>
