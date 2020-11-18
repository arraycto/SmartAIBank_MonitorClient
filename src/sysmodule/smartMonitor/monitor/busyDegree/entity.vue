<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <entityTitle entityTitle="等待客户数(人)" :titleData="busyGather.waitingCustomers" ref="entityTitle"></entityTitle>
      </el-col>
      <el-col :span="4">
        <entityTitle entityTitle="窗口平均等待客户数(人)" :titleData="busyGather.avgWindowWaitingCustomers" ref="entityTitle"></entityTitle>
      </el-col>
      <el-col :span="4">
        <entityTitle entityTitle="客户平均等待时间(分钟)" :titleData="busyGather.avgWaitingTime" ref="entityTitle"></entityTitle>
      </el-col>
      <el-col :span="4">
        <entityTitle entityTitle="客户最长等待时间(分钟)" :titleData="busyGather.maxWaitingTime" ref="entityTitle"></entityTitle>
      </el-col>
      <el-col :span="4">
        <entityTitle entityTitle="已开窗口数(个)" :titleData="busyGather.openWindowsCount" ref="entityTitle"></entityTitle>
      </el-col>
      <el-col :span="4">
        <entityTitle entityTitle="未开窗口数(个)" :titleData="busyGather.unopenedWindowsCount" ref="entityTitle"></entityTitle>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="entity-busy-layout">
      <el-col :span="15">
        <busyDegreeTimePoint :busyGather ="busyGather"></busyDegreeTimePoint>
      </el-col>
      <el-col :span="9">
        <entityBusyWaitQueue></entityBusyWaitQueue>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="entity-busy-layout">
      <el-col :span="24">
        <entityBusyCustorType></entityBusyCustorType>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="entity-busy-layout">
      <el-col :span="24">
        <entityBusyBusinessType></entityBusyBusinessType>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import entityTitle from '@/syscomponents/smartMonitor/monitor/busyDegree/entityTitle'
import busyGather from '@/dummy/smartMonitor/busyDegree/busyGather.json'
import busyDegreeTimePoint from '@/syscomponents/smartMonitor/monitor/busyDegree/entityBusyTimePoint'
import entityBusyWaitQueue from '@/syscomponents/smartMonitor/monitor/busyDegree/entityBusyWaitQueue'
import entityBusyCustorType from '@/syscomponents/smartMonitor/monitor/busyDegree/entityBusyCustorType'
import entityBusyBusinessType from '@/syscomponents/smartMonitor/monitor/busyDegree/entityBusyBusinessType'
import services from '../../../../services'
import base from '@/common/base'
export default {
  name: 'entityBusyDegree',
  components: { entityTitle, busyDegreeTimePoint, entityBusyWaitQueue, entityBusyCustorType, entityBusyBusinessType },
  data () {
    return {
      branchId: '',
      busyGather: {
        'avgWaitingTime': 0,
        'avgWindowWaitingCustomers': 0,
        'busyCount': 0,
        'busyRate': 0,
        'idleCount': 0,
        'idleRate': 0,
        'maxWaitingTime': 0,
        'maxWaitingTimeBranchId': '',
        'maxWaitingTimeBranchName': '',
        'normalCount': 0,
        'normalRate': 0,
        'openWindowsCount': 0,
        'saturationCount': 0,
        'saturationRate': 0,
        'totalCount': 0,
        'unopenedCount': 0,
        'unopenedRate': 0,
        'unopenedWindowsCount': 0,
        'waitingCustomers': 0
      }
    }
  },
  mounted () {
    this.branchId = base.getStore({ key: 'orgId' })
    this.getBusyGather()
  },
  methods: {
    getBusyGather: async function () {
      const self = this
      try {
        const gatherList = await services.api.monitor.monitorBusy.selectBusinessGatherInfo(this.branchId, 1) || {}
        self.busyGather.waitingCustomers = gatherList.waitingCustomers || 0
        self.busyGather.avgWindowWaitingCustomers = gatherList.avgWindowWaitingCustomers || 0
        self.busyGather.avgWaitingTime = gatherList.avgWaitingTime || 0
        self.busyGather.maxWaitingTime = gatherList.maxWaitingTime || 0
        self.busyGather.openWindowsCount = gatherList.openWindowsCount || 0
        self.busyGather.unopenedWindowsCount = gatherList.unopenedWindowsCount || 0
      } catch (err) {
        self.$message({
          message: err.message,
          type: 'error'
        })
      }
    }
  },
  watch: {
    '$store.state.monitor.tableBranchId': function (value) {
      if (this.$store.state.monitor.tableBranchId != null) {
        this.branchId = value.substring(0, value.length - 13)
        this.getBusyGather()
      }
    },
    '$store.state.monitor.refreshTime': function (value) {
      this.getBusyGather()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.entity-busy-layout{
  margin-top: 16px;
}
</style>



