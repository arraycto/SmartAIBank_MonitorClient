<template>
<div class="device-type">
  <div>
  <div class="top-style">
  <el-row :gutter="10">
          <el-col :span="8">
              <el-row>
                    <el-col :span="23">
                      <circlePanel :circleData="circleData[0]"/>
                    </el-col>
                    <el-col :span="1">
                      <div class="line"/>
                    </el-col>
              </el-row>
          </el-col>
          <el-col :span="8" v-show="false">
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
          <el-col :span="8">
              <el-row>
                    <el-col :span="24">
                      <circlePanel :circleData="circleData[2]"/>
                    </el-col>

              </el-row>
          </el-col>
    </el-row>
    </div>
    <div class="device-type-chart" :id="tranNumChartId"  v-if="chartsData&&chartsData!=null&&chartsData.totalCount!= 0"></div>
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
  name: 'tranNum',
  components: {
    occupied, circlePanel
  },
  props: { chartsData: Object, tranNumChartId: String, tranTimeList: Array },
  data () {
    return {
      circleData: [{
        type: 'photo',
        circleContent: 'icon-dcfs dcfs-deal-handle',
        color: '#258AFF',
        title: '交易总数',
        count: '0',
        unit: '笔'
      },
      {
        type: 'text',
        circleContent: 'ATM',
        color: '#F5A623',
        title: 'ATM',
        count: '0',
        unit: '笔'
      },
      // {
      //   type: 'text',
      //   circleContent: 'BSR',
      //   color: '#EE667F',
      //   title: 'BSR',
      //   count: '0',
      //   unit: '笔'
      // },
      {
        type: 'text',
        circleContent: 'STM',
        color: '#55CFB4',
        title: 'STM',
        count: '0',
        unit: '笔'
      }]
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      if (!(document.getElementById(this.tranNumChartId))) return
      const chart = echarts.init(document.getElementById(this.tranNumChartId))
      const xAxis = []
      const tranValue = []
      const me = this
      // me.$set(me.circleData[0], 'count', me.chartsData.totalCount || 0)
      // me.$set(me.circleData[1], 'count', me.chartsData.atmCount || 0)
      // me.$set(me.circleData[2], 'count', me.chartsData.bsrCount || 0)
      // me.$set(me.circleData[3], 'count', me.chartsData.stmCount || 0)

      me.$set(me.circleData[0], 'count', me.chartsData.totalCount || 0)
      me.$set(me.circleData[1], 'count', me.chartsData.atmCount || 0)
      me.$set(me.circleData[2], 'count', me.chartsData.stmCount || 0)
      // 设置legend的值
      me.tranTimeList.map(function (item, index) {
        xAxis.push(item.startTime)
        tranValue.push(item.transCount)
      })
      const mOption = options.lineOption(xAxis, tranValue)
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
    padding-top:10px;
    width: 100%;
    height: 300px;
  }
}

</style>



