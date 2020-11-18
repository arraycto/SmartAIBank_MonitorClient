<template>
<div class="device-type">
  <div>
  <div class="top-style">
  <el-row :gutter="10">
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
          <!-- <el-col :span="4">
             <el-row>
                    <el-col :span="23">
                      <circlePanel :circleData="circleData[1]"/>
                    </el-col>
                    <el-col :span="1">
                      <div class="line"/>
                    </el-col>
              </el-row>
          </el-col> -->
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
          <!-- <el-col :span="6">
              <el-row>
                    <el-col :span="23">
                      <circlePanel :circleData="circleData[2]"/>
                    </el-col>
                    <el-col :span="1">
                      <div class="line"/>
                    </el-col>
              </el-row>
          </el-col> -->
          <el-col :span="6">
              <el-row>
                    <el-col :span="23">
                      <circlePanel :circleData="circleData[3]"/>
                    </el-col>
                    <el-col :span="1">
                      <!-- <div class="line"/> -->
                    </el-col>
              </el-row>
          </el-col>
          <!-- <el-col :span="4">
              <el-row>
                    <el-col :span="24">
                      <circlePanel :circleData="circleData[5]"/>
                    </el-col>
              </el-row>
          </el-col> -->
    </el-row>
    </div>
    <div class="device-type-chart" :id="deviceTypeChartId"  v-if="chartsData&&chartsData != null &&chartsData.sumCount!=0"></div>
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
  name: 'deviceType',
  components: {
    occupied, circlePanel
  },
  props: { chartsData: Object, deviceTypeChartId: String },
  data () {
    return {
      circleData: [{
        type: 'photo',
        circleContent: 'icon-dcfs dcfs-device-state',
        color: '#258AFF',
        title: '设备总数',
        count: 0,
        unit: '个'
      },
      // {
      //   type: 'photo',
      //   circleContent: 'icon-dcfs dcfs-tiandan',
      //   color: '#AE64E8',
      //   title: '填单机',
      //   count: 0,
      //   unit: '个'
      // },
      {
        type: 'photo',
        circleContent: 'icon-dcfs dcfs-paidui',
        color: '#EE667F',
        title: '排队机',
        count: 0,
        unit: '个'
      },
      {
        type: 'text',
        circleContent: 'ATM',
        color: '#F5A623',
        title: 'ATM',
        count: 0,
        unit: '个'
      },
      {
        type: 'text',
        circleContent: 'STM',
        color: '#55CFB4',
        title: 'STM',
        count: 0,
        unit: '个'
      }
      // ,
      // {
      //   type: 'photo',
      //   circleContent: 'icon-dcfs dcfs-huidan',
      //   color: '#6F8BF3',
      //   title: '回单机',
      //   count: 0,
      //   unit: '个'
      // }
      ]
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      if (!(document.getElementById(this.deviceTypeChartId))) return
      const chart = echarts.init(document.getElementById(this.deviceTypeChartId))
      const xLegend = []
      const chartData = []
      const me = this
      // me.$set(me.circleData[0], 'count', me.chartsData.sumCount || 0)
      // me.$set(me.circleData[1], 'count', me.chartsData.fillerCount || 0)
      // me.$set(me.circleData[2], 'count', me.chartsData.queueCount || 0)
      // me.$set(me.circleData[3], 'count', me.chartsData.atmCount || 0)
      // me.$set(me.circleData[4], 'count', me.chartsData.stmCount || 0)
      // me.$set(me.circleData[5], 'count', me.chartsData.bsrCount || 0)
      me.$set(me.circleData[0], 'count', me.chartsData.sumCount || 0)
      me.$set(me.circleData[1], 'count', me.chartsData.queueCount || 0)
      me.$set(me.circleData[2], 'count', me.chartsData.atmCount || 0)
      me.$set(me.circleData[3], 'count', me.chartsData.stmCount || 0)
      // 设置legend的值
      const list = []
      var i = 0
      me.circleData.map(function (item, index) {
        xLegend.push({ name: item.title, icon: 'circle' })
        if (item.title !== '设备总数' && item.count !== 0) {
          list[i] =  me.circleData[index].color
          i = i + 1
          chartData.push({
            name: item.title,
            value: item.count
          })
        }
      })
      const mOption = options.deviceTypeCharts(xLegend, chartData, list)
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
.device-type{
  .top-style{
    padding: $smallPadding;
    .line{
        width: 1px;
        height: 2.5em;
        background: $lineColor;
        }
  }
  .device-type-chart{
    width: 100%;
    height: 300px;
  }
}

</style>



