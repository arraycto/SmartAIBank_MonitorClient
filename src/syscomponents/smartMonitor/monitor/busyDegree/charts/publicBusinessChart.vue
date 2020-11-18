<template>
<div>
  <el-row>
    <el-col :span="24">
      <div class="trade-time-bar" style="height:360px;">
        <div class="chart-class" style="height:355px" id="publicBusinessChartId"></div>
      </div>
    </el-col>
  </el-row>
</div>
</template>
<script>

import echarts from 'echarts'
import monitor from './chartMointor'
export default {
  name: 'publicBusinessChart',
  components: {  },
  data () {
    return {
      centerText: '公司\n业务',
      colorArr: ['#F96363', '#8664F8', '#1087FF', '#42DFE6', '#596ED6', '#F5974E', '#F7D205', '#B1B1B1'] // 各业务类型扇形颜色
    }
  },
  props: {
    chartsData: Array
  },
  mounted () {
    this.initChart(this.chartsData)
  },
  activated () {
  },
  methods: {
    initChart (list) {
      if (!(document.getElementById('publicBusinessChartId'))) return
      const mChart = echarts.init(document.getElementById('publicBusinessChartId'))
      const mOption = monitor.typeDistributeMonitor(this.centerText, this.colorArr, this.chartsData)
      mChart.setOption(mOption, true)
      // 根据窗口的大小变动图表
      window.onresize = function () {
        mChart.resize()
      }
    }
  },
  watch: {
    chartsData: {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) this.initChart(value)
        })
      },
      deep: true
    }
  }

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>

