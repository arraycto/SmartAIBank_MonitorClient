<template>
    <div class="busyDegree-core-content">
      <el-row :gutter="20">
        <el-col :span="18">
          <coreBusyLeft :branchId="branchId" :branchStatsType="branchStatsType" ref="coreBusyLeft"></coreBusyLeft>
        </el-col>
        <el-col :span="6">
            <coreBusyRight :branchId="branchId" ref="coreBusyLeft"></coreBusyRight>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import coreBusyLeft from '@/syscomponents/smartMonitor/monitor/busyDegree/coreBusyLeft'
import coreBusyRight from '@/syscomponents/smartMonitor/monitor/busyDegree/coreBusyRight'
import base from '@/common/base'
export default {
  name: 'coreBusyDegree',
  components: { coreBusyLeft, coreBusyRight },
  data () {
    return {
      branchId: '', // 机构号
      branchStatsType: 2 // 营业兼管理机构
    }
  },
  mounted () {
    this.branchId = base.getStore({ key: 'orgId' })
  },
  methods: {},
  watch: {
    '$store.state.monitor.managerBranchId': function (value) {
      if (this.$store.state.monitor.managerBranchId != null) {
        this.branchId = value.substring(0, value.length - 13)
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>



