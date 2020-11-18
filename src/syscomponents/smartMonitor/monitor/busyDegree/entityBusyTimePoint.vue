<template>
<div class="device-state">
    <div class="top-style">
    <el-row :gutter="20">
          <el-col :span="18">
              <div class="device-title-style">分时段繁忙情况</div>
          </el-col>
    </el-row>
  </div>
  <div v-if="this.isShow">
    <timePointChart :timePonitResultDate="timePonitResultDate" :busyGather="busyGather" :startEndTimePoint="startEndTimePoint"></timePointChart>
  </div>
  <div class="content-style" v-else>
    <occupied height='280px' explain='暂无数据'/>
  </div>
</div>
</template>
<script>
import occupied from '@/components/Occupied/occupied'
import timePointChart from '@/syscomponents/smartMonitor/monitor/busyDegree/charts/timePointChart'
import services from '../../../../services'
import base from '@/common/base'
export default {
  name: 'entityBusyTimePoint',
  data () {
    return {
      startEndTimePoint: [],
      timePonitOriginalDate: [], // 原始数据
      timePonitResultDate: [],
      branchId: '',
      isShow: false
    }
  },
  components: {
    occupied, timePointChart
  },
  mounted () {
    this.branchId = base.getStore({ key: 'orgId' })
    this.getData()
    // this.dataRecombination()
  },
  props: {
    busyGather: Object
  },
  methods: {
    // 获取分时段繁忙情况数据，并格式化数据
    async getData () {
      this.startEndTimePoint = []
      this.timePonitOriginalDate = [] // 原始数据
      this.timePonitResultDate = []
      try {
        var self = this
        const startEndTime = await services.api.monitor.monitorBusy.getOrgBusinessHours(this.branchId)
        self.timePonitResultDate = await services.api.monitor.monitorBusy.getPhasedBusyInfoBeforeCurrentTime(this.branchId, 1, startEndTime.endTime, startEndTime.startTime) || []
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
              // 将各子区间日期按1小时递增转换为时间并存入list数组
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
        this.timePonitResultDate.map((item, index) => {
          if (item.applyCustomers !== '0' || item.callCustomers !== '0') {
            self.isShow = true
          }
        })
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
        // this.dataRecombination()
      }
    },
    '$store.state.monitor.refreshTime': function (value) {
      this.getData()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/standard-common.scss";
.device-state{
  background: white;
  box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
  border-radius: 8px;
  .top-style{
    padding-top: $largePadding;
    padding-bottom: $middlePadding;
    border-bottom: 1px solid $lineColor;

    width: 97%;
    margin: 0 auto;
    margin-left: 12px;
    .device-title-style{
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
    height: 308px;
  }
}
</style>



