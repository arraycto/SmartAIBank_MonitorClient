<template>
  <div class="device-status">
      <div class="top-style">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-row>
              <el-col :span="23">
                <circlePanel :circleData="circleData[0]" />
              </el-col>
              <el-col :span="1">
                <div class="line" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="23">
                <circlePanel :circleData="circleData[1]" />
              </el-col>
              <el-col :span="1">
                <div class="line" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="23">
                <circlePanel :circleData="circleData[2]" />
              </el-col>
              <el-col :span="1">
                <div class="line" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <circlePanel :circleData="circleData[3]" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
    </div>
    <div class="device-status-chart" v-if="this.isShow" :id="busyStatusChartId"></div>
    <occupied v-else height="300px" explain="暂无数据" />
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
  name: 'coreBusyDegreeStatus',
  components: {
    occupied,
    circlePanel
  },
  props: { chartsData: Object, busyStatusChartId: String },
  data () {
    return {
      circleData: [
        {
          type: 'symbol',
          circleContent: '#dcfs-dengdaikehushu',
          color: '#258AFF',
          title: '等待客户数',
          count: 0,
          unit: '人'
        },
        {
          type: 'symbol',
          circleContent: '#dcfs-chuangkoupingjundengdaishu',
          color: '#AE64E8',
          title: '窗口平均等待客户数',
          count: 0,
          unit: '人'
        },
        {
          type: 'symbol',
          circleContent: '#dcfs-kehupingjundengdai',
          color: '#EE667F',
          title: '客户平均等待时间',
          count: 0,
          unit: '分钟'
        },
        {
          type: 'symbol',
          circleContent: '#dcfs-kehuzuichangdengdai',
          color: '#F5A623',
          title: '客户最长等待时间',
          count: 0,
          unit: '分钟'
        }
      ],
      // 获取营业时间并做内部处理
      businessHours: [],
      // 获取分段时间客户数和等待时间
      timePhasedBusiness: [],
      isShow: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      this.businessHours = []
      this.timePhasedBusiness = []
      try {
        var self = this
        // 获取营业时间
        let result = await services.api.monitor.monitorBusy.getOrgBusinessHours(base.getStore({ key: 'orgId' }))
        if (JSON.stringify(result) !== '{}') {
          let startTime = result.startTime
          let endTime = result.endTime
          // 获取每个时间段的客户数和等待时间
          result = await services.api.monitor.monitorBusy.getPhasedBusyInfoBeforeCurrentTime(base.getStore({ key: 'orgId' }), 2, endTime, startTime)
          if (result.length !== 0) {
            self.timePhasedBusiness = result
            // 对两个所需数据数组同时进行数据处理 08:30 - 17:00，需要字符串分割，字符串连接
            startTime = startTime.split(':')
            endTime = endTime.split(':')
            // 获取小时部分 type:string
            let h = startTime[0]
            const endH = endTime[0]
            // 获取分钟部分 type:string
            const m = startTime[1]
            const endM = endTime[1]
            // 时间数值化 type:number
            let time = parseInt(h) + parseInt(m) / 100
            const endT = parseInt(endH) + parseInt(endM) / 100
            // 用于循环暂存数据
            let temp
            while (true) {
              time++
              if (time <= endT) {
                h = parseInt(h)
                temp = h
                h++
                if (temp < 10) {
                  temp = '0' + temp
                }
                if (h < 10) {
                  h = '0' + h
                }
                self.businessHours.push(temp + ':' + m + '-' + h + ':' + m)
              } else {
                if (time - endT < 1) {
                  h = parseInt(h)
                  if (h < 10) {
                    h = '0' + h
                  }
                  self.businessHours.push(h + ':' + m + '-' + endH + ':' + endM)
                } else {
                  break
                }
              }
            }
            self.timePhasedBusiness.map((item, index) => {
              if (item.applyCustomers !== '0' || item.callCustomers !== '0') {
                self.isShow = true
              }
            })
            self.$nextTick(function () {
              self.initChart()
            })
          }
        }
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    initChart () {
      if (!document.getElementById(this.busyStatusChartId)) return
      const chart = echarts.init(
        document.getElementById(this.busyStatusChartId)
      )
      const xAxis = []
      // const tranValue = []
      const waitingCustomersTemp = []
      const receiveCustomersTemp = []
      const barData = []
      const me = this
      me.$set(me.circleData[0], 'count', me.chartsData.waitingCustomers || 0)
      me.$set(me.circleData[1], 'count', me.chartsData.avgWindowWaitingCustomers || 0)
      me.$set(me.circleData[2], 'count', me.chartsData.avgWaitingTime || 0)
      me.$set(me.circleData[3], 'count', me.chartsData.maxWaitingTime || 0)

      me.businessHours.map(function (item, index) {
        xAxis.push(item)
      })
      me.timePhasedBusiness.map(function (item, index) {
        // tranValue.push(item.avgWaitingTime)
        waitingCustomersTemp.push(item.applyCustomers)
        receiveCustomersTemp.push(item.callCustomers)
      })
      barData.push(waitingCustomersTemp)
      barData.push(receiveCustomersTemp)
      const mOption = options.doubleBar(xAxis, barData)

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
    },
    '$store.state.monitor.refreshTime': function (value) {
      this.getData()
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
    //修改子组件circlePanel的宽度属性，以方便文字在一行显示
    .circle-main-content {
      width: 10rem;
      /deep/ .right-title-content {
        width: 7.5rem;
      }
    }
  }
  .device-status-chart {
    width: 100%;
    height: 300px;
  }
}
</style>



