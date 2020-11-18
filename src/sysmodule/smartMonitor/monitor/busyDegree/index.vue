<template>
    <div>
      <topBreadCrumb ref="topBreadCrumb" class="core-motidsds-top" :isentityShow="entityShow"></topBreadCrumb>
      <core v-if="coreShow" ></core>
      <entity v-if="entityShow"></entity>
    </div>
</template>
<script>
import core from './core.vue'
import entity from './entity.vue'
import base from '@/common/base'
import topBreadCrumb from '@/syscomponents/smartMonitor/monitor/busyDegree/topBreadCrumb'
export default {
  name: 'busyDegreeIndex',
  data () {
    return {
      coreShow: false,
      entityShow: true
    }
  },
  components: {
    core, entity, topBreadCrumb
  },
  mounted () {
    this.$nextTick(function () {
      this.init()
    })
  },
  methods: {
    init () {
      const self = this
      const banklevel = base.getStore({ key: 'monitorMenuBankLevel' })
      if (banklevel === 'entity') {
        self.coreShow = false
        self.entityShow = true
      } else {
        self.coreShow = true
        self.entityShow = false
      }
    }
  },
  watch: {
    '$store.state.monitor.tableBranchId': function (value) {
      if (this.$store.state.monitor.tableBranchId != null) {
        this.coreShow = false
        this.entityShow = true
      }
    },
    '$store.state.monitor.managerBranchId': function (value) {
      if (this.$store.state.monitor.managerBranchId != null) {
        this.coreShow = true
        this.entityShow = false
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.core-motidsds-top{margin-bottom: 1rem}
</style>



