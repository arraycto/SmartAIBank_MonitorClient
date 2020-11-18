<template>
<div class="device-status">
  <div>
  <div class="top-style">
  <el-row :gutter="10">
     <el-col :span="6">
              <el-row>
                    <el-col :span="23">
                      <circlePanel :circleData="circleData1[0]"/>
                    </el-col>
                    <el-col :span="1">
                      <div class="line"/>
                    </el-col>
              </el-row>
          </el-col>
          <el-col :span="6">
              <el-row>
                    <el-col :span="23">
                      <circlePanel :circleData="circleData[0]"/>
                    </el-col>
                    <el-col :span="1">
                      <div class="line"/>
                    </el-col>
              </el-row>
          </el-col>
          <el-col :span="6">
             <el-row>
                    <el-col :span="23">
                      <circlePanel :circleData="circleData[1]"/>
                    </el-col>
                    <el-col :span="1">
                      <div class="line"/>
                    </el-col>
              </el-row>
          </el-col>
          <el-col :span="6">
              <el-row>
                    <el-col :span="24">
                      <circlePanel :circleData="circleData[2]"/>
                    </el-col>
                    <!-- <el-col :span="1">
                      <div class="line"/>
                    </el-col> -->
              </el-row>
          </el-col>
    </el-row>
    </div>
    <div class="device-status-chart" :id="tranStatusChartId"  v-if="chartsData&&chartsData != null&&(chartsData.exceptionCount!= 0||chartsData.failureCount!= 0||chartsData.successCount!= 0)"></div>
     <occupied v-else height='300px' explain='暂无数据'/>
  </div>

</div>
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions.js'
import occupied from '@/components/Occupied/occupied'
import circlePanel from '@/syscomponents/smartMonitor/home/circlePanel'

export default {
  name: 'tranStatus',
  components: {
    occupied, circlePanel
  },
  props: { chartsData: Object, tranStatusChartId: String },
  data () {
    return {
      // 交易总数
      circleData1: [{
        type: 'photo',
        circleContent: 'icon-dcfs dcfs-deal-handle',
        color: '#258AFF',
        title: '交易总数',
        count: 0,
        unit: '笔'
      }],
      circleData: [{
        type: '',
        circleContent: '',
        color: '#EE667F',
        title: '异常',
        count: 0,
        unit: '笔',
        rate: 0.00
      },
      {
        type: '',
        circleContent: '',
        color: '#F5A623',
        title: '失败',
        count: 0,
        unit: '笔',
        rate: 0.00
      },
      {
        type: '',
        circleContent: '',
        color: '#55CFB4',
        title: '成功',
        count: 0,
        unit: '笔',
        rate: 0.00
      }]
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      if (!(document.getElementById(this.tranStatusChartId))) return
      const chart = echarts.init(document.getElementById(this.tranStatusChartId))
      const xLegend = []
      const chartData = []
      const me = this
      me.$set(me.circleData[0], 'count', me.chartsData.exceptionCount || 0)
      me.$set(me.circleData[1], 'count', me.chartsData.failureCount || 0)
      me.$set(me.circleData[2], 'count', me.chartsData.successCount || 0)
      me.$set(me.circleData[0], 'rate', parseFloat(me.chartsData.exceptionRate || 0).toFixed(2))
      me.$set(me.circleData[1], 'rate', parseFloat(me.chartsData.failureRate || 0).toFixed(2))
      me.$set(me.circleData[2], 'rate', parseFloat(me.chartsData.successRate || 0).toFixed(2))
      me.$set(me.circleData1[0], 'count', me.chartsData.successCount + me.chartsData.failureCount + me.chartsData.exceptionCount || 0)
      // 设置legend的值
      const colorlist = []
      var i = 0
      me.circleData.map(function (item, index) {
        if (item.count !== 0) {
          xLegend.push({ name: item.title, icon: 'circle' })
          colorlist[i] =  me.circleData[index].color
          i = i + 1
          chartData.push({
            name: item.title,
            value: item.count,
            percent: item.rate
          })
        }
      })
      const mOption = options.tranStatusCharts(xLegend, chartData, colorlist)
      chart.setOption(mOption, true)
      // 根据窗口的大小变动图表
      window.onresize = function () {
        chart.resize()
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
  }
}

</style>



