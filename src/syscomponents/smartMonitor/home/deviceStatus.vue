<template>
<div class="device-status">
  <div >
  <div class="top-style">
  <el-row :gutter="10">
          <el-col :span="4">
              <el-row>
                    <el-col :span="23">
                      <circlePanel :circleData="circleData1[0]"/>
                    </el-col>
                    <el-col :span="1">
                      <div class="line"/>
                    </el-col>
              </el-row>
          </el-col>
          <el-col :span="4">
             <el-row>
                    <el-col :span="23">
                      <circlePanel :circleData="circleData[0]"/>
                    </el-col>
                    <el-col :span="1">
                      <div class="line"/>
                    </el-col>
              </el-row>
          </el-col>
          <el-col :span="4">
              <el-row>
                    <el-col :span="23">
                      <circlePanel :circleData="circleData[1]"/>
                    </el-col>
                    <el-col :span="1">
                      <div class="line"/>
                    </el-col>
              </el-row>
          </el-col>
          <el-col :span="4">
              <el-row>
                    <el-col :span="23">
                      <circlePanel :circleData="circleData[2]"/>
                    </el-col>
                    <el-col :span="1">
                      <div class="line"/>
                    </el-col>
              </el-row>
          </el-col>
          <el-col :span="5">
              <el-row>
                    <el-col :span="23">
                      <circlePanel :circleData="circleData[3]"/>
                    </el-col>
                    <el-col :span="1">
                      <div class="line"/>
                    </el-col>
              </el-row>
          </el-col>
          <el-col :span="3">
              <el-row>
                    <el-col :span="24">
                      <circlePanel :circleData="circleData[4]"/>
                    </el-col>
              </el-row>
          </el-col>
    </el-row>
    </div>
    <el-row>
     <el-col :span="4">
        <el-row>
          <el-col :span="22" :offset="1">
              <circlePanel :circleData="circleData[5]"/>
          </el-col>
          <el-col :span="1">
              <div class="line"/>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="20">
        <div class="device-status-chart" :id="deviceStatusChartId" v-if="chartsData&&chartsData != null&&chartsData.totalCount!=0"></div>
        <occupied class="home-occupied" v-else height='300px' explain='暂无数据'/>
      </el-col>
    </el-row>
    <!-- <div class="device-status-chart" :id="deviceStatusChartId"></div> -->
  </div>
</div>
</template>
<script>
import echarts from 'echarts'
import options from './chartOptions.js'
import occupied from '@/components/Occupied/occupied'
import circlePanel from '@/syscomponents/smartMonitor/home/circlePanel'

export default {
  name: 'deviceStatus',
  components: {
    occupied, circlePanel
  },
  props: { chartsData: Object, deviceStatusChartId: String },
  data () {
    return {
      circleData1: [{
        type: '',
        circleContent: '',
        color: '#258AFF',
        title: '设备总数',
        count: 0,
        unit: '个'
      }],
      circleData: [{
        type: '',
        circleContent: '',
        color: '#EE667F',
        title: '通讯故障',
        count: 0,
        unit: '个',
        rate: 0
      },
      {
        type: '',
        circleContent: '',
        color: '#F5A623',
        title: '外设故障',
        count: 0,
        unit: '个',
        rate: 0
      },
      {
        type: '',
        circleContent: '',
        color: '#9E7EF7',
        title: '告警',
        count: 0,
        unit: '个',
        rate: 0
      },
      {
        type: '',
        circleContent: '',
        color: '#55CFB4',
        title: '应用未启动',
        count: 0,
        unit: '个',
        rate: 0
      },
      {
        type: '',
        circleContent: '',
        color: '#1087FF',
        title: '正常',
        count: 0,
        unit: '个',
        rate: 0
      },
      {
        type: '',
        circleContent: '',
        color: '#9B9B9B',
        title: '未监控',
        count: 0,
        unit: '个',
        rate: 0
      }]
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      if (!(document.getElementById(this.deviceStatusChartId))) return
      const chart = echarts.init(document.getElementById(this.deviceStatusChartId))
      const xLegend = []
      const chartData = []
      const me = this
      me.$set(me.circleData1[0], 'count', me.chartsData.totalCount || 0)
      me.$set(me.circleData[0], 'count', me.chartsData.commFailureCount || 0)
      me.$set(me.circleData[1], 'count', me.chartsData.peripheralFailureCount || 0)
      me.$set(me.circleData[2], 'count', me.chartsData.alarmCount || 0)
      me.$set(me.circleData[3], 'count', me.chartsData.appNotStartedCount || 0)
      me.$set(me.circleData[4], 'count', me.chartsData.normalCount || 0)
      me.$set(me.circleData[5], 'count', me.chartsData.unmonitoredCount || 0)
      me.$set(me.circleData[0], 'rate', parseFloat(me.chartsData.commFailureRate || 0).toFixed(2))
      me.$set(me.circleData[1], 'rate', parseFloat(me.chartsData.peripheralFailureRate || 0).toFixed(2))
      me.$set(me.circleData[2], 'rate', parseFloat(me.chartsData.alarmRate || 0).toFixed(2))
      me.$set(me.circleData[3], 'rate', parseFloat(me.chartsData.appNotStartedRate || 0).toFixed(2))
      me.$set(me.circleData[4], 'rate', parseFloat(me.chartsData.normalRate || 0).toFixed(2))
      me.$set(me.circleData[5], 'rate', parseFloat(me.chartsData.unmonitoredRate || 0).toFixed(2))
      // 设置legend的值
      const colorlist = []
      var i = 0
      me.circleData.map(function (item, index) {
        if (item.title !== '机具状态总数' && item.count !== 0) {
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
      const mOption = options.homedevice(xLegend, chartData, colorlist)
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
    margin-left: -3vw;
  }
  .home-occupied{
    margin-left:-4vw ;
  }
}

</style>



