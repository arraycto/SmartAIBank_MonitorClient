<template>
<div class="device-state">
    <div class="top-style" v-if="this.resultDate.length>0&&this.chartsData.length>0">
    <el-row :gutter="20">
      <el-col :span="10">
        <privateBusinessChart :chartsData="chartsData"></privateBusinessChart>
      </el-col>
      <el-col :span="14">
        <privateBusinessLineChart :resultDate="resultDate"></privateBusinessLineChart>
      </el-col>
    </el-row>
  </div>
  <div class="content-style" v-else>
    <occupied height='360px' explain='暂无数据'/>
  </div>
</div>
</template>
<script>
import occupied from '@/components/Occupied/occupied'
import base from '@/common/base'
import privateBusinessChart from '@/syscomponents/smartMonitor/monitor/busyDegree/charts/privateBusinessChart'
import privateBusinessLineChart from '@/syscomponents/smartMonitor/monitor/busyDegree/charts/privateBusinessLineChart'
import services from '../../../../services'
export default {
  name: 'privateBusiness',
  data () {
    return {
      branchId: '',
      chartsData: [], // 原始数据
      resultDate: []
    }
  },
  components: {
    occupied, privateBusinessChart, privateBusinessLineChart
  },
  mounted () {
    this.branchId = base.getStore({ key: 'orgId' })
    this.getData()
  },
  methods: {
    async getData () {
      this.chartsData = []
      this.resultDate = []
      const me = this
      var privateTypeList = []
      try {
        const businessTypes = await services.api.monitor.monitorBusy.getBusyBusinessTypeDistribution(this.branchId)
        this.resultDate = businessTypes.personalBusinessList
        const privateList = businessTypes.personalBusinessList
        privateList.map(function (item) {
          var tempObj = { 'value': item.waitingCustomerCount, 'name': item.businessTypeName }
          privateTypeList.push(tempObj)
          me.chartsData = privateTypeList
        })
      } catch (err) {
        this.$message({
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
        this.getData()
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
  box-shadow: 0 5px 10px 0 rgba(225,226,230,0.50);
  border-radius: 8px;
  background: white;
  .top-style{
    .device-title-style{
      margin-top: 20px;
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



