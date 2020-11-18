<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="trade-time-bar">
          <div class="chart-class" style="height:250px" id="privateBusinessLineChartId"></div>
        </div>
        <div class="windowlist-style">
          <div class="windowno-laber">可办理窗口</div>
          <div class="wrapper">
            <div
              class="device-title-style windowId"
              :style="{width:80/resultDate.length+'%'}"
              v-for="(item,index) in resultDate"
              :key="index"
            >
              <div
                v-for="(item1,index1) in item.windowList"
                :key="index1"
                class="device-title-style-span"
              >{{item1.windowId}}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import echarts from 'echarts'
import monitor from './chartMointor'
export default {
  name: 'privateBusinessLineChart',
  components: {},
  data () {
    return {
      chartData: [],
      // 可办理窗口
      windowList: []
    }
  },
  props: {
    resultDate: Array
  },
  mounted () {
    this.initChart(this.resultDate)
  },
  activated () {
  },
  methods: {
    initChart (list) {
      if (!(document.getElementById('privateBusinessLineChartId'))) return
      const mChart = echarts.init(document.getElementById('privateBusinessLineChartId'))
      const xData = []
      const waitCustomerList = []
      const waitTimeList = []
      // 设置xAxis的值
      list.map(function (item) {
        xData.push(item.businessTypeName)
        waitCustomerList.push(item.waitingCustomerCount)
        waitTimeList.push(item.avgWaitingTime)
      })
      const mOption = monitor.businessTypeBarMointor(xData, waitCustomerList, waitTimeList)
      mChart.setOption(mOption, true)
    }
  },
  watch: {
    resultDate: {
      handler (value) {
        this.$nextTick(function () {
          if (value != null) {
            this.initChart(value)
          }
        })
      },
      deep: true
    }
  }

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.trade-time-bar {
  padding-top: 50px;
  height: 320px;
}
@media screen and (max-width: 1500px) {
  .windowlist-style {
    margin-bottom: 1.5rem;
  }
  .windowno-laber {
    margin-left: -50px;
    font-size: 14px;
    display: inline-block;
    width: 14%;
  }
  .wrapper {
    display: inline-block;
    width: 84%;
  }
  .device-title-style {
    text-align: center;
    display: inline-block;
    margin-left: 10px;
  }
  .device-title-style-span {
    margin-left: 2px;
    display: inline-block;
    font-size: 14px;
    background: #4a4a4a;
    color: #ffffff;
    width: 18px;
    height: 18px;
    border-radius: 11px;
    text-align: center;
  }
}
@media screen and (width: 1920px) {
  .windowlist-style {
    margin-bottom: 1.5rem;
  }
  .windowno-laber {
    margin-left: -50px;
    font-size: 14px;
    display: inline-block;
    width:8%;
  }
  .wrapper {
    display: inline-block;
    width: 90%;
  }
  .device-title-style {
    text-align: center;
    display: inline-block;
    margin-left: 18px;
  }
  .device-title-style-span {
    margin-left: 2px;
    display: inline-block;
    font-size: 14px;
    background: #4a4a4a;
    color: #ffffff;
    width: 18px;
    height: 18px;
    border-radius: 11px;
    text-align: center;
  }
}
</style>

