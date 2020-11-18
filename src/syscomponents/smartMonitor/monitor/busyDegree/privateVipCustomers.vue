<template>
<div class="device-state">
    <div class="top-style">
    <el-row :gutter="20">
          <el-col :span="10">
              <div class="device-title-style customer-title"><b>对私VIP</b></div>
          </el-col>
          <el-col :span="14" >
              <el-row>
                <el-col :span="24">
                  <div class="device-title-style windowId">
                    <div v-for="(item,index) in windowID" :key="index" class="device-title-style-span">{{item.windowId}}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="device-title-style-windowId">可办理窗口</div>
                </el-col>
              </el-row>
          </el-col>
    </el-row>
  </div>
  <!-- <div v-if="this.chartsData[0].waitTimeValue>0&&this.chartsData[1].waitTimeValue>0&&this.chartsData[2].waitTimeValue>0&&this.chartsData[3].waitTimeValue>0"> -->
    <div v-if="this.chartsData1[0].total>0">
    <privateVipCustChart :chartsData="chartsData" :busyCustGatherInfoInCustType="busyCustGatherInfoInCustType" :timePonitResultDate="timePonitResultDate"
    :startEndTimePoint="startEndTimePoint"></privateVipCustChart>
  </div>
  <div class="content-style" v-else>
    <occupied height='265px' explain='暂无数据'/>
  </div>
</div>
</template>
<script>
import occupied from '@/components/Occupied/occupied'
import privateVipCustChart from '@/syscomponents/smartMonitor/monitor/busyDegree/charts/privateVipCustChart'
import services from '../../../../services'
import base from '@/common/base'
export default {
  name: 'privateOrdinaryCustomers',
  data () {
    return {
      chartsData1: [
        {
          total: 0
        }
      ],
      // 等待时间长度
      chartsData: [
        {
          waitTimeLaber: '10分钟以下',
          waitTimeValue: 0,
          waitTimeRate: 0,
          color: '#497DEA'

        },
        {
          waitTimeLaber: '10-20分钟',
          waitTimeValue: 0,
          waitTimeRate: 0,
          color: '#F37D7D'
        },
        {
          waitTimeLaber: '20-30分钟',
          waitTimeValue: 0,
          waitTimeRate: 0,
          color: '#E9B437'
        },
        {
          waitTimeLaber: '30分钟以上',
          waitTimeValue: 0,
          waitTimeRate: 0,
          color: '#A483FB'
        }
      ],
      windowID: [], // 可办理窗口
      // 客户等待数，占比，客户平均等待时间
      busyCustGatherInfoInCustType: {
        avgWaitingTime: 0,
        waitingCustomers: 0,
        waitingCustomersRate: 0
      },
      startEndTimePoint: [], // 开始营业时间-结束营业时间
      timePonitOriginalDate: [], // 分时间段原始数据
      timePonitResultDate: []// 分时间段最终数据数据，用于页面图表显示
    }
  },
  components: {
    occupied, privateVipCustChart
  },
  mounted () {
    this.branchId = base.getStore({ key: 'orgId' })
    this.getData()
    this.getLineChartData()
  },
  methods: {
    // 获取统计数据及饼状图数据
    async getData () {
      const me = this
      me.windowID = []
      try {
        const startEndTime = await services.api.monitor.monitorBusy.getOrgBusinessHours(this.branchId)
        const chartsDatas = await services.api.monitor.monitorBusy.getPhasedCustomerTypeBusyInfo(this.branchId, 1, startEndTime.endTime, startEndTime.startTime)
        me.windowID = chartsDatas.personalVIPGatherInfo.windows || []
        me.busyCustGatherInfoInCustType.avgWaitingTime = chartsDatas.personalVIPGatherInfo.busyCustGatherInfoInCustType.avgWaitingTime || 0
        me.busyCustGatherInfoInCustType.waitingCustomers = chartsDatas.personalVIPGatherInfo.busyCustGatherInfoInCustType.waitingCustomers || 0
        me.busyCustGatherInfoInCustType.waitingCustomersRate = chartsDatas.personalVIPGatherInfo.busyCustGatherInfoInCustType.waitingCustomersRate || 0
        me.$set(me.chartsData[0], 'waitTimeRate', chartsDatas.personalVIPGatherInfo.busyWaitTimeDistribution.lessThanTenMinRate || 0)
        me.$set(me.chartsData[1], 'waitTimeRate', chartsDatas.personalVIPGatherInfo.busyWaitTimeDistribution.betweenTenAndTwentyMinRate || 0)
        me.$set(me.chartsData[2], 'waitTimeRate', chartsDatas.personalVIPGatherInfo.busyWaitTimeDistribution.betweenTwentyAndThirtyMinRate || 0)
        me.$set(me.chartsData[3], 'waitTimeRate', chartsDatas.personalVIPGatherInfo.busyWaitTimeDistribution.moreThanThirtyMinRate || 0)
        me.$set(me.chartsData1[0], 'total', chartsDatas.personalVIPGatherInfo.busyWaitTimeDistribution.totalCount || 0)
        me.$set(me.chartsData[0], 'waitTimeValue', chartsDatas.personalVIPGatherInfo.busyWaitTimeDistribution.lessThanTenMinCount || 0)
        me.$set(me.chartsData[1], 'waitTimeValue', chartsDatas.personalVIPGatherInfo.busyWaitTimeDistribution.betweenTenAndTwentyMinCount || 0)
        me.$set(me.chartsData[2], 'waitTimeValue', chartsDatas.personalVIPGatherInfo.busyWaitTimeDistribution.betweenTwentyAndThirtyMinCount || 0)
        me.$set(me.chartsData[3], 'waitTimeValue', chartsDatas.personalVIPGatherInfo.busyWaitTimeDistribution.moreThanThirtyMinCount || 0)
      } catch (err) {
        this.$message({
          message: err.message,
          type: 'error'
        })
      }
    },

    // 获取分时段繁忙情况数据，并格式化数据
    async getLineChartData () {
      this.startEndTimePoint = []
      this.timePonitOriginalDate = []
      this.timePonitResultDate = []
      try {
        var self = this
        const startEndTime = await services.api.monitor.monitorBusy.getOrgBusinessHours(this.branchId)
        const chartsDatas = await services.api.monitor.monitorBusy.getPhasedCustomerTypeBusyInfo(this.branchId, 1, startEndTime.endTime, startEndTime.startTime)
        self.timePonitResultDate = chartsDatas.personalVIPGatherInfo.timePhasedBusinessInfoList || []
        const openTime = startEndTime.startTime + '-' + startEndTime.endTime
        const y = new Date().getFullYear()
        const m = new Date().getMonth() + 1
        const d = new Date().getDate()
        const start = []
        const end = [] // start起始时间数组，end结束时间数组
        const [s, e] = openTime.split('-')
        start.push(new Date(y + '/' + m + '/' + d + ' ' + s))
        end.push(new Date(y + '/' + m + '/' + d + ' ' + e))
        for (let i = 0, len = start.length; i < len; i++) {
          const len2 = (end[i].getTime() - start[i].getTime()) / (60 * 60 * 1000) // 计算各子区间以半小时为间隔拆分后的数组长度
          for (let j = 0; j < len2; j++) {
            if (start[i].getTime() + 60 * 60 * 1000 <= end[i].getTime()) {
              // 将各子区间日期按半小时递增转换为时间并存入list数组
              const ss = new Date(start[i].getTime() + 60 * 60 * 1000 * j)
              const ee = new Date(start[i].getTime() + 60 * 60 * 1000 * (j + 1))
              // 判断均分的时间段是否与营业时间相吻合 吻合取拆分的时间段，不吻合取结束时间
              if (j === Math.ceil(len2) - 1 && ee.toString() !== new Date(end[0].getTime()).toString()) {
                this.startEndTimePoint.push({
                  startTime: this.formatTime(ss.getHours()) + ':' + this.formatTime(ss.getMinutes()),
                  endTime: this.formatTime(ee.getHours()) + ':' + this.formatTime(ee.getMinutes()),
                  'applyCustomers': '0',
                  'callCustomers': '0',
                  startEndTime: this.formatTime(ss.getHours()) + ':' + this.formatTime(ss.getMinutes()) + '-' + this.formatTime(end[0].getHours()) + ':' + this.formatTime(end[0].getMinutes())
                })
              } else {
                this.startEndTimePoint.push({
                  startTime: this.formatTime(ss.getHours()) + ':' + this.formatTime(ss.getMinutes()),
                  endTime: this.formatTime(ee.getHours()) + ':' + this.formatTime(ee.getMinutes()),
                  'applyCustomers': '0',
                  'callCustomers': '0',
                  startEndTime: this.formatTime(ss.getHours()) + ':' + this.formatTime(ss.getMinutes()) + '-' + this.formatTime(ee.getHours()) + ':' + this.formatTime(ee.getMinutes())
                })
              }
            }
          }
        }
        // this.dataRecombination()
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    },
    // 时间为个位数则补零
    formatTime (time) {
      return time < 10 ? '0' + time : time
    },
    // 重新组装数组
    dataRecombination () {
      this.timePonitOriginalDate.map((item, index) => {
        this.startEndTimePoint.map((item1, index1) => {
          if (item1.endTime === item.endTime) {
            // this.startEndTimePoint[index1]['waitTime'] = item.avgWaitingTime
            // this.startEndTimePoint[index1]['waitCustomer'] = item.waitingCustomers
            this.startEndTimePoint[index1]['applyCustomers'] = item.applyCustomers// 抽号数量
            this.startEndTimePoint[index1]['callCustomers'] = item.callCustomers// 叫号数量
          }
        })
      })
      this.timePonitResultDate = this.startEndTimePoint
    }
  },
  watch: {
    '$store.state.monitor.tableBranchId': function (value) {
      if (this.$store.state.monitor.tableBranchId != null) {
        this.branchId = value.substring(0, value.length - 13)
        this.getData()
        this.getLineChartData()
      }
    },
    '$store.state.monitor.refreshTime': function (value) {
      this.getData()
      this.getLineChartData()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.device-state{
  box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
  border-radius: 8px;
  background: white;
  .top-style{
    padding-top: $largePadding;
    padding-bottom: $middlePadding;
    border-bottom: 1px solid $lineColor;
    width: 97%;
    margin: 0 auto;
    margin-left: 12px;
    .customer-title{
      float: left;
      margin-top: 15px;
    }
    .device-title-style-windowId{
      float: right;
      margin-right:10px;
      margin-top:6px;
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #9B9B9B;
      letter-spacing: 0;
    }
    .windowId{
      float: right;
      .device-title-style-span{
        float: right;
        margin-right: 5px;
        background: #4A4A4A;;
        color: #ffffff;
        width: 22px;
        height: 22px;
        border-radius: 11px;
        text-align: center;
      }
    }
    .device-title-style{
      position:relative;
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #333333;
      letter-spacing: 0;
    }
    .device-type-style{
        margin:0 auto
    }
    .device-type{
        color:$homeBlueColor;
        border-bottom: 2px solid $homeBlueColor;
        padding-bottom: 5px;
        font-weight: bold;
    }
    .device-init{
        text-align: center;
        cursor: pointer;
        font-family: $textFontFamily;
        font-size: $XSmallFontSize;
    }
  }
  .content-style{
    width: 97%;
    margin: 0 auto;
  }
}

</style>



